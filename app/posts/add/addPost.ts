'use server';

import { REQUIRED_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const postSchema = z.object({
  title: z.string({ required_error: REQUIRED_ERROR }).min(0),
  description: z.string({ required_error: REQUIRED_ERROR })
});

export default async function addPost(_: any, formData: FormData) {
  const data = {
    title: formData.get('title'),
    description: formData.get('description')
  };

  const result = postSchema.safeParse(data);

  if (!result.success) {
    return {
      data,
      errors: result.error.flatten()
    };
  } else {
    const session = await getSession();
    if (session.id) {
      await db.post.create({
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
      redirect('/life');
    }
  }
}
