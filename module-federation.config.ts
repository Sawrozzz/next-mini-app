import { createModuleFederationConfig } from "@module-federation/enhanced"

export default createModuleFederationConfig({
  name: "payment",

  exposes: {
    "./App": "./pages/index.tsx",
  },
  filename: "remoteEntry.js",

  manifest: true,
  shared: {
    react: {
      singleton: true,
      eager:true
    },
    "react-dom": {
      singleton: true,
      eager:true
    },
  },
  
});