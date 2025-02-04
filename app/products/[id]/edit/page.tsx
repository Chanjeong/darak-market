import db from '@/lib/db';
import { notFound } from 'next/navigation';
import ProductEdit from './edit-product';

export const getProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: {
      id
    }
  });
  return product;
};

export const metadata = {
  title: '수정하기'
};

export default async function DeleteProduct({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const pId = Number((await params).id);
  if (isNaN(pId)) {
    return notFound();
  }
  const product = await getProduct(pId);
  if (!product) {
    return notFound();
  }

  if (!product) {
    return notFound();
  }
  return <ProductEdit product={product} />;
}
