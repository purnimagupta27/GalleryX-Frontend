import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { feed } from "../services/feed.service";
import { HomeNavbar } from "../components/HomeNavbar";
import { useNavigate } from "react-router-dom";
import Shimmer from "../components/Shimmer";
import useOnlineStatus from "../utils/useOnlineStatus";

const getColumnCount = () => {
  if (typeof window === "undefined") return 2;
  const w = window.innerWidth;
  if (w >= 1024) return 5;
  if (w >= 768) return 4;
  if (w >= 640) return 3;
  return 2;
};

const HomePage = () => {
  const navigate = useNavigate();
  const observer = useRef();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [columnCount, setColumnCount] = useState(getColumnCount());

  const onlinestatus = useOnlineStatus()

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    const fetchImageData = async () => {
      setLoading(true);

      try {
        const response = await feed(page, 5);
        const newPosts = response?.data?.data?.posts || [];

        if (newPosts.length === 0) {
          setHasMore(false);
        } else {
          setImages((prev) => [...prev, ...newPosts]);
        }
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImageData();
  }, [page, navigate]);

  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    images.forEach((img, index) => {
      cols[index % columnCount].push({ ...img, _index: index });
    });
    return cols;
  }, [images, columnCount]);

  const lastIndex = images.length - 1;

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <HomeNavbar />

      {!onlinestatus ? (
        <div className="flex flex-col items-center justify-center flex-1 py-24 px-4 text-center">
          <h1
            className="text-white/70 text-base sm:text-lg font-medium tracking-wide"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Looks like you're offline! Please check your internet connection.
          </h1>
        </div>
      ) : (<div className="max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8 flex-1">
        {images.length === 0 && loading ? (
          <Shimmer />
        ) : images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p
              className="text-white/50 text-sm sm:text-base font-medium"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              No posts yet. Be the first to share!
            </p>
          </div>
        ) : (
          <>
            <div className="flex gap-3.5 sm:gap-4.5">
              {columns.map((col, colIndex) => (
                <div
                  key={colIndex}
                  className="flex flex-col gap-3.5 sm:gap-4.5 flex-1 min-w-0"
                >
                  {col.map((img) => (
                    <div
                      key={img.id}
                      ref={img._index === lastIndex ? lastPostElementRef : null}
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

            {loading && images.length > 0 && (
              <div className="py-6">
                <Shimmer />
              </div>
            )}
          </>
        )}
      </div>)}
    </div>
  );
};

export default HomePage;