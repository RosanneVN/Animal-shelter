// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";

import tailwind from "@astrojs/tailwind";

import db from "@astrojs/db";
//import vercel from "@astrojs/vercel";
//import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), db()],
  output: "server",

  //adapter: cloudflare(),
  vite: {
    ssr: {
      noExternal: ["@uiw/react-md-editor", "@uiw/react-markdown-preview"],
    },
  },

  //adapter: vercel(),
});