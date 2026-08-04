import { useState } from "react";
import { useT } from "../../hooks/useT";
import { usePlatformSDK } from "../../hooks/usePlatformSDK";
import { formatBytes, permissionErrorMessage } from "../../utils/permission";
import { ResultPanel } from "./ResultPanel";
import type { FeaturePageProps } from "./feature";

const SAMPLE = `{
  "file": {
    "url": "file:///storage/emulated/0/Download/sample.pdf",
    "fileName": "sample.pdf",
    "mimeType": "application/pdf",
    "extension": "pdf",
    "byteSize": 2048000
  }
}`;

const IMAGE_SOURCE = {
  url: "https://picsum.photos/1200/800",
  fileName: "sample-image.jpg",
  mimeType: "image/jpeg",
};

const FILE_SOURCE = {
  url: "https://pdfobject.com/pdf/sample.pdf",
  fileName: "sample.pdf",
  mimeType: "application/pdf",
};

export function DownloadPage({ isDark }: FeaturePageProps) {
  const { t } = useT();
  const { sdk } = usePlatformSDK();

  const [download, setDownload] = useState<SdkDeviceDownloadResult | null>(
    null,
  );
  const [pending, setPending] = useState<"image" | "file" | null>(null);
  const [error, setError] = useState<string | null>(null);

  const runDownload = async (
    kind: "image" | "file",
    source: typeof IMAGE_SOURCE,
  ) => {
    if (!sdk) return;
    setPending(kind);
    setError(null);
    setDownload(null);
    try {
      const res = await sdk.device.download({
        ...source,
        reason: `To download the selected ${kind}`,
      });
      const denial = permissionErrorMessage(res.status, "Download");
      if (denial) {
        setError(denial);
        return;
      }
      setDownload(res.data ?? null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to download file.");
    } finally {
      setPending(null);
    }
  };

  const handleDownloadImage = () => runDownload("image", IMAGE_SOURCE);
  const handleDownloadFile = () => runDownload("file", FILE_SOURCE);

  const downloadedFile = download?.file;

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
            <span className="text-6xl">⬇️</span>
          </div>
          <div>
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("feature.download.title")}
            </h1>
            <p
              className={`mt-2 text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("feature.download.desc")}
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
                      isDark ? "bg-blue-900/30" : "bg-blue-100"
                    }`}
                  >
                    <span className="text-2xl">📄</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Documents
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Download PDFs, docs, and text files
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
                    <span className="text-2xl">🖼️</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Images
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Download high-resolution images
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
                  <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    How it works
                  </h4>
                  <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    This feature calls <code>sdk.device.download()</code> with a
                    remote URL, file name and MIME type. The host app fetches
                    the file, writes it to device storage, and returns the saved
                    file&apos;s location and metadata.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-4 pt-4 md:grid-cols-2">
              <button
                onClick={handleDownloadImage}
                disabled={pending !== null}
                className={`w-full rounded-xl bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                  isDark ? "shadow-lg shadow-blue-600/30" : "shadow-lg shadow-blue-600/25"
                }`}
              >
                {pending === "image"
                  ? t("common.loading")
                  : t("feature.download.action.image")}
              </button>
              <button
                onClick={handleDownloadFile}
                disabled={pending !== null}
                className={`w-full rounded-xl bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                  isDark ? "shadow-lg shadow-green-600/30" : "shadow-lg shadow-green-600/25"
                }`}
              >
                {pending === "file"
                  ? t("common.loading")
                  : t("feature.download.action.file")}
              </button>
            </div>
          </div>
        </div>

        <ResultPanel
          isDark={isDark}
          error={error}
          result={download}
          sample={SAMPLE}
        >
          {downloadedFile ? (
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
              <div className="min-w-0 flex-1">
                <p
                  className={`truncate font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                >
                  {downloadedFile.fileName ?? "downloaded-file"}
                </p>
                <p className="text-xs text-gray-500">
                  {downloadedFile.mimeType ?? "application/octet-stream"} ·{" "}
                  {formatBytes(downloadedFile.byteSize)}
                </p>
              </div>
              <a
                href={downloadedFile.url}
                target="_blank"
                rel="noreferrer"
                className="shrink-0 text-sm font-medium text-blue-600 hover:underline"
              >
                {t("common.open")}
              </a>
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
              isDark ? "bg-blue-900/30" : "bg-blue-100"
            }`}
          >
            <span className="text-4xl">⚡</span>
          </div>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Ready to download?
          </h3>
          <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Tap a button above to save a sample image or PDF to device storage using the platform SDK.
          </p>
        </div>
      </div>
    </div>
  );
}
