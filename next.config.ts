import type { NextConfig } from "next";

/** Defines framework settings without coupling routes to deployment infrastructure. */
const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  output: "standalone",
  reactStrictMode: true,
};

export default nextConfig;
