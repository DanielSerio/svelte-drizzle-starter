import { z } from 'zod';
import type {
	ShapeValidator,
	UserLogin,
	UserLoginKeys,
	UserRegister,
	UserRegisterKeys
} from '../types';

const EMAIL = z.string().min(5).max(64).email();
const PASSWORD = z.string().min(6);

export const UserRegisterValidator: ShapeValidator<UserRegisterKeys, UserRegister> = z
	.object({
		email: EMAIL,
		password: PASSWORD,
		confirmPassword: z.string()
	} satisfies Record<UserRegisterKeys, any>)
	.superRefine((record, ctx) => {
		if (record.confirmPassword !== record.password) {
			ctx.addIssue({
				code: 'custom',
				path: ['confirmPassword'],
				message: 'Passwords do not match'
			});
		}
	});

export const UserLoginValidator: ShapeValidator<UserLoginKeys, UserLogin> = z.object({
	email: EMAIL,
	password: PASSWORD
} satisfies Record<UserLoginKeys, any>);
