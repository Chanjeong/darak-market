import BackButton from '@/components/modal-buttons';

export default function Loading() {
  return (
    <div className="fixed left-0 top-0 z-50 w-full h-full flex items-center justify-center bg-black bg-opacity-60">
      <div className="absolute top-10 right-10">
        <BackButton />
      </div>

      <div className="max-w-screen-lg min-h-[80vh] flex justify-center w-full bg-black p-10 rounded-lg shadow-lg">
        <div className="w-1/2 flex justify-center">
          <div className="relative w-full aspect-square skeleton"></div>
        </div>

        <div className="w-1/2 flex flex-col gap-5">
          <div className="flex items-center gap-5 border-b border-neutral-500 p-5">
            <div className="relative size-12 rounded-full overflow-hidden skeleton"></div>
            <div className="w-24 h-5 skeleton rounded"></div>
          </div>

          <div className="p-5 flex flex-col gap-5">
            <div className="w-3/4 h-8 skeleton rounded"></div>
            <div className="w-full h-16 skeleton rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
