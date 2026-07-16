import http from "k6/http";
import { check, sleep, group } from "k6";

export const options = {
    stages: [
        { duration: "1m", target: 25 },    // warmup
        { duration: "2m", target: 100 },   // moderate load
        { duration: "2m", target: 200 },   // peak
        { duration: "1m", target: 0 },     // cooldown
    ],
    thresholds: {
        http_req_duration: ["p(95)<2000"],
        http_req_failed: ["rate<0.01"],
    },
};

const BASE = "https://tickets.itzashif.dev/api";

export default function () {
    group("browse events", () => {
        const events = http.get(`${BASE}/events`);
        check(events, { "events 200": r => r.status === 200 });
        sleep(1);
    });

    group("view show details", () => {
        // First get events to find a show
        const events = http.get(`${BASE}/events`);
        if (events.status === 200) {
            try {
                const eventList = JSON.parse(events.body);
                if (eventList.length > 0) {
                    const eventId = eventList[0].id;
                    const eventDetail = http.get(`${BASE}/events/${eventId}`);
                    check(eventDetail, { "event detail 200": r => r.status === 200 });
                }
            } catch { }
        }
        sleep(2);
    });

    group("view seat map", () => {
        const seats = http.get(`${BASE}/shows/${__ENV.SHOW_ID}/seats`);
        check(seats, { "seats 200": r => r.status === 200 });
        sleep(2);
    });
}