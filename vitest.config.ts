/// <reference types="vitest/config" />

import { getViteConfig } from "astro/config";

const config: Parameters<typeof getViteConfig>[0] & {
	test: { include: string[] };
} = {
	test: {
		include: ["test/**/*.test.ts"],
	},
};

export default getViteConfig(config);
