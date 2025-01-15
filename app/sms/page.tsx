import FormButton from '@/components/form-button';
import FormInput from '@/components/form-input';

export default function SMSLogin() {
  return (
    <div className="flex flex-col gap-10 px-6 py-8">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-xl">SMS 로그인</h1>
      </div>
      <form className="flex flex-col gap-3">
        <FormInput
          name="phone_number"
          type="number"
          placeholder="전화번호"
          required
        />
        <FormInput
          name="verification_code"
          type="number"
          placeholder="인증번호"
          required
        />
        <FormButton text="인증번호 전송" />
      </form>
    </div>
  );
}
