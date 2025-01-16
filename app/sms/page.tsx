import Button from '@/components/button';
import Input from '@/components/input';
import { useActionState } from 'react';
import { smsVerification } from './smsVerification';

export default function SMSLogin() {
  const [state, dispatch] = useActionState(smsVerification, null);

  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-xl">휴대폰 인증</h1>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input name="phone" type="number" placeholder="전화번호" required />
        <Input name="token" type="number" placeholder="인증번호" required />
        <Button text="인증번호 전송" />
      </form>
    </div>
  );
}
