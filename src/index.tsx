import { serve } from "bun";
import index from "./index.html";
import { createClient } from "@libsql/client";

export const turso = createClient({
  url: Bun.env.TURSO_DATABASE_URL,
  authToken: Bun.env.TURSO_AUTH_TOKEN,
});

const server = serve({
  routes: {
    // Serve index.html for all unmatched routes.
    "/*": index,

    "/api/hello": {
      async GET(req) {
        return Response.json({
          message: "Hello, world!",
          method: "GET",
        });
      },
      async PUT(req) {
        return Response.json({
          message: "Hello, world!",
          method: "PUT",
        });
      },
    },

    "/api/hello/:name": async req => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },

    "/api/guestbook": async () => {
        const query = "SELECT * FROM guestbook;"
        const results = await turso.execute(query);
        return Response.json(results.rows)
    },

  },

  development: process.env.NODE_ENV !== "production" && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
