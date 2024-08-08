import { Server } from "bun";
import serveStatic from "serve-static-bun";

const getResponse = async (server: Server, req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/api") {
    return new Response("Bun!");
  }

  return serveStatic("public")(req);
};

Bun.serve({
  async fetch(req) {
    const response = await getResponse(this, req);

    if (process.env.NODE_ENV === "development") {
      response.headers.set(
        "Access-Control-Allow-Origin",
        process.env.FRONTEND_HOST || "http://localhost:5173"
      );
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      return response;
    }

    return serveStatic("public")(req);
  },
  port: 3000,
});

console.log("Running server.");
