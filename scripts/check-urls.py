#!/usr/bin/env python3
#
# Copyright (C) 2025 Tom Glastonbury <t@tg73.net>
#
# This file may be distributed under the terms of the GNU GPLv3 license.
"""
check-urls.py – Scan the repo for HTTP/HTTPS URLs and verify reachability.

Usage:
    python3 scripts/check-urls.py [--no-color] [--timeout SECS] [--workers N]
"""

from __future__ import annotations

import argparse
import concurrent.futures
import fnmatch
import os
import re
import subprocess
import sys
from collections import defaultdict
from dataclasses import dataclass, field
from pathlib import Path
from typing import Optional

import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# ─── File-exclusion configuration ────────────────────────────────────────────
# Glob patterns matched against repo-root-relative POSIX paths.
# Supports ** (any depth), * (within one path segment), ? (single char).
EXCLUDE_PATH_PATTERNS: list[str] = [
    "src/__tests__/**",
    "src/**/__tests__/**",
    "src/**/__fixtures__/**",
    "src/**/__mocks__/**",
    "src/**/*.test.ts",
    "src/**/*.test.tsx",
    "src/**/*.test.js",
    "src/**/*.test.jsx",
    "src/**/*.spec.ts",
    "src/**/*.spec.tsx",
    "src/**/*.spec.js",
    "src/**/*.spec.jsx",
    "**/*.snap",
    "pnpm-lock.yaml",
    "yarn.lock",
    "package-lock.json",
    "**/*.lock",
    "**/*.lockb",
    "CHANGELOG.md",
    "CHANGELOG*",
]

# ─── URL-exclusion configuration ─────────────────────────────────────────────
# fnmatch-style patterns matched against the full extracted URL.
# Matching URLs are silently excluded from all output groups.
EXCLUDE_URL_PATTERNS: list[str] = [
    "http://localhost*",
    "https://localhost*",
    "http://localhost:*",
    "https://localhost:*",
    "http://127.0.0.1*",
    "https://127.0.0.1*",
    "http://0.0.0.0*",
    "https://0.0.0.0*",
    "http://[::1]*",
    "https://[::1]*",
    "http://*.local*",
    "https://*.local*",
    "*.schema.json", # Common suffix for JSON Schema $schema URLs, which are not fetchable endpoints.
]

# ─── Binary-extension exclusion ───────────────────────────────────────────────
BINARY_EXTENSIONS: frozenset[str] = frozenset({
    "jpg", "jpeg", "png", "gif", "bmp", "webp", "ico", "tiff", "tif",
    "svg", "svgz",
    "pdf",
    "zip", "gz", "tar", "bz2", "xz", "z", "7z", "rar", "cab",
    "woff", "woff2", "ttf", "eot", "otf",
    "mp3", "mp4", "wav", "ogg", "webm", "avi", "mov", "mkv", "flac",
    "exe", "dll", "so", "dylib", "bin", "o", "a", "lib",
    "pyc", "pyo", "class", "jar", "war", "ear",
    "db", "sqlite", "sqlite3",
    "parquet", "arrow", "feather", "pkl", "pickle",
    "wasm",
})

# ─── HTTP settings ────────────────────────────────────────────────────────────
DEFAULT_WORKERS = 10
DEFAULT_TIMEOUT = 15   # seconds
USER_AGENT = "Mozilla/5.0 (compatible; url-checker/1.0)"

# ─── Regex patterns ───────────────────────────────────────────────────────────

# Broad URL extractor – trailing punctuation is stripped in post-processing.
_URL_RE = re.compile(r'https?://[^\s"\'<>()\[\]`\\,]+')

# Trailing characters that are almost never the end of a real URL.
_TRAILING_JUNK = re.compile(r'[.,;:!?)\]>"\'`|\\]*$')

# Detects interpolation markers INSIDE an extracted URL:
#   ${expr}      – JS/TS template literals (closing } may have been trimmed by
#                  the URL regex stopping at a function-call parenthesis)
#   {expr}       – Python f-strings, str.format(), Jinja2, etc.
#   %s %d %r … – Python %-formatting (but NOT %20 %2F percent-encoding)
#   %(name)s …  – Python named %-formatting
_INTERPOLATION_RE = re.compile(
    r'\$\{[^}]*\}?'                      # ${expr} or bare ${ – JS template
    r'|\{[^}]+\}'                        # {expr}  – f-string / .format / Jinja
    r'|%\([^)]+\)[diouxXefgEGcrsab%]'   # %(name)type – named Python %
    r'|%[diouxXefgEGcrsab]'             # %type – positional Python % (not hex)
)

# JSON/YAML "$schema" property – URLs on these lines are schema identifiers.
_SCHEMA_KEY_RE = re.compile(r'"?\$schema"?\s*[:=]')


# ─── Data structures ──────────────────────────────────────────────────────────

@dataclass(frozen=True)
class Location:
    file: str
    line: int

    def __str__(self) -> str:
        return f"{self.file}:{self.line}"


@dataclass
class UrlInfo:
    url: str
    locations: list[Location] = field(default_factory=list)
    interpolated: bool = False


# ─── Colour helpers ───────────────────────────────────────────────────────────

class _Colors:
    RESET  = "\033[0m"
    RED    = "\033[0;31m"
    YELLOW = "\033[1;33m"
    GREEN  = "\033[0;32m"
    CYAN   = "\033[0;36m"
    BOLD   = "\033[1m"
    DIM    = "\033[2m"


_NO_COLOR = _Colors()
for _k in vars(_Colors):
    if not _k.startswith("_"):
        setattr(_NO_COLOR, _k, "")


def _make_colors(use_color: bool) -> _Colors:
    return _Colors() if use_color else _NO_COLOR


# ─── File collection ──────────────────────────────────────────────────────────

def _git_tracked_files(repo_root: Path) -> list[str]:
    """Return repo-root-relative POSIX paths of all git-tracked files."""
    result = subprocess.run(
        ["git", "ls-files"],
        cwd=repo_root,
        capture_output=True,
        text=True,
        check=True,
    )
    return [line for line in result.stdout.splitlines() if line]


def _path_excluded(rel_posix: str, patterns: list[str]) -> bool:
    """Return True if *rel_posix* matches any exclude glob pattern."""
    for pat in patterns:
        if fnmatch.fnmatch(rel_posix, pat):
            return True
    return False


def _has_binary_extension(path: Path) -> bool:
    suffix = path.suffix.lstrip(".").lower()
    return suffix in BINARY_EXTENSIONS


def _is_binary_file(path: Path) -> bool:
    """Heuristic: presence of a NUL byte → binary."""
    try:
        chunk = path.read_bytes()[:8192]
        return b"\x00" in chunk
    except OSError:
        return True


def collect_files(repo_root: Path) -> list[Path]:
    """Return the list of text files that should be scanned for URLs."""
    tracked = _git_tracked_files(repo_root)
    files: list[Path] = []
    for rel in tracked:
        if _path_excluded(rel, EXCLUDE_PATH_PATTERNS):
            continue
        p = repo_root / rel
        if not p.is_file():
            continue
        if _has_binary_extension(p):
            continue
        if _is_binary_file(p):
            continue
        files.append(p)
    return files


# ─── URL extraction ───────────────────────────────────────────────────────────

def _url_excluded(url: str) -> bool:
    """Return True if the URL matches any EXCLUDE_URL_PATTERNS entry."""
    for pat in EXCLUDE_URL_PATTERNS:
        if fnmatch.fnmatch(url, pat):
            return True
    return False


def extract_urls(files: list[Path], repo_root: Path) -> dict[str, UrlInfo]:
    """
    Scan *files* for http/https URLs.

    Returns a dict mapping normalised URL → UrlInfo.
    """
    url_map: dict[str, UrlInfo] = {}

    for path in files:
        rel = path.relative_to(repo_root).as_posix()
        try:
            text = path.read_text(encoding="utf-8", errors="replace")
        except OSError:
            continue

        for lineno, line in enumerate(text.splitlines(), start=1):
            # Skip $schema lines – they contain URI identifiers, not fetchable URLs.
            if _SCHEMA_KEY_RE.search(line):
                continue

            for m in _URL_RE.finditer(line):
                raw = m.group(0)
                url = _TRAILING_JUNK.sub("", raw)
                if not url:
                    continue
                if _url_excluded(url):
                    continue

                interpolated = bool(_INTERPOLATION_RE.search(url))

                if url not in url_map:
                    url_map[url] = UrlInfo(url=url, interpolated=interpolated)
                else:
                    # Preserve the flag if *any* occurrence is interpolated.
                    if interpolated:
                        url_map[url].interpolated = True

                loc = Location(file=rel, line=lineno)
                if loc not in url_map[url].locations:
                    url_map[url].locations.append(loc)

    return url_map


# ─── URL checking ─────────────────────────────────────────────────────────────

def _make_session() -> requests.Session:
    session = requests.Session()
    # No automatic retries – we handle fallback logic ourselves.
    adapter = HTTPAdapter(max_retries=Retry(total=0))
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    session.headers["User-Agent"] = USER_AGENT
    return session


def check_url(url: str, timeout: int) -> tuple[str, Optional[int], Optional[str]]:
    """
    Returns (url, http_status_or_None, error_message_or_None).
    A 2xx status with no error means success.
    """
    session = _make_session()
    kwargs = dict(
        url=url,
        timeout=timeout,
        allow_redirects=True,
        headers={"User-Agent": USER_AGENT},
    )
    try:
        # Try HEAD first – no body download.
        resp = session.head(**kwargs)
        if resp.status_code == 405:
            # Server doesn't allow HEAD – fall back to GET.
            resp = session.get(**kwargs)
        return url, resp.status_code, None
    except requests.exceptions.SSLError as e:
        return url, None, f"SSL error: {e}"
    except requests.exceptions.ConnectionError as e:
        return url, None, f"Connection error: {e}"
    except requests.exceptions.Timeout:
        return url, None, f"Timed out after {timeout}s"
    except requests.exceptions.RequestException as e:
        return url, None, f"Request error: {e}"


# ─── Reporting helpers ────────────────────────────────────────────────────────

def _print_section(title: str, c: _Colors) -> None:
    print(f"\n{c.BOLD}{'═' * 3} {title} {'═' * 3}{c.RESET}")


def _print_url_group(infos: list[UrlInfo], c: _Colors, color: str = "") -> None:
    for info in sorted(infos, key=lambda i: i.url):
        print(f"  {color}{info.url}{c.RESET}")
        for loc in info.locations:
            print(f"    {c.DIM}↳ {loc}{c.RESET}")


# ─── Main ─────────────────────────────────────────────────────────────────────

def main() -> int:
    parser = argparse.ArgumentParser(description="Scan repo URLs and verify reachability.")
    parser.add_argument("--no-color", action="store_true", help="Disable coloured output.")
    parser.add_argument("--timeout", type=int, default=DEFAULT_TIMEOUT, metavar="SECS",
                        help=f"HTTP request timeout in seconds (default: {DEFAULT_TIMEOUT}).")
    parser.add_argument("--workers", type=int, default=DEFAULT_WORKERS, metavar="N",
                        help=f"Max concurrent URL checks (default: {DEFAULT_WORKERS}).")
    args = parser.parse_args()

    use_color = not args.no_color and sys.stdout.isatty()
    c = _make_colors(use_color)

    repo_root = Path(__file__).resolve().parent.parent

    # ── Step 1: Collect files ────────────────────────────────────────────────
    _print_section("Collecting files", c)
    all_tracked = _git_tracked_files(repo_root)
    scan_files = collect_files(repo_root)
    print(f"{c.CYAN}[info]{c.RESET} Scanning {len(scan_files)} files "
          f"(of {len(all_tracked)} git-tracked files)")

    # ── Step 2: Extract URLs ─────────────────────────────────────────────────
    _print_section("Extracting URLs", c)
    url_map = extract_urls(scan_files, repo_root)
    print(f"{c.CYAN}[info]{c.RESET} Found {len(url_map)} unique URLs")

    # ── Step 3: Classify URLs ────────────────────────────────────────────────
    interpolated_infos: list[UrlInfo] = []
    query_infos: list[UrlInfo] = []
    test_infos: list[UrlInfo] = []

    for info in url_map.values():
        if info.interpolated:
            interpolated_infos.append(info)
        elif "?" in info.url:
            query_infos.append(info)
        else:
            test_infos.append(info)

    # ── Step 4: Report interpolated URLs (not tested) ────────────────────────
    _print_section(
        f"Interpolated URLs – reported only, not tested ({len(interpolated_infos)})", c
    )
    if interpolated_infos:
        _print_url_group(interpolated_infos, c, color=c.YELLOW)
    else:
        print("  (none)")

    # ── Step 5: Report query-string URLs (not tested) ────────────────────────
    _print_section(
        f"URLs with query strings – reported only, not tested ({len(query_infos)})", c
    )
    if query_infos:
        _print_url_group(query_infos, c, color=c.YELLOW)
    else:
        print("  (none)")

    # ── Step 6: Test remaining URLs ──────────────────────────────────────────
    _print_section(f"Testing {len(test_infos)} URLs for reachability", c)

    results: dict[str, tuple[Optional[int], Optional[str]]] = {}

    if test_infos:
        urls_to_test = [info.url for info in test_infos]
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as executor:
            futures = {
                executor.submit(check_url, url, args.timeout): url
                for url in urls_to_test
            }
            for future in concurrent.futures.as_completed(futures):
                _, status, error = future.result()
                url = futures[future]
                results[url] = (status, error)

    # ── Step 7: Collect and display results ──────────────────────────────────
    pass_infos: list[UrlInfo] = []
    fail_infos: list[UrlInfo] = []
    fail_details: dict[str, tuple[Optional[int], Optional[str]]] = {}

    for info in test_infos:
        status, error = results.get(info.url, (None, "no result"))
        if status is not None and 200 <= status < 300:
            pass_infos.append(info)
        else:
            fail_infos.append(info)
            fail_details[info.url] = (status, error)

    _print_section("Results", c)
    if test_infos:
        print(f"  Tested : {len(test_infos)}")
        print(f"  {c.GREEN}Passed : {len(pass_infos)}{c.RESET}")
        print(f"  {c.RED}Failed : {len(fail_infos)}{c.RESET}")
    else:
        print(f"{c.CYAN}[info]{c.RESET} No URLs to test.")

    if fail_infos:
        print(f"\n{c.YELLOW}[warn]{c.RESET} The following URLs could not be successfully fetched:\n")
        for info in sorted(fail_infos, key=lambda i: i.url):
            status, error = fail_details[info.url]
            if status is not None:
                tag = f"[{status}]"
            else:
                tag = "[ERR]"
            detail = error if error else ""
            print(f"  {c.RED}{tag}{c.RESET} {info.url}")
            if detail:
                print(f"       {c.DIM}{detail}{c.RESET}")
            for loc in info.locations:
                print(f"       {c.DIM}↳ {loc}{c.RESET}")
        print()
        return 1

    if test_infos:
        print()
    print(f"{c.GREEN}[ ok ]{c.RESET} All tested URLs returned a 2xx response.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
