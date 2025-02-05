'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { useActionState, useState } from 'react';
import { editPost } from './editPost';

interface EditProductProps {
  post: {
    id: number;
    title: string;
    description: string | null;
  };
}

export default function PostEdit({ post }: EditProductProps) {
  const [state, dispatch] = useActionState(editPost, null);

  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-5 p-5">
        <input type="hidden" name="id" value={post.id} />
        <Input
          name="title"
          type="text"
          defaultValue={state?.data.title?.toString() || post.title}
          errors={state?.errors.fieldErrors.title}
          required
          placeholder="제목"
        />

        <div className="flex flex-col">
          <textarea
            name="description"
            placeholder="설명"
            required
            defaultValue={
              state?.data.description?.toString() || post.description || ''
            }
            className="w-full h-24 bg-transparent rounded-md ring-1 ring-neutral-200 placeholder:text-neutral-400 transition focus:ring-2 focus:ring-amber-700 border-none focus:outline-none p-2 resize-none"
          />
          {state?.errors.fieldErrors.description && (
            <p className="text-red-500 text-sm">
              {state.errors.fieldErrors.description}
            </p>
          )}
        </div>

        <Button text="수정하기" />
      </form>
    </div>
  );
}
