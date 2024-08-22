import { chalk } from 'zx';
const reservedWords = [
	'if',
	'then',
	'else',
	'elif',
	'fi',
	'case',
	'esac',
	'for',
	'select',
	'while',
	'until',
	'do',
	'done',
	'in',
];
export function formatCmd(cmd?: string): string {
	if (cmd == undefined) return chalk.grey('undefined');
	const chars = [...cmd];
	let out = '$ ';
	let buf = '';
	let ch: string;
	type State = (() => State) | undefined;
	let state: State = root;
	let wordCount = 0;
	while (state) {
		ch = chars.shift() || 'EOF';
		if (ch == '\n') {
			out += style(state, buf) + '\n> ';
			buf = '';
			continue;
		}
		const next: State = ch == 'EOF' ? undefined : state();
		if (next != state) {
			out += style(state, buf);
			buf = '';
		}
		state = next == root ? next() : next;
		buf += ch;
	}

	function style(state: State, s: string): string {
		if (s == '') return '';
		if (reservedWords.includes(s)) {
			return chalk.cyanBright(s);
		}
		if (state == word && wordCount == 0) {
			wordCount++;
			return chalk.greenBright(s);
		}
		if (state == syntax) {
			wordCount = 0;
			return chalk.cyanBright(s);
		}
		if (state == dollar) return chalk.yellowBright(s);
		if (state?.name.startsWith('str')) return chalk.yellowBright(s);
		return s;
	}

	function isSyntax(ch: string) {
		return '()[]{}<>;:+|&='.includes(ch);
	}

	function root() {
		if (/\s/.test(ch)) return space;
		if (isSyntax(ch)) return syntax;
		if (/[$]/.test(ch)) return dollar;
		if (/["]/.test(ch)) return strDouble;
		if (/[']/.test(ch)) return strSingle;
		return word;
	}

	function space() {
		if (/\s/.test(ch)) return space;
		return root;
	}

	function word() {
		if (/[0-9a-z/_.]/i.test(ch)) return word;
		return root;
	}

	function syntax() {
		if (isSyntax(ch)) return syntax;
		return root;
	}

	function dollar() {
		if (/[']/.test(ch)) return str;
		return root;
	}

	function str() {
		if (/[']/.test(ch)) return strEnd;
		if (/[\\]/.test(ch)) return strBackslash;
		return str;
	}

	function strBackslash() {
		return strEscape;
	}

	function strEscape() {
		return str;
	}

	function strDouble() {
		if (/["]/.test(ch)) return strEnd;
		return strDouble;
	}

	function strSingle() {
		if (/[']/.test(ch)) return strEnd;
		return strSingle;
	}

	function strEnd() {
		return root;
	}

	return out + '\n';
}
