import type { Shape, ShapeKey, ShapeValidator } from '$lib/common/types';
import type { Readable, Writable } from 'svelte/store';

export type FormStateParams<Keys extends ShapeKey, RecordType extends Shape<Keys>> = {
	defaultValues: RecordType;
	validator: ShapeValidator<Keys, RecordType>;
};

export type StateMap<Keys extends ShapeKey, ValueType> = Record<Keys, ValueType> & {
	[k: string]: ValueType;
};

type FormStateState<Keys extends ShapeKey> = {
	isValid: boolean;
	errors: StateMap<Keys, string | null>;
	touched: StateMap<Keys, boolean>;
};

type FormStateMethods<Keys extends ShapeKey, RecordType extends Shape<Keys>> = {
	resetForm: (newValues?: RecordType) => void;
	changeValue: <Key extends Keys>(name: Key, value: RecordType[Key]) => void;
	getHandleBlur: <Key extends Keys>(name: Key) => (e: Event) => void;
};

export type FormState<Keys extends ShapeKey, RecordType extends Shape<Keys>> = {
	state: Readable<FormStateState<Keys>>;
	methods: FormStateMethods<Keys, RecordType>;
	values: Writable<RecordType>;
};
