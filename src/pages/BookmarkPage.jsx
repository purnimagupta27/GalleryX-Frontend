import { useEffect, useState } from "react";
import { getCollections } from "../services/collection.service";
import toast from "react-hot-toast";
import HomeNavbar from "../components/HomeNavbar";
import { Bookmark as BookmarkIcon } from "lucide-react";

export const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSaves = async () => {
      setLoading(true);
      try {
        const response = await getCollections();
        console.log(response.data);
        setBookmarks(response.data || []);
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchSaves();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <HomeNavbar />
        <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8 flex-1 flex items-center justify-center">
          <p className="text-white/50 text-sm font-medium tracking-wider uppercase animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
        <HomeNavbar />
        <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8 flex-1 flex flex-col items-center justify-center py-20 text-center">
          <div className="p-4 rounded-full bg-zinc-900/80 border border-white/10 mb-4 text-white/40">
            <BookmarkIcon className="w-8 h-8" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-white mb-1">
            No bookmarks created
          </h2>
          <p
            className="text-white/50 text-sm font-medium"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Create a bookmark collection to organize your saved posts.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <HomeNavbar />

      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8 flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {bookmarks.map((bookmark) => {
            return (
              <div
                key={bookmark.id}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.02] hover:border-white/40 hover:bg-zinc-900/90 hover:shadow-[0_8px_30px_rgba(255,255,255,0.06)] flex flex-col justify-between min-h-[240px] sm:min-h-[270px]"
              >
                <div className="w-full flex-1 rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/5 flex flex-col items-center justify-center p-5 relative group-hover:border-white/15 transition-all duration-300">
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-white/10 to-purple-500/20 border border-white/10 shadow-lg group-hover:scale-110 group-hover:border-white/30 transition-all duration-300">
                    <BookmarkIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 group-hover:text-white" />
                  </div>
                  <span className="absolute top-2.5 right-2.5 text-[10px] sm:text-[11px] font-medium tracking-wider uppercase px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-zinc-400">
                    Collection
                  </span>
                </div>

                <div className="pt-3 pb-1 px-1">
                  <h2 className="text-sm sm:text-base font-bold tracking-wide text-white capitalize group-hover:text-white transition-colors duration-200 truncate">
                    {bookmark.name}
                  </h2>
                  <p
                    className="text-[11px] sm:text-xs text-zinc-400 font-medium mt-0.5"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Saved pins
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
