export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 ">
      <div className="bg-white w-full shadow-lg rounded-3xl p-5 max-w-screen-sm flex flex-col gap-3">
        <input
          className="bg-gray-200 h-12 w-full rounded-full pl-5 outline-none ring ring-transparent focus:ring-orange-500 focus:ring-offset-2 transition-shadow placeholder:drop-shadow"
          type="text"
          placeholder="Search here..."
        />
        <button className="bg-black py-2 text-white rounded-full active:scale-90 outline-none transition-transform font-medium">
          Search
        </button>
      </div>
    </main>
  );
}
