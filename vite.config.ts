import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  fmt: {
    ignorePatterns: [
      "content/**",
      "public/**",
      "**/*.md",
      ".github/**",
      "pnpm-lock.yaml",
      "dist/**",
    ],
  },
  server: { port: 4173, strictPort: true },
  build: { target: "es2022" },
});
