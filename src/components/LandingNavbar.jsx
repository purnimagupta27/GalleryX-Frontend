import { Link } from "react-router-dom";
import Logo from "./Logo";

const LandingNavbar = () => {
  return (
    <div className="flex items-center justify-between px-3 sm:px-6 md:px-10 py-0 sticky top-0 z-50 backdrop-blur-md bg-zinc-950/30">
      <Logo />
      <div className="flex items-center gap-2 sm:gap-6 md:gap-10 mr-0 sm:mr-4 md:mr-20 mt-0 pt-0 shrink-0">
        <a href="#masonry" className="text-[11px] sm:text-xs md:text-sm font-normal tracking-wider sm:tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300">
          Explore
        </a>
        <a href="#features" className="text-[11px] sm:text-xs md:text-sm font-normal tracking-wider sm:tracking-widest uppercase text-white/60 hover:text-white transition-colors duration-300">
          Features
        </a>
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
