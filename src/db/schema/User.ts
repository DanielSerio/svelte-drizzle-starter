import type { UnsafeUserRecordKeys } from '../../lib/common/types';
import { relations } from 'drizzle-orm';
import { mysqlTable, serial, text, timestamp, varchar } from 'drizzle-orm/mysql-core';
import { AccountConfirmationTable } from './AccountConfirmation';

export const UserTable = mysqlTable('users', {
	userId: serial('user_id').primaryKey(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at').onUpdateNow(),
	email: varchar('email', { length: 64 }).unique().notNull(),
	accountPass: text('account_pass').notNull()
} satisfies Record<UnsafeUserRecordKeys, any>);

export const UserRelations = relations(UserTable, ({ one }) => ({
	Confirmation: one(AccountConfirmationTable, {
		relationName: 'user_confirm',
		fields: [UserTable.userId],
		references: [AccountConfirmationTable.userId]
	})
}));
