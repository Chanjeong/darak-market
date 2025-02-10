import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToTime, formatToWon } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const getBoughtProduct = async () => {
  const session = await getSession();
  const product = await db.product.findMany({
    where: {
      buyerId: session.id
    }
  });
  return product;
};

export default async function ProfileBuy() {
  const products = await getBoughtProduct();

  return (
    <div className="flex flex-col gap-5 pb-20">
      {products.length === 0 ? (
        <div className="p-5">구매한 상품이 없습니다.</div>
      ) : (
        <div>
          {products.map(product => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="flex gap-5 border-b border-neutral-600 py-3">
              <div className="relative size-32 rounded-md overflow-hidden">
                <Image
                  src={product.photo}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col *:text-white gap-1">
                <span className="text-lg">{product.title}</span>
                <span className="text-sm">
                  {formatToTime(product.created_at.toString())}
                </span>
                <span className="text-lg font-semibold">
                  {formatToWon(product.price)}원
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
