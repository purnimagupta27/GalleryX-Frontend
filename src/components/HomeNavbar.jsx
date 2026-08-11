import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { Link, useNavigate } from "react-router-dom";
import Bookmark from "./Bookmark";

export const HomeNavbar = ({ search, setSearch, handleSearch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <div className="flex items-center justify-between px-3 sm:px-6 md:px-10 py-0 sticky top-0 z-50 backdrop-blur-md bg-zinc-950/40 w-full">
        <Logo />
        
        <form 
          onSubmit={handleSearch}
          className="hidden md:flex items-center flex-1 max-w-xs lg:max-w-sm mx-4"
        >
          <input
            type="text"
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/15 focus:border-white/50 text-white placeholder-white/40 px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-xl outline-none transition-all duration-300"
          />
        </form>

        <div className="flex items-center gap-2 sm:gap-3 mr-0 sm:mr-4 md:mr-20 mt-0 pt-0 shrink-0">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-wider sm:tracking-widest uppercase py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl transition-all duration-300 cursor-pointer text-xs sm:text-sm backdrop-blur-md bg-zinc-950/40 shrink-0 whitespace-nowrap flex items-center justify-center"
            >
              + Create
            </button>

            {isOpen && (
              <div className="absolute right-0 top-full mt-2 flex flex-col gap-1 p-1.5 bg-zinc-950/90 backdrop-blur-md border border-white/15 rounded-xl shadow-xl z-50 min-w-[150px]">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    navigate("/create-post");
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  Create Post
                </button>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setIsBookmarkOpen(true);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  Create Bookmark
                </button>
              </div>
            )}
          </div>

          <Link
            to=""
            className="border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-wider sm:tracking-widest uppercase py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl transition-all duration-300 cursor-pointer text-xs sm:text-sm backdrop-blur-md bg-zinc-950/40 shrink-0 whitespace-nowrap flex items-center justify-center"
          >
            Account
          </Link>
        </div>
      </div>

      <Bookmark isOpen={isBookmarkOpen} onClose={() => setIsBookmarkOpen(false)} />
    </>
  );
};

export default HomeNavbar;
