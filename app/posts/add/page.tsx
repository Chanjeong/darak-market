'use client';

import Input from '@/components/input';
import { useActionState } from 'react';
import Button from '@/components/button';
import addPost from './addPost';

export default function AddPost() {
  const [state, dispatch] = useActionState(addPost, null);

  return (
    <div>
      <div className="p-5 flex items-center justify-center text-2xl font-semibold">
        이모저모 작성하기
      </div>
      <form action={dispatch} className="flex flex-col gap-5 p-5">
        <Input
          name="title"
          type="text"
          defaultValue={state?.data.title?.toString() || ''}
          errors={state?.errors.fieldErrors.title}
          required
          placeholder="제목"
        />
        <div className="flex flex-col">
          <textarea
            name="description"
            placeholder="설명"
            required
            defaultValue={state?.data.description?.toString() || ''}
            className="w-full h-24 bg-transparent rounded-md 
                            ring-1 ring-neutral-200 placeholder:text-neutral-400 transition
                            focus:ring-2 focus:ring-amber-700 border-none focus:outline-none p-2 resize-none"
          />
          {state?.errors.fieldErrors.description && (
            <p className="text-red-500 text-sm">
              {state.errors.fieldErrors.description}
            </p>
          )}
        </div>
        <Button text="작성하기" />
      </form>
    </div>
  );
}
