'use server';

import {
  CHECKUNIQUE,
  PASSWORD_MIN,
  PASSWORD_MIN_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  REQUIRED_ERROR,
  TYPE_ERROR
} from '@/lib/constants';
import db from '@/lib/db';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import { handleUserSession } from '@/lib/userSessionHandler';
import { redirect } from 'next/navigation';

const checkPassword = ({
  password,
  password_confirm
}: {
  password: string;
  password_confirm: string;
}) => password === password_confirm;

const checkUsernameUnique = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username
    },
    select: {
      id: true
    }
  });
  return !Boolean(user);
};

const checkEmailUnique = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });
  return !Boolean(user);
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: TYPE_ERROR,
        required_error: REQUIRED_ERROR
      })
      .min(2, '최소 2자 이상 입력해주세요.')
      .max(20, '최대 20자까지만 입력 가능합니다.')
      .trim()
      .regex(
        /^[a-zA-Z0-9가-힣\s]*$/,
        '사용자 이름에 특수문자는 사용할 수 없습니다.'
      )
      .refine(checkUsernameUnique, CHECKUNIQUE),
    email: z
      .string({
        invalid_type_error: TYPE_ERROR,
        required_error: REQUIRED_ERROR
      })
      .email(TYPE_ERROR)
      .toLowerCase()
      .refine(checkEmailUnique, CHECKUNIQUE),
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

  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      error: result.error.flatten(),
      data: data
    };
  } else {
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword
      },
      select: {
        id: true
      }
    });
    await handleUserSession(user.id);
    redirect('/profile');
  }
}
