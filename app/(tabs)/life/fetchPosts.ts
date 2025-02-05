'use server';

import db from '@/lib/db';

export async function fetchPostPage(page: number) {
  const numOfPosts = 1;
  const posts = await db.post.findMany({
    select: {
      id: true,
      created_at: true,
      title: true,
      description: true,
      views: true,
      _count: {
        select: {
          comments: true,
          likes: true
        }
      }
    },
    skip: page * numOfPosts,
    take: numOfPosts,
    orderBy: {
      created_at: 'desc'
    }
  });
  return posts;
}
