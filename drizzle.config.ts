import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	schema: './src/db/schema',
	dialect: 'mysql',
	out: './src/db',
	dbCredentials: {
		//@ts-ignore
		url: process.env.SECRET_DB_URL
	}
});
