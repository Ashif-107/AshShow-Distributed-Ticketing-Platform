"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = authenticate;
const auth_service_1 = require("../services/auth.service");
async function authenticate(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        const decoded = (0, auth_service_1.verifyToken)(token);
        const user = await (0, auth_service_1.findUserById)(decoded.userId);
        if (!user) {
            return res.status(401).json({ message: "Not authenticated" });
        }
        req.user = user;
        next();
    }
    catch {
        return res.status(401).json({ message: "Not authenticated" });
    }
}
