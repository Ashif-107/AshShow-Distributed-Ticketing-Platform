"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../generated/prisma/client"); // Your localized path
const adapter_pg_1 = require("@prisma/adapter-pg");
const pg_1 = __importDefault(require("pg"));
// 1. Create a native PostgreSQL connection pool using your environment variable
const pool = new pg_1.default.Pool({
    connectionString: process.env.DATABASE_URL
});
// 2. Instantiate the Prisma driver adapter wrapper
const adapter = new adapter_pg_1.PrismaPg(pool);
// 3. Pass the adapter object as the required 1st argument
const prisma = new client_1.PrismaClient({ adapter });
exports.default = prisma;
