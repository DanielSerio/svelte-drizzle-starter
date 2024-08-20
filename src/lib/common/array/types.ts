export type IteratorCursors = {
	[k: string]: number | undefined;
	steps: number;
	forward: number;
	backward: number;
	middle?: number;
};

export type IteratorCallback<ValueType, ReturnType> = (value: ValueType, i: number) => ReturnType;
