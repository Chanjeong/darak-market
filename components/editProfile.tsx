'use client';

import editUsername from '@/app/(tabs)/profile/editProfile';
import { useActionState, useState } from 'react';
import Input from './input';
import Button from './button';
import Image from 'next/image';

interface InitialUsernameProps {
  initialUsername: string;
  initialAvatar: string;
}

export default function EditProfile({
  initialUsername,
  initialAvatar
}: InitialUsernameProps) {
  const [avatarPreview, setAvatarPreview] = useState(initialAvatar);
  const [username, setUsername] = useState(initialUsername);
  const [isEditing, setIsEditing] = useState(false);
  const [state, dispatch] = useActionState(editUsername, null);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form action={dispatch} className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-amber-800 cursor-pointer">
              <label
                htmlFor="avatar"
                className="w-full h-full flex items-center justify-center cursor-pointer bg-center bg-cover"
                style={{ backgroundImage: `url(${avatarPreview})` }}></label>
            </div>
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </div>
          <div className="flex gap-2">
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
                setAvatarPreview(initialAvatar);
              }}
              className="text-sm text-red-500">
              취소
            </button>
          </div>
          <div>{state?.data.avatar?.toString()}</div>
        </form>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-amber-800">
            {avatarPreview && (
              <Image
                src={avatarPreview}
                alt={username}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="flex gap-2">
            <span className="text-2xl font-bold text-white">{username}</span>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-amber-300 hover:underline">
              수정
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
