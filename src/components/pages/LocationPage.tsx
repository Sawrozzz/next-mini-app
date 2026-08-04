import { useState } from "react";
import { useT } from "../../hooks/useT";
import { usePlatformSDK } from "../../hooks/usePlatformSDK";
import { permissionErrorMessage } from "../../utils/permission";
import { ResultPanel } from "./ResultPanel";
import type { FeaturePageProps } from "./feature";

const SAMPLE = `{
  "latitude": 6.9271,
  "longitude": 79.8612,
  "accuracy": 15.5,
  "timestamp": 2026-02-05
}`;

/**
 * OpenStreetMap's embed endpoint renders a marked map from a bounding box —
 * no API key and no map library, which keeps the mini app bundle untouched.
 * `delta` is roughly a street-level window around the point.
 */
function osmEmbedUrl(latitude: number, longitude: number, delta = 0.004) {
  const bbox = [
    longitude - delta,
    latitude - delta,
    longitude + delta,
    latitude + delta,
  ].join(",");
  return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`;
}

function osmLinkUrl(latitude: number, longitude: number) {
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=16/${latitude}/${longitude}`;
}

export function LocationPage({ isDark }: FeaturePageProps) {
  const { t } = useT();
  const { sdk } = usePlatformSDK();

  const [location, setLocation] = useState<SdkDeviceLocationResult | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleViewSdkLocation = async () => {
    if (!sdk) return;
    setLoading(true);
    setError(null);
    setLocation(null);
    try {
      const res = await sdk.device.location({
        reason: "To view your current location",
      });
      const denial = permissionErrorMessage(res.status, "Location");
      if (denial) {
        setError(denial);
        return;
      }
      setLocation(res.data ?? null);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to get location via SDK.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="space-y-4 text-center">
          <div
            className={`mx-auto flex h-24 w-24 items-center justify-center rounded-3xl ${
              isDark ? "bg-blue-900/30" : "bg-blue-100"
            }`}
          >
            <span className="text-6xl">📍</span>
          </div>
          <div>
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("feature.location.title")}
            </h1>
            <p
              className={`mt-2 text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("feature.location.desc")}
            </p>
          </div>
        </div>

        <div
          className={`rounded-3xl p-8 ${
            isDark
              ? "bg-gray-900 border border-gray-800"
              : "bg-white border border-gray-100"
          }`}
        >
          <div className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div
                className={`rounded-2xl p-6 ${
                  isDark ? "bg-gray-800/50" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isDark ? "bg-blue-900/30" : "bg-blue-100"
                    }`}
                  >
                    <span className="text-2xl">🎯</span>
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Current Location
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Get precise GPS coordinates
                    </p>
                  </div>
                </div>
              </div>
              <div
                className={`rounded-2xl p-6 ${
                  isDark ? "bg-gray-800/50" : "bg-gray-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isDark ? "bg-green-900/30" : "bg-green-100"
                    }`}
                  >
                    <span className="text-2xl">🗺️</span>
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      Reverse Geocoding
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Convert coords to address
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl p-6 ${
                isDark ? "bg-blue-900/20" : "bg-blue-50"
              } border ${isDark ? "border-blue-900/30" : "border-blue-100"}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    isDark ? "bg-blue-900/30" : "bg-blue-100"
                  }`}
                >
                  <span className="text-3xl">ℹ️</span>
                </div>
                <div className="flex-1">
                  <h4
                    className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                  >
                    How it works
                  </h4>
                  <p
                    className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                  >
                    This feature calls <code>sdk.device.location()</code>, which
                    asks the host app for a high-accuracy fix and returns
                    latitude, longitude, accuracy and a timestamp.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleViewSdkLocation}
                disabled={loading}
                className={`w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                  isDark
                    ? "shadow-lg shadow-blue-600/30"
                    : "shadow-lg shadow-blue-600/25"
                }`}
              >
                {loading ? t("common.loading") : t("feature.location.action")}
              </button>
            </div>
          </div>
        </div>

        <ResultPanel
          isDark={isDark}
          error={error}
          result={location}
          sample={SAMPLE}
        >
          {location ? (
            <div className="space-y-4">
              <div
                className={`overflow-hidden rounded-2xl border ${
                  isDark ? "border-gray-800" : "border-gray-200"
                }`}
              >
                <iframe
                  key={`${location.latitude},${location.longitude}`}
                  title="Map of the reported location"
                  src={osmEmbedUrl(location.latitude, location.longitude)}
                  loading="lazy"
                  className="h-72 w-full border-0"
                />
                <div
                  className={`flex items-center justify-between gap-3 px-4 py-3 ${
                    isDark ? "bg-gray-800/50" : "bg-gray-50"
                  }`}
                >
                  <span className="truncate text-xs text-gray-500">
                    Latitude: {location.latitude.toFixed(5)},{" "}
                    Longitude: {location.longitude.toFixed(5)}
                  </span>
                  {/* <a
                    href={osmLinkUrl(location.latitude, location.longitude)}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-sm font-medium text-blue-600 hover:underline"
                  >
                    {t("common.viewLargerMap")}
                  </a> */}
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Latitude", value: location.latitude },
                  { label: "Longitude", value: location.longitude },
                  { label: "Accuracy", value: location.accuracy ?? "—" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className={`rounded-2xl p-4 ${
                      isDark ? "bg-gray-800/50" : "bg-gray-50"
                    }`}
                  >
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                      {item.label}
                    </p>
                    <p
                      className={`mt-1 font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {String(item.value)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </ResultPanel>

        <div
          className={`rounded-3xl p-8 text-center ${
            isDark
              ? "bg-gray-900 border border-gray-800"
              : "bg-white border border-gray-100"
          }`}
        >
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
              isDark ? "bg-purple-900/30" : "bg-purple-100"
            }`}
          >
            <span className="text-4xl">⚡</span>
          </div>
          <h3
            className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Ready to test?
          </h3>
          <p
            className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
          >
            Tap the button above to fetch your current location using the
            platform SDK.
          </p>
        </div>
      </div>
    </div>
  );
}
