'use client';

import Button from '@/components/button';
import Input from '@/components/input';
import { formatToWon } from '@/lib/utils';
import { useActionState, useState } from 'react';
import { editProduct } from './editProduct';

interface EditProductProps {
  product: {
    id: number;
    title: string;
    photo: string;
    price: number;
    description: string;
  };
}

export default function ProductEdit({ product }: EditProductProps) {
  const [image, setImage] = useState(product.photo);
  const [price, setPrice] = useState(formatToWon(product.price));
  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files }
    } = event;

    if (!files || files.length === 0) {
      return;
    }

    const file = files[0];

    if (!file.type || !file.type.startsWith('image/')) {
      return;
    }

    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      return;
    }

    const url = URL.createObjectURL(file);
    setImage(url);
  };
  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, '');
    const formattedPrice = formatToWon(Number(rawValue.replaceAll(',', '')));
    setPrice(formattedPrice);
  };

  const [state, dispatch] = useActionState(editProduct, null);
  const isBlobUrl = image.startsWith('blob:');
  const isBase64 = image.startsWith('data:image');
  const isPhotoValid = image !== '';

  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="w-full h-80 border border-neutral-400 flex flex-col items-center justify-center 
          cursor-pointer bg-center bg-cover"
          style={{
            backgroundImage:
              isBlobUrl || isBase64 ? `url(${image})` : `url(/${image})`
          }}></label>
        <input
          onChange={uploadImage}
          type="file"
          required
          id="photo"
          name="photo"
          className="hidden"
        />
        <input type="hidden" name="id" value={product.id} />
        <Input
          name="title"
          type="text"
          defaultValue={state?.data.title?.toString() || product.title}
          errors={state?.errors.fieldErrors.title}
          required
          placeholder="제목"
        />

        <Input
          name="price"
          type="text"
          errors={state?.errors.fieldErrors.price}
          placeholder="가격"
          onChange={handlePrice}
          required
          value={price || state?.data.price?.toString() || ''}
        />

        <div className="flex flex-col">
          <textarea
            name="description"
            placeholder="설명"
            required
            defaultValue={
              state?.data.description?.toString() || product.description
            }
            className="w-full h-24 bg-transparent rounded-md ring-1 ring-neutral-200 placeholder:text-neutral-400 transition focus:ring-2 focus:ring-amber-700 border-none focus:outline-none p-2 resize-none"
          />
          {state?.errors.fieldErrors.description && (
            <p className="text-red-500 text-sm">
              {state.errors.fieldErrors.description}
            </p>
          )}
        </div>

        {isPhotoValid ? (
          <Button text="수정하기" />
        ) : (
          <button
            disabled
            className="primary-btn h-10 disabled:bg-neutral-400 disabled:text-neutral-300 disabled:cursor-not-allowed">
            수정하기
          </button>
        )}
      </form>
    </div>
  );
}
