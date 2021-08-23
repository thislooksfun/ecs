import preprocess from "svelte-preprocess";
import node from "@sveltejs/adapter-node";
import path from "path";

const srcDir = path.resolve(process.cwd(), "src");

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: preprocess(),

  kit: {
    adapter: node(),
    vite: {
      resolve: {
        alias: {
          $api: path.resolve(srcDir, "routes/api"),
          $theme: path.resolve(srcDir, "theme"),
          $components: path.resolve(srcDir, "components"),
          $types: path.resolve(srcDir, "types"),
        },
      },
    },
  },
};

export default config;
