import { useT } from "../../hooks/useT";
import type { FeaturePageProps } from "./feature";

export function LocationPage({ isDark }: FeaturePageProps) {
  const { t } = useT();

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
                    This feature uses the device&apos;s native Geolocation API
                    via the platform SDK. It requests high-accuracy position
                    data and returns latitude, longitude, accuracy etc.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => alert("Getting location...")}
                className={`w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] ${
                  isDark
                    ? "shadow-lg shadow-blue-600/30"
                    : "shadow-lg shadow-blue-600/25"
                }`}
              >
                {t("feature.location.action")}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`rounded-3xl p-8 ${
            isDark
              ? "bg-gray-900 border border-gray-800"
              : "bg-white border border-gray-100"
          }`}
        >
          <h2
            className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
          >
            Sample Response
          </h2>
          <pre
            className={`mt-4 rounded-xl p-4 overflow-x-auto text-sm ${
              isDark
                ? "bg-gray-950 border border-gray-800 text-gray-300"
                : "bg-gray-50 border border-gray-200 text-gray-700"
            }`}
          >
            {`{
  "latitude": 6.9271,
  "longitude": 79.8612,
  "accuracy": 15.5,
  "timestamp": 2026-02-05
}`}
          </pre>
        </div>

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
