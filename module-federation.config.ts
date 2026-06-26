import { createModuleFederationConfig } from "@module-federation/enhanced";

export default createModuleFederationConfig({
  name: "payment",

  exposes: {
    "./App": "./pages/index.tsx",
  },
  filename: "static/chunks/remoteEntry.js",

  manifest: true,

  shared: {
    react: {
      singleton: true,
    },
    "react-dom": {
      singleton: true,
    },
  },
});