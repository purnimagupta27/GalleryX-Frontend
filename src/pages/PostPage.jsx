import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { deleteMyPostById, getPostById } from "../services/post.service";
import {
  getCollections,
  getCollectionStatus,
  saveToCollections,
} from "../services/collection.service.js";
import {
  Download,
  Bookmark as BookmarkIcon,
  ArrowLeft,
  User,
  MoreVertical,
  Pencil,
  Trash2,
  Lock,
} from "lucide-react";
import { Likes } from "../components/Likes";
import { Comments } from "../components/Comments";
import toast from "react-hot-toast";
import { getMe } from "../services/auth.service";
import { EditPost } from "../components/EditPost";

const PostPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [collections, setCollections] = useState([]);
  const [showCollection, setShowCollection] = useState(false);

  const menuRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const [postResponse, userResponse, bookmarkResponse, collectionsResponse] =
          await Promise.all([
            getPostById(postId),
            getMe().catch(() => null),
            getCollectionStatus(postId).catch(() => null),
            getCollections().catch(() => null),
          ]);

        setPost(postResponse.data);
        if (userResponse?.data) {
          setCurrentUser(userResponse.data);
        }
        if (bookmarkResponse?.data) {
          setIsBookmarked(Boolean(bookmarkResponse.data.isBookmarked));
        }
        if (collectionsResponse?.data) {
          setCollections(collectionsResponse.data);
        }
      } catch {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchPostData();
    }
  }, [postId]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowCollection(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async () => {
    try {
      await deleteMyPostById(postId);
      toast.success("Post deleted");
      navigate(-1);
    } catch {
      toast.error("Something went wrong");
    }
  };

  const handleDownload = async () => {
    if (!post?.url) return;
    try {
      const response = await fetch(post.url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `post-${postId}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      window.open(post.url, "_blank");
    }
  };

  const handleSaveClick = () => {
    setShowCollection((prev) => !prev);
    if (!collections.length) {
      getCollections().then((res) => {
        if (res?.data) setCollections(res.data);
      });
    }
  };

  const handleSave = async (boardId) => {
    const previousBookmarkState = isBookmarked;

    setIsBookmarked(true);
    setShowCollection(false);
    toast.success("Saved to bookmark");

    try {
      await saveToCollections(boardId, postId);
    } catch (err) {
      if (err.response?.status === 409) {
        return;
      }
      setIsBookmarked(previousBookmarkState);
      toast.error(err.response?.data?.message || "Failed to save post");
    }
  };

  const isOwner =
    (post?.user?.userId &&
      currentUser?.user?.id &&
      post.user.userId === currentUser.user.id) ||
    (post?.userId &&
      currentUser?.user?.id &&
      post.userId === currentUser.user.id);

  return (
    <div className="relative h-screen w-screen bg-zinc-950 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      {post?.url && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <img
            src={post.url}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover select-none brightness-75"
          />
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[4px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
        </div>
      )}

      {loading ? (
        <div className="relative z-10 w-full max-w-md sm:max-w-lg h-full max-h-[92vh] bg-zinc-900/80 backdrop-blur-md rounded-2xl sm:rounded-3xl border border-white/15 animate-pulse flex flex-col items-center justify-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-rose-500 animate-spin" />
          <p className="text-white/40 text-xs tracking-wider uppercase font-medium">
            Loading Post...
          </p>
        </div>
      ) : post ? (
        <div className="relative z-10 w-full max-w-md sm:max-w-lg md:max-w-xl h-full max-h-[92vh] bg-black/80 backdrop-blur-md rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex items-center justify-center">
          <img
            src={post?.url}
            alt={post?.caption || "Post"}
            className="relative z-10 w-full h-full object-contain select-none"
          />

          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/85 via-transparent to-black/40 pointer-events-none" />

          <button
            onClick={() => navigate(-1)}
            className="absolute top-4 left-4 z-20 p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 hover:text-white hover:bg-black/60 transition-all cursor-pointer shadow-lg"
            title="Go back"
          >
            <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <div className="absolute top-4 right-4 z-30 flex items-center gap-2">
            {post?.isPrivate && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase shadow-lg">
                <Lock className="w-3.5 h-3.5" />
                <span>Private</span>
              </div>
            )}

            {isOwner && (
              <div className="relative" ref={menuRef}>
                <button
                  type="button"
                  onClick={() => setShowMenu((prev) => !prev)}
                  className="p-2 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/90 hover:text-white hover:bg-black/60 transition-all cursor-pointer shadow-lg"
                  title="More options"
                >
                  <MoreVertical className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                {showMenu && (
                  <div className="absolute right-0 mt-2 w-36 bg-zinc-900/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl overflow-hidden py-1 z-40 animate-in fade-in zoom-in-95 duration-150">
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        setShowEditPost(true);
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm text-zinc-200 hover:text-white hover:bg-white/10 transition-colors text-left cursor-pointer"
                    >
                      <Pencil className="w-4 h-4 text-gray-400" />
                      <span>Edit post</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowMenu(false);
                        handleDelete();
                      }}
                      className="w-full flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete post</span>
                    </button>
                  </div>
                )}
                {showEditPost && (
                  <EditPost
                    postId={postId}
                    post={post}
                    onClose={() => setShowEditPost(false)}
                    onPostUpdated={(updated) =>
                      setPost((prev) => ({ ...prev, ...updated }))
                    }
                  />
                )}
              </div>
            )}
          </div>

          <div className="absolute right-3 sm:right-4 bottom-28 sm:bottom-32 z-20 flex flex-col items-center gap-5 sm:gap-6">
            <Likes post={post} />

            <Comments post={post} currentUser={currentUser} />

            <div className="relative">
              <button
                type="button"
                onClick={handleSaveClick}
                className="flex flex-col items-center gap-1 text-white cursor-pointer group"
              >
                <div
                  className={`p-2.5 rounded-full backdrop-blur-md border transition-all ${isBookmarked
                    ? "bg-amber-500/25 border-amber-400/50"
                    : "bg-black/35 border-white/10 group-hover:bg-amber-500/20 group-hover:border-amber-500/40"
                    }`}
                >
                  <BookmarkIcon
                    className={`w-6 h-6 sm:w-7 sm:h-7 drop-shadow transition-transform duration-200 ${isBookmarked
                      ? "fill-amber-400 text-amber-400"
                      : "text-white group-hover:text-amber-400"
                      }`}
                  />
                </div>
                <span
                  className={`text-[11px] font-medium drop-shadow-md transition-colors ${isBookmarked
                    ? "text-amber-400 font-semibold"
                    : "text-white/80"
                    }`}
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {isBookmarked ? "Saved" : "Save"}
                </span>
              </button>

              {showCollection && (
                <div
                  ref={popupRef}
                  className="absolute right-full mr-2 bottom-0 flex flex-col gap-1 p-1.5 bg-zinc-950/90 backdrop-blur-md border border-white/15 rounded-xl shadow-xl z-50 min-w-[150px]"
                >
                  {collections.length === 0 ? (
                    <div className="px-3.5 py-2 text-xs sm:text-sm text-white/50 whitespace-nowrap">
                      Create a bookmark first
                    </div>
                  ) : (
                    collections.map((collection) => (
                      <button
                        key={collection.id}
                        type="button"
                        onClick={() => handleSave(collection.id)}
                        className="w-full text-left px-3.5 py-2 text-xs sm:text-sm text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200 whitespace-nowrap cursor-pointer"
                      >
                        {collection.name}
                      </button>
                    ))
                  )}
                </div>
              )}
            </div>

            <button
              onClick={handleDownload}
              className="flex flex-col items-center gap-1 text-white cursor-pointer group"
              title="Download Image"
            >
              <div className="p-2.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all">
                <Download className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow group-hover:scale-110 group-hover:text-emerald-400 transition-transform duration-200" />
              </div>
              <span
                className="text-[11px] font-medium text-white/80 drop-shadow-md"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Download
              </span>
            </button>
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 pr-20 sm:pr-24 flex flex-col gap-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center shrink-0 shadow-lg ring-2 ring-white/30">
                {post?.user?.username ? (
                  <span
                    className="text-white font-bold text-sm"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    {post.user.username.charAt(0).toUpperCase()}
                  </span>
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>

              <Link
                to={`/profile/${post?.user?.userId}`}
                className="text-sm sm:text-base font-bold text-white drop-shadow-md truncate"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {post?.user?.username || "Unknown"}
              </Link>
            </div>

            {post?.caption && (
              <p
                className="text-xs sm:text-sm text-white/90 leading-relaxed drop-shadow-md line-clamp-3 font-normal"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {post.caption}
              </p>
            )}
          </div>
        </div>
      ) : (
        <div className="relative z-10 h-full w-full flex items-center justify-center">
          <p
            className="text-white/40 text-sm"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            Post not found.
          </p>
        </div>
      )}
    </div>
  );
};

export default PostPage;
