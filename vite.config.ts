import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

export default defineConfig({
  plugins: [
    react(),
    {
      name: "qr-png-handler",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url && req.url.startsWith("/api/qr-png")) {
            const isBride = req.url.includes("6665558888");
            const file = isBride
              ? path.resolve(__dirname, "public/images/qr/boho_floral_green_bride.png")
              : path.resolve(__dirname, "public/images/qr/boho_floral_green_groom.png");
            if (fs.existsSync(file)) {
              res.setHeader("Content-Type", "image/png");
              res.end(fs.readFileSync(file));
              return;
            }
          }
          next();
        });
      },
    },
  ],
  server: {
    // profile Chrome của script chụp ảnh nằm trong repo; Chrome khóa file nên watcher sẽ crash (EBUSY).
    watch: { ignored: ["**/.chrome_profile/**"] },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
