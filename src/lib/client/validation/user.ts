import type { ChangePassword, ChangePasswordKeys, ShapeValidator } from '$lib/common/types';
import { z } from 'zod';

export const ChangePasswordValidator: ShapeValidator<ChangePasswordKeys, ChangePassword> = z
	.object({
		password: z.string().min(6),
		confirmPassword: z.string()
	} satisfies Record<ChangePasswordKeys, any>)
	.superRefine((record, ctx) => {
		if (record.confirmPassword !== record.password) {
			ctx.addIssue({
				code: 'custom',
				path: ['confirmPassword'],
				message: 'Passwords do not match'
			});
		}
	});
