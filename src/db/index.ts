import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';
import { env } from '$env/dynamic/private';

const poolConnection = mysql.createPool({
	host: env.SECRET_DB_HOST,
	user: env.SECRET_DB_USER,
	database: env.SECRET_DB_NAME,
	password: env.SECRET_DB_PASS,
	port: +env.SECRET_DB_PORT
});

export const DB = drizzle(poolConnection, { schema, mode: 'default' });
