'use client';

import UploadComment from '@/app/posts/[id]/commentAction';
import { useActionState } from 'react';
import Input from './input';
import Button from './button';

export default function CommentList() {
  const [state, dispatch] = useActionState(UploadComment, null);

  return (
    <div className="flex flex-col gap-5">
      <span className="text-sm font-semibold text-neutral-400">댓글</span>
      <form action={dispatch} className="flex gap-2 w-full items-center">
        <Input name="comment" placeholder="댓글을 작성하세요" />
        <Button text="작성" />
      </form>
    </div>
  );
}
