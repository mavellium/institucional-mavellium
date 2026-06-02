export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { cacheExists, refreshJanusCache } = await import("./lib/janus-cache");
    if (!cacheExists()) {
      console.log("[instrumentation] Cache not found — seeding from Janus...");
      await refreshJanusCache();
    }
  }
}
