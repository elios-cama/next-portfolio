import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xhbcnrqoulxkmmjvbddh.supabase.co',
      },
    ],
  },
  // Add support for video files in webpack mode
  webpack(config) {
    config.module.rules.push({
      test: /\.(mov|mp4)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/videos/',
          outputPath: 'static/videos/',
          name: '[name].[hash].[ext]',
        },
      },
    });

    return config;
  },
  // Add Turbopack configuration (non-deprecated approach)
  turbopack: {
    rules: {
      // Configure video file handling for Turbopack
      '*.mov': ['file'],
      '*.mp4': ['file']
    }
  }
};

export default nextConfig;
