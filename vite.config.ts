import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig, loadEnv } from "vite";
import { sentryVitePlugin } from "@sentry/vite-plugin";

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    build: {
      sourcemap: true,
    },
    plugins: [
      sveltekit(),
      sentryVitePlugin({
        org: "cubr",
        project: "app",
        include: "./svelte-kit",
        authToken: env.VITE_SENTRY_AUTH_TOKEN,
      }),
    ],
    server: {
      fs: {
        allow: [".."],
      },
    },
  };
});
