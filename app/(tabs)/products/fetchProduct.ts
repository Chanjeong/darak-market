'use server';

import db from '@/lib/db';

export async function fetchProductPage(page: number) {
  const numOfProducts = 1;
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
    skip: page * numOfProducts,
    take: numOfProducts,
    orderBy: {
      created_at: 'desc'
    }
  });
  return products;
}
