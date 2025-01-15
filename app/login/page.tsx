'use client';

import FormButton from '@/components/form-button';
import FormInput from '@/components/form-input';
import SocialLogin from '@/components/social-login';
import { onSubmit } from './actions';
import { useActionState } from 'react';

export default function Login() {
  const [state, action] = useActionState(onSubmit, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-xl">하루만 필요한 물건이 있으세요?</h1>
        <h2>다락마켓과 함께해요!</h2>
      </div>
      <form action={action} className="flex flex-col gap-3">
        <FormInput name="email" type="email" placeholder="이메일" required />
        <FormInput
          name="password"
          type="password"
          placeholder="비밀번호"
          required
        />
        <FormButton text="로그인" />
      </form>
      <SocialLogin />
    </div>
  );
}
