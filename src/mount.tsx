import { createRoot, type Root } from "react-dom/client";
import App from "./App";
import "./styles.css";

export function mount(
  container: HTMLElement,
  runtime?: { initialPath?: string },
) {
  const root: Root = createRoot(container);
  root.render(<App initialPath={runtime?.initialPath} />);

  return {
    unmount() {
      root.unmount();
    },
  };
}
