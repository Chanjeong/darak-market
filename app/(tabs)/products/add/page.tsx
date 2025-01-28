'use client';

import Input from '@/components/input';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { addProduct } from './addProduct';

export default function AddProduct() {
  const [image, setImage] = useState('');
  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { files }
    } = event;

    if (!files) {
      return;
    }

    const file = files[0];

    if (!file.type.startsWith('image/')) {
      return;
    }

    const maxSize = 3 * 1024 * 1024;
    if (file.size > maxSize) {
      return;
    }

    const url = URL.createObjectURL(file);
    setImage(url);
  };
  return (
    <div>
      <form action={addProduct} className="flex flex-col gap-5 p-5">
        <label
          htmlFor="photo"
          className="w-full size-96 border-neutral-400 border-2 flex flex-col items-center justify-center
           *:text-neutral-500 cursor-pointer bg-center bg-cover"
          style={{ backgroundImage: `url(${image})` }}>
          {image ? null : (
            <>
              <PhotoIcon className="size-12" />
              <div>사진을 추가해주세요.</div>
            </>
          )}
        </label>
        <input
          onChange={uploadImage}
          type="file"
          id="photo"
          className="hidden"
        />
        <Input name="title" placeholder="제목" />
        <Input name="price" placeholder="가격" />
        <Input name="description" placeholder="설명" />
      </form>
    </div>
  );
}
