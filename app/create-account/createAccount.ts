'use server';

import {
  PASSWORD_MIN,
  PASSWORD_MIN_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  REQUIRED_ERROR,
  TYPE_ERROR
} from '@/lib/constants';
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
        invalid_type_error: TYPE_ERROR,
        required_error: REQUIRED_ERROR
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
        invalid_type_error: TYPE_ERROR,
        required_error: REQUIRED_ERROR
      })
      .email(TYPE_ERROR)
      .toLowerCase(),
    password: z
      .string()
      .min(PASSWORD_MIN, PASSWORD_MIN_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    password_confirm: z.string()
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
    return {
      error: result.error.flatten(),
      data: data
    };
  } else {
    console.log(result.data);
  }
}
