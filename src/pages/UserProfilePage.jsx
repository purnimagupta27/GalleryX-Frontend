import { useEffect, useState, useMemo } from "react";
import { getUserProfile } from "../services/user.service";
import { useParams, useNavigate } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import { Lock } from "lucide-react";
import { getMe } from "../services/auth.service";
import ProfilePage from "./ProfilePage";
import toast from "react-hot-toast";
import {
  followUser,
  getFollowStatus,
  unfollowUser,
} from "../services/follows.service";

const getColumnCount = () => {
  if (typeof window === "undefined") return 2;
  const w = window.innerWidth;
  if (w >= 1024) return 5;
  if (w >= 768) return 4;
  if (w >= 640) return 3;
  return 2;
};

const UserProfilePage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [userProfile, setUserProfile] = useState(null);
  const [columnCount, setColumnCount] = useState(getColumnCount());
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserLoading, setCurrentUserLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const response = await getFollowStatus(userId);
        console.log(response.data);
        setIsFollowing(response.data.isFollowing);
      } catch {
        toast.error("Something went wrong");
      }
    };
    if (userId) {
      checkFollowStatus();
    }
  }, [userId]);

  useEffect(() => {
    const handleResize = () => setColumnCount(getColumnCount());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getMe();
        setCurrentUser(response.data);
      } catch {
        toast.error("Something went wrong");
      } finally {
        setCurrentUserLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfile(userId);
        setUserProfile(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    if (userId) {
      fetchUserProfile();
    }
  }, [userId, isFollowing]);

  const posts = useMemo(() => {
    return userProfile?.posts || [];
  }, [userProfile]);

  const columns = useMemo(() => {
    const cols = Array.from({ length: columnCount }, () => []);
    posts.forEach((img, index) => {
      cols[index % columnCount].push({ ...img, _index: index });
    });
    return cols;
  }, [posts, columnCount]);

  const handleFollow = async () => {
    if (!isFollowing) {
      await followUser(userId);
      setIsFollowing(true);
    } else {
      await unfollowUser(userId);
      setIsFollowing(false);
    }
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
        <p className="text-white/50 text-sm font-medium tracking-wider uppercase animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (currentUserLoading || !userProfile) {
    return <div>loading...</div>;
  }

  const isOwner = userProfile?.user?.id === currentUser?.user?.id;

  if (isOwner) return <ProfilePage />;

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

      <div className="flex items-center justify-center mt-2 mb-2">
        <button
          onClick={handleFollow}
          className={`px-6 py-2 rounded-full text-xs sm:text-sm font-semibold active:scale-95 transition-all cursor-pointer shadow-md ${
            isFollowing
              ? "bg-zinc-900/80 border border-white/15 text-zinc-300 hover:text-white hover:border-white/30 backdrop-blur-md"
              : "bg-white text-zinc-950 hover:bg-white/90"
          }`}
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {isFollowing ? "Following" : "Follow"}
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

export default UserProfilePage;
