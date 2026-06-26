import { createModuleFederationConfig } from "@module-federation/enhanced";

export default createModuleFederationConfig({
  name: "payment",

  exposes: {
    "./App": "./pages/index.tsx",
  },

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