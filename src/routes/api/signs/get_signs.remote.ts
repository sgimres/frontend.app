import { query } from '$app/server';
import { db } from '$lib/server/db';

export const getSings = query(async () => {
	const signs = db.query.guestbook.findMany();
	return signs;
});
