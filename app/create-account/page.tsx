import FormButton from '@/components/form-button'
import FormInput from '@/components/form-input'
import SocialLogin from '@/components/social-login'

export default function page() {
  return (
    <div className='flex flex-col gap-10 px-6 py-8'>
      <div className='flex flex-col gap-2 *:font-medium'>
        <h1 className='text-2xl'>안녕하세요!</h1>
        <h1 className='text-xl'>회원가입</h1>
      </div>
      <form className='flex flex-col gap-3'>
        <FormInput type='text' placeholder='사용자 이름' required errors={['']}/>
        <FormInput type='email' placeholder='이메일' required errors={['']}/>
        <FormInput type='password' placeholder='비밀번호' required errors={['']}/>
        <FormInput type='password' placeholder='비밀번호 확인' required errors={['']}/>
        <FormButton text='회원가입' loading={false}/>
      </form>
      <SocialLogin/>
    </div>
  )
}
