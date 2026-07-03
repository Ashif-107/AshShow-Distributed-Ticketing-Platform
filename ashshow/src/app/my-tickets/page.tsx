"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getTickets } from "../../../lib/api";

type Ticket = {
  id: string;
  bookedAt: string;
  show: {
    venue: string;
    startTime: string;
    price: number;
    event: {
      artist: string;
      tourName: string;
      genre: string;
    };
  };
  seat: {
    seatNumber: string;
  };
};

const bgColors = ["bg-lime-300", "bg-pink-300", "bg-cyan-300", "bg-yellow-300", "bg-orange-300"];

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getTickets()
      .then((data) => {
        setTickets(data);
      })
      .catch((err) => {
        setError(err.message || "Failed to load your tickets.");
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="border-4 border-black bg-yellow-300 px-8 py-4 text-2xl font-black uppercase tracking-wider shadow-[4px_4px_0px_0px_black]">
          Loading Tickets...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-white p-6">
        <div className="border-4 border-black bg-red-400 p-8 shadow-[8px_8px_0px_0px_black]">
          <h1 className="text-3xl font-black uppercase">Something went wrong</h1>
          <p className="mt-2 font-bold">{error}</p>
        </div>
        <Link
          href="/login"
          className="border-2 border-black bg-yellow-300 px-6 py-3 font-bold uppercase hover:shadow-[4px_4px_0px_0px_black] transition-all"
        >
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6 sm:p-12">
      <div className="mx-auto max-w-6xl">
        <div className="border-4 border-black bg-yellow-300 p-8 shadow-[8px_8px_0px_0px_black] mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tight">My Tickets</h1>
          <p className="mt-2 text-lg font-bold uppercase text-gray-800">
            Show these passes at the entrance of the venue
          </p>
        </div>

        {tickets.length === 0 ? (
          <div className="border-4 border-black bg-cyan-200 p-12 text-center shadow-[8px_8px_0px_0px_black]">
            <h2 className="text-3xl font-black uppercase">No Tickets Found</h2>
            <p className="mt-2 font-bold text-gray-700">You haven&apost booked any seats yet.</p>
            <Link
              href="/book"
              className="mt-6 inline-block border-2 border-black bg-white px-6 py-3 font-black uppercase hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_black] transition-all"
            >
              Browse Events
            </Link>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket, i) => {
              const bg = bgColors[i % bgColors.length];
              return (
                <div
                  key={ticket.id}
                  className={`border-4 border-black ${bg} p-6 shadow-[8px_8px_0px_0px_black] flex flex-col justify-between hover:-translate-1 transition`}
                >
                  <div>
                    <span className="border-2 border-black bg-white px-2 py-0.5 text-xs font-black uppercase">
                      {ticket.show.event.genre}
                    </span>
                    <h2 className="mt-4 text-3xl font-black uppercase leading-none tracking-tight">
                      {ticket.show.event.artist}
                    </h2>
                    <p className="text-md mt-1 font-bold text-gray-800">{ticket.show.event.tourName}</p>

                    <div className="mt-6 border-t-2 border-dashed border-black pt-4">
                      <p className="text-xs font-bold uppercase text-gray-700">Venue</p>
                      <p className="text-lg font-black leading-none">{ticket.show.venue}</p>
                    </div>

                    <div className="mt-4">
                      <p className="text-xs font-bold uppercase text-gray-700">Date & Time</p>
                      <p className="text-lg font-black leading-none">
                        {new Date(ticket.show.startTime).toLocaleString()}
                      </p>
                    </div>

                    <div className="mt-4 flex justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase text-gray-700">Seat</p>
                        <p className="text-2xl font-black leading-none">{ticket.seat.seatNumber}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold uppercase text-gray-700">Price Paid</p>
                        <p className="text-2xl font-black leading-none">₹{ticket.show.price}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 border-t-2 border-black pt-4 flex flex-col gap-1">
                    <p className="text-[10px] font-mono text-gray-800 break-all">
                      PASS ID: {ticket.id}
                    </p>
                    <p className="text-[10px] font-mono text-gray-800">
                      BOOKED ON: {new Date(ticket.bookedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}