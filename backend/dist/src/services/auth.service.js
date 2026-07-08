"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.findUserByEmail = findUserByEmail;
exports.findUserById = findUserById;
exports.comparePassword = comparePassword;
exports.generateToken = generateToken;
exports.verifyToken = verifyToken;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const client_1 = __importDefault(require("../prisma/client"));
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";
async function createUser(data) {
    const hashedPassword = await bcrypt_1.default.hash(data.password, 12);
    const user = await client_1.default.user.create({
        data: {
            name: data.name,
            email: data.email,
            password: hashedPassword,
        },
        select: {
            id: true,
            name: true,
            email: true,
        },
    });
    return user;
}
async function findUserByEmail(email) {
    return client_1.default.user.findUnique({
        where: { email },
    });
}
async function findUserById(id) {
    return client_1.default.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true },
    });
}
async function comparePassword(plain, hashed) {
    return bcrypt_1.default.compare(plain, hashed);
}
function generateToken(userId) {
    return jsonwebtoken_1.default.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}
function verifyToken(token) {
    return jsonwebtoken_1.default.verify(token, JWT_SECRET);
}
