import type { Shape, StampedUserOwnedKeys } from '../record-shape';

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

export type UserRecordKeys = StampedUserOwnedKeys<'email'>;
export type UnsafeUserRecordKeys = UserRecordKeys | 'accountPass';
export type UnsafeUserRecord = Shape<UnsafeUserRecordKeys> & {
	userId: number;
	createdAt: Date;
	updatedAt: Date | null;
	email: string;
	accountPass: string;
};
export type UserRecord = Shape<UserRecordKeys> & {
	userId: number;
	createdAt: Date;
	updatedAt: Date | null;
	email: string;
};
