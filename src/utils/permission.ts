/**
 * Every `sdk.device.*` call resolves with a permission status instead of
 * throwing when the user blocks access. This maps a non-granted status to a
 * message; `granted` returns `null` so callers can treat it as "no error".
 */
export function permissionErrorMessage(
  status: SdkDevicePermissionStatus,
  feature: string,
): string | null {
  switch (status) {
    case "granted":
      return null;
    case "denied":
      return `${feature} permission denied.`;
    case "permanentlyDenied":
      return `Please enable ${feature.toLowerCase()} permission from device settings.`;
    case "restricted":
      return `${feature} access is restricted on this device.`;
    default:
      return `${feature} is unavailable on this device.`;
  }
}

export function formatBytes(bytes?: number): string {
  if (bytes === undefined || Number.isNaN(bytes)) return "—";
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes / 1024;
  let unit = 0;
  while (value >= 1024 && unit < units.length - 1) {
    value /= 1024;
    unit += 1;
  }
  return `${value.toFixed(1)} ${units[unit]}`;
}
