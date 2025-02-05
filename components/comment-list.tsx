'use client';
import { createComment } from '@/app/posts/[id]/commentAction';
import { PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { formatToTime } from '@/lib/utils';
import Image from 'next/image';
import { FormEvent, startTransition, useOptimistic } from 'react';

interface ICommentListProps {
  allComments: {
    user: {
      avatar: string | null;
      username: string;
    };
    id: number;
    payload: string;
    userId: number;
    postId: number;
    created_at: Date;
    updated_at: Date;
  }[];
  postId: number;
}
export function CommentList({ allComments, postId }: ICommentListProps) {
  const [comments, reducerFn] = useOptimistic(
    allComments,
    (prevState, newComment: any) => {
      return [...prevState, newComment];
    }
  );
  const handleSubmit = async (payload: string) => {
    startTransition(() => {
      reducerFn({
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        id: Date.now() + Math.random(),
        payload,
        postId: postId,
        user: {
          username: 'Optimistic User',
          avatar: '/default-avatar.png'
        }
      });
    });
    await createComment(payload, postId);
  };
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const payload = formData.get('payload') as string;
    if (!payload.trim()) return;
    e.currentTarget.reset();
    await handleSubmit(payload);
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <span className="text-neutral-400">댓글 {comments.length}</span>
      <form onSubmit={onSubmit} className="flex items-center gap-3 w-full">
        <input
          name="payload"
          placeholder="댓글을 작성해주세요"
          className="w-full h-10 bg-transparent rounded-md 
          ring-1 ring-neutral-200 placeholder:text-neutral-400 transition
          focus:ring-2 focus:ring-amber-700 border-none focus:outline-none"
        />
        <button type="submit">
          <PaperAirplaneIcon className="size-8 text-amber-900" />
        </button>
      </form>
      <div className="flex flex-col ">
        {comments.map(comment => (
          <div
            key={comment.id}
            className="flex gap-3 px-1 py-3 pb-5 border-b border-neutral-400 last:border-0">
            <div className="relative flex items-center size-8 rounded-full overflow-hidden">
              <Image
                src={comment.user.avatar || null}
                alt={comment.user.username}
                fill
              />
            </div>
            <div className="flex flex-col gap-3">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <div>{comment.user.username}</div>
                </div>
                <div className="text-xs text-neutral-500">
                  {formatToTime(comment.created_at.toString())}
                </div>
              </div>
              <div>{comment.payload}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
