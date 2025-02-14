import { ProductList } from '@/components/product-list';
import db from '@/lib/db';
import { PlusIcon } from '@heroicons/react/24/solid';
import { Prisma } from '@prisma/client';
import { fetchProductPage } from './fetchProduct';

const getInitialProducts = async () => {
  const products = await db.product.findMany({
    where: {
      buyerId: null
    },
    select: {
      id: true,
      price: true,
      created_at: true,
      photo: true,
      title: true
    },
    take: 1,
    orderBy: {
      created_at: 'desc'
    }
  });

  return products;
};

export const metadata = {
  title: '홈'
};

export type InitialProducts = Prisma.PromiseReturnType<
  typeof getInitialProducts
>;

export default async function Products() {
  const initialProducts = await getInitialProducts();
  return (
    <div>
      <ProductList
        initialProducts={initialProducts}
        fetchProductPage={fetchProductPage}
      />
    </div>
  );
}
