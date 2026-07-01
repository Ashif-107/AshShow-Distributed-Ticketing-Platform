import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/client";
import { UserResponse } from "../dto/auth.dto";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-change-in-production";

export async function createUser(data: {name: string; email: string; password: string}){
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await prisma.user.create({
        data:{
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

    return user
}


export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: { id: true, name: true, email: true },
  });
}

export async function comparePassword(plain: string, hashed: string) {
  return bcrypt.compare(plain, hashed);
}


export function generateToken(userId: string) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "7d" });
}


export function verifyToken(token: string) {
  return jwt.verify(token, JWT_SECRET) as { userId: string };
}