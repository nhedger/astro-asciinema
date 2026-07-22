import { describe, expect, it, vi } from "vitest";

import asciinema from "../src/integration";

describe("asciinema", () => {
	it("registers .cast files as Vite assets", () => {
		const updateConfig = vi.fn();
		const hook = asciinema().hooks["astro:config:setup"];

		if (!hook) {
			throw new Error("Missing astro:config:setup hook");
		}

		hook({ updateConfig } as never);

		expect(updateConfig).toHaveBeenCalledOnce();
		expect(updateConfig).toHaveBeenCalledWith({
			vite: {
				assetsInclude: ["**/*.cast"],
			},
		});
	});

	it("adds TypeScript support for .cast imports", () => {
		const injectTypes = vi.fn();
		const hook = asciinema().hooks["astro:config:done"];

		if (!hook) {
			throw new Error("Missing astro:config:done hook");
		}

		hook({ injectTypes } as never);

		expect(injectTypes).toHaveBeenCalledOnce();
		expect(injectTypes).toHaveBeenCalledWith({
			filename: "cast.d.ts",
			content: expect.stringContaining('declare module "*.cast"'),
		});
	});
});
