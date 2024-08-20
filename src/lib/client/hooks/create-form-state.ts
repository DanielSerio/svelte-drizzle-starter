import type { Shape, ShapeKey } from '$lib/common/types';
import { derived, writable } from 'svelte/store';
import type { FormState, FormStateParams, StateMap } from '../types';
import { createErrorState, createStateMap } from '$lib/common/state';
import { forEach } from '$lib/common/array';

function getVisibleErrors<Keys extends ShapeKey>(
	errors: StateMap<Keys, string | null>,
	touched: StateMap<Keys, boolean>
) {
	const visibleErrors = createStateMap<Keys, string | null>(Object.keys(errors) as Keys[], null);
	forEach(Object.entries(touched), ([name, value]) => {
		if (value && errors[name]) {
			(visibleErrors as { [k: string]: any })[name] = errors[name];
		}
	});

	return visibleErrors;
}

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
			errors: getVisibleErrors(errors, tched)
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
