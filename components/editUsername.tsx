'use client';

import editUsername from '@/app/(tabs)/profile/editUsername';
import { useActionState, useState } from 'react';
import Input from './input';
import Button from './button';

interface InitialUsernameProps {
  initialUsername: string;
}

export default function EditUsername({
  initialUsername
}: InitialUsernameProps) {
  const [username, setUsername] = useState(initialUsername);
  const [isEditing, setIsEditing] = useState(false);
  const [state, dispatch] = useActionState(editUsername, null);

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form action={dispatch} className="flex items-start gap-2">
          <div className="flex flex-col">
            <input
              name="username"
              type="text"
              defaultValue={username}
              onChange={e => setUsername(e.target.value)}
              className="px-2 py-1 rounded border w-40 text-black"
            />
            {state?.error.fieldErrors.username && (
              <p className="text-red-500 text-sm">
                {state?.error.fieldErrors.username}
              </p>
            )}
          </div>
          <button className="text-sm ">저장</button>
          <button
            type="button"
            onClick={() => {
              setIsEditing(false);
              setUsername(initialUsername);
            }}
            className="text-sm text-red-500">
            취소
          </button>
        </form>
      ) : (
        <>
          <span className="text-2xl font-bold text-white">{username}</span>
          <button
            onClick={() => setIsEditing(true)}
            className="text-sm text-amber-300 hover:underline">
            수정
          </button>
        </>
      )}
    </div>
  );
}
