"use client"

import Link from "next/link";
import { useAuth } from "../../context/AuthContext";

const Page = () => {

  const {user, logout} = useAuth();
    
  return (
    <div className="min-h-screen">
      <section className="border-b-4 border-black bg-pink-300 px-6 py-20 shadow-[8px_8px_0px_0px_black] sm:py-32">
        <div className="mx-auto max-w-4xl text-center flex flex-col items-center">
           {user ? (
            <>
              
              <h1
                className="border-2 border-black bg-white px-4 py-2 m-10 text-6xl font-black uppercase tracking-wide transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_black]"
              >
                Welcome {user.name}
              </h1>

              <Link href="/my-tickets" className="border-2 border-black bg-white px-4 py-2 m-10 text-6xl font-black uppercase tracking-wide transition-all hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_black]"> Check My bookings</Link>
              <button
                onClick={logout}
                className="w-50 border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wide transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_black]"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wide transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_black]"
            >
              Login
            </Link>
          )}
        </div>
      </section>
      
    </div>
  )
}

export default Page
