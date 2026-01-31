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
	headers: async () => {
		return [
			{
				source: '/(.*)',
				headers: [
					{
						key: 'Cross-Origin-Opener-Policy',
						value: 'same-origin',
					},
					{
						key: 'Cross-Origin-Embedder-Policy',
						value: 'require-corp',
					},
				],
			}
		]
	},
	experimental: {
		instrumentationHook: true,
		typedRoutes: true,
	},
	productionBrowserSourceMaps: true,
});
