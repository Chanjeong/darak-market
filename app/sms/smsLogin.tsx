'use server';
import { z } from 'zod';
import validator, { isMobilePhone } from 'validator';
import { redirect } from 'next/navigation';
import { REQUIRED_ERROR, TYPE_ERROR } from '@/lib/constants';

const phoneSchema = z
  .string({
    required_error: REQUIRED_ERROR
  })
  .trim()
  .refine(phone => validator.isMobilePhone(phone, 'ko-KR'), TYPE_ERROR);
const tokenSchema = z.coerce
  .number({ message: TYPE_ERROR, required_error: REQUIRED_ERROR })
  .min(100000, TYPE_ERROR)
  .max(999999, TYPE_ERROR);

interface ActionState {
  token: boolean;
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  const phoneData = formData.get('phone');
  const tokenData = formData.get('token');

  if (!prevState.token) {
    const result = phoneSchema.safeParse(phoneData);
    if (!result.success) {
      return {
        token: false,
        phoneData,
        errors: result.error.flatten()
      };
    } else {
      return {
        token: true
      };
    }
  } else {
    const result = tokenSchema.safeParse(tokenData);
    if (!result.success) {
      return {
        token: true,
        tokenData,
        errors: result.error.flatten()
      };
    } else {
      redirect('/');
    }
  }
}
