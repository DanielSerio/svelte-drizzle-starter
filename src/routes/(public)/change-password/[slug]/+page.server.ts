import { eq } from 'drizzle-orm';
import { DB } from '../../../../db/index.js';

import { error, type Actions } from '@sveltejs/kit';
import { getAuthService } from '$lib/server/services/auth.js';
import { PasswordResetRequestTable } from '../../../../db/schema/PasswordResetRequest.js';
import { ServerValidators } from '$lib/server/validation/index.js';

const { changePassword } = getAuthService();

export async function load({ url, params }) {
	try {
		const result = await DB.query.PasswordResetRequestTable.findFirst({
			where: eq(PasswordResetRequestTable.slug, params.slug)
		});

		if (!result) {
			const err = new Error(`Not found`) as any;
			err.status = 404;

			throw err;
		}

		return {
			success: true
		};
	} catch (e) {
		return error((e as any).status ?? 500, (e as any).message);
	}
}

export const actions: Actions = {
	default: async ({ request, params }) => {
		const result = await DB.query.PasswordResetRequestTable.findFirst({
			where: eq(PasswordResetRequestTable.slug, params.slug!)
		});
		const form = await request.formData();
		const password = form.get('password');
		const confirmPassword = form.get('confirmPassword');

		try {
			const parsed = ServerValidators.ChangePassword.parse({
				userId: result!.userId,
				password,
				confirmPassword
			});

			await changePassword(parsed.userId, {
				password: parsed.password,
				confirmPassword: parsed.confirmPassword
			});

			return {
				success: true
			};
		} catch (e) {
			return {
				success: false,
				message: (e as any).message
			};
		}
	}
};
