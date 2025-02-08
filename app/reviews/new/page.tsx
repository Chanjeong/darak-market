import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

async function saveReview(formData: FormData) {
  'use server';
  const revieweeId = formData.get('revieweeId')?.toString();
  const productId = formData.get('productId')?.toString();
  const rating = formData.get('rating')?.toString();
  const comment = formData.get('comment')?.toString() || '';

  if (!revieweeId || !productId || !rating) {
    return notFound();
  }
  const session = await getSession();
  if (!session?.id) {
    return notFound();
  }
  await db.review.create({
    data: {
      rating: parseInt(rating, 10),
      comment,
      reviewee: { connect: { id: parseInt(revieweeId, 10) } },
      product: { connect: { id: parseInt(productId, 10) } }
    }
  });
  redirect('/products');
}

export default async function NewReview({
  searchParams
}: {
  searchParams: Promise<{ revieweeId: string; productId: string }>;
}) {
  return (
    <div className="p-5 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-5">리뷰 작성</h1>
      <form action={saveReview} className="flex flex-col gap-3">
        <input
          type="hidden"
          name="revieweeId"
          value={(await searchParams).revieweeId}
        />
        <input
          type="hidden"
          name="productId"
          value={(await searchParams).productId}
        />
        <label>
          평점 (1 ~ 5):
          <input
            type="number"
            name="rating"
            min="1"
            max="5"
            required
            className="w-full h-10 bg-transparent rounded-md 
          ring-1 ring-neutral-200 placeholder:text-neutral-400 transition
          focus:ring-2 focus:ring-amber-700 border-none focus:outline-none"
          />
        </label>
        <label>
          리뷰 내용:
          <textarea
            name="comment"
            rows={4}
            className="w-full h-10 bg-transparent rounded-md 
          ring-1 ring-neutral-200 placeholder:text-neutral-400 transition
          focus:ring-2 focus:ring-amber-700 border-none focus:outline-none"></textarea>
        </label>
        <button type="submit" className="bg-amber-900 text-white p-2 rounded">
          리뷰 등록
        </button>
      </form>
    </div>
  );
}
