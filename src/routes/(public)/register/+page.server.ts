import { CommonValidators } from '$lib/common/validation';
import { getAuthService } from '$lib/server/services/auth';
import type { Actions } from '@sveltejs/kit';

const { register } = getAuthService();

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const form = await request.formData();
			const email = form.get('email');
			const password = form.get('password');
			const confirmPassword = form.get('confirmPassword');

			if (!email || !password || !confirmPassword) {
				throw new Error('Incomplete data');
			}

			const parsed = await CommonValidators.UserRegister.parse({
				email,
				password,
				confirmPassword
			});

			const registerResult = await register(parsed);

			if (registerResult.status === 200) {
				return {
					success: true
				};
			}
			return {
				success: false,
				message: registerResult.message
			};
		} catch (e) {
			return {
				success: false,
				message: (e as Error).message
			};
		}
	}
};
