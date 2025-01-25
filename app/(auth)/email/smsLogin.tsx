'use server';
import { z } from 'zod';
import validator from 'validator';
import crypto from 'crypto';
import { redirect } from 'next/navigation';
import { REQUIRED_ERROR, TYPE_ERROR } from '@/lib/constants';
import db from '@/lib/db';
import { handleUserSession } from '@/lib/userSessionHandler';
import { sendVerificationEmail } from '@/lib/verificationEmail';

const tokenExists = async (token: number) => {
  const exists = await db.sMSToken.findUnique({
    where: {
      token
    },
    select: { id: true }
  });

  return Boolean(exists);
};

const emailSchema = z
  .string({ required_error: REQUIRED_ERROR })
  .trim()
  .toLowerCase()
  .refine(email => validator.isEmail(email), TYPE_ERROR);

const tokenSchema = z.coerce
  .number({ message: TYPE_ERROR, required_error: REQUIRED_ERROR })
  .min(10000000, '입력값이 너무 작습니다')
  .max(99999999, '입력값이 너무 큽니다')
  .refine(tokenExists, TYPE_ERROR);

interface ActionState {
  token: boolean;
}

const getToken = async () => {
  const token = crypto.randomInt(10000000, 99999999);
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
  const emailData = formData.get('email');
  const tokenData = formData.get('token');

  if (!prevState.token) {
    const result = emailSchema.safeParse(emailData);
    if (!result.success) {
      return {
        token: false,
        emailData,
        errors: result.error.flatten()
      };
    } else {
      await db.sMSToken.deleteMany({
        where: {
          user: {
            email: result.data
          }
        }
      });
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                email: result.data
              },
              create: {
                username: crypto.randomBytes(10).toString('hex'),
                email: result.data
              }
            }
          }
        }
      });
      await sendVerificationEmail(result.data, token);
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
