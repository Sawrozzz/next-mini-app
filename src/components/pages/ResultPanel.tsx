import type { ReactNode } from "react";
import { useT } from "../../hooks/useT";

type ResultPanelProps = {
  isDark: boolean;
  /** Message shown when the SDK call failed or the permission was refused. */
  error?: string | null;
  /** Raw payload returned by the SDK, rendered as JSON once available. */
  result?: unknown;
  /** Static example rendered until a real response arrives. */
  sample: string;
  /** Optional rich preview (images, file rows, ...) shown above the JSON. */
  children?: ReactNode;
};

/** `rawFile` is a `File` instance that serialises to `{}` — drop it from the view. */
function stringify(result: unknown): string {
  return JSON.stringify(
    result,
    (key, value) => (key === "rawFile" ? undefined : value),
    2,
  );
}

export function ResultPanel({
  isDark,
  error,
  result,
  sample,
  children,
}: ResultPanelProps) {
  const { t } = useT();
  const hasResult = result !== null && result !== undefined;

  return (
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
        {hasResult ? t("common.response") : t("common.sampleResponse")}
      </h2>

      {error ? (
        <div
          className={`mt-4 flex items-start gap-3 rounded-xl p-4 text-sm ${
            isDark
              ? "bg-red-950/40 border border-red-900/50 text-red-300"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}
        >
          <span className="text-lg leading-none">⚠️</span>
          <span>{error}</span>
        </div>
      ) : null}

      {children ? <div className="mt-4">{children}</div> : null}

      <pre
        className={`mt-4 rounded-xl p-4 overflow-x-auto text-sm ${
          isDark
            ? "bg-gray-950 border border-gray-800 text-gray-300"
            : "bg-gray-50 border border-gray-200 text-gray-700"
        }`}
      >
        {hasResult ? stringify(result) : sample}
      </pre>
    </div>
  );
}
