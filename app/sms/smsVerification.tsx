'use server';

import { REQUIRED_ERROR, TYPE_ERROR } from '@/lib/constants';
import { z } from 'zod';

export async function smsVerification(prevState: any, formData: FormData) {
  const data = {
    phone: formData.get('phone'),
    token: formData.get('token')
  };
}
