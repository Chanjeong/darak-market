'use server';

import { CHECKUNIQUE, REQUIRED_ERROR, TYPE_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { redirect } from 'next/navigation';
import { z } from 'zod';

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
    ),
  avatar: z
    .string({ required_error: REQUIRED_ERROR })
    .min(1, '사진은 필수입니다')
});

export default async function editProfile(_: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    avatar: formData.get('avatar')
  };

  if (data.avatar instanceof File) {
    const avatarData = await data.avatar.arrayBuffer();
    const base64Avatar = Buffer.from(avatarData).toString('base64');
    data.avatar = `data:${data.avatar.type};base64,${base64Avatar}`;
  }

  const result = profileSchema.safeParse(data);

  if (!result.success) {
    return {
      error: result.error.flatten(),
      data: data
    };
  } else {
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
