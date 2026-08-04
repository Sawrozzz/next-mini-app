import { useEffect, useMemo, useState } from "react";
import { featurePages } from "./pages";
import { useAppearance } from "../hooks/useAppearance";
import { useT } from "../hooks/useT";

const featureBase = [
  { id: "location", emoji: "📍" },
  { id: "camera", emoji: "📷" },
  { id: "gallery", emoji: "🖼️" },
  { id: "file", emoji: "📁" },
  { id: "download", emoji: "⬇️" },
  { id: "contact", emoji: "👤" },
  { id: "biometric", emoji: "🔐" },
];

type Feature = {
  id: string;
  title: string;
  description: string;
  emoji: string;
};

function handleCardChange(cardId: string) {
  window.location.hash = cardId;
}

export function MiniAppIndex({ initialPath }: { initialPath?: string }) {
  const { t } = useT();
  const { theme } = useAppearance();
  const isDark = theme.mode === "dark";

  const features = useMemo<Feature[]>(
    () =>
      featureBase.map((f) => ({
        id: f.id,
        emoji: f.emoji,
        title: t(`feature.${f.id}.title`),
        description: t(`feature.${f.id}.desc`),
      })),
    [t],
  );

  const [activeCard, setActiveCard] = useState<Feature | null>(null);

  useEffect(() => {
    const updateFromHash = () => {
      const cardId = window.location.hash.replace("#", "");
      setActiveCard(features.find((f) => f.id === cardId) ?? null);
    };
    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => window.removeEventListener("hashchange", updateFromHash);
  }, [features]);

  if (activeCard) {
    const Page = featurePages[activeCard.id];

    return (
      <div
        className={`min-h-screen p-6 transition-colors ${
          isDark ? "bg-gray-950" : "bg-gray-50"
        }`}
      >
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => {
              window.location.hash = "";
              setActiveCard(null);
            }}
            className={`mb-6 flex items-center cursor-pointer gap-2 text-sm font-medium transition hover:text-gray-900 ${
              isDark
                ? "text-gray-400 hover:text-white"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            ← {t("common.back")}
          </button>

          {Page ? <Page feature={activeCard} isDark={isDark} /> : null}
        </div>
      </div>
    );
  }

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
            <button
              key={feature.title}
              onClick={() => handleCardChange(feature.id)}
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
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
