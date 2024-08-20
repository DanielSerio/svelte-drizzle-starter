import { createSlug } from '../../lib/common/slug';
import type { PasswordResetRequestKeys } from '../../lib/common/types';
import { bigint, char, mysqlTable, timestamp } from 'drizzle-orm/mysql-core';
import { UserTable } from './User';
import { relations } from 'drizzle-orm';

export const PasswordResetRequestTable = mysqlTable('password_reset_requests', {
	userId: bigint('user_id', { mode: 'number' }).notNull().unique(),
	slug: char('reset_slug', { length: 32 })
		.$defaultFn(() => createSlug())
		.primaryKey(),
	expiresAt: timestamp('expires_at').notNull()
} satisfies Record<PasswordResetRequestKeys, any>);

export const PasswordResetRequestRelations = relations(PasswordResetRequestTable, ({ one }) => ({
	User: one(UserTable, {
		relationName: 'user_confirm',
		fields: [PasswordResetRequestTable.userId],
		references: [UserTable.userId]
	})
}));
