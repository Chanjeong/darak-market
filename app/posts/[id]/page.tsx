import db from '@/lib/db';
import getSession from '@/lib/session';
import { formatToTime } from '@/lib/utils';
import { EyeIcon, XMarkIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import { notFound, redirect } from 'next/navigation';
import { revalidatePath, unstable_cache } from 'next/cache';
import LikeButton from '@/components/like-button';
import { getComments } from './commentAction';
import { CommentList } from '@/components/comment-list';

const getPost = async (postId: number) => {
  try {
    const post = await db.post.update({
      where: {
        id: postId
      },
      data: {
        views: {
          increment: 1
        }
      },
      include: {
        user: {
          select: {
            username: true,
            avatar: true
          }
        },
        _count: {
          select: {
            comments: true
          }
        }
      }
    });
    return post;
  } catch (e) {
    return null;
  }
};

const getCachedPost = unstable_cache(getPost, ['post-detail'], {
  tags: ['post-detail'],
  revalidate: 60
});

const getLikeStatus = async (postId: number, userId: number) => {
  const isLiked = await db.like.findUnique({
    where: {
      id: {
        postId,
        userId
      }
    }
  });

  const likeCount = await db.like.count({
    where: {
      postId
    }
  });

  return {
    likeCount,
    isLiked: Boolean(isLiked)
  };
};

async function getCachedLikeStatus(postId: number, userId: number) {
  const cacheKey = `like-status-${postId}-${userId}`;
  const cachedOperation = unstable_cache(
    postId => getLikeStatus(postId, userId),
    [cacheKey],
    { tags: [cacheKey] }
  );
  return cachedOperation(postId);
}

function getCachedComments(postId: number) {
  const cachedComments = unstable_cache(getComments, ['comments'], {
    tags: [`comments-${postId}`]
  });
  return cachedComments(postId);
}

const getOwner = async (id: number) => {
  const session = await getSession();
  if (session.id) {
    return session.id === id;
  }
  return false;
};

export default async function PostDetail({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const id = Number((await params).id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await getCachedPost(id);
  if (!post) {
    return notFound();
  }

  const session = await getSession();
  const { likeCount, isLiked } = await getCachedLikeStatus(id, session.id!);

  const allComments = await getCachedComments(post.id);
  const owner = await getOwner(post.userId);

  const deletePost = async () => {
    'use server';
    await db.post.deleteMany({
      where: { id }
    });
    revalidatePath('/life');
    redirect('/life');
  };
  return (
    <div className="p-5 text-white relative">
      {owner && (
        <>
          <div className="flex gap-3 absolute right-3 items-center">
            <form action={deletePost}>
              <button>
                <XMarkIcon className="size-8" />
              </button>
            </form>
            <a href={`/posts/${id}/edit`}>
              <button className="bg-amber-900 px-5 py-2.5 rounded-md text-white font-semibold">
                수정
              </button>
            </a>
          </div>
        </>
      )}

      <div className="flex items-center gap-2 mb-2">
        <Image
          width={28}
          height={28}
          className="size-7 rounded-full"
          src={post.user.avatar!}
          alt={post.user.username}
        />
        <div>
          <span className="text-sm font-semibold">{post.user.username}</span>
          <div className="text-xs">
            <span>{formatToTime(post.created_at.toString())}</span>
          </div>
        </div>
      </div>
      <h2 className="text-lg font-semibold">{post.title}</h2>
      <p className="mb-5">{post.description}</p>
      <div className="flex flex-col gap-5 items-start">
        <div className="flex items-center gap-2 text-neutral-400 text-sm">
          <EyeIcon className="size-5" />
          <span>조회 {post.views}</span>
        </div>
        <LikeButton isLiked={isLiked} likeCount={likeCount} postId={id} />
        <CommentList postId={id} allComments={allComments} />
      </div>
    </div>
  );
}
