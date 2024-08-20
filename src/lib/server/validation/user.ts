import type {
	ChangePasswordKeys,
	ShapeValidator,
	UserOwnedKeys,
	UserOwnedShape
} from '$lib/common/types';
import { z } from 'zod';

export const USER_ID_VALIDATOR = z.number().int().positive();

export const ChangePasswordValidator: ShapeValidator<
	UserOwnedKeys<ChangePasswordKeys>,
	UserOwnedShape<ChangePasswordKeys>
> = z
	.object({
		userId: USER_ID_VALIDATOR,
		password: z.string().min(6),
		confirmPassword: z.string()
	} satisfies Record<UserOwnedKeys<ChangePasswordKeys>, any>)
	.superRefine((record, ctx) => {
		if (record.confirmPassword !== record.password) {
			ctx.addIssue({
				code: 'custom',
				path: ['confirmPassword'],
				message: 'Passwords do not match'
			});
		}
	});
