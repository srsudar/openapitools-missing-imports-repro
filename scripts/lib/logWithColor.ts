// We can't use chalk because of annoying JS module nonsense. Instead, fake it.

export function gray(text: string): void {
  console.log('\x1b[90m' + text + '\x1b[0m');
}

export function green(text: string): void {
  console.log('\x1b[32m' + text + '\x1b[0m');
}

export function printHeader(header: string): void {
  gray(' ' + '-'.repeat(50));
  green(header);
  gray(' ' + '-'.repeat(50));
}
