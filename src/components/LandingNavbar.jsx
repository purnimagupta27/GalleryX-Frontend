import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const LandingNavbar = () => {
  return (
    <div className="flex items-center justify-between px-3 sm:px-6 md:px-10 py-0 sticky top-0 z-50 backdrop-blur-md bg-zinc-950/30">
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
      <div className="flex items-center gap-2 sm:gap-6 md:gap-10 mr-0 sm:mr-4 md:mr-20 mt-0 pt-0 shrink-0">
        <Link className="text-[11px] sm:text-xs md:text-sm font-normal tracking-wider sm:tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300">
          Explore
        </Link>
        <Link className="text-[11px] sm:text-xs md:text-sm font-normal tracking-wider sm:tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300">
          Features
        </Link>
        <Link to="/login" className="text-[11px] sm:text-xs md:text-sm font-normal tracking-wider sm:tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300">
          Login
        </Link>
        <Link
          to="/register"
          className="border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-widest uppercase py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl transition-all duration-500 cursor-pointer text-xs sm:text-sm backdrop-blur-md bg-zinc-950/40 shrink-0 whitespace-nowrap"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingNavbar;
