import Logo from "./Logo";
import { Link } from "react-router-dom";

export const HomeNavbar = () => {
  return (
    <div className="flex items-center justify-between px-3 sm:px-6 md:px-10 py-0 sticky top-0 z-50 backdrop-blur-md bg-zinc-950/40 w-full">
      <Logo />

      <div className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm mx-4">
        <input
          type="text"
          placeholder="Search categories..."
          className="w-full bg-white/5 border border-white/15 focus:border-white/50 text-white placeholder-white/40 px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-xl outline-none transition-all duration-300"
        />
      </div>

      <div className="flex items-center gap-2 mr-0 sm:mr-4 md:mr-20 mt-0 pt-0 shrink-0">
        <button
          type="button"
          className="border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-wider sm:tracking-widest uppercase py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer text-[11px] sm:text-xs backdrop-blur-md bg-zinc-950/40 shrink-0 whitespace-nowrap flex items-center justify-center"
        >
          + Upload Photo
        </button>
        <Link
          to=""
          className="border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-wider sm:tracking-widest uppercase py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg sm:rounded-xl transition-all duration-300 cursor-pointer text-[11px] sm:text-xs backdrop-blur-md bg-zinc-950/40 shrink-0 whitespace-nowrap flex items-center justify-center"
        >
          Account
        </Link>
      </div>
    </div>
  );
};

export default HomeNavbar;
