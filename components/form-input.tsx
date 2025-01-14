interface FormInputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors: string[];
}

export default function FormInput({ type, placeholder, required, errors }: FormInputProps) {
  return (
    <div className="flex flex-col ">
      <input
        className="w-full h-10 bg-transparent rounded-md 
          ring-1 ring-neutral-200 placeholder:text-neutral-400 transition
          focus:ring-2 focus:ring-amber-700 border-none focus:outline-none"
        type={type}
        placeholder={placeholder}
        required={required}
      />
      {errors.map((error, index) => (
        <span key={index} className="text-red-500 font-medium">
          {error}
        </span>
      ))}
    </div>
  );
}
