'use server';

import { REQUIRED_ERROR, TYPE_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';
import fs from 'fs/promises';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const productSchema = z.object({
  title: z.string({ required_error: REQUIRED_ERROR }).min(0),
  photo: z
    .string({ required_error: REQUIRED_ERROR })
    .min(1, '사진은 필수입니다'),
  price: z
    .string({
      required_error: REQUIRED_ERROR,
      invalid_type_error: TYPE_ERROR
    })
    .min(0),
  description: z.string({ required_error: REQUIRED_ERROR }).min(0)
});

export async function addProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description')
  };
  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    await fs.appendFile(`./public/${data.photo.name}`, Buffer.from(photoData));
    data.photo = `/${data.photo.name}`;
  }
  const result = productSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten(),
      data: data
    };
  } else {
    const session = await getSession();
    if (session.id) {
      await db.product.create({
        data: {
          title: result.data.title,
          photo: result.data.photo,
          price: Number(result.data.price.replaceAll(',', '')),
          description: result.data.description,
          user: {
            connect: {
              id: session.id
            }
          }
        }
      });
      revalidatePath('/products');
      redirect('/products');
    }
  }
}
