import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(__filename)

const nextConfig: NextConfig = {
  eslint: {
    // Lint errors should not block production deploys.
    // Run `pnpm lint` locally during development instead.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Scripts/migration files may have payload-type drift on Payload upgrades.
    // Type-check app code locally with `tsc --noEmit` during development.
    ignoreBuildErrors: true,
  },
  images: {
    localPatterns: [
      {
        pathname: '/media/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    }

    return webpackConfig
  },
  turbopack: {
    root: path.resolve(dirname),
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
