import db from '@/lib/db';
import getSession from '@/lib/session';
import Image from 'next/image';

const getReviews = async () => {
  const session = await getSession();
  const user = await db.user.findUnique({
    where: {
      id: session.id
    },
    select: {
      reviews: {
        include: {
          product: {
            select: { photo: true }
          }
        }
      }
    }
  });
  return user;
};

export default async function ProfileReview() {
  const user = await getReviews();

  return (
    <div className="p-5 pb-20">
      <h1 className="text-3xl font-bold text-white mb-6">내가 받은 리뷰</h1>
      <div className="flex flex-col gap-5">
        {user!.reviews.length === 0 ? (
          <p className="text-gray-400">아직 리뷰가 없습니다.</p>
        ) : (
          user!.reviews.map(review => (
            <div
              key={review.id}
              className="bg-neutral-800 border border-amber-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
              {review.product?.photo && (
                <div className="relative h-48">
                  <Image
                    src={review.product.photo}
                    alt="판매된 상품"
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-4 flex flex-col flex-1">
                <div className="flex items-center mb-2">
                  <span className="text-amber-400 font-bold mr-2">
                    {review.rating} / 5
                  </span>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 ${
                          i < review.rating ? 'text-amber-400' : 'text-gray-600'
                        }`}
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path d="M9.049 2.927C9.341 2.046 10.659 2.046 10.951 2.927l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.292.881-.755 1.611-1.54 1.118l-3.38-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.784.493-1.832-.237-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.13 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className="text-gray-300 flex-1">{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
