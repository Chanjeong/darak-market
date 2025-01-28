import { MdOutlinePhoto } from 'react-icons/md';

export default function Loading() {
  return (
    <>
      <div className="flex flex-col items-center gap-5 p-5">
        <div className="skeleton size-96 bg-transparent border-8 border-stone-800 flex items-center justify-center">
          <MdOutlinePhoto className="size-16 text-neutral-400" />
        </div>
      </div>
      <div className="flex gap-5 px-10">
        <div className="skeleton bg-stone-800 size-16 rounded-full"></div>
        <div className="flex flex-col gap-3">
          <div className="skeleton h-4 w-40 bg-stone-800"></div>
          <div className="skeleton h-4 w-20 bg-stone-800"></div>
          <div className="skeleton h-4 w-60 bg-stone-800"></div>
        </div>
      </div>
      <div className="skeleton h-4 w-96 bg-stone-800 mt-10 mx-auto"></div>
    </>
  );
}
