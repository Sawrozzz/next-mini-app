import { useState } from "react";
import { useT } from "../../hooks/useT";
import { usePlatformSDK } from "../../hooks/usePlatformSDK";
import { formatBytes, permissionErrorMessage } from "../../utils/permission";
import { ResultPanel } from "./ResultPanel";
import type { FeaturePageProps } from "./feature";

const SAMPLE = `{
  "files": [
    {
      "url": "file:///storage/emulated/0/Download/document.pdf",
      "fileName": "document.pdf",
      "mimeType": "application/pdf",
      "extension": "pdf",
      "byteSize": 1048576
    }
  ]
}`;

export function FilePage({ isDark }: FeaturePageProps) {
  const { t } = useT();
  const { sdk } = usePlatformSDK();

  const [documents, setDocuments] = useState<SdkFileModule[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async () => {
    if (!sdk) return;
    setLoading(true);
    setError(null);
    setDocuments(null);
    try {
      const res = await sdk.device.files({
        reason: "To select documents",
        multiple: true,
      });
      const denial = permissionErrorMessage(res.status, "File");
      if (denial) {
        setError(denial);
        return;
      }
      setDocuments(res.data?.files ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to open file picker.",
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
              isDark ? "bg-amber-900/30" : "bg-amber-100"
            }`}
          >
            <span className="text-6xl">📁</span>
          </div>
          <div>
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("feature.file.title")}
            </h1>
            <p
              className={`mt-2 text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("feature.file.desc")}
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
                      isDark ? "bg-amber-900/30" : "bg-amber-100"
                    }`}
                  >
                    <span className="text-2xl">📄</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      File Picker
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Select any file type from device storage
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
                      isDark ? "bg-orange-900/30" : "bg-orange-100"
                    }`}
                  >
                    <span className="text-2xl">🔍</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      MIME Filtering
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Filter by file type (PDF, docs, etc.)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl p-6 ${
                isDark ? "bg-amber-900/20" : "bg-amber-50"
              } border ${isDark ? "border-amber-900/30" : "border-amber-100"}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    isDark ? "bg-amber-900/30" : "bg-amber-100"
                  }`}
                >
                  <span className="text-3xl">ℹ️</span>
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    How it works
                  </h4>
                  <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    This feature calls <code>sdk.device.files()</code>, which
                    opens the native file picker and returns the selected files
                    with their URLs, names, MIME types and sizes. Pass{" "}
                    <code>accept</code> to filter by MIME type.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleFileUpload}
                disabled={loading}
                className={`w-full rounded-xl bg-amber-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-amber-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                  isDark ? "shadow-lg shadow-amber-600/30" : "shadow-lg shadow-amber-600/25"
                }`}
              >
                {loading ? t("common.loading") : t("feature.file.action")}
              </button>
            </div>
          </div>
        </div>

        <ResultPanel
          isDark={isDark}
          error={error}
          result={documents}
          sample={SAMPLE}
        >
          {documents && documents.length > 0 ? (
            <ul className="space-y-3">
              {documents.map((file, index) => (
                <li
                  key={`${file.url}-${index}`}
                  className={`flex items-center gap-4 rounded-2xl p-4 ${
                    isDark ? "bg-gray-800/50" : "bg-gray-50"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      isDark ? "bg-amber-900/30" : "bg-amber-100"
                    }`}
                  >
                    <span className="text-xl">📄</span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`truncate font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {file.fileName ?? `file-${index + 1}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {file.mimeType ?? "application/octet-stream"} ·{" "}
                      {formatBytes(file.byteSize)}
                    </p>
                  </div>
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="shrink-0 text-sm font-medium text-amber-600 hover:underline"
                  >
                    {t("common.open")}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </ResultPanel>

        <div
          className={`rounded-3xl p-8 text-center ${
            isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"
          }`}
        >
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
              isDark ? "bg-amber-900/30" : "bg-amber-100"
            }`}
          >
            <span className="text-4xl">⚡</span>
          </div>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Ready to select?
          </h3>
          <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Tap the button above to open the file picker and choose documents using the platform SDK.
          </p>
        </div>
      </div>
    </div>
  );
}
