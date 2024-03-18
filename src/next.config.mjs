/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
	return config;
}

import CopyPlugin from "copy-webpack-plugin";

export default defineNextConfig({
	reactStrictMode: true,
	distDir: 'build',
	cleanDistDir: true,
	basePath: '/configure',
	eslint: {
		dirs: ["pages", "app", "server", "recoil", "data", "helpers", "hooks", "moonraker", "__tests__", "cli", "components", "templates", "utils", "zods"],
	},
	publicRuntimeConfig: {
		// Will be available on both server and client
		basePath: '/configure',
	},
	experimental: {
		instrumentationHook: true,
		typedRoutes: true,
	},
	productionBrowserSourceMaps: true,
	webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
		// Note: we provide webpack above so you should not `require` it
		// Perform customizations to webpack config
		const destWasmFolder = "static/chunks/app/analysis";
		config.plugins.push(new CopyPlugin({
			patterns: [
				{ from: "node_modules/scichart/_wasm/scichart2d.data", to: destWasmFolder },
				{ from: "node_modules/scichart/_wasm/scichart2d.wasm", to: destWasmFolder },
				{ from: "node_modules/scichart/_wasm/scichart3d.data", to: destWasmFolder },
				{ from: "node_modules/scichart/_wasm/scichart3d.wasm", to: destWasmFolder },
			]
		}),)
	
		// Important: return the modified config
		return config
	}
});
