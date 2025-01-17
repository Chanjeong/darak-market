'use server';

import {
  PASSWORD_MIN,
  PASSWORD_MIN_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  REQUIRED_ERROR,
  TYPE_ERROR
} from '@/lib/constants';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const formSchema = z.object({
  email: z
    .string({
      invalid_type_error: TYPE_ERROR,
      required_error: REQUIRED_ERROR
    })
    .email(TYPE_ERROR)
    .toLowerCase(),
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
  const result = formSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.flatten(),
      data: data
    };
  } else {
    redirect('/');
  }
}
