import { eq } from 'drizzle-orm';
import { DB } from '../../../../db/index.js';
import { AccountConfirmationTable } from '../../../../db/schema/AccountConfirmation.js';
import { error } from '@sveltejs/kit';
import { getAuthService } from '$lib/server/services/auth.js';

const { confirmAccountBySlug } = getAuthService();

export async function load({ url, params }) {
	try {
		const result = await DB.query.AccountConfirmationTable.findFirst({
			where: eq(AccountConfirmationTable.slug, params.slug)
		});

		if (!result) {
			const err = new Error(`Not found`) as any;
			err.status = 404;

			throw err;
		}

		const confirmResult = await confirmAccountBySlug(params.slug);

		if (confirmResult?.status === 200) {
			return {
				success: true
			};
		} else {
			const err = new Error(confirmResult?.message) as any;
			err.status = 500;
			throw err;
		}
	} catch (e) {
		return error((e as any).status ?? 500, (e as any).message);
	}
}
