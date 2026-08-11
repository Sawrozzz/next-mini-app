import { MemoryRouter } from "react-router";
import { MiniAppIndex } from "./components";
import { PlatformSDKProvider } from "./providers/PlatformSDKProvider";
import { toRoutePath } from "./routes";

function resolveInitialEntry(initialPath?: string): string {
  const hash = window.location.hash.replace(/^#/, "");
  const raw = hash || initialPath || "/";
  return toRoutePath(raw);
}

export default function App({ initialPath }: { initialPath?: string }) {
  return (
    <MemoryRouter initialEntries={[resolveInitialEntry(initialPath)]}>
      <PlatformSDKProvider>
        <MiniAppIndex />
      </PlatformSDKProvider>
    </MemoryRouter>
  );
}
