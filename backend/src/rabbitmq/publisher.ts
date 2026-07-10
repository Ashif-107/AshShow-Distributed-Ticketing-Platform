import { getChannel } from "./connection";

interface BookingCreatedPayload {
  bookingId: string;
  userId: string;
  userEmail: string;
  userName: string;
  showId: string;
  artist: string;
  tourName: string;
  venue: string;
  startTime: string;
  price: number;
  seatNumbers: string[];
  bookedAt: string;
}

export async function publishBookingCreated(payload: BookingCreatedPayload) {
  const channel = await getChannel();
  channel.publish(
    "booking.exchange",
    "booking.created",
    Buffer.from(JSON.stringify(payload)),
    { persistent: true }
  );
  console.log(`📤 Published booking.created for ${payload.bookingId}`);
}