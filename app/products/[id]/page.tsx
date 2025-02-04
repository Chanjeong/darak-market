import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToWon } from '@/lib/utils';
import { FaRegCircleUser } from 'react-icons/fa6';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import Link from 'next/link';
import { revalidatePath, unstable_cache } from 'next/cache';

const getOwner = async (id: number) => {
  const session = await getSession();
  if (session.id) {
    return session.id === id;
  }
  return false;
};

const getProduct = async (id: number) => {
  const product = db.product.findUnique({
    where: {
      id
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true
        }
      }
    }
  });
  return product;
};
const getCachedProduct = unstable_cache(getProduct, ['product-detail'], {
  tags: ['product-detail']
});

const getProductTitle = async (id: number) => {
  const product = await db.product.findUnique({
    where: {
      id
    },
    select: {
      title: true
    }
  });
  return product;
};

const getCachedProductTitle = unstable_cache(
  getProductTitle,
  ['product-title'],
  {
    tags: ['product-title']
  }
);

export const generateMetadata = async ({
  params
}: {
  params: { id: string };
}) => {
  const product = await getProductTitle(Number(params.id));
  return {
    title: product?.title
  };
};

export default async function ProductsDetail({
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

  const owner = await getOwner(product.userId);

  const deleteProduct = async () => {
    'use server';
    await db.product.delete({
      where: { id: product.id }
    });

    revalidatePath('/products');
    redirect('/products');
  };

  return (
    <div>
      <div className="relative w-full h-96">
        <Image src={product.photo} alt={product.title} fill />
      </div>
      <div className="p-5 flex items-center gap-5 border-neutral-600 border-b">
        <div className="relative size-12 rounded-full overflow-hidden">
          {product.user.avatar === 'null' ? (
            <FaRegCircleUser />
          ) : (
            <Image
              src={product.user.avatar!}
              alt={product.user.username}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div>
          <h3>{product.user.username}</h3>
        </div>
      </div>
      <div className="p-5 flex flex-col gap-5 pb-10">
        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <p>{product.description}</p>
      </div>
      <div className="fixed w-full max-w-md bottom-0 flex p-5 justify-between items-center bg-stone-700">
        <span>{formatToWon(product.price)}원</span>
        {owner ? (
          <div className="flex gap-3">
            <form action={deleteProduct}>
              <button className="bg-red-500 px-5 py-2.5 rounded-md text-white font-semibold">
                상품 삭제
              </button>
            </form>
            <a href={`/products/${pId}/edit`}>
              <button className="bg-amber-900 px-5 py-2.5 rounded-md text-white font-semibold">
                수정하기
              </button>
            </a>
          </div>
        ) : (
          <Link
            href="/chats"
            className="bg-amber-900 text-white p-3 rounded-lg hover:bg-amber-800 transition">
            채팅하기
          </Link>
        )}
      </div>
    </div>
  );
}
