import { useState } from "react";
import { useT } from "../../hooks/useT";
import { usePlatformSDK } from "../../hooks/usePlatformSDK";
import { formatBytes, permissionErrorMessage } from "../../utils/permission";
import { ResultPanel } from "./ResultPanel";
import type { FeaturePageProps } from "./feature";

const SAMPLE = `{
  "images": [
    {
      "url": "file:///storage/emulated/0/DCIM/photo.jpg",
      "previewUrl": "file:///storage/emulated/0/DCIM/photo.jpg",
      "fileName": "photo.jpg",
      "mimeType": "image/jpeg",
      "extension": "jpg",
      "byteSize": 3145728
    }
  ]
}`;

export function GalleryPage({ isDark }: FeaturePageProps) {
  const { t } = useT();
  const { sdk } = usePlatformSDK();

  const [images, setImages] = useState<SdkFileModule[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImages = async () => {
    if (!sdk) return;
    setLoading(true);
    setError(null);
    setImages(null);
    try {
      const res = await sdk.device.gallery({
        reason: "To select images",
        multiple: true,
      });
      const denial = permissionErrorMessage(res.status, "Gallery");
      if (denial) {
        setError(denial);
        return;
      }
      setImages(res.data?.images ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to open gallery.");
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
              isDark ? "bg-green-900/30" : "bg-green-100"
            }`}
          >
            <span className="text-6xl">🖼️</span>
          </div>
          <div>
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("feature.gallery.title")}
            </h1>
            <p
              className={`mt-2 text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("feature.gallery.desc")}
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
                      isDark ? "bg-green-900/30" : "bg-green-100"
                    }`}
                  >
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Image Picker
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Select single or multiple images
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
                      isDark ? "bg-emerald-900/30" : "bg-emerald-100"
                    }`}
                  >
                    <span className="text-2xl">🎨</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Media Types
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Photos, videos, and albums
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl p-6 ${
                isDark ? "bg-green-900/20" : "bg-green-50"
              } border ${isDark ? "border-green-900/30" : "border-green-100"}`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
                    isDark ? "bg-green-900/30" : "bg-green-100"
                  }`}
                >
                  <span className="text-3xl">ℹ️</span>
                </div>
                <div className="flex-1">
                  <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    How it works
                  </h4>
                  <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    This feature calls <code>sdk.device.gallery()</code> with{" "}
                    <code>multiple: true</code>, which opens the native gallery
                    picker and returns the selected images with their preview
                    URLs and metadata.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleImages}
                disabled={loading}
                className={`w-full rounded-xl bg-green-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-green-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${
                  isDark ? "shadow-lg shadow-green-600/30" : "shadow-lg shadow-green-600/25"
                }`}
              >
                {loading ? t("common.loading") : t("feature.gallery.action")}
              </button>
            </div>
          </div>
        </div>

        <ResultPanel
          isDark={isDark}
          error={error}
          result={images}
          sample={SAMPLE}
        >
          {images && images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {images.map((image, index) => (
                <figure
                  key={`${image.url}-${index}`}
                  className={`overflow-hidden rounded-2xl ${
                    isDark ? "bg-gray-800/50" : "bg-gray-50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- the SDK hands back blob/file URLs the Next loader cannot optimize */}
                  <img
                    src={image.previewUrl ?? image.url}
                    alt={image.fileName ?? `Image ${index + 1}`}
                    className="h-40 w-full object-cover"
                  />
                  <figcaption className="px-3 py-2">
                    <p
                      className={`truncate text-sm font-medium ${isDark ? "text-white" : "text-gray-900"}`}
                    >
                      {image.fileName ?? `image-${index + 1}`}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatBytes(image.byteSize)}
                    </p>
                  </figcaption>
                </figure>
              ))}
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
              isDark ? "bg-green-900/30" : "bg-green-100"
            }`}
          >
            <span className="text-4xl">⚡</span>
          </div>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Ready to pick?
          </h3>
          <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Tap the button above to open the gallery and select images using the platform SDK.
          </p>
        </div>
      </div>
    </div>
  );
}
