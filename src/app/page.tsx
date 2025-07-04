import { Suspense } from 'react';
import { getProducts } from '@/model/api';
import { ProductGrid } from '@/components/product-grid';

export default async function Home() {
  const products = await getProducts();

  return (
    <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
      <ProductGrid products={products} />
    </Suspense>
  );
}
