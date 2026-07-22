import type { AstroIntegration } from "astro";

const castTypes = `declare module "*.cast" {
	const src: string;
	export default src;
}`;

export default function asciinema(): AstroIntegration {
	return {
		name: "astro-asciinema",
		hooks: {
			"astro:config:setup": ({ updateConfig }) => {
				updateConfig({
					vite: {
						assetsInclude: ["**/*.cast"],
					},
				});
			},
			"astro:config:done": ({ injectTypes }) => {
				injectTypes({
					filename: "cast.d.ts",
					content: castTypes,
				});
			},
		},
	};
}
