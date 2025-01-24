'use server';

import {
  PASSWORD_MIN,
  PASSWORD_MIN_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  REQUIRED_ERROR,
  TYPE_ERROR
} from '@/lib/constants';
import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { handleUserSession } from '@/lib/userSessionHandler';

const checkEmailExists = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email
    },
    select: {
      id: true
    }
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string({
      invalid_type_error: TYPE_ERROR,
      required_error: REQUIRED_ERROR
    })
    .email(TYPE_ERROR)
    .toLowerCase()
    .refine(checkEmailExists, '존재하지 않는 값입니다.'),
  password: z
    .string({
      invalid_type_error: TYPE_ERROR,
      required_error: REQUIRED_ERROR
    })
    .min(PASSWORD_MIN, PASSWORD_MIN_ERROR)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  };
  const result = await formSchema.safeParseAsync(data);

  if (!result.success) {
    return {
      error: result.error.flatten(),
      data: data
    };
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email
      },
      select: {
        password: true,
        id: true
      }
    });
    const good = await bcrypt.compare(
      result.data.password,
      user!.password ?? ''
    );

    if (good) {
      await handleUserSession(user!.id);
    } else {
      return {
        error: {
          fieldErrors: {
            password: ['잘못된 비밀번호입니다'],
            email: []
          }
        },
        data: data
      };
    }
  }
}
