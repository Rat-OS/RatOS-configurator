/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  distDir: 'build',
  cleanDistDir: true,
  basePath: '/configure',
  publicRuntimeConfig: {
    // Will be available on both server and client
    basePath: '/configure',
  },
  webpack: (config) => {
    const CopyPlugin = require("copy-webpack-plugin");
    config.plugins.push(new CopyPlugin({
      patterns: [
        {from: 'scripts', to: 'scripts'}
      ]
    }))
    return config;
  }
}
