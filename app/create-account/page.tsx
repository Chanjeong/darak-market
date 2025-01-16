'use client';

import Input from '@/components/input';
import SocialLogin from '@/components/social-login';
import { useActionState } from 'react';
import { createAccount } from './createAccount';
import Button from '@/components/button';
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
          required
          errors={state?.fieldErrors.username}
        />
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          required
          errors={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="password_confirm"
          type="password"
          placeholder="비밀번호 확인"
          required
          errors={state?.fieldErrors.password_confirm}
        />
        <Button text="회원가입" />
      </form>
      <SocialLogin />
    </div>
  );
}
