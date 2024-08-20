import { createSlug } from '../../lib/common/slug';
import type { AccountConfirmationKeys } from '../../lib/common/types';
import { relations } from 'drizzle-orm';
import { bigint, boolean, char, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';
import { UserTable } from './User';

export const AccountConfirmationTable = mysqlTable('account_confirmations', {
	userId: bigint('user_id', { mode: 'number' }).notNull().unique(),
	expiresAt: timestamp('expires_at').notNull(),
	slug: char('confirm_slug', { length: 32 })
		.$defaultFn(() => createSlug())
		.primaryKey(),
	isConfirmed: boolean('is_confirmed').default(false)
} satisfies Record<AccountConfirmationKeys, any>);

export const AccountConfirmationRelations = relations(AccountConfirmationTable, ({ one }) => ({
	User: one(UserTable, {
		relationName: 'user_confirm',
		fields: [AccountConfirmationTable.userId],
		references: [UserTable.userId]
	})
}));
