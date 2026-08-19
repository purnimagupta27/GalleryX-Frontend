import { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import Bookmark from "./Bookmark";
import ImageUpload from "./ImageUpload";
import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";
import toast from "react-hot-toast";

export const HomeNavbar = ({ onPostCreated }) => {
  const navigate = useNavigate();

  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isBookmarkOpen, setIsBookmarkOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };

    if (activeDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [activeDropdown]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <div className="flex items-center justify-between px-3 sm:px-6 md:px-10 py-0 sticky top-0 z-50 backdrop-blur-md bg-zinc-950/40 w-full">
        <Logo />

        <div
          ref={dropdownRef}
          className="flex items-center gap-2 sm:gap-3 mr-0 sm:mr-4 md:mr-20 mt-0 pt-0 shrink-0"
        >
          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(activeDropdown === "create" ? null : "create")
              }
              className="border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-wider sm:tracking-widest uppercase py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl transition-all duration-300 cursor-pointer text-xs sm:text-sm backdrop-blur-md bg-zinc-950/40 shrink-0 whitespace-nowrap flex items-center justify-center"
            >
              + Create
            </button>

            {activeDropdown === "create" && (
              <div className="absolute right-0 top-full mt-2 flex flex-col gap-1 p-1.5 bg-zinc-950/90 backdrop-blur-md border border-white/15 rounded-xl shadow-xl z-50 min-w-[150px]">
                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    setIsUploadOpen(true);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  Create Post
                </button>
                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    setIsBookmarkOpen(true);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  Create Bookmark
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              type="button"
              onClick={() =>
                setActiveDropdown(
                  activeDropdown === "account" ? null : "account",
                )
              }
              className="border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-wider sm:tracking-widest uppercase py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl transition-all duration-300 cursor-pointer text-xs sm:text-sm backdrop-blur-md bg-zinc-950/40 shrink-0 whitespace-nowrap flex items-center justify-center"
            >
              Account
            </button>

            {activeDropdown === "account" && (
              <div className="absolute right-0 top-full mt-2 flex flex-col gap-1 p-1.5 bg-zinc-950/90 backdrop-blur-md border border-white/15 rounded-xl shadow-xl z-50 min-w-[150px]">
                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    navigate("/profile");
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  My Profile
                </button>
                <button
                  onClick={() => {
                    setActiveDropdown(null);
                    setIsBookmarkOpen(true);
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  Bookmarks
                </button>
                <button
                  onClick={() => {
                    setActiveDropdown(null)
                    handleLogout()
                  }}
                  className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Bookmark
        isOpen={isBookmarkOpen}
        onClose={() => setIsBookmarkOpen(false)}
      />
      <ImageUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onPostCreated={onPostCreated}
      />
    </>
  );
};

export default HomeNavbar;
