import Link from 'next/link';

export default function ProductNotFound() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-6">
          <h1 className="text-6xl font-bold text-gray-400 mb-2">404</h1>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Product Not Found
          </h2>
          <p className="text-gray-600 mb-8">
            Sorry, the product you&apos;re looking for doesn&apos;t exist or has
            been removed.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Back to Products
          </Link>

          <div className="text-sm text-gray-500">
            <p>Tip: Check the URL or browse our product catalog</p>
          </div>
        </div>

        {/* Optional: Add some visual element */}
        <div className="mt-12 text-gray-300">
          <svg
            className="mx-auto w-24 h-24"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
