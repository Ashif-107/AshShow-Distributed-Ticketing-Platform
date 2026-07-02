 

import Link from "next/link";
import { getShow, getSeats } from "../../../../../lib/api";
import SeatSelector from "./SeatSelector";

export default async function ShowPage({
    params,
}: {
    params: Promise<{ eventId: string; showId: string }>;
}) {

    const { showId } = await params;
    const [show, seatMap] = await Promise.all([
        getShow(showId),
        getSeats(showId),
    ]);

    return (
        <div className="min-h-screen p-6">
            <div className="border-4 border-black bg-yellow-300 p-8 shadow-[8px_8px_0px_0px_black]">
                <Link
                    href={`/book/${show.event.id}`}
                    className="inline-block border-2 border-black bg-white px-3 py-1 text-xs font-bold uppercase transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_black]"
                >
                    ← Back to shows
                </Link>
                <h1 className="mt-4 text-5xl font-black uppercase tracking-tight">
                    {show.event.artist}
                </h1>
                <h2 className="mt-1 text-3xl font-bold">{show.event.tourName}</h2>
                <span className="mt-4 inline-block border-2 border-black bg-white px-4 py-1 text-sm font-bold uppercase">
                    {show.event.genre}
                </span>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                    <div className="border-2 border-black bg-white p-4">
                        <p className="text-xs font-bold uppercase">Venue</p>
                        <p className="mt-1 text-xl font-black">{show.venue}</p>
                    </div>
                    <div className="border-2 border-black bg-white p-4">
                        <p className="text-xs font-bold uppercase">Date & Time</p>
                        <p className="mt-1 text-xl font-black">
                            {new Date(show.startTime).toLocaleString()}
                        </p>
                    </div>
                    <div className="border-2 border-black bg-white p-4">
                        <p className="text-xs font-bold uppercase">Price</p>
                        <p className="mt-1 text-xl font-black">₹ {show.price}</p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <SeatSelector  showId={showId} rows={seatMap.rows} price={show.price} />
            </div>
        </div>
    );
}