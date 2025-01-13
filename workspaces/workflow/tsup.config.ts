import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/core/index.ts"],
  clean: true,
  format: ["cjs", "esm", "iife"],
  globalName: "prodio",
  minify: true,
  dts: true,
});
