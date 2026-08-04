import { useState } from "react";
import { useT } from "../../hooks/useT";
import { useAppearance } from "../../hooks/useAppearance";
import { usePlatformSDK } from "../../hooks/usePlatformSDK";
import { ResultPanel } from "./ResultPanel";
import type { FeaturePageProps } from "./feature";
import type { AppearanceState } from "@lizuz/mini-app-types";

const SAMPLE = `{
  "locale": {
    "locale": "en-LK",
    "language": "en",
    "region": "LK",
    "direction": "ltr"
  },
  "theme": {
    "preference": "system",
    "mode": "light"
  }
}`;

const LANGUAGE_NAMES: Record<string, string> = {
  en: "English",
  si: "සිංහල",
  ta: "தமிழ்",
};

const THEME_EMOJI: Record<string, string> = {
  light: "☀️",
  dark: "🌙",
  system: "🖥️",
};

/** A label/value row used by both the localization and theme cards. */
function Row({
  isDark,
  label,
  value,
}: {
  isDark: boolean;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 ${
        isDark ? "bg-gray-900/60" : "bg-white"
      }`}
    >
      <span className="text-xs uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span
        className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
      >
        {value}
      </span>
    </div>
  );
}

export function AppearancePage({ isDark }: FeaturePageProps) {
  const { t } = useT();
  const { sdk } = usePlatformSDK();
  /**
   * `useAppearance` subscribes to `appearance.locale.changed` /
   * `appearance.theme.changed`, so everything below re-renders the moment the
   * host switches language or theme — no button press needed.
   */
  const { locale, theme } = useAppearance();

  const [fetched, setFetched] = useState<AppearanceState | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRefresh = async () => {
    if (!sdk) return;
    setLoading(true);
    setError(null);
    setFetched(null);
    try {
      const [nextLocale, nextTheme] = await Promise.all([
        sdk.appearance.getLocale(),
        sdk.appearance.getTheme(),
      ]);
      setFetched({ locale: nextLocale, theme: nextTheme });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to read appearance from the host.",
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
              isDark ? "bg-pink-900/30" : "bg-pink-100"
            }`}
          >
            <span className="text-6xl">🎨</span>
          </div>
          <div>
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("feature.appearance.title")}
            </h1>
            <p
              className={`mt-2 text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("feature.appearance.desc")}
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
            <div className="flex items-center justify-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
              </span>
              <span className="text-sm font-medium text-green-600">
                {t("feature.appearance.live")}
              </span>
            </div>

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
                    <span className="text-2xl">🌐</span>
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {t("feature.appearance.localization")}
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {LANGUAGE_NAMES[locale.language] ?? locale.language}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Row
                    isDark={isDark}
                    label={t("feature.appearance.locale")}
                    value={locale.locale}
                  />
                  <Row
                    isDark={isDark}
                    label={t("feature.appearance.language")}
                    value={locale.language}
                  />
                  <Row
                    isDark={isDark}
                    label={t("feature.appearance.region")}
                    value={locale.region ?? "—"}
                  />
                  <Row
                    isDark={isDark}
                    label={t("feature.appearance.direction")}
                    value={locale.direction.toUpperCase()}
                  />
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
                      isDark ? "bg-purple-900/30" : "bg-purple-100"
                    }`}
                  >
                    <span className="text-2xl">
                      {THEME_EMOJI[theme.mode] ?? "🎨"}
                    </span>
                  </div>
                  <div>
                    <h3
                      className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {t("feature.appearance.theme")}
                    </h3>
                    <p
                      className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}
                    >
                      {t(`feature.appearance.mode.${theme.mode}`)}
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <Row
                    isDark={isDark}
                    label={t("feature.appearance.preference")}
                    value={`${THEME_EMOJI[theme.preference] ?? ""} ${t(
                      `feature.appearance.mode.${theme.preference}`,
                    )}`.trim()}
                  />
                  <Row
                    isDark={isDark}
                    label={t("feature.appearance.mode")}
                    value={`${THEME_EMOJI[theme.mode] ?? ""} ${t(
                      `feature.appearance.mode.${theme.mode}`,
                    )}`.trim()}
                  />
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl p-6 ${
                isDark ? "bg-pink-900/20" : "bg-pink-50"
              } border ${isDark ? "border-pink-900/30" : "border-pink-100"}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    isDark ? "bg-pink-900/30" : "bg-pink-100"
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
                    The host owns locale and theme. This page reads{" "}
                    <code>sdk.appearance.state()</code> and stays on{" "}
                    <code>sdk.appearance.subscribe()</code>, so switching
                    language or theme in the host updates these values — and the
                    whole mini app — instantly. The button below re-reads them
                    on demand with <code>getLocale()</code> and{" "}
                    <code>getTheme()</code>.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleRefresh}
                disabled={loading}
                className={`w-full rounded-xl bg-pink-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-pink-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                  isDark
                    ? "shadow-lg shadow-pink-600/30"
                    : "shadow-lg shadow-pink-600/25"
                }`}
              >
                {loading ? t("common.loading") : t("feature.appearance.action")}
              </button>
            </div>
          </div>
        </div>

        <ResultPanel
          isDark={isDark}
          error={error}
          result={fetched}
          sample={SAMPLE}
        />

        <div
          className={`rounded-3xl p-8 text-center ${
            isDark
              ? "bg-gray-900 border border-gray-800"
              : "bg-white border border-gray-100"
          }`}
        >
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
              isDark ? "bg-pink-900/30" : "bg-pink-100"
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
            Change the language or theme in the host app and watch these values
            update without reloading the mini app.
          </p>
        </div>
      </div>
    </div>
  );
}
