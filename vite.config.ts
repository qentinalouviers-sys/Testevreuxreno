import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Relative base so the built SPA works both at a domain root (Vercel/Netlify)
// and under a GitHub Pages project subpath (https://<owner>.github.io/<repo>/).
export default defineConfig({
  base: "./",
  plugins: [react()],
});
