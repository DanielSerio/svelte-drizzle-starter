import type { IteratorCallback, IteratorCursors } from './types';

/**
 * The function `_getCaller` takes an array of values and a callback function, and returns a function
 * that calls the callback function with each value from the array.
 * @param {ValueType[]} values - The `values` parameter is an array of values of type `ValueType`.
 * @param callback - The `callback` parameter in the `_getCaller` function is a function that takes two
 * parameters: a value of type `ValueType` and an index of type `number`, and returns a value of type
 * `ReturnType`.
 * @returns A function named `call` is being returned. This function takes an index as a parameter and
 * calls the provided callback function with the corresponding value from the `values` array at that
 * index.
 */
export function _getCaller<ValueType, ReturnType>(
	values: ValueType[],
	callback: IteratorCallback<ValueType, ReturnType>
) {
	return function call(index: number): ReturnType {
		return callback(values[index], index);
	};
}

/**
 * The function `_getCursors` calculates cursor positions based on the length of an iterator.
 * @param {number} length - The `_getCursors` function takes a `length` parameter, which is a number
 * representing the total length of a sequence. The function calculates and returns the cursor
 * positions for navigating this sequence.
 * @returns The function `_getCursors` returns either `null` or an object with properties `steps`,
 * `forward`, `middle`, and `backward` depending on the input `length`.
 */
export function _getCursors(length: number): null | IteratorCursors {
	if (length < 2) return null;
	if (length === 2) {
		return {
			steps: 0,
			forward: 1,
			backward: 0
		};
	}
	if (length === 3) {
		return {
			steps: 0,
			forward: 2,
			middle: 1,
			backward: 0
		};
	}

	const exactCenter = length / 2;
	let forward = ~~exactCenter;
	const backward = forward - 1;

	if (exactCenter % 1 !== 0) {
		const middle = forward;
		forward = middle + 1;

		return {
			steps: (length = forward),
			forward,
			middle,
			backward
		};
	}

	return {
		steps: (length = forward),
		forward,
		backward
	};
}
