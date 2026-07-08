"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const event_controller_1 = require("../controllers/event.controller");
const router = (0, express_1.Router)();
router.get("/", event_controller_1.getEvents);
router.get("/:eventId", event_controller_1.getEvent);
exports.default = router;
