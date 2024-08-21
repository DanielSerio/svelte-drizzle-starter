import { CommonValidators } from '$lib/common/validation';
import { getAuthService } from '$lib/server/services/auth';
import type { Actions } from '@sveltejs/kit';

const { login } = getAuthService();

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		try {
			const form = await request.formData();
			const email = form.get('email');
			const password = form.get('password');

			if (!email || !password) {
				throw new Error('Incomplete data');
			}

			const parsed = await CommonValidators.UserLogin.parse({
				email,
				password
			});

			const loginResult = await login(parsed);

			if (loginResult.status === 200 && loginResult.token) {
				const expiry = new Date();
				expiry.setMonth(expiry.getMonth() + 1);

				cookies.set('AT', loginResult.token, {
					path: '/',
					secure: true,
					expires: expiry
				});

				return {
					success: true
				};
			}
			return {
				success: false,
				message: loginResult.message
			};
		} catch (e) {
			return {
				success: false,
				message: (e as Error).message
			};
		}
	}
};
