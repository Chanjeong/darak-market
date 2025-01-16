'use server';

import { z } from 'zod';

const checkPassword = ({
  password,
  password_confirm
}: {
  password: string;
  password_confirm: string;
}) => password === password_confirm;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '올바르지 않은 이름입니다',
        required_error: '사용자 이름은 필수입니다.'
      })
      .min(2, '최소 2자 이상 입력해주세요.')
      .max(20, '최대 20자까지만 입력 가능합니다.')
      .regex(
        /^[a-zA-Z0-9가-힣\s]*$/,
        '사용자 이름에 특수문자는 사용할 수 없습니다.'
      )
      .trim(),
    email: z
      .string({
        invalid_type_error: '올바르지 않은 이메일입니다',
        required_error: '이메일은 필수입니다.'
      })
      .email()
      .toLowerCase(),
    password: z
      .string()
      .min(10, '최소 10자 이상 입력해주세요.')
      .regex(/[a-zA-Z]/, '문자는 최소 1자 이상 포함되어야 합니다.')
      .regex(/[0-9]/, '숫자는 최소 1자 이상 포함되어야 합니다.'),
    password_confirm: z.string().min(10)
  })
  .refine(checkPassword, {
    message: '비밀번호가 동일하지 않습니다',
    path: ['password_confirm']
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
    password_confirm: formData.get('password_confirm')
  };

  const result = formSchema.safeParse(data);

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
  }
}
