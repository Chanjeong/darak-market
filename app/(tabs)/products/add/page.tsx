'use client';

import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useActionState, useState } from 'react';
import { addProduct } from './addProduct';
import { formatToWon } from '@/lib/utils';
import Button from '@/components/button';

export default function AddProduct() {
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');
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
  const [state, dispatch] = useActionState(addProduct, null);
  const isPhotoValid = image !== '';
  return (
    <div>
      <form action={dispatch} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="w-full size-80 border-neutral-400 border-2 flex flex-col items-center justify-center
           *:text-neutral-500 cursor-pointer bg-center bg-cover"
          style={{ backgroundImage: `url(${image})` }}>
          {image !== '' ? null : (
            <>
              <PhotoIcon className="size-12" />
              <div>사진을 추가해주세요.</div>
              <span>{state?.errors.fieldErrors.photo}</span>
            </>
          )}
        </label>
        <input
          onChange={uploadImage}
          type="file"
          required
          id="photo"
          name="photo"
          className="hidden"
        />
        <Input
          name="title"
          type="text"
          defaultValue={state?.data.title?.toString() || ''}
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

        <Input
          name="description"
          type="text"
          placeholder="설명"
          errors={state?.errors.fieldErrors.description}
          required
          defaultValue={state?.data.description?.toString() || ''}
        />
        {isPhotoValid ? (
          <Button text="작성하기" />
        ) : (
          <button
            disabled
            className="primary-btn h-10 disabled:bg-neutral-400 
    disabled:text-neutral-300 disabled:cursor-not-allowed">
            작성하기
          </button>
        )}
      </form>
    </div>
  );
}
