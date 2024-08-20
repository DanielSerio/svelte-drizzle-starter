import type { Shape } from '../record-shape';

export type UserLoginKeys = 'email' | 'password';
export type UserRegisterKeys = UserLoginKeys | 'confirmPassword';
export type ChangePasswordKeys = Exclude<UserRegisterKeys, 'email'>;

export type UserLogin = Shape<UserLoginKeys> & {
	[k: string]: string;
	email: string;
	password: string;
};
export type UserRegister = Shape<UserRegisterKeys> & {
	[k: string]: string;
	email: string;
	password: string;
	confirmPassword: string;
};
export type ChangePassword = Shape<ChangePasswordKeys> & {
	[k: string]: string;
	password: string;
	confirmPassword: string;
};
