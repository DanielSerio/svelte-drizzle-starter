import type { ExpiredTokenKeys } from '../../lib/common/types';
import { mysqlTable, timestamp, varchar } from 'drizzle-orm/mysql-core';

export const ExpiredTokenTable = mysqlTable('expired_tokens', {
	token: varchar('token', { length: 715 }).primaryKey(),
	expiredAt: timestamp('expired_at').notNull()
} satisfies Record<ExpiredTokenKeys, any>);
