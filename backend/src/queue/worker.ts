import { popFromQueue } from "../redis/queue";

interface BookingJob {
  bookingId: string;
  userId: string;
  showId: string;
  seatIds: string[];
}

export async function startWorker() {
  console.log("📦 Booking queue worker started");

  while (true) {
    try {
      const job = await popFromQueue<BookingJob>("booking", 0);
      if (job) {
        console.log(`📦 Processing booking ${job.bookingId} for user ${job.userId}`);
        // Future: send confirmation email
        // Future: generate PDF ticket
        console.log(`📦 Booking ${job.bookingId} processed`);
      }
    } catch (err) {
      console.error("❌ Worker error:", err);
    }
  }
}