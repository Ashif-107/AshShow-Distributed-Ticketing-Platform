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