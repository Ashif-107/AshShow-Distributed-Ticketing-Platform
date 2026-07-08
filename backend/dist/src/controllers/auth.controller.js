"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
exports.logout = logout;
exports.getMe = getMe;
const auth_service_1 = require("../services/auth.service");
async function signup(req, res) {
    try {
        const { name, email, password } = req.body;
        const existingUser = await (0, auth_service_1.findUserByEmail)(email);
        if (existingUser) {
            return res.status(409).json({ message: "An account with this email already exists" });
        }
        const user = await (0, auth_service_1.createUser)({ name, email, password });
        const token = (0, auth_service_1.generateToken)(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(201).json({ user });
    }
    catch (err) {
        console.error("Signup error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await (0, auth_service_1.findUserByEmail)(email);
        if (!user || !(await (0, auth_service_1.comparePassword)(password, user.password))) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const token = (0, auth_service_1.generateToken)(user.id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.json({
            user: { id: user.id, name: user.name, email: user.email },
        });
    }
    catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
async function logout(_req, res) {
    res.clearCookie("token");
    return res.json({ message: "Logged out successfully" });
}
async function getMe(req, res) {
    const user = req.user;
    if (!user) {
        return res.status(401).json({ message: "Not authenticated" });
    }
    return res.json({ user });
}
