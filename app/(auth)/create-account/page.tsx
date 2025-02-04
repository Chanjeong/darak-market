'use client';

import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useActionState } from 'react';
import { createAccount } from './createAccount';
import Button from '@/components/button';
import { PASSWORD_MIN } from '@/lib/constants';

export default function CreateAccount() {
  const [state, dispatch] = useActionState(createAccount, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-xl">회원가입</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="username"
          type="text"
          placeholder="사용자 이름"
          defaultValue={state?.data.username?.toString() || ''}
          required
          minLength={2}
          errors={state?.error.fieldErrors.username}
        />
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          defaultValue={state?.data.email?.toString() || ''}
          required
          errors={state?.error.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          defaultValue={state?.data.password?.toString() || ''}
          minLength={PASSWORD_MIN}
          required
          errors={state?.error.fieldErrors.password}
        />
        <Input
          name="password_confirm"
          type="password"
          placeholder="비밀번호 확인"
          defaultValue={state?.data.password_confirm?.toString() || ''}
          minLength={PASSWORD_MIN}
          required
          errors={state?.error.fieldErrors.password_confirm}
        />
        <Button text="회원가입" />
      </form>
      <SocialLogin />
    </div>
  );
}
