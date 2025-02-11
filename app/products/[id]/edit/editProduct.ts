'use server';

import fs from 'fs/promises';
import getSession from '@/lib/session';
import { REQUIRED_ERROR, TYPE_ERROR } from '../../../../lib/constants';
import { z } from 'zod';
import db from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const productSchema = z.object({
  id: z.coerce.number(),
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

export async function editProduct(_: any, formData: FormData) {
  const data = {
    photo: formData.get('photo'),
    title: formData.get('title'),
    price: formData.get('price'),
    description: formData.get('description'),
    id: formData.get('id')
  };

  if (data.photo instanceof File) {
    const photoData = await data.photo.arrayBuffer();
    const base64Image = Buffer.from(photoData).toString('base64');
    data.photo = `data:${data.photo.type};base64,${base64Image}`;
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
      await db.product.update({
        where: { id: result.data.id },
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
      revalidatePath(`/products/${result.data.id}`);
      redirect('/products');
    }
  }
}
