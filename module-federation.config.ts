import { createModuleFederationConfig } from "@module-federation/enhanced";

export default createModuleFederationConfig({
  name: "payment-mini-app",
  filename: "remoteEntry.js",
  exposes: {
    "./App": "./pages/_app.tsx",
    "./index": "./pages/index.tsx",
  },
  shared: {
    react: { singleton: true, requiredVersion: false },
    "react-dom": { singleton: true, requiredVersion: false },
  },
  runtime: false,
  library: { type: "var", name: "payment_mini_app" },
});