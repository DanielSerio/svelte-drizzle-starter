import { env } from '$env/dynamic/private';
import type { UserPayload } from '$lib/common/types';
import { getAuthService } from '$lib/server/services/auth';
import { error } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
const { verify } = jwt;
const { tokenIsExpired } = getAuthService();

const PUBLIC = ['/login', '/register', '/confirm', '/change-password'];

export async function handle({ resolve, event }) {
	const savedToken = event.cookies.get('AT');

	if (savedToken) {
		const isExpired = await tokenIsExpired(savedToken);

		if (isExpired) {
			event.cookies.delete('AT', { path: '/' });

			throw error(401, 'Not Authorized');
		}

		const payload = await verify(savedToken, env.SECRET_JWT_SECRET);

		if (typeof payload === 'string') {
			throw error(403, payload);
		}

		event.locals.token = savedToken;
		event.locals.user = payload as unknown as UserPayload;

		return resolve(event);
	} else {
		if (event.url.pathname !== '/' && !PUBLIC.some((path) => event.url.pathname.startsWith(path))) {
			throw error(401, 'Not Authorized');
		}
		return resolve(event);
	}
}
