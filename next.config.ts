import type { NextConfig } from "next";
import { ModuleFederationPlugin } from "@module-federation/enhanced";
import mfConfig from "./module-federation.config";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config: any, { isServer }: { isServer: boolean }) {
    config.plugins.push(new ModuleFederationPlugin(mfConfig))
    
    // Fix for remoteEntry chunk not found
    config.output.publicPath = 'auto'
    
    return config
  }
};

export default nextConfig;