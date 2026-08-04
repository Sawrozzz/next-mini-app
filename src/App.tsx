import { MiniAppIndex } from "./components";
import { PlatformSDKProvider } from "./providers/PlatformSDKProvider";

export default function App({ initialPath }: { initialPath?: string }) {
  return (
    <PlatformSDKProvider>
      <MiniAppIndex initialPath={initialPath} />
    </PlatformSDKProvider>
  );
}
