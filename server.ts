import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import cors from "cors";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  app.use(cors());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "SiraFoncier API is running" });
  });

  // Blockchain interaction endpoints (Prototypes)
  app.post("/api/land/register", (req, res) => {
    // Logic for registering land on blockchain will go here
    res.status(201).json({ message: "Registration initiated" });
  });

  app.get("/api/land/:id", (req, res) => {
    // Logic for verifying land ownership will go here
    res.json({ id: req.params.id, status: "verified" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
