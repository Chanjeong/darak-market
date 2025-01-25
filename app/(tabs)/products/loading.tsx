export default async function Loading() {
  return (
    <div className="flex flex-col gap-5 p-5">
      {[...Array(10)].map((_, index) => (
        <div key={index} className="flex items-center gap-5">
          <div className="skeleton size-32 rounded-lg bg-stone-800 "></div>
          <div className="flex flex-col gap-5">
            <div className="skeleton bg-stone-800 h-4 w-60"></div>
            <div className="skeleton bg-stone-800 h-4 w-40"></div>
            <div className="skeleton bg-stone-800 h-4 w-60"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
