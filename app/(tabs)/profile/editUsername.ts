'use server';

import { CHECKUNIQUE, REQUIRED_ERROR, TYPE_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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

const usernameSchema = z.object({
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
    .refine(checkUsernameUnique, CHECKUNIQUE)
});

export default async function editUsername(_: any, formData: FormData) {
  const username = formData.get('username');

  const result = await usernameSchema.safeParseAsync({ username });

  if (!result.success) {
    return {
      error: result.error.flatten(),
      username
    };
  } else {
    const session = await getSession();
    await db.user.update({
      where: {
        id: session.id
      },
      data: {
        username: result.data.username
      }
    });
    redirect('/profile');
  }
}
