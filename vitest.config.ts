import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: { environment: "node", coverage: { reporter: ["text", "json"] } },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      // Next.js gère "server-only" nativement au build (guard qui n'existe
      // pas comme vrai paquet npm) ; Vitest a besoin d'un stub pour résoudre
      // les fichiers infra qui l'importent.
      "server-only": path.resolve(__dirname, "tests/stubs/server-only.ts"),
    },
  },
});
