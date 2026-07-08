const isServer = typeof window === "undefined";

const API_BASE_URL = isServer
  ? (process.env.INTERNAL_API_URL || "http://localhost:8000/api")
  : (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api");

  
export async function getEvents() {
  const res = await fetch(`${API_BASE_URL}/events`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch events");
  }

  return res.json();
}

export async function getEvent(eventId: string) {

  const res = await fetch(`${API_BASE_URL}/events/${eventId}`, {
    cache: "no-store",
  })

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || "Failed to fetch event details");
  }

  return res.json();
}

export async function getShow(showId: string) {
  const res = await fetch(`${API_BASE_URL}/shows/${showId}`, {
    cache: "no-store"
  })

  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || "Failed to fetch event details");
  }

  return res.json();
}

export async function getSeats(showId: string) {
  const res = await fetch(`${API_BASE_URL}/shows/${showId}/seats`, {
    cache: "no-store"
  })


  if (!res.ok) {
    const error = await res.json();

    throw new Error(error.message || "Failed to fetch event details");
  }

  return res.json();

}


export async function login(email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Login failed");
  }

  return res.json();
}

export async function signup(name: string, email: string, password: string) {
  const res = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Signup failed");
  }

  return res.json();
}

export async function logout() {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Logout failed");
  }

  return res.json();
}

export async function getMe() {
  const res = await fetch(`${API_BASE_URL}/auth/me`, {
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error("Not authenticated");
  }

  return res.json();
}

export async function bookSeats(showId: string, seatIds: string[]) {
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ showId, seatIds }),
    credentials: "include"

  })

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Booking failed");
  }

  return res.json();
}


export async function getTickets() {
  const res = await fetch(`${API_BASE_URL}/bookings/my`, {
    credentials: "include", // Essential to send JWT cookies
  });
  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.message || "Failed to fetch tickets");
  }
  return res.json();
}