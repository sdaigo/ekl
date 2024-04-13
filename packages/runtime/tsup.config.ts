import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/ekl.ts"],
  clean: true,
  dts: true,
  format: ["esm", "cjs"],
});
