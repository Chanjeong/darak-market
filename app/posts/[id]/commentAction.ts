import { REQUIRED_ERROR } from '@/lib/constants';
import { z } from 'zod';

const commentSchema = z.object({
  comment: z.string({ required_error: REQUIRED_ERROR })
});

export default function UploadComment(_: any, formData: FormData) {
  const data = {
    comment: formData.get('comment')
  };

  const result = commentSchema.safeParse(data);

  if (!result.success) {
    return {
      errors: result.error.flatten()
    };
  } else {
  }
}
