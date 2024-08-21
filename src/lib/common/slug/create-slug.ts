export function createSlug(): string {
	let patternFirst: string | null = crypto
		.getRandomValues(new Uint32Array(32))
		.join('')
		.slice(0, 280);
	let patternSecond: string | null = crypto
		.getRandomValues(new Uint32Array(32))
		.join('')
		.slice(0, 280);
	const id = `${(+patternFirst).toString(16)}`.slice(0, 16);
	const idTwo = `${(+patternSecond).toString(16)}`.slice(0, 16);

	patternFirst = null;
	patternSecond = null;

	return `${id.toUpperCase()}${idTwo.toUpperCase()}`.slice(0, 32);
}
