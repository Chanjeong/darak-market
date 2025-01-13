export default function Home() {
  return (
    <main className="bg-gray-100 h-screen flex items-center justify-center p-5 sm:bg-red-100">
      <div className="bg-white w-full shadow-lg rounded-3xl p-5 max-w-screen-sm flex flex-col gap-3">
        <div className="flex flex-col *:outline-none group">
          <input/>
          <input className="w-full mt-5 bg-gray-300 rounded-xl px-5 invalid:ring-red-500 invalid:ring" type="email" required placeholder="Write your email"/>
          <span className="group-hover:block hidden">Make sure it is a valid email</span>
          <button >Submit</button>
        </div>
      </div>
    </main>
  );
}
