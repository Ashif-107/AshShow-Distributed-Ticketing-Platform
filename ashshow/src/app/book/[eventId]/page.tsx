/* eslint-disable @typescript-eslint/no-explicit-any */

import { getEvent } from "../../../../lib/api";
import Link from "next/link";

const cardBgColors = [
  "bg-yellow-300",
  "bg-pink-300",
  "bg-cyan-300",
  "bg-lime-300",
  "bg-orange-300",
];

export default async function EventPage({
    params,
}:{
    params: Promise<{ eventId: string }>;
}){
    const { eventId } = await params;

    const event = await getEvent(eventId);

    return (
        <div className="min-h-screen p-6">
            <div className="border-4 border-black bg-yellow-300 p-8 shadow-[8px_8px_0px_0px_black]">
                <h1 className="text-5xl font-black uppercase tracking-tight">
                    {event.artist}
                </h1>
                <h2 className="mt-2 text-3xl font-bold">
                    {event.tourName}
                </h2>
                {event.genre && (
                    <span className="mt-4 inline-block border-2 border-black bg-white px-4 py-1 text-sm font-bold uppercase">
                        {event.genre}
                    </span>
                )}
                {event.description && (
                    <p className="mt-4 text-lg font-medium">
                        {event.description}
                    </p>
                )}
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
                {event.shows.map((show: any, i: number) => {
                    const bg = cardBgColors[i % cardBgColors.length];
                    return (
                        <Link
                            href={`/book/${eventId}/${show.id}`}
                            key={show.id}
                            className={`${bg} border-4 border-black p-6 shadow-[8px_8px_0px_0px_black] transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_black]`}
                        >
                            <h3 className="text-2xl font-black uppercase">
                                {show.venue}
                            </h3>
                            <p className="mt-3 text-lg font-bold">
                                {new Date(show.startTime).toLocaleString()}
                            </p>
                            <p className="mt-2 text-4xl font-black">
                                ₹ {show.price}
                            </p>
                            <p className="mt-1 text-sm font-bold uppercase">
                                {show.availableSeats} seats left
                            </p>
                            <button className="mt-4 w-full border-4 border-black bg-white py-3 text-lg font-black uppercase tracking-wide transition-all hover:bg-black hover:text-white">
                                Book Now
                            </button>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}