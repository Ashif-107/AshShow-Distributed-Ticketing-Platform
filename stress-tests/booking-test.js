import http from "k6/http";
import { check, sleep, group } from "k6";
import { SharedArray } from "k6/data";

const BASE = "https://tickets.itzashif.dev/api";

const SEAT_IDS = [
  "cmqy20tak00cx80ygyubzlvum",  // A1
  "cmqy20tak00cy80ygjk3j3vw7",  // A2
  "cmqy20tak00cz80ygk08e841p",  // A3
];

const users = new SharedArray("users", function () {
  return [
    { name: "Test1", email: "test1@example.com", password: "Test@123" },
    { name: "Test2", email: "test2@example.com", password: "Test@123" },
    { name: "Test6", email: "test6@example.com", password: "Test@123" },
    { name: "Test4", email: "test4@example.com", password: "Test@123" },
    { name: "Test5", email: "test5@example.com", password: "Test@123" },
  ];
});

export const options = {
  stages: [
    { duration: "30s", target: 5 },
    { duration: "1m", target: 20 },
    { duration: "30s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(95)<3000"],
  },
};

const SHOW_ID = __ENV.SHOW_ID;

export default function () {
  const user = users[Math.floor(Math.random() * users.length)];

  // Try signup first — if user exists, server returns 409, then login
  http.post(`${BASE}/auth/signup`, JSON.stringify(user), {
    headers: { "Content-Type": "application/json" },
  });

  const login = http.post(`${BASE}/auth/login`, JSON.stringify({
    email: user.email,
    password: user.password,
  }), { headers: { "Content-Type": "application/json" } });

  check(login, { "login 200": r => r.status === 200 });
  if (login.status !== 200) return;

  sleep(1);

  const lock = http.post(`${BASE}/bookings/lock`, JSON.stringify({
    showId: SHOW_ID,
    seatIds: SEAT_IDS,
  }), { headers: { "Content-Type": "application/json" } });

  if (lock.status === 200) {
    const confirm = http.post(`${BASE}/bookings/confirm`, JSON.stringify({
      showId: SHOW_ID,
      seatIds: SEAT_IDS,
    }), { headers: { "Content-Type": "application/json" } });
    check(confirm, { "booked": r => r.status === 201 });
  }
}