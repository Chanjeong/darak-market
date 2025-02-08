export default function Loading() {
  return (
    <div>
      <p className="p-5 text-3xl font-bold">채팅</p>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="p-5 flex gap-5 w-full animate-pulse">
          <div className="flex gap-5 w-full">
            <div className="flex items-center gap-3">
              <div className="relative size-8 rounded-full overflow-hidden bg-gray-700 skeleton"></div>
              <div className="relative size-8 rounded-full overflow-hidden bg-gray-700 skeleton"></div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <div className="h-4 w-2/5 bg-gray-700 rounded skeleton"></div>
              <div className="flex w-full items-center justify-between">
                <div className="h-3 w-3/5 bg-gray-700 rounded skeleton"></div>
                <div className="h-3 w-10 bg-gray-700 rounded skeleton"></div>
              </div>
              <div className="w-16 h-5 bg-green-700 rounded skeleton"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
