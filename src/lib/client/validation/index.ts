import type { ShapeValidator } from '$lib/common/types';
import { ChangePasswordValidator } from './user';

export const ClientValidators = {
	ChangePassword: ChangePasswordValidator
} satisfies Record<string, ShapeValidator<string, any>>;
