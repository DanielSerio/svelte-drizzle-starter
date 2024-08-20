export function createSlug(): string {
	let pattern: string | null = crypto.getRandomValues(new Uint32Array(32)).join('').slice(0, 64);
	const id = `${(+pattern).toString(36).slice(0, 32)}`;

	pattern = null;

	return id.toUpperCase();
}
