/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { bookSeats } from "../../../../../lib/api";

export default function SeatSelector({
    showId,
    rows,
    price,
}: {
    showId: string
    rows: { row: string; seats: { id: string; seatNumber: string; status: string }[] }[];
    price: number;
}) {

    const router = useRouter();
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [isBooking, setIsBooking] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const toggleSeat = (seatId: string) => {
        setSelectedSeats((prev) =>
            prev.includes(seatId)
                ? prev.filter((id) => id !== seatId)
                : [...prev, seatId]
        );
    };

     const handleConfirmBooking = async () => {
        if (selectedSeats.length === 0) return;
        setIsBooking(true);
        setError(null);
        try {
            await bookSeats(showId, selectedSeats);
            router.push("/my-tickets");
        } catch (err: any) {
            setError(err.message || "Failed to complete the booking. Please try again.");
        } finally {
            setIsBooking(false);
        }
    };


    const total = selectedSeats.length * price;
    const allSeats = rows.flatMap((r) => r.seats);
    const selectedNumbers = allSeats
        .filter((s) => selectedSeats.includes(s.id))
        .map((s) => s.seatNumber)
        .join(", ");

     return (
        <div className="border-4 border-black bg-cyan-300 p-8 shadow-[8px_8px_0px_0px_black]">
            <h3 className="text-center text-3xl font-black uppercase tracking-tight">
                Select Your Seats
            </h3>
            <p className="mt-2 text-center text-sm font-bold uppercase">
                Click an available seat to select it
            </p>
            <div className="mt-8 flex flex-col items-center gap-3">
                <div className="mx-auto mb-6 w-3/4 border-2 border-black bg-gray-800 py-3 text-center text-sm font-bold uppercase tracking-widest text-white">
                    Stage
                </div>
                {rows.map((row) => (
                    <div key={row.row} className="flex items-center gap-2">
                        <span className="w-6 text-center text-lg font-black">{row.row}</span>
                        <div className="flex gap-1.5">
                            {[...row.seats].sort((a, b) => {
                                const numA = parseInt(a.seatNumber.slice(1), 10);
                                const numB = parseInt(b.seatNumber.slice(1), 10);
                                return numA - numB;
                            }).map((seat) => {
                                const isBooked = seat.status !== "AVAILABLE";
                                const isSelected = selectedSeats.includes(seat.id);
                                let seatStyle =
                                    "border-2 border-black flex h-9 w-9 items-center justify-center text-xs font-bold transition-all";
                                if (isBooked) {
                                    seatStyle += " cursor-not-allowed bg-gray-400 opacity-50";
                                } else if (isSelected) {
                                    seatStyle +=
                                        " bg-lime-300 shadow-[3px_3px_0px_0px_black] -translate-x-0.5 -translate-y-0.5";
                                } else {
                                    seatStyle +=
                                        " bg-white cursor-pointer hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_black]";
                                }
                                return (
                                    <button
                                        key={seat.id}
                                        disabled={isBooked}
                                        onClick={() => toggleSeat(seat.id)}
                                        className={seatStyle}
                                    >
                                        {seat.seatNumber.slice(1)}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm font-bold uppercase">
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-black bg-white" />
                    Available
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-black bg-gray-400" />
                    Booked
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-5 w-5 border-2 border-black bg-lime-300" />
                    Selected
                </div>
            </div>
            {error && (
                <div className="mx-auto mt-6 max-w-md border-4 border-black bg-red-400 p-4 font-bold shadow-[4px_4px_0px_0px_black] text-black">
                    ⚠️ {error}
                </div>
            )}
            {selectedSeats.length > 0 && (
                <div className="mx-auto mt-8 max-w-md border-4 border-black bg-white p-6 shadow-[8px_8px_0px_0px_black]">
                    <p className="text-lg font-black uppercase">Booking Summary</p>
                    <p className="mt-2 text-sm font-bold">Seats: {selectedNumbers}</p>
                    <p className="mt-1 text-2xl font-black">
                        {selectedSeats.length} × ₹{price} = ₹{total.toLocaleString()}
                    </p>
                </div>
            )}
            <div className="mt-8 text-center">
                <button
                    disabled={selectedSeats.length === 0 || isBooking}
                    onClick={handleConfirmBooking}
                    className={`inline-block border-4 border-black px-16 py-5 text-2xl font-black uppercase tracking-wide shadow-[8px_8px_0px_0px_black] transition-all ${
                        selectedSeats.length === 0 || isBooking
                            ? "cursor-not-allowed bg-gray-300 opacity-50"
                            : "bg-lime-300 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[12px_12px_0px_0px_black]"
                    }`}
                >
                    {isBooking ? "Booking..." : "Confirm Booking"}
                </button>
            </div>
        </div>
    );
}