import { useEffect, useState } from "react";
import { featurePages } from "./pages";

const features = [
  { id: "location", title: "Location", description: "Test device location API", emoji: "📍" },
  { id: "camera", title: "Camera", description: "Capture photos using camera", emoji: "📷" },
  { id: "gallery", title: "Gallery", description: "Pick images from gallery", emoji: "🖼️" },
  { id: "file", title: "File", description: "Select files from device", emoji: "📁" },
  { id: "download", title: "Download", description: "Download files and images", emoji: "⬇️" },
  { id: "contact", title: "Contact", description: "Access device contacts", emoji: "👤" },
  {
    id: "biometric",
    title: "Biometric",
    description: "Authenticate with biometrics",
    emoji: "🔐",
  },
];

type Feature = (typeof features)[number];

function handleCardChange(cardId: string) {
  window.location.hash = cardId;
}

export function MiniAppIndex({ initialPath }: { initialPath?: string }) {
  const [activeCard, setActiveCard] = useState<Feature | null>(null);

  useEffect(() => {
    const updateFromHash = () => {
      const cardId = window.location.hash.replace("#", "");
      setActiveCard(features.find((f) => f.id === cardId) ?? null);
    };
    updateFromHash();
    window.addEventListener("hashchange", updateFromHash);
    return () => window.removeEventListener("hashchange", updateFromHash);
  }, []);

  if (activeCard) {
    const Page = featurePages[activeCard.id];

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <button
            onClick={() => {
              window.location.hash = "";
              setActiveCard(null);
            }}
            className="mb-6 flex items-center cursor-pointer gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900"
          >
            ← Back
          </button>

          {Page ? <Page feature={activeCard} /> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SDK Playground</h1>
          <p className="mt-2 text-gray-600">
            Explore and test all available SDK features.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {features.map((feature) => (
            <button
              key={feature.title}
              onClick={() => handleCardChange(feature.id)}
              className="group rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-3xl transition-colors group-hover:bg-blue-500">
                <span className="group-hover:scale-110 transition-transform">
                  {feature.emoji}
                </span>
              </div>

              <h2 className="text-lg font-semibold text-gray-900">
                {feature.title}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {feature.description}
              </p>

              <div className="mt-5 flex items-center text-sm font-medium text-blue-600">
                Test Feature
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
