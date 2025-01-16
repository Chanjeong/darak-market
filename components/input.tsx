import { InputHTMLAttributes } from 'react';

interface InputProps {
  name: string;
  errors?: string[];
}

export default function Input({
  name,
  errors = [],
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col ">
      <input
        name={name}
        className="w-full h-10 bg-transparent rounded-md 
          ring-1 ring-neutral-200 placeholder:text-neutral-400 transition
          focus:ring-2 focus:ring-amber-700 border-none focus:outline-none"
        {...rest}
      />
      {errors?.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
