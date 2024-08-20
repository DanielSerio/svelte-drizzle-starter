import { _getCaller, _getCursors } from './_util';
import type { IteratorCallback } from './types';

export function forEach<VType>(values: VType[], callback: IteratorCallback<VType, void>): void {
	if (values.length === 0) return;

	const call = _getCaller(values, callback);

	if (values.length === 1) {
		call(0);

		return;
	}

	const { middle, ...mutable } = _getCursors(values.length)!;
	let { steps, forward, backward } = mutable;

	const step = () => {
		call(backward);
		call(forward);
	};

	const next = () => {
		steps -= 1;
		backward -= 1;
		forward += 1;
	};

	if (middle) call(middle);

	if (steps === 0) {
		step();

		return;
	}

	while (steps) {
		step();
		next();
	}

	return;
}
