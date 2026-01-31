#!/usr/bin/env bash

GREEN='\033[0;32m'
RED='\033[0;31m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

BUILD_DIR=""
declare -a SRC_CLEANUP_REMOVE_FILES=(
	"__tests__"
	"app"
	"pages"
	"components"
	"coverage"
	"data"
	"helpers"
	"hooks"
	"moonraker"
	"env"
	"recoil"
	"server"
	"utils"
	"zods"
	"test-setup.ts"
	"test-setup-global.ts"
	"vitest.config.mts"
	"tsconfig.vitest.json"
	"copy-files-from-to.json"
	"components.json"
	"postcss.config.js"
	"prettier.config.mjs"
	"tailwind.config.ts"
)
_ratos_configuration_dir=$(git rev-parse --show-toplevel 2>/dev/null)
# if in _ratos_configuration_dir,then ensure the repository is RatOS-configurator
if [[ -z "$_ratos_configuration_dir" ]] || [[ ! "$_ratos_configuration_dir" == *"RatOS-configurator" ]]; then
 echo -e "${RED}Error: not a RatOS-configurator git repo${NC}" >&2
 exit 1
fi

# sanitize branch name for use in directory names
_sanitize_branch_name(){
    local branch_name="$1"
    # Replace slashes with hyphens
    echo "${branch_name//\//-}"
}

# This will create a git worktree for the branch being worked
# on in the same parent folder as the repo
make_or_use_worktree(){
    local _worktree_artifacts_dir # Base dir to hold deployment worktrees for branches
    local _current_branch # Current git branch name

    _worktree_artifacts_dir="$(dirname "$_ratos_configuration_dir")/configurator-deployment-worktrees"

    _current_branch=$(git branch --show-current)
    BUILD_DIR="${_worktree_artifacts_dir}/$(_sanitize_branch_name "${_current_branch}")-deployment"

    git worktree add "$BUILD_DIR" 2>/dev/null || {
        echo -e "${BLUE}Using existing worktree at: ${BUILD_DIR}${NC}"
    }
}

_is_cmd() {
    local cmd="$1"
    if ! command -v "$cmd" &> /dev/null; then
        echo -e "${RED}Error: The required command: $cmd is required but not available. Please install${NC}"
        exit 1
    fi
}

_use_src_or_app_dir() {
    if [ -d "${BUILD_DIR}/app" ]; then
        mv "${BUILD_DIR}/app" "${BUILD_DIR}/src"
    fi
    
    if [ -d "${BUILD_DIR}/src" ]; then
        echo "src"
    else
        echo -e "${RED}Error: Neither src nor app directory found in build worktree.${NC}"
        exit 1
    fi
}

_pnpm_install() {
    echo -e "${BLUE}Running pnpm install from ${BUILD_DIR}/$(_use_src_or_app_dir)${NC}"
    pnpm --dir "${BUILD_DIR}/$(_use_src_or_app_dir)" install --frozen-lockfile
}

_pnpm_build_app() {
    pnpm --dir "${BUILD_DIR}/src" run build
}

_pnpm_build_cli() {
    pnpm --dir "${BUILD_DIR}/src" run build:cli
}

_cleanup_build_worktree() {
    echo -e "${BLUE}Cleaning up build worktree at: $BUILD_DIR${NC}"
    mv "${BUILD_DIR}/src" "${BUILD_DIR}/app"
    for file in "${SRC_CLEANUP_REMOVE_FILES[@]}"; do
        rm -rf "${BUILD_DIR}/app/${file}"
    done
    echo -e "${GREEN}Cleanup complete.${NC}"
}

build_app(){
    echo -e "${BLUE}Building RatOS-configurator app...${NC}"
    echo -e "${BLUE}Installing dependencies...${NC}"
    _pnpm_install
    echo -e "${BLUE}Building application...${NC}"
    _pnpm_build_app
    echo -e "${BLUE}Building CLI...${NC}"
    _pnpm_build_cli
    echo -e "${GREEN}Build complete.${NC}"
    _cleanup_build_worktree
}

_is_cmd pnpm
make_or_use_worktree
build_app


echo -e "${GREEN}Deployment branch created!${NC}"
echo -e "${GREEN}View your deployment branches using ${BLUE}'cd ${BUILD_DIR}'${NC}"