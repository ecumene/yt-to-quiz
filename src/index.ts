import { Server } from "bun";
import serveStatic from "serve-static-bun";

const getResponse = async (server: Server, req: Request) => {
  const url = new URL(req.url);

  if (url.pathname === "/api/timedtext") {
    const params = url.searchParams;

    const response = await fetch(
      `https://www.youtube.com/api/timedtext?${params.toString()}`
    );
    const text = await response.text();
    const jsonData = JSON.parse(text);
    let accumulatedText = "";

    if (jsonData.events) {
      jsonData.events.forEach((event) => {
        if (event.segs) {
          event.segs.forEach((seg) => {
            if (seg.utf8) {
              accumulatedText += seg.utf8;
            }
          });
        }
      });
    }

    console.log(accumulatedText);

    return new Response(text);
  }

  return serveStatic("public")(req);
};

Bun.serve({
  async fetch(req) {
    const response = await getResponse(this, req);

    if (process.env.NODE_ENV === "development") {
      response.headers.set(
        "Access-Control-Allow-Origin",
        "https://www.youtube.com"
      );
      response.headers.set("Access-Control-Allow-Credentials", "true");
      response.headers.set(
        "Access-Control-Allow-Headers",
        "x-youtube-device,x-youtube-page-label,x-youtube-page-cl,x-youtube-utc-offset,x-goog-authuser,x-youtube-time-zone,x-youtube-client-name,x-youtube-client-version,x-youtube-identity-token,x-goog-visitor-id,x-youtube-ad-signals"
      );
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
      );
      return response;
    }

    return response;
  },
  port: 3000,
});

console.log("Running server.");
