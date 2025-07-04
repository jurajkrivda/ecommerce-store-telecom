import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Product Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The product you are looking for does not exist.
        </p>
        <Link
          href="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Go back to products
        </Link>
      </div>
    </div>
  );
}
