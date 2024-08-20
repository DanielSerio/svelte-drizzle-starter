import type { Shape, UserOwnedKeys } from '../record-shape';

export type PasswordResetRequestKeys = UserOwnedKeys<'expiresAt' | 'slug'>;
export type PasswordResetRequest = Shape<PasswordResetRequestKeys> & {
	[k: string]: string | number | Date;
	userId: number;
	slug: string;
	expiresAt: Date;
};
