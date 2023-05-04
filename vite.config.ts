import { defineConfig, loadEnv } from "vite";
import { qwikVite } from "@builder.io/qwik/optimizer";
import { qwikCity } from "@builder.io/qwik-city/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }) => {
	process.env = {...process.env, ...loadEnv(mode, process.cwd())};
	return {
		define: {
			__APP_ENV__: process.env.VITE_PRISMA_DATA_PROXY,
		  },
		plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
		preview: {
			headers: {
				"Cache-Control": "public, max-age=600"
			}
		},
		resolve: {
			alias: {
			  ".prisma/client/edge": "./node_modules/.prisma/client/edge.js"
			}
		  }
	};
}
