const API_BASE_URL = "http://localhost:8000";

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