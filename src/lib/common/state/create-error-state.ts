import type { StateMap } from '$lib/client/types';
import type { SafeParseReturnType } from 'zod';
import type { Shape } from '../types';

export function createErrorState<RecordType extends Shape<Keys>, Keys extends string>(
	errors: StateMap<Keys, string | null>,
	result: SafeParseReturnType<RecordType, RecordType>
): StateMap<Keys, string | null> {
	const newErrors = { ...errors };

	for (const iss of result.error!.issues) {
		const key = iss.path[0] as Keys;
		newErrors[key] = iss.message as StateMap<Keys, string | null>[Keys];
	}

	return newErrors;
}
