import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";

import Asciinema from "../src/Asciinema.astro";

describe("Asciinema", () => {
	it("renders an asciinema player element", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Asciinema, {
			props: {
				src: "/demo.cast",
				class: "terminal-demo",
				options: { autoPlay: true, speed: 2 },
			},
		});

		expect(html).toContain("<astro-asciinema");
		expect(html).toContain('class="terminal-demo"');
		expect(html).toContain('data-src="/demo.cast"');
		expect(html).toContain('data-theme-source="&quot;media&quot;"');
		expect(html).toContain(
			'data-options="{&quot;autoPlay&quot;:true,&quot;speed&quot;:2}"',
		);
		expect(html).toContain('href="/demo.cast"');
	});

	it("serializes a custom class theme source", async () => {
		const container = await AstroContainer.create();
		const html = await container.renderToString(Asciinema, {
			props: {
				src: "/demo.cast",
				"theme-source": { class: "night" },
			},
		});

		expect(html).toContain(
			'data-theme-source="{&quot;class&quot;:&quot;night&quot;}"',
		);
	});
});
