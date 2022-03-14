/** @type {import('next').NextConfig} */
// const { withSentryConfig } = require('@sentry/nextjs')
// if (!options.isServer) {
//   config.resolve.alias['@sentry/node'] = '@sentry/browser'
// }
// const nextConfig = {
//   reactStrictMode: true,
// }

module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['daturians.mypinata.cloud'],
  },
}
