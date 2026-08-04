import { useState } from "react";
import { useT } from "../../hooks/useT";
import { usePlatformSDK } from "../../hooks/usePlatformSDK";
import { ResultPanel } from "./ResultPanel";
import type { FeaturePageProps } from "./feature";

const SAMPLE = `{
  "success": true
}`;

export function BiometricPage({ isDark }: FeaturePageProps) {
  const { t } = useT();
  const { sdk } = usePlatformSDK();

  const [biometric, setBiometric] = useState<SdkDeviceBiometricResult | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAuthenticateBiometric = async () => {
    if (!sdk) return;
    setLoading(true);
    setError(null);
    setBiometric(null);
    try {
      const res = await sdk.device.biometric({
        reason: "To verify your identity",
      });
      if (!res.data?.success) {
        setError(res.error || "Biometric authentication failed.");
      }
      setBiometric(res.data ?? null);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Biometric authentication failed.",
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
              isDark ? "bg-indigo-900/30" : "bg-indigo-100"
            }`}
          >
            <span className="text-6xl">🔐</span>
          </div>
          <div>
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("feature.biometric.title")}
            </h1>
            <p
              className={`mt-2 text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("feature.biometric.desc")}
            </p>
          </div>
        </div>

        <div
          className={`rounded-3xl p-8 ${
            isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"
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
                      isDark ? "bg-indigo-900/30" : "bg-indigo-100"
                    }`}
                  >
                    <span className="text-2xl">👆</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Fingerprint
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Authenticate with fingerprint sensor
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
                      isDark ? "bg-purple-900/30" : "bg-purple-100"
                    }`}
                  >
                    <span className="text-2xl">👁️</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Face Recognition
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Authenticate using facial recognition
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl p-6 ${
                isDark ? "bg-indigo-900/20" : "bg-indigo-50"
              } border ${isDark ? "border-indigo-900/30" : "border-indigo-100"}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    isDark ? "bg-indigo-900/30" : "bg-indigo-100"
                  }`}
                >
                  <span className="text-3xl">ℹ️</span>
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    How it works
                  </h4>
                  <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    This feature calls <code>sdk.device.biometric()</code>, which
                    prompts the host app&apos;s fingerprint or face check. The
                    mini app only receives a success flag — no biometric data
                    ever leaves the device.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleAuthenticateBiometric}
                disabled={loading}
                className={`w-full rounded-xl bg-indigo-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-indigo-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                  isDark ? "shadow-lg shadow-indigo-600/30" : "shadow-lg shadow-indigo-600/25"
                }`}
              >
                {loading ? t("common.loading") : t("feature.biometric.action")}
              </button>
            </div>
          </div>
        </div>

        <ResultPanel
          isDark={isDark}
          error={error}
          result={biometric}
          sample={SAMPLE}
        >
          {biometric?.success ? (
            <div
              className={`flex items-center gap-4 rounded-2xl p-4 ${
                isDark ? "bg-gray-800/50" : "bg-gray-50"
              }`}
            >
              <div
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                  isDark ? "bg-green-900/30" : "bg-green-100"
                }`}
              >
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <p
                  className={`font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  Identity verified
                </p>
                <p className="text-sm text-gray-500">
                  The host app confirmed your biometric check.
                </p>
              </div>
            </div>
          ) : null}
        </ResultPanel>

        <div
          className={`rounded-3xl p-8 text-center ${
            isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"
          }`}
        >
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
              isDark ? "bg-indigo-900/30" : "bg-indigo-100"
            }`}
          >
            <span className="text-4xl">⚡</span>
          </div>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Ready to authenticate?
          </h3>
          <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Tap the button above to authenticate using biometric security with the platform SDK.
          </p>
        </div>
      </div>
    </div>
  );
}
