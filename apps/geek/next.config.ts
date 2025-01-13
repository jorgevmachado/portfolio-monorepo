import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  distDir: 'dist',
  webpack: (config) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
        },
      ],
    });
    return config;
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  reactStrictMode: true,
  experimental: {
    turbo: {
      resolveExtensions: [
        '.mdx',
        '.tsx',
        '.ts',
        '.jsx',
        '.js',
        '.mjs',
        '.json',
      ],
    },
  },
};

export default nextConfig;
