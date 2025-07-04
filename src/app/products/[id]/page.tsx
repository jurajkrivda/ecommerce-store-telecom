import Image from 'next/image';
import Link from 'next/link';
import { getProduct } from '@/model/api';
import { requireIdNumber } from '@/lib/helpers';

type ProductDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export const revalidate = 3600;

export default async function ProductDetailPage({
  params,
}: ProductDetailPageProps) {
  const resolvedParams = await params;
  const productId = requireIdNumber(resolvedParams.id);

  const product = await getProduct(productId);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="flex justify-center">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="w-full max-w-md h-auto object-contain rounded-lg"
            priority={true}
          />
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full mb-2 capitalize">
              {product.category}
            </span>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {product.title}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-4xl font-bold text-green-600">
              ${product.price}
            </span>
            <div className="flex items-center">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-lg font-semibold ml-1">
                {product.rating.rate}
              </span>
              <span className="text-gray-500 ml-2">
                ({product.rating.count} reviews)
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="space-y-4 pt-6">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors">
              Add to Cart
            </button>
            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-semibold transition-colors">
              Add to Wishlist
            </button>
          </div>

          <div className="border-t pt-6">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-semibold text-gray-600">Category:</span>
                <span className="ml-2 capitalize">{product.category}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Product ID:</span>
                <span className="ml-2">#{product.id}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Rating:</span>
                <span className="ml-2">{product.rating.rate}/5</span>
              </div>
              <div>
                <span className="font-semibold text-gray-600">Reviews:</span>
                <span className="ml-2">{product.rating.count}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
