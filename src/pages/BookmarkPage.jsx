import { useEffect, useState } from "react";
import { deletecollection, getCollections } from "../services/collection.service";
import toast from "react-hot-toast";
import HomeNavbar from "../components/HomeNavbar";
import { Bookmark as BookmarkIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const BookmarkPage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(null);
  const [refreshBookmarks, setRefreshBookmarks] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  // const [bookmarkPosts, setBookmarkPosts] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchSaves = async () => {
      setLoading(true);
      try {
        const response = await getCollections();
        setBookmarks(response.data || []);
        // console.log(response.data)
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchSaves();
  }, [refreshBookmarks]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if(!e.target.closest(".menu-container")){
        setShowDelete(null)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  const handleDeleteBookmark = async (bookmarkId) => {
    setDeletingId(bookmarkId);
    try {
      await deletecollection(bookmarkId);
      setShowDelete(null);
      setRefreshBookmarks((prev) => !prev);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  // const handleBookmarkPosts = async (bookmarkId) => {
  //   try{
  //     const response = await getPostsFromCollection(bookmarkId)
  //     setBookmarkPosts(response.data)
  //   }
  //   catch{
  //     toast.error("Something went wrong")
  //   }
  // }

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
                onClick={() => navigate(`/bookmarks/${bookmark.id}`)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 p-4 backdrop-blur-md transition-all duration-300 ease-out hover:scale-[1.02] hover:border-white/40 hover:bg-zinc-900/90 hover:shadow-[0_8px_30px_rgba(255,255,255,0.06)] flex flex-col justify-between min-h-[240px] sm:min-h-[270px]"
              >
                <div className="w-full flex-1 rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-white/5 flex flex-col items-center justify-center p-5 relative group-hover:border-white/15 transition-all duration-300">
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-white/10 to-purple-500/20 border border-white/10 shadow-lg group-hover:scale-110 group-hover:border-white/30 transition-all duration-300">
                    <BookmarkIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white/90 group-hover:text-white" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowDelete(showDelete === bookmark.id ? null : bookmark.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 rounded-full text-zinc-400 hover:bg-white/10 hover:text-white transition-all duration-200 cursor-pointer z-10"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="5" r="1" />
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="12" cy="19" r="1" />
                    </svg>
                  </button>

                  {showDelete === bookmark.id && (
                    <div className="menu-container absolute top-10 right-2 z-30 min-w-[150px] rounded-xl bg-zinc-900/95 border border-white/15 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] p-1.5">
                      <button
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/15 hover:text-red-300 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                        disabled={deletingId === bookmark.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteBookmark(bookmark.id);
                        }}
                      >
                        {deletingId === bookmark.id ? (
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="50" strokeDashoffset="15" />
                          </svg>
                        ) : (
                          <svg
                          xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                          </svg>
                        )}
                        {deletingId === bookmark.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  )}
                </div>

                <div className="pt-3 pb-1 px-1">
                  <h2 className="text-sm sm:text-base font-bold tracking-wide text-white capitalize group-hover:text-white transition-colors duration-200 truncate">
                    {bookmark.name}
                  </h2>
                  <p
                    className="text-[11px] sm:text-xs text-zinc-400 font-medium mt-0.5"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Saved posts
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
