import type { Feature } from "./feature";

export function BiometricPage({ feature }: { feature: Feature }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-100 text-3xl">
        {feature.emoji}
      </div>

      <h2 className="text-2xl font-bold text-gray-900">{feature.title}</h2>

      <p className="mt-2 text-sm text-gray-600">{feature.description}</p>

      <button
        onClick={() => alert("Authenticating...")}
        className="mt-6 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        Authenticate
      </button>
    </div>
  );
}