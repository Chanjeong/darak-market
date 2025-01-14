import FormButton from '@/components/form-button'
import FormInput from '@/components/form-input'
import SocialLogin from '@/components/social-login'

export default function Login() {
  return (
    <div className='flex flex-col gap-10 px-6 py-8'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-xl'>하루만 필요한 물건이 있으세요?</h1>
        <h2>다락마켓과 함께해요!</h2>
      </div>
      <form className='flex flex-col gap-3'>
        <FormInput type='email' placeholder='이메일' required errors={['']}/>
        <FormInput type='password' placeholder='비밀번호' required errors={['']}/>
        <FormButton text='로그인' loading={false}/>
      </form>
      <SocialLogin/>
    </div>
  )
}