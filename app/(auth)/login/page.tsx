'use client';

import SocialLogin from '@/components/social-login';
import { login } from './login';
import { useActionState } from 'react';
import Input from '@/components/input';
import Button from '@/components/button';
import { PASSWORD_MIN } from '@/lib/constants';

export default function Login() {
  const [state, dispatch] = useActionState(login, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-xl">필요한 물건이 있으세요?</h1>
        <h2>다락마켓과 함께해요!</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="이메일"
          defaultValue={state?.data.email?.toString() || ''}
          errors={state?.error.fieldErrors.email}
          required
        />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          defaultValue={state?.data.password?.toString() || ''}
          minLength={PASSWORD_MIN}
          errors={state?.error.fieldErrors.password}
          required
        />
        <Button text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
