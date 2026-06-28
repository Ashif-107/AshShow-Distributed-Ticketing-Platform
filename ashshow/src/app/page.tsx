import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-cyan-200 font-sans h-screen">
      <main className="flex flex-col items-center justify-center gap-10">
          <h1 className="text-3xl text-yellow-500">AshShow - Your All to Go Ticketing Platform</h1>
          <div>
            <Link href="/book" className="text-lg bg-green-500 p-2 rounded-4xl text-white">Start Booking Now</Link>
          </div>
      </main>
    </div>
  );
}
