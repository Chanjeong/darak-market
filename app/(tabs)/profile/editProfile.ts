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

const profileSchema = z.object({
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
  avatar: z
    .string({ required_error: REQUIRED_ERROR })
    .min(1, '사진은 필수입니다')
});

export default async function editUsername(_: any, formData: FormData) {
  const username = formData.get('username');
  const avatar = formData.get('avatar');

  const result = await profileSchema.safeParseAsync({ username, avatar });

  if (!result.success) {
    return {
      error: result.error.flatten(),
      username
    };
  } else {
    let avatarUrl: string | undefined;
    if (avatar instanceof File && avatar.size > 0) {
      const avatarData = await avatar.arrayBuffer();
      const base64Avatar = Buffer.from(avatarData).toString('base64');
      avatarUrl = `data:${avatar.type};base64,${base64Avatar}`;
    }
    const session = await getSession();
    await db.user.update({
      where: {
        id: session.id
      },
      data: {
        username: result.data.username,
        avatar: result.data.avatar
      }
    });
    redirect('/profile');
  }
}
