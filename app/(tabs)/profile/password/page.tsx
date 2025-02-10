// app/profile/password/page.tsx
'use client';

import Input from '@/components/input';
import { useActionState } from 'react';
import { editPassword } from './editPassword';
import Button from '@/components/button';

export default function UpdatePasswordPage() {
  const [state, dispatch] = useActionState(editPassword, null);

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">비밀번호 변경</h1>
      <form action={dispatch} className="flex flex-col gap-4">
        <div>
          <Input
            type="text"
            name="currentPassword"
            defaultValue={state?.data.currentPassword?.toString() || ''}
            placeholder="기존 비밀번호"
            errors={state?.error.fieldErrors.currentPassword}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            name="newPassword"
            defaultValue={state?.data.newPassword?.toString() || ''}
            errors={state?.error.fieldErrors.newPassword}
            placeholder="새 비밀번호"
            required
          />
        </div>
        <div>
          <Input
            type="password"
            id="confirmNewPassword"
            name="confirmNewPassword"
            defaultValue={state?.data.confirmNewPassword?.toString() || ''}
            errors={state?.error.fieldErrors.confirmNewPassword}
            placeholder="비밀번호 확인"
            required
          />
        </div>
        <Button text="변경하기" />
      </form>
    </div>
  );
}
