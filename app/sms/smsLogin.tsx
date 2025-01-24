'use server';
import { z } from 'zod';
import validator from 'validator';
import crypto from 'crypto';
import { redirect } from 'next/navigation';
import { REQUIRED_ERROR, TYPE_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import getSession from '@/lib/session';
import { handleUserSession } from '@/lib/userSessionHandler';

const tokenExists = async (token: number) => {
  const exists = await db.sMSToken.findUnique({
    where: {
      token
    },
    select: { id: true }
  });

  return Boolean(exists);
};

const phoneSchema = z
  .string({
    required_error: REQUIRED_ERROR
  })
  .trim()
  .refine(phone => validator.isMobilePhone(phone, 'ko-KR'), TYPE_ERROR);
const tokenSchema = z.coerce
  .number({ message: TYPE_ERROR, required_error: REQUIRED_ERROR })
  .min(100000, TYPE_ERROR)
  .max(999999, TYPE_ERROR)
  .refine(tokenExists, TYPE_ERROR);

interface ActionState {
  token: boolean;
}

const getToken = async () => {
  const token = crypto.randomInt(100000, 999999);
  const exists = await db.sMSToken.findUnique({
    where: {
      token
    },
    select: {
      id: true
    }
  });
  if (exists) {
    return getToken();
  } else {
    return token;
  }
};

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
      await db.sMSToken.deleteMany({
        where: {
          user: {
            phone: result.data
          }
        }
      });
      await db.sMSToken.create({
        data: {
          token: await getToken(),
          user: {
            connectOrCreate: {
              where: {
                phone: result.data
              },
              create: {
                username: crypto.randomBytes(10).toString('hex'),
                phone: result.data
              }
            }
          }
        }
      });
      return {
        token: true
      };
    }
  } else {
    const result = await tokenSchema.safeParseAsync(tokenData);
    if (!result.success) {
      return {
        token: true,
        tokenData,
        errors: result.error.flatten()
      };
    } else {
      const token = await db.sMSToken.findUnique({
        where: {
          token: result.data
        },
        select: {
          id: true,
          userId: true
        }
      });
      await handleUserSession(token!.userId);
      await db.sMSToken.delete({
        where: {
          id: token!.id
        }
      });
      redirect('/profile');
    }
  }
}
