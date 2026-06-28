import { getEvents } from "../../../lib/api";
import Image from "next/image";

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
  nextShow: NextShow ;
};

export default async function BookPage() {
  const events = (await getEvents()) as Event[];

  return (
    <div className="grid grid-cols-3 gap-6 p-6">
      {events.map((event: Event) => (
        <div
          key={event.id}
          className="rounded-lg border p-4 shadow"
        >
          <Image
            src={event.imageUrl}
            alt={event.artist}
            width={800}
            height={320}
            className="h-48 w-full rounded object-cover"
            priority={false}
          />

          <h2 className="mt-4 text-xl font-bold">
            {event.artist}
          </h2>

          <p>{event.tourName}</p>

          <p>{event.genre}</p>

          <p>
            Next Show:{" "}
            {new Date(event.nextShow.startTime).toLocaleString()}
            {" Available Seats: "}
            {event.nextShow.availableSeats}
          </p>

          <p>₹ {event.nextShow.price}</p>
        </div>
      ))}
    </div>
  );
}