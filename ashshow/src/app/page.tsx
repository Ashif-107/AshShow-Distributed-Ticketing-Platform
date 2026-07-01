import Link from "next/link";
import Image from "next/image";
import { getEvents } from "../../lib/api";

type NextShow = {
  id: string;
  venue: string;
  startTime: string;
  price: number;
  availableSeats: number;
};

type Event = {
  id: string;
  imageUrl: string;
  artist: string;
  tourName: string;
  genre: string;
  nextShow: NextShow;
};

const cardColors = [
  "bg-yellow-300",
  "bg-pink-300",
  "bg-cyan-300",
  "bg-lime-300",
  "bg-orange-300",
];

export default async function Home() {
  const events = (await getEvents()) as Event[];

  return (
    <div className="min-h-screen">
      {/* ─── Hero ─── */}
      <section className="border-b-4 border-black bg-pink-300 px-6 py-20 shadow-[8px_8px_0px_0px_black] sm:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-6xl font-black uppercase tracking-tight sm:text-8xl">
            Ashshow
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-xl font-bold sm:text-2xl">
            Your All-in-One Ticketing Platform
          </p>
          <p className="mt-2 text-lg font-medium">
            Discover concerts, book seats, and enjoy live music.
          </p>
          <Link
            href="/book"
            className="mt-8 inline-block border-4 border-black bg-white px-10 py-4 text-xl font-black uppercase tracking-wide transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black]"
          >
            Start Booking Now →
          </Link>
        </div>
      </section>

      {/* ─── How It Works ─── */}
      <section className="border-b-4 border-black bg-white px-6 py-16">
        <h2 className="text-center text-4xl font-black uppercase tracking-tight">
          How It Works
        </h2>
        <div className="mx-auto mt-10 grid max-w-5xl gap-8 sm:grid-cols-3">
          {[
            { step: "1", title: "Pick", desc: "Browse events and pick your favorite show", emoji: "🎤" },
            { step: "2", title: "Book", desc: "Select your seats and book instantly", emoji: "🎟️" },
            { step: "3", title: "Enjoy", desc: "Show your ticket and enjoy the show", emoji: "🪑" },
          ].map((item, i) => (
            <div
              key={item.step}
              className={`${cardColors[i]} border-4 border-black p-8 shadow-[8px_8px_0px_0px_black] transition-all hover:-translate-x-1 hover:-translate-y-1`}
            >
              <span className="text-5xl">{item.emoji}</span>
              <h3 className="mt-4 text-2xl font-black uppercase">{item.title}</h3>
              <p className="mt-2 text-base font-medium">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Featured Events ─── */}
      {events.length > 0 && (
        <section className="border-b-4 border-black bg-white px-6 py-16">
          <h2 className="text-center text-4xl font-black uppercase tracking-tight">
            Featured Events
          </h2>
          <div className="mx-auto mt-10 grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {events.slice(0, 3).map((event, i) => (
              <Link
                key={event.id}
                href={`/book/${event.id}`}
                className={`${cardColors[(i + 2) % cardColors.length]} border-4 border-black shadow-[8px_8px_0px_0px_black] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_black]`}
              >
                <Image
                  src={event.imageUrl}
                  alt={event.artist}
                  width={800}
                  height={400}
                  unoptimized
                  className="h-48 w-full border-b-4 border-black object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {event.artist}
                  </h3>
                  <p className="mt-1 font-bold">{event.tourName}</p>
                  <span className="mt-3 inline-block border-2 border-black bg-white px-3 py-0.5 text-xs font-bold uppercase">
                    {event.genre}
                  </span>
                  {event.nextShow && (
                    <p className="mt-4 text-3xl font-black">
                      ₹ {event.nextShow.price}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ─── Stats ─── */}
      <section className="border-b-4 border-black bg-orange-300 px-6 py-14 shadow-[8px_8px_0px_0px_black]">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 text-center">
          {[
            { label: "Shows", value: "500+" },
            { label: "Tickets Sold", value: "10k+" },
            { label: "Artists", value: "50+" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-5xl font-black">{stat.value}</p>
              <p className="mt-1 text-lg font-bold uppercase">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="bg-cyan-300 px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-black uppercase tracking-tight">
            Ready to find your next show?
          </h2>
          <Link
            href="/book"
            className="mt-8 inline-block border-4 border-black bg-white px-10 py-4 text-xl font-black uppercase tracking-wide transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black]"
          >
            Browse Events →
          </Link>
        </div>
      </section>
    </div>
  );
}