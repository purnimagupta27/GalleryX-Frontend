import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const LandingNavbar = () => {
  return (
    <div className="flex items-center justify-between px-6 sm:px-4 md:px-10 py-0 sticky top-0 z-50 backdrop-blur-md bg-zinc-950/30">
      <Link to="/" className="flex items-center ml-16 py-2 gap-0 cursor-pointer">
        <div className="w-18">
          <img
            src={logo}
            alt="Logo"
            className="w-full sm:w-36 md:w-44 h-20 object-contain animate-[spin_10s_linear_infinite]"
          />
        </div>
        <div className="">
          <h1
            className="m-0 text-xl sm:text-2xl text-zinc-500 font-bold tracking-normal uppercase"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            GALLERY X
          </h1>
        </div>
      </Link>
      <div className="flex items-center gap-4 sm:gap-6 md:gap-10 mr-0 sm:mr-4 md:mr-20 mt-0 pt-0 ">
        <Link className="text-xs sm:text-sm font-normal tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300">
          Explore
        </Link>
        <Link className="text-xs sm:text-sm font-normal tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300">
          Features
        </Link>
        <Link to="/login" className="text-xs sm:text-sm font-normal tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300">
          Login
        </Link>
        <Link to="/register" className="text-xs sm:text-sm font-medium tracking-widest uppercase text-white/70 hover:text-white border border-white/20 hover:border-white/60 hover:bg-white/10 py-2 px-5 sm:px-6 rounded transition-all duration-500">
          Register
        </Link>
      </div>
    </div>
  );
};

export default LandingNavbar;
