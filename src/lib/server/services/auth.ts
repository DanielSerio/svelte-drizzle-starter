import type { ChangePassword, UserLogin, UserPayload, UserRegister } from '$lib/common/types';
import bc from 'bcryptjs';
import { DB } from '../../../db';
import { AccountConfirmationTable, ExpiredTokenTable, UserTable } from '../../../db/schema';
import { eq } from 'drizzle-orm';
import jwt, { type Algorithm } from 'jsonwebtoken';
import { env } from '$env/dynamic/private';

const { sign } = jwt;
const { compareSync, hashSync } = bc;

export function getAuthService() {
	async function register(body: UserRegister) {
		try {
			const { email, password } = body;
			const hashed = await hashSync(password);

			const [result] = await DB.insert(UserTable).values({
				email,
				accountPass: hashed
			});
			const userId = result.insertId;

			const confirmationExpires = new Date();
			confirmationExpires.setMinutes(confirmationExpires.getMinutes() + 15);

			await DB.insert(AccountConfirmationTable).values({
				userId,
				expiresAt: confirmationExpires
			});

			return { status: 200 };
		} catch (e) {
			return {
				status: 500,
				message: (e as Error).message
			};
		}
	}
	async function login(body: UserLogin) {
		try {
			const foundUser = await DB.query.UserTable.findFirst({
				where: eq(UserTable.email, body.email)
			});

			if (!foundUser) {
				const err = new Error(`Invalid credentials`) as any;
				err.status = 401;
				throw err;
			}

			const isValidPassword = await compareSync(body.password, foundUser.accountPass);

			if (!isValidPassword) {
				const err = new Error(`Invalid credentials`) as any;
				err.status = 401;
				throw err;
			}

			const { userId, email, createdAt, updatedAt } = foundUser;

			const payload: UserPayload = {
				sub: userId,
				cdt: createdAt,
				udt: updatedAt,
				eml: email
			};

			const token = await sign(payload, env.SECRET_JWT_SECRET, {
				expiresIn: env.SECRET_JWT_EXPIRES,
				algorithm: env.SECRET_JWT_ALG as unknown as Algorithm
			});

			return {
				status: 200,
				token
			};
		} catch (e) {
			return {
				status: (e as any).status ?? 500,
				message: (e as Error).message
			};
		}
	}

	async function logout(token: string) {
		await DB.insert(ExpiredTokenTable).values({
			expiredAt: new Date(),
			token
		});
	}

	async function changePassword(userId: number, body: ChangePassword) {
		try {
			const hashed = await hashSync(body.password);

			await DB.update(UserTable)
				.set({
					accountPass: hashed
				})
				.where(eq(UserTable.userId, userId));
		} catch (e) {
			return {
				status: (e as any).status ?? 500,
				message: (e as Error).message
			};
		}
	}

	async function confirmAccount(userId: number) {
		try {
			await DB.update(AccountConfirmationTable)
				.set({
					isConfirmed: true
				})
				.where(eq(AccountConfirmationTable.userId, userId));
		} catch (e) {
			return {
				status: (e as any).status ?? 500,
				message: (e as Error).message
			};
		}
	}

	async function confirmAccountBySlug(slug: string) {
		try {
			await DB.update(AccountConfirmationTable)
				.set({
					isConfirmed: true
				})
				.where(eq(AccountConfirmationTable.slug, slug));

			return {
				status: 200
			};
		} catch (e) {
			return {
				status: (e as any).status ?? 500,
				message: (e as Error).message
			};
		}
	}

	async function tokenIsExpired(token: string) {
		const result = await DB.query.ExpiredTokenTable.findFirst({
			where: eq(ExpiredTokenTable.token, token)
		});

		if (result) return true;
		return false;
	}

	return {
		register,
		login,
		logout,
		changePassword,
		confirmAccount,
		confirmAccountBySlug,
		tokenIsExpired
	};
}
