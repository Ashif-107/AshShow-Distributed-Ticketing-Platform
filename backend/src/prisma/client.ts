import { PrismaClient } from "../generated/prisma/client"; // Your localized path
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

// 1. Create a native PostgreSQL connection pool using your environment variable
const pool = new pg.Pool({ 
  connectionString: process.env.DATABASE_URL 
});

// 2. Instantiate the Prisma driver adapter wrapper
const adapter = new PrismaPg(pool);

// 3. Pass the adapter object as the required 1st argument
const prisma = new PrismaClient({ adapter });

export default prisma;