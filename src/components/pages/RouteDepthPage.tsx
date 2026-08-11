import { useLocation, useNavigate } from "react-router";
import { useT } from "../../hooks/useT";

/**
 * One level deeper than /location — pushing here gives the host a route to pop,
 * so the device back button should land back on the Location page instead of
 * closing the mini app.
 */
export function RouteDepthPage({ isDark }: { isDark: boolean }) {
  const { t } = useT();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="mx-auto max-w-4xl space-y-8">
        <button
          onClick={() => navigate(-1)}
          className={`flex items-center cursor-pointer gap-2 text-sm font-medium transition ${
            isDark
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          ← {t("common.back")}
        </button>

        <div className="space-y-4 text-center">
          <div
            className={`mx-auto flex h-24 w-24 items-center justify-center rounded-3xl ${
              isDark ? "bg-purple-900/30" : "bg-purple-100"
            }`}
          >
            <span className="text-6xl">🧭</span>
          </div>
          <div>
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              Route Depth Test
            </h1>
            <p
              className={`mt-2 text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              You are one route deeper than the Location page.
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
          <p className="text-xs uppercase tracking-wide text-gray-500">
            Current route
          </p>
          <p
            className={`mt-1 font-mono text-sm break-all ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {location.pathname}
          </p>

          <p
            className={`mt-6 text-sm ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Press the device back button — the host asks this app first, one
            route is popped and you return to the Location page. Press it again
            there and the mini app closes.
          </p>
        </div>
      </div>
    </div>
  );
}
