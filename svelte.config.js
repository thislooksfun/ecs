import preprocess from "svelte-preprocess";
import node from "@sveltejs/adapter-node";
import path from "path";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: node(),
    vite: {
      resolve: {
        alias: {
          $components: path.resolve(process.cwd(), "src/components"),
        },
      },
    },
  },
};

export default config;
