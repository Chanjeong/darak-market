'use client';
import Button from '@/components/button';
import Input from '@/components/input';
import { useActionState } from 'react';
import { smsLogin } from './smsLogin';

const initialState = {
  token: false,
  error: undefined
};

export default function SMSLogin() {
  const [state, dispatch] = useActionState(smsLogin, initialState);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-xl">휴대폰 인증</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        {state.token ? (
          <Input
            name="token"
            type="text"
            placeholder="인증번호"
            defaultValue={state?.tokenData?.toString()}
            min={100000}
            max={999999}
            errors={state.errors?.formErrors}
            required
          />
        ) : (
          <Input
            name="phone"
            type="text"
            placeholder="전화번호"
            defaultValue={state?.phoneData?.toString()}
            errors={state.errors?.formErrors}
            required
          />
        )}
        <Button text={state.token ? '인증하기' : '인증번호 전송'} />
      </form>
    </div>
  );
}
