'use server';

import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidateTag } from 'next/cache';

export async function createComment(payload: string, postId: number) {
  const user = await getSession();
  if (!user.id) return;
  const newComment = await db.comment.create({
    data: {
      userId: user.id,
      payload,
      postId: postId
    }
  });
  revalidateTag(`comments-${postId}`);
  return newComment;
}
export async function getComments(postId: number) {
  const comments = await db.comment.findMany({
    where: {
      postId: postId
    },
    include: {
      user: {
        select: { username: true, avatar: true }
      }
    }
  });
  return comments;
}
