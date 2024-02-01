import "./src/env.mjs"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["knex"],
  },
}

export default nextConfig
