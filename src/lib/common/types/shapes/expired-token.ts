import type { Shape } from '../record-shape';

export type ExpiredTokenKeys = 'expiredAt' | 'token';

export type ExpiredToken = Shape<ExpiredTokenKeys> & {
	[k: string]: Date | string;
	expiredAt: Date;
	token: string;
};
