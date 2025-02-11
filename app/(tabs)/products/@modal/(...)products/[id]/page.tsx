import BackButton, { ViewDetailButton } from '@/components/modal-buttons';
import db from '@/lib/db';
import { formatToTime, formatToWon } from '@/lib/utils';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const getProduct = async (id: number) => {
  const product = await db.product.findUnique({
    where: {
      id
    },
    include: {
      user: {
        select: {
          avatar: true,
          username: true
        }
      }
    }
  });
  return product;
};

export default async function ProductModal({
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

  return (
    <div className="modal modal-open bg-black bg-opacity-60 flex items-center justify-center">
      <div className="absolute top-10 right-10">
        <BackButton />
      </div>
      <div className="modal-box p-0 overflow-hidden max-w-screen-lg min-h-[80vh] rounded-lg flex justify-center w-full bg-black">
        <div className="relative w-1/2 overflow-hidden rounded-l-lg">
          <Image src={product.photo} fill alt={product.title} />
        </div>
        <div className="w-1/2 flex flex-col gap-5">
          <div className="flex items-center gap-5 border-b border-neutral-500 p-5">
            <div className="relative size-12 rounded-full overflow-hidden">
              <Image
                src={product.user.avatar!}
                fill
                alt={product.user.username}
                className="object-fit"
              />
            </div>
            <h3 className="text-lg font-semibold ">{product.user.username}</h3>
          </div>
          <div className="p-5 flex flex-col gap-5">
            <div className="text-4xl">{product.title}</div>
            <span className="text-sm text-neutral-400 ">
              {formatToTime(product.created_at.toString())}
            </span>
            <div>{product.description}</div>
          </div>
          <div className="absolute flex justify-between bottom-0 right-0 p-5 items-center w-1/2 h-20 border-t border-neutral-500">
            <span>{formatToWon(product.price)}원</span>
            <ViewDetailButton />
          </div>
        </div>
      </div>
    </div>
  );
}
