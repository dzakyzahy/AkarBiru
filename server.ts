/**
 * AkarBiru — Express Dev Server
 * Evolved from GeoSeeker server
 */

import express from "express";
import { createServer } from "http";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const PORT = 3000;

  // API routes
  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", app: "AkarBiru", version: "1.0.0" });
  });

  app.get("/api/coastal-vulnerability", (_req, res) => {
    // Placeholder — data is served from client-side simulation
    res.json({
      success: true,
      message: "Data served from client-side simulation layer",
      redirectTo: "Use import { getCoastalVulnerabilityData } from '@/lib/simulation/coastal-sim'",
    });
  });

  app.get("/api/energy-optimizer", (_req, res) => {
    // Placeholder — data is served from client-side simulation
    res.json({
      success: true,
      message: "Data served from client-side simulation layer",
      redirectTo: "Use import { getEnergyOptimizerData } from '@/lib/simulation/energy-sim'",
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production static serving
    app.use(express.static(path.join(__dirname, "dist")));
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`🌊 AkarBiru server running on http://localhost:${PORT}`);
  });
}

startServer();
