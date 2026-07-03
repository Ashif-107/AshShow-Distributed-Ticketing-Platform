import { z } from "zod";

export const createBookingSchema = z.object({
  showId: z.string().min(1, "Show ID is required"),
  seatIds: z.array(z.string()).min(1, "At least one seat must be selected").max(5, "You can book at most 5 tickets at once"),
});

export type CreateBookingInput = z.infer<typeof createBookingSchema>;