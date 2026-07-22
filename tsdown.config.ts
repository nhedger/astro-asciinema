import { defineConfig } from "tsdown";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		integration: "src/integration.ts",
	},
	format: ["esm"],
	dts: {
		sourcemap: true,
	},
	clean: true,
	copy: ["src/Asciinema.astro"],
	sourcemap: true,
	platform: "neutral",
	target: "es2022",
	deps: {
		neverBundle: [/\.astro$/],
		skipNodeModulesBundle: true,
		onlyImport: ["astro"],
	},
});
