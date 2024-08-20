import type { Shape, UserOwnedKeys } from '../record-shape';

export type AccountConfirmationKeys = UserOwnedKeys<'expiresAt' | 'slug' | 'isConfirmed'>;
export type AccountConfirmation = Shape<AccountConfirmationKeys> & {
	[k: string]: string | Date | boolean;
	expiresAt: Date;
	slug: string;
	isConfirmed: boolean;
};
