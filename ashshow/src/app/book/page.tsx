import { getEvents } from "../../../lib/api";
import Image from "next/image";
import Link from "next/link";

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

export default async function BookPage() {
  const events = (await getEvents()) as Event[];

  return (
    <div className="grid gap-8 p-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((event: Event, i: number) => {
        const bg = cardColors[i % cardColors.length];
        return (
          <Link
            key={event.id}
            href={`/book/${event.id}`}
            className={`${bg} border-4 border-black shadow-[8px_8px_0px_0px_black] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_black]`}
          >
            <Image
              src={event.imageUrl}
              alt={event.artist}
              width={800}
              height={320}
              className="h-48 w-full border-b-4 border-black object-cover"
              priority={false}
            />

            <div className="p-5">
              <h2 className="text-2xl font-black uppercase tracking-tight">
                {event.artist}
              </h2>
              <p className="mt-1 text-lg font-bold">{event.tourName}</p>

              <span className="mt-3 inline-block border-2 border-black bg-white px-3 py-0.5 text-xs font-bold uppercase">
                {event.genre}
              </span>

              <p className="mt-4 text-sm font-bold uppercase">
                Next Show: {new Date(event.nextShow.startTime).toLocaleString()}
              </p>

              <p className="text-sm font-bold uppercase">
                {event.nextShow.availableSeats} seats left
              </p>

              <p className="mt-3 text-3xl font-black">₹ {event.nextShow.price}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}