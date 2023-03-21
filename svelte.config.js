import adapter from "@sveltejs/adapter-auto";
import preprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  compilerOptions: {
    enableSourcemap: true,
  },
  preprocess: [
    preprocess({
      postcss: true,
      sourceMap: true,
    }),
  ],

  kit: {
    adapter: adapter(),
  },
};

export default config;
