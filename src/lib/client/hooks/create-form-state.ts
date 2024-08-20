import type { Shape, ShapeKey } from '$lib/common/types';
import { derived, writable } from 'svelte/store';
import type { FormState, FormStateParams } from '../types';
import { createErrorState, createStateMap } from '$lib/common/state';

export function createFormState<
	RecordType extends Shape<Keys>,
	Keys extends ShapeKey = keyof RecordType & string
>({ defaultValues, validator }: FormStateParams<Keys, RecordType>): FormState<Keys, RecordType> {
	const keys: Keys[] = Object.keys(defaultValues) as Keys[];
	const frozen = Object.freeze({ ...defaultValues });
	const values = writable({ ...defaultValues });

	const touched = writable(createStateMap<Keys, boolean>(keys, false));

	const getHandleBlur = (name: Keys) => (_: Event) =>
		touched.update((cur) => ({ ...cur, [name]: true }));
	const resetForm = (newValues?: RecordType) => {
		touched.set(createStateMap<Keys, boolean>(keys, false));
		values.set(newValues ?? frozen);
	};

	const changeValue = <Key extends Keys>(name: Key, value: RecordType[Key]) =>
		values.update((cur) => ({ ...cur, [name]: value }));

	const state = derived([values, touched], ([vals, tched]) => {
		let errors = createStateMap<Keys, string | null>(keys, null);
		const parseResult = validator.safeParse(vals);

		if (!parseResult.success) {
			errors = createErrorState<RecordType, Keys>(errors, parseResult);
		}

		return {
			touched: tched,
			isValid: Object.values(errors).filter((v) => v !== null).length === 0,
			errors
		};
	});

	return {
		state,
		values,
		methods: {
			getHandleBlur,
			resetForm,
			changeValue
		}
	};
}
