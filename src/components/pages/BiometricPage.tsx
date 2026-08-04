import { useT } from "../../hooks/useT";
import type { FeaturePageProps } from "./feature";

export function BiometricPage({ feature, isDark }: FeaturePageProps) {
  const { t } = useT();

  return (
    <div
      className={`rounded-2xl border p-6 shadow-sm ${
        isDark ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"
      }`}
    >
      <div
        className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-3xl ${
          isDark ? "bg-gray-800" : "bg-blue-100"
        }`}
      >
        {feature.emoji}
      </div>

      <h2
        className={`text-2xl font-bold ${
          isDark ? "text-white" : "text-gray-900"
        }`}
      >
        {feature.title}
      </h2>

      <p className={`mt-2 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
        {feature.description}
      </p>

      <button
        onClick={() => alert("Authenticating...")}
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        {t("feature.biometric.action")}
      </button>
    </div>
  );
}