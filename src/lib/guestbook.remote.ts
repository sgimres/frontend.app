import { query } from "$app/server";
import { env } from "$env/dynamic/private";
import { createClient } from "@libsql/client";

export interface GuestbookEntry {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

export const getEntries = query(async (): Promise<GuestbookEntry[]> => {
  if (!env.TURSO_DATABASE_URL) throw new Error("TURSO_DATABASE_URL is not set");

  try {
    const turso = createClient({
      url: env.TURSO_DATABASE_URL,
      authToken: env.TURSO_AUTH_TOKEN,
    });

    const res = await turso.execute(
      "SELECT id, name, description, created_at FROM guestbook ORDER BY created_at DESC",
    );

    return res.rows as unknown as GuestbookEntry[];
  } catch (err) {
    console.error("Guestbook query failed:", err);
    throw new Error(`Database query failed: ${(err as Error).message}`);
  }
});
