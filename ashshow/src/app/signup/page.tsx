/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signup(name, email, password);
      router.push("/book");
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md border-4 border-black bg-pink-300 p-8 shadow-[8px_8px_0px_0px_black]"
      >
        <h1 className="text-4xl font-black uppercase tracking-tight">Sign Up</h1>

        {error && (
          <p className="mt-4 border-2 border-black bg-red-200 p-3 text-sm font-bold">
            {error}
          </p>
        )}

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-bold uppercase">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 w-full border-2 border-black bg-white p-3 text-lg font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_black]"
            />
          </div>
          <div>
            <label className="text-sm font-bold uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 w-full border-2 border-black bg-white p-3 text-lg font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_black]"
            />
          </div>
          <div>
            <label className="text-sm font-bold uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              className="mt-1 w-full border-2 border-black bg-white p-3 text-lg font-bold focus:outline-none focus:shadow-[4px_4px_0px_0px_black]"
            />
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full border-4 border-black bg-lime-300 py-4 text-xl font-black uppercase tracking-wide transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_black]"
        >
          Sign Up
        </button>

        <p className="mt-4 text-center text-sm font-bold">
          Already have an account?{" "}
          <Link href="/login" className="underline hover:text-gray-700">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}