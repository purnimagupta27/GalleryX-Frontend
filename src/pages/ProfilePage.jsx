import { useEffect, useState, useMemo } from "react";
import { getMe } from "../services/auth.service";
import HomeNavbar from "../components/HomeNavbar";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const getColumnCount = () => {
  if (typeof window === "undefined") return 2;
  const w = window.innerWidth;
  if (w >= 1024) return 5;
  if (w >= 768) return 4;
  if (w >= 640) return 3;
  return 2;
};

export const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [columnCount, setColumnCount] = useState(getColumnCount());
  const [activeTab, setActiveTab] = useState("all");

  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const profile = async () => {
      const response = await getMe();
      const user = response.data;
      setUserProfile(user);
    };

    profile();
  }, []);

  const posts = useMemo(() => {
    const all = userProfile?.posts || [];
    if (activeTab === "public") {
      return all.filter((post) => !post.isPrivate);
    }
    if (activeTab === "private") {
      return all.filter((post) => Boolean(post.isPrivate));
    }
    return all;
  }, [userProfile, activeTab]);

  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    posts.forEach((img, index) => {
      cols[index % columnCount].push({ ...img, _index: index });
    });
    return cols;
  }, [posts, columnCount]);

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-white/50 text-sm font-medium tracking-wider uppercase animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <HomeNavbar />

      <div className="flex flex-col items-center justify-center mt-10 text-center px-4">
        <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-rose-500/30 via-white/15 to-purple-500/30 p-1 mb-4 shadow-2xl flex items-center justify-center border border-white/15">
          <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
            <span className="text-3xl sm:text-4xl font-bold text-white uppercase select-none">
              {userProfile?.user?.username?.[0]?.toUpperCase() || "U"}
            </span>
          </div>
        </div>

        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-white capitalize">
          {userProfile?.user?.username}
        </h3>
        <p className="text-sm sm:text-base text-zinc-400 font-medium tracking-wide mt-1">
          {userProfile?.user?.nickname || null}
        </p>
      </div>

      <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 mb-2">
        <p className="px-4 py-1.5 rounded-xl bg-zinc-900/60 border border-white/10 text-xs sm:text-sm text-zinc-300 backdrop-blur-md">
          {userProfile?.follows?.followers ?? 0} followers
        </p>
        <p className="px-4 py-1.5 rounded-xl bg-zinc-900/60 border border-white/10 text-xs sm:text-sm text-zinc-300 backdrop-blur-md">
          {userProfile?.follows?.following ?? 0} following
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 mt-4 mb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === "all"
              ? "bg-white text-zinc-950 font-semibold shadow-md"
              : "bg-zinc-900/60 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
          }`}
        >
          All posts
        </button>
        <button
          onClick={() => setActiveTab("public")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === "public"
              ? "bg-white text-zinc-950 font-semibold shadow-md"
              : "bg-zinc-900/60 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
          }`}
        >
          Public posts
        </button>
        <button
          onClick={() => setActiveTab("private")}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer ${
            activeTab === "private"
              ? "bg-white text-zinc-950 font-semibold shadow-md"
              : "bg-zinc-900/60 border border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
          }`}
        >
          Private posts
        </button>
      </div>

      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8 flex-1">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p
              className="text-white/50 text-sm sm:text-base font-medium"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              No posts yet.
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
                    {img.isPrivate && (
                      <div
                        className="absolute top-2.5 left-2.5
                          opacity-0 -translate-y-1 pointer-events-none
                          group-hover:opacity-100 group-hover:translate-y-0
                          transition-all duration-300 ease-out delay-[50ms] z-10"
                      >
                        <div className="p-1.5 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/20 flex items-center justify-center">
                          <Lock className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    )}

                    <img
                      src={img.url}
                      alt={img.caption || "Pin"}
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

export default ProfilePage;


