import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ibb.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;