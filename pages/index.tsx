export default function Home() {
  return (
    <div className={`min-h-screen bg-gray-100`}>
      {/* Header */}
      <header className="border-b bg-white shadow-sm">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <h1 className="text-xl font-bold text-gray-800">
            Mini Payment Gateway
          </h1>

          <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
            Secure Payment
          </span>
        </div>
      </header>

      {/* Body */}
      <main className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <h2 className="text-center text-2xl font-bold text-gray-800">
            Complete Your Payment
          </h2>

          <p className="mt-2 text-center text-sm text-gray-500">
            Scan the QR code below using your preferred payment app to initiate
            the payment.
          </p>

          {/* Amount */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">Amount</p>
            <h3 className="mt-1 text-4xl font-bold text-indigo-600">
              Rs. 1,500
            </h3>
          </div>

          {/* Dummy QR */}
          <div className="mt-8 flex justify-center">
            <div className="flex h-64 w-64 items-center justify-center rounded-xl border-4 border-dashed border-gray-300 bg-gray-50">
              <span className="text-lg font-semibold text-gray-400">
                Dummy QR
              </span>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-500">
            After scanning and completing the payment, click{" "}
            <span className="font-semibold text-gray-700">"Check Payment"</span>{" "}
            to verify the transaction.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="flex-1 rounded-lg border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-100">
              Cancel
            </button>

            <button className="flex-1 rounded-lg bg-indigo-600 py-3 font-medium text-white transition hover:bg-indigo-700">
              Check Payment
            </button>
          </div>

          {/* Footer Note */}
          <div className="mt-6 rounded-lg bg-blue-50 p-4">
            <p className="text-center text-sm text-blue-700">
              🔒 Your payment is processed securely. Do not close this page
              until your payment is confirmed.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
