import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text, numeric } from 'drizzle-orm/sqlite-core';

export const task = sqliteTable('task', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text('title').notNull(),
	priority: integer('priority').notNull().default(1)
});

export const guestbook = sqliteTable('guestbook', {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
	description: text().notNull(),
	createdAt: numeric('created_at').default(sql`(CURRENT_TIMESTAMP)`)
});
