// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import db from "@astrojs/db";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), db()],
  output: "server",
  vite: {
    ssr: {
      noExternal: ["@uiw/react-md-editor", "@uiw/react-markdown-preview"]
    }
  }
});
