import type { NextConfig } from "next";
import { ModuleFederationPlugin } from "@module-federation/enhanced";
import mfConfig from "./module-federation.config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config: any, { isServer }) {
      config.plugins.push(new ModuleFederationPlugin(mfConfig));

    return config;
  },
};

export default nextConfig;
