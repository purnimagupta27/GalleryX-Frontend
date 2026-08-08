import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div>
        <Link to="/" className="flex items-center ml-0 sm:ml-4 md:ml-16 py-2 gap-0 cursor-pointer">
        <div className="w-10 sm:w-14 md:w-18 shrink-0">
          <img
            src={logo}
            alt="Logo"
            className="w-full sm:w-36 md:w-44 h-12 sm:h-16 md:h-20 object-contain animate-[spin_10s_linear_infinite]"
          />
        </div>
        <div className="">
          <h1
            className="m-0 text-sm sm:text-xl md:text-2xl text-zinc-500 font-bold tracking-normal uppercase"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            GALLERY X
          </h1>
        </div>
      </Link>
    </div>
  )
}

export default Logo