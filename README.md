# Astro Asciinema

[![npm version](https://npmx.dev/api/registry/badge/version/astro-asciinema?color=bfdbfe&labelColor=404040)](https://npmx.dev/package/astro-asciinema)
[![monthly downloads](https://npmx.dev/api/registry/badge/downloads/astro-asciinema?color=fed7aa&labelColor=404040)](https://npmx.dev/package/astro-asciinema)
[![license](https://npmx.dev/api/registry/badge/license/astro-asciinema?color=bbf7d0&labelColor=404040)](https://npmx.dev/package/astro-asciinema)

Astro integration and component for embedding terminal recordings with
[asciinema player](https://docs.asciinema.org/manual/player/).

The component loads the player's base styles, mounts it in the browser, and
disposes of it when the component leaves the document.

## Documentation

Read the [documentation](https://astro-asciinema.hedger.ch).

## Install

```sh
npm i astro-asciinema
```

## Usage

Import the default integration in `astro.config.ts`:

```ts
import { defineConfig } from "astro/config";
import asciinema from "astro-asciinema";

export default defineConfig({
	integrations: [asciinema()],
});
```

Then import the named `Asciinema` component from the same package root in an
Astro or MDX file and pass it a recording:

```astro
---
import { Asciinema } from "astro-asciinema";
import Demo from "./demo.cast";
---

<Asciinema src={Demo} />
```

## License

This project is licensed under the [MIT License](./LICENSE).

Copyright (c) 2026 Nicolas Hedger.
