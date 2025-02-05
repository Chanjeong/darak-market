import db from '@/lib/db';
import { notFound } from 'next/navigation';
import PostEdit from './edit-post';

export const getPost = async (id: number) => {
  const post = await db.post.findUnique({
    where: {
      id
    }
  });
  return post;
};

export const metadata = {
  title: '수정하기'
};

export default async function DeletePost({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const pId = Number((await params).id);
  if (isNaN(pId)) {
    return notFound();
  }
  const post = await getPost(pId);
  if (!post) {
    return notFound();
  }

  if (!post) {
    return notFound();
  }
  return <PostEdit post={post} />;
}
