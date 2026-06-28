import Link from "next/link"

const Navbar = () => {
  return (
    <div className="bg-cyan-500">
        <div className="flex justify-between p-5">
            <h1 className=" text-3xl font-bold font-serif">Ashshow</h1>
            <div className="flex justify-center items-center gap-5 text-xl font-semibold font-sans">
                <Link href="/book">Book</Link>
                <Link href="/my-tickets">My Tickets</Link>
                <Link href="/profile">Profile</Link>
            </div>
        </div>        
    </div>
  )
}

export default Navbar
