"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const validate_middleware_1 = require("../middleware/validate.middleware");
const auth_schema_1 = require("../schema/auth.schema");
const auth_controller_1 = require("../controllers/auth.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
const authLimiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: "Too many attempts. Please try again later." },
    standardHeaders: true,
    legacyHeaders: false,
});
router.post("/signup", authLimiter, (0, validate_middleware_1.validate)(auth_schema_1.signupSchema), auth_controller_1.signup);
router.post("/login", authLimiter, (0, validate_middleware_1.validate)(auth_schema_1.loginSchema), auth_controller_1.login);
router.post("/logout", auth_controller_1.logout);
router.get("/me", auth_middleware_1.authenticate, auth_controller_1.getMe);
exports.default = router;
