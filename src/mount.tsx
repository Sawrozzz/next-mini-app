import { createRoot, type Root } from "react-dom/client";
import AppContent from "./app-content";
import type { Runtime, AppInstance } from "./types/runtime";
import "./styles.css";

export function mount(container: HTMLElement, runtime: Runtime): AppInstance {
  const root: Root = createRoot(container);
  root.render(<AppContent runtime={runtime} />);

  return {
    unmount() {
      root.unmount();
    },
  };
}
