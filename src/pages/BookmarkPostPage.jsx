import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostsFromCollection } from "../services/collection.service";
import toast from "react-hot-toast";
import HomeNavbar from "../components/HomeNavbar";
import Shimmer from "../components/Shimmer";

const getColumnCount = () => {
  if (typeof window === "undefined") return 2;
  const w = window.innerWidth;
  if (w >= 1024) return 5;
  if (w >= 768) return 4;
  if (w >= 640) return 3;
  return 2;
};

export const BookmarkPostPage = () => {
  const { bookmarkId } = useParams();
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [columnCount, setColumnCount] = useState(getColumnCount());

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const getPosts = async () => {
      setLoading(true);
      try {
        const response = await getPostsFromCollection(bookmarkId);
        const fetchedPosts = response?.data?.posts || [];
        setPosts(fetchedPosts);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/");
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    if (bookmarkId) {
      getPosts();
    }
  }, [bookmarkId, navigate]);

  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    posts.forEach((img, index) => {
      cols[index % columnCount].push({ ...img, _index: index });
    });
    return cols;
  }, [posts, columnCount]);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <HomeNavbar />

      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8 flex-1">
        {loading ? (
          <Shimmer />
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p
              className="text-white/50 text-sm sm:text-base font-medium"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              No posts added yet.
            </p>
          </div>
        ) : (
          <div className="flex gap-3.5 sm:gap-4.5">
            {columns.map((col, colIndex) => (
              <div
                key={colIndex}
                className="flex flex-col gap-3.5 sm:gap-4.5 flex-1 min-w-0"
              >
                {col.map((img) => (
                  <div
                    key={img.id || img._index}
                    className="relative group w-full rounded-xl overflow-hidden border border-white/10 select-none
                      transition-all duration-300 ease-out
                      hover:scale-[1.03] hover:border-white/40 hover:shadow-[0_6px_20px_rgba(255,255,255,0.08)]"
                  >
                    <img
                      src={img.url}
                      alt={img.caption || "Inspiration"}
                      loading="lazy"
                      onClick={() => navigate(`/post/${img.id}`)}
                      className="w-full h-auto block object-cover transition-transform duration-500 ease-out group-hover:scale-105 cursor-pointer"
                    />

                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent
                        pointer-events-none opacity-0 group-hover:opacity-100
                        transition-opacity duration-300 ease-out"
                    />

                    {img.caption && (
                      <div
                        className="absolute inset-x-2.5 bottom-2.5
                          opacity-0 translate-y-2 pointer-events-none
                          group-hover:opacity-100 group-hover:translate-y-0
                          transition-all duration-300 ease-out delay-[50ms]"
                      >
                        <p
                          className="text-[11px] sm:text-xs font-normal text-white/80 leading-tight line-clamp-2"
                          style={{ fontFamily: "'Outfit', sans-serif" }}
                        >
                          {img.caption}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookmarkPostPage;
