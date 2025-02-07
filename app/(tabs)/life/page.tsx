import db from '@/lib/db';
import { formatToTime } from '@/lib/utils';
import {
  ChatBubbleBottomCenterIcon,
  HandThumbUpIcon
} from '@heroicons/react/24/outline';
import { PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { Prisma } from '@prisma/client';
import { PostList } from '@/components/post-list';

const getInitialPosts = async () => {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      created_at: true,
      _count: {
        select: {
          comments: true,
          likes: true
        }
      }
    },
    take: 1,
    orderBy: {
      created_at: 'desc'
    }
  });
  return posts;
};

export const metadata = {
  title: '이모저모'
};

export type InitialPosts = Prisma.PromiseReturnType<typeof getInitialPosts>;

export default async function Life() {
  const initialPosts = await getInitialPosts();

  return (
    <div>
      <PostList initialPosts={initialPosts} />
    </div>
  );
}
