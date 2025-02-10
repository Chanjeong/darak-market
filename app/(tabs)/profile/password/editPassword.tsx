'use server';

import db from '@/lib/db';
import bcrypt from 'bcrypt';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import {
  PASSWORD_MIN,
  PASSWORD_MIN_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
  REQUIRED_ERROR
} from '@/lib/constants';
import getSession from '@/lib/session';

const updatePasswordSchema = z
  .object({
    currentPassword: z.string({ required_error: REQUIRED_ERROR }),
    newPassword: z
      .string({ required_error: REQUIRED_ERROR })
      .min(PASSWORD_MIN, PASSWORD_MIN_ERROR)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirmNewPassword: z.string({ required_error: REQUIRED_ERROR })
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    message: '새 비밀번호가 일치하지 않습니다.',
    path: ['confirmNewPassword']
  });

export async function editPassword(_: any, formData: FormData) {
  const data = {
    currentPassword: formData.get('currentPassword'),
    newPassword: formData.get('newPassword'),
    confirmNewPassword: formData.get('confirmNewPassword')
  };

  const result = await updatePasswordSchema.safeParseAsync(data);
  if (!result.success) {
    return {
      error: result.error.flatten(),
      data
    };
  }

  const session = await getSession();

  const user = await db.user.findUnique({
    where: { id: session.id },
    select: { password: true }
  });

  const isMatch = await bcrypt.compare(
    result.data.currentPassword,
    user!.password!
  );
  if (!isMatch) {
    return {
      error: {
        fieldErrors: {
          currentPassword: ['현재 비밀번호가 올바르지 않습니다.'],
          newPassword: [],
          confirmNewPassword: []
        }
      },
      data
    };
  }

  const hashedNewPassword = await bcrypt.hash(result.data.newPassword, 10);
  await db.user.update({
    where: { id: session.id },
    data: { password: hashedNewPassword }
  });

  redirect('/profile');
}
