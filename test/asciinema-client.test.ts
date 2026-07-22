/** @vitest-environment happy-dom */

import type { Player } from "asciinema-player";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const { create } = vi.hoisted(() => ({ create: vi.fn() }));

vi.mock("asciinema-player", () => ({ create }));

function createPlayer(currentTime = 0) {
	return {
		el: document.createElement("div"),
		dispose: vi.fn(),
		getCurrentTime: vi.fn(() => currentTime),
		getDuration: vi.fn(),
		play: vi.fn(),
		pause: vi.fn(),
		seek: vi.fn(),
		addEventListener: vi.fn(),
	} as unknown as Player;
}

beforeAll(async () => {
	// @ts-expect-error Astro exposes component scripts through this virtual module.
	await import("../src/Asciinema.astro?astro&type=script&index=0&lang.ts");
});

afterEach(() => {
	document.body.replaceChildren();
	document.documentElement.classList.remove("dark");
	vi.clearAllMocks();
});

describe("Asciinema client", () => {
	it("keeps a paused autoplay player paused after a theme change", async () => {
		const initialPlayer = createPlayer(12);
		const replacementPlayer = createPlayer();
		create
			.mockReturnValueOnce(initialPlayer)
			.mockReturnValueOnce(replacementPlayer);

		const element = document.createElement("astro-asciinema");
		element.dataset.src = "/demo.cast";
		element.dataset.options = JSON.stringify({ autoPlay: true, speed: 2 });
		element.dataset.themeSource = JSON.stringify("class");
		const container = document.createElement("div");
		container.dataset.player = "";
		element.append(container);
		document.body.append(element);

		expect(create).toHaveBeenCalledOnce();

		document.documentElement.classList.add("dark");

		await vi.waitFor(() => expect(create).toHaveBeenCalledTimes(2));
		expect(create).toHaveBeenNthCalledWith(2, "/demo.cast", container, {
			autoPlay: false,
			autoplay: false,
			speed: 2,
		});
		expect(initialPlayer.dispose).toHaveBeenCalledOnce();
		expect(replacementPlayer.seek).toHaveBeenCalledWith(12);
		expect(replacementPlayer.play).not.toHaveBeenCalled();
	});
});
