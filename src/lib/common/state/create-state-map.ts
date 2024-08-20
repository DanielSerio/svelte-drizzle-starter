import type { StateMap } from '$lib/client/types';
import { forEach } from '../array';
import type { ShapeKey } from '../types';

/**
 * The function createStateMap creates a state map object with keys and a default value.
 * @param {Keys[]} keys - The `keys` parameter in the `createStateMap` function is an array of keys
 * that define the shape of the state map. These keys are used to create the properties of the state
 * map object.
 * @param {ValueType} value - The `value` parameter in the `createStateMap` function represents the
 * value that will be assigned to each key in the state map. It can be of any type, as it is a generic
 * parameter.
 * @returns The `createStateMap` function returns a `StateMap` object with keys of type `Keys` and
 * values of type `ValueType`.
 */
export function createStateMap<Keys extends ShapeKey, ValueType>(
	keys: Keys[],
	value: ValueType
): StateMap<Keys, ValueType> {
	const map: StateMap<Keys, ValueType> = {} as StateMap<Keys, ValueType>;

	forEach<Keys>(keys, (key) => {
		map[key] = value as StateMap<Keys, ValueType>[Keys];
	});

	return map;
}
