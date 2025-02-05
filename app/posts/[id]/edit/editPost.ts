'use server';

import fs from 'fs/promises';
import getSession from '@/lib/session';
import { REQUIRED_ERROR, TYPE_ERROR } from '../../../../lib/constants';
import { z } from 'zod';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const postSchema = z.object({
  id: z.coerce.number(),
  title: z.string({ required_error: REQUIRED_ERROR }).min(0),
  description: z.string({ required_error: REQUIRED_ERROR }).min(0)
});

export async function editPost(_: any, formData: FormData) {
  const data = {
    title: formData.get('title'),
    description: formData.get('description'),
    id: formData.get('id')
  };

  const result = postSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten(),
      data: data
    };
  } else {
    const session = await getSession();
    if (session.id) {
      await db.post.update({
        where: { id: result.data.id },
        data: {
          title: result.data.title,
          description: result.data.description,
          user: {
            connect: {
              id: session.id
            }
          }
        }
      });
      revalidatePath('/life');
      revalidatePath(`/posts/${result.data.id}`);
      redirect('/life');
    }
  }
}
