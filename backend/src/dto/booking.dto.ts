export interface BookingResponse {
  id: string;
  showId: string;
  seatId: string;
  bookedAt: Date;
  show: {
    id: string;
    venue: string;
    startTime: Date;
    price: number;
  };
  seat: {
    id: string;
    seatNumber: string;
    status: string;
  };
}

export type BookingListResponse = BookingResponse[];