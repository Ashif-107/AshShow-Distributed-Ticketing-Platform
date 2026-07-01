import Link from "next/link"

const Navbar = () => {
  return (
    <div className="border-b-4 border-black bg-yellow-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/">
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Ashshow
          </h1>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/book"
            className="border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wide transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_black]"
          >
            Book
          </Link>
          <Link
            href="/my-tickets"
            className="border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wide transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_black]"
          >
            My Tickets
          </Link>
          <Link
            href="/profile"
            className="border-2 border-black bg-white px-4 py-2 text-sm font-black uppercase tracking-wide transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0px_0px_black]"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Navbar