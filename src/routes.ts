export type NavItem = {
  id: string;
  path: string;
  emoji: string;
};

export const navItems: NavItem[] = [
  { id: "location", path: "/location", emoji: "📍" },
  { id: "camera", path: "/camera", emoji: "📷" },
  { id: "gallery", path: "/gallery", emoji: "🖼️" },
  { id: "file", path: "/file", emoji: "📁" },
  { id: "download", path: "/download", emoji: "⬇️" },
  { id: "contact", path: "/contact", emoji: "👤" },
  { id: "biometric", path: "/biometric", emoji: "🔐" },
  { id: "appearance", path: "/appearance", emoji: "🎨" },
];

/** One level below /location, used to test a single step of history depth. */
export const ROUTE_DEPTH_PATH = "/location/depth";

/** Normalizes a runtime-supplied path ("camera", "/camera") to a route path. */
export function toRoutePath(path: string) {
  return path.startsWith("/") ? path : `/${path}`;
}
