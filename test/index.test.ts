import { describe, expect, it } from "vitest";
import * as packageExports from "../src/index";
import integration, { Asciinema } from "../src/index";

describe("package exports", () => {
	it("exports the integration and component", () => {
		expect(integration).toBeTypeOf("function");
		expect(Asciinema).toBeTypeOf("function");
		expect(Object.keys(packageExports)).toEqual(["Asciinema", "default"]);
	});
});
