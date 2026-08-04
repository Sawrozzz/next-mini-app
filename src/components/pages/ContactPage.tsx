import { useT } from "../../hooks/useT";
import type { FeaturePageProps } from "./feature";

export function ContactPage({ isDark }: FeaturePageProps) {
  const { t } = useT();

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
            <span className="text-6xl">👤</span>
          </div>
          <div>
            <h1
              className={`text-4xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-gray-900"
              }`}
            >
              {t("feature.contact.title")}
            </h1>
            <p
              className={`mt-2 text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t("feature.contact.desc")}
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
                      isDark ? "bg-pink-900/30" : "bg-pink-100"
                    }`}
                  >
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Phone Contacts
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Access device phone book contacts
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
                      isDark ? "bg-red-900/30" : "bg-red-100"
                    }`}
                  >
                    <span className="text-2xl">📧</span>
                  </div>
                  <div>
                    <h3 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                      Email Contacts
                    </h3>
                    <p className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                      Access email app contact lists
                    </p>
                  </div>
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
                  <h4 className={`font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
                    How it works
                  </h4>
                  <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    This feature uses the platform SDK to access device contacts.
                    It supports reading contacts from both phone and email apps,
                    with permission handling and contact filtering options.
                    Returns contact data including names, phone numbers, emails, and avatars.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => alert("Opening contacts...")}
                className={`w-full rounded-xl bg-pink-600 px-6 py-4 text-lg font-semibold text-white transition hover:bg-pink-700 active:scale-[0.98] ${
                  isDark ? "shadow-lg shadow-pink-600/30" : "shadow-lg shadow-pink-600/25"
                }`}
              >
                {t("feature.contact.action")}
              </button>
            </div>
          </div>
        </div>

        <div
          className={`rounded-3xl p-8 ${
            isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"
          }`}
        >
          <h2 className={`text-xl font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Sample Response
          </h2>
          <pre className={`mt-4 rounded-xl p-4 overflow-x-auto text-sm ${
            isDark ? "bg-gray-950 border border-gray-800 text-gray-300" : "bg-gray-50 border border-gray-200 text-gray-700"
          }`}>
{`{
  "contacts": [
    {
      "id": "contact_001",
      "name": "John Doe",
      "phone": "+1234567890",
      "email": "john@example.com",
      "avatar": "file:///storage/emulated/0/contacts/john.jpg",
      "isStarred": false
    }
  ],
  "count": 1,
  "hasPermission": true
}`}
          </pre>
        </div>

        <div
          className={`rounded-3xl p-8 text-center ${
            isDark ? "bg-gray-900 border border-gray-800" : "bg-white border border-gray-100"
          }`}
        >
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl ${
              isDark ? "bg-pink-900/30" : "bg-pink-100"
            }`}
          >
            <span className="text-4xl">⚡</span>
          </div>
          <h3 className={`text-lg font-semibold ${isDark ? "text-white" : "text-gray-900"}`}>
            Ready to access?
          </h3>
          <p className={`mt-1 text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Tap the button above to access your contacts using the platform SDK with permission handling.
          </p>
        </div>
      </div>
    </div>
  );
}