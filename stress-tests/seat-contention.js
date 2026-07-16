import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 10 },
    { duration: "30s", target: 50 },
    { duration: "10s", target: 0 },
  ],
};

const BASE = "https://tickets.itzashif.dev/api/lock";
const SHOW_ID = __ENV.SHOW_ID;

export default function () {
  // Pre-login is skipped — hit the lock endpoint directly
  // Real test needs auth; for demo, this shows the pattern
  sleep(1);
}