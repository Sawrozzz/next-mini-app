import { useCallback, useMemo } from "react";
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from "react-router";
import { featurePages } from "./pages";
import type { Feature } from "./pages/feature";
import { RouteDepthPage } from "./pages/RouteDepthPage";
import { useAppearance } from "../hooks/useAppearance";
import { useT } from "../hooks/useT";
import { navItems, ROUTE_DEPTH_PATH } from "../routes";

type FeatureRoute = Feature & { path: string };

function FeatureGrid({
  features,
  isDark,
}: {
  features: FeatureRoute[];
  isDark: boolean;
}) {
  const { t } = useT();

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1
            className={`text-3xl font-bold ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            {t("app.title")}
          </h1>
          <p
            className={`mt-2 ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {t("app.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => (
            <Link
              key={feature.id}
              to={feature.path}
              className={`group rounded-2xl border p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg ${
                isDark
                  ? "border-gray-800 bg-gray-900"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div
                className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-3xl transition-colors group-hover:bg-blue-500 ${
                  isDark ? "bg-gray-800" : "bg-blue-100"
                }`}
              >
                <span className="group-hover:scale-110 transition-transform">
                  {feature.emoji}
                </span>
              </div>

              <h2
                className={`text-lg font-semibold ${
                  isDark ? "text-white" : "text-gray-900"
                }`}
              >
                {feature.title}
              </h2>

              <p
                className={`mt-2 text-sm ${
                  isDark ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {feature.description}
              </p>

              <div className="mt-5 flex items-center text-sm font-medium text-blue-600">
                {t("common.test")}
                <span className="ml-2 transition-transform group-hover:translate-x-1">
                  →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturePage({
  feature,
  isDark,
}: {
  feature: FeatureRoute;
  isDark: boolean;
}) {
  const { t } = useT();
  const navigate = useNavigate();
  const location = useLocation();

  // "default" is the key react-router gives the entry the app started on, so
  // there is nothing to pop when the host deep-linked straight to a feature.
  const canGoBack = location.key !== "default";

  const handleBack = useCallback(() => {
    if (canGoBack) {
      navigate(-1);
      return;
    }
    navigate("/", { replace: true });
  }, [canGoBack, navigate]);

  const Page = featurePages[feature.id];

  return (
    <div
      className={`min-h-screen p-6 transition-colors ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <button
          onClick={handleBack}
          className={`mb-6 flex items-center cursor-pointer gap-2 text-sm font-medium transition hover:text-gray-900 ${
            isDark
              ? "text-gray-400 hover:text-white"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          ← {t("common.back")}
        </button>

        {Page ? <Page feature={feature} isDark={isDark} /> : null}
      </div>
    </div>
  );
}

export function MiniAppIndex() {
  const { t } = useT();
  const { theme } = useAppearance();
  const isDark = theme.mode === "dark";

  const features = useMemo<FeatureRoute[]>(
    () =>
      navItems.map((item) => ({
        id: item.id,
        path: item.path,
        emoji: item.emoji,
        title: t(`feature.${item.id}.title`),
        description: t(`feature.${item.id}.desc`),
      })),
    [t],
  );

  return (
    <Routes>
      <Route element={<FeatureGrid features={features} isDark={isDark} />} path="/" />
      {features.map((feature) => (
        <Route
          element={<FeaturePage feature={feature} isDark={isDark} />}
          key={feature.id}
          path={feature.path}
        />
      ))}
      <Route element={<RouteDepthPage isDark={isDark} />} path={ROUTE_DEPTH_PATH} />
      <Route element={<Navigate replace to="/" />} path="*" />
    </Routes>
  );
}
