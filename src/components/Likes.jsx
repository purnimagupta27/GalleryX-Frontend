import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { likePost, unlikePost } from "../services/likes.service";
import toast from "react-hot-toast";

export const Likes = ({ post }) => {
  const [isLiked, setIsLiked] = useState(Boolean(post?.likes?.isLiked));
  const [likesCount, setLikesCount] = useState(post?.likes?.likesCount || 0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setIsLiked(Boolean(post?.likes?.isLiked));
      setLikesCount(post?.likes?.likesCount || 0);
    }
  }, [post]);

  const handleLike = async () => {
    if (!post?.id || loading) return;

    const previousLiked = isLiked;
    const previousCount = likesCount;

    if (previousLiked) {
      setIsLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
    } else {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    }

    setLoading(true);
    try {
      if (previousLiked) {
        await unlikePost(post.id);
      } else {
        await likePost(post.id);
      }
    } catch (err) {
      setIsLiked(previousLiked);
      setLikesCount(previousCount);
      toast.error(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        type="button"
        onClick={handleLike}
        disabled={loading}
        className="flex flex-col items-center gap-1 text-white cursor-pointer group"
      >
        <div
          className={`p-2.5 rounded-full backdrop-blur-md border transition-all duration-200 ${
            isLiked
              ? "bg-red-500/30 border-red-500/50 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
              : "bg-black/35 border-white/10 text-white group-hover:bg-red-500/20 group-hover:border-red-500/40"
          }`}
        >
          <Heart
            className={`w-6 h-6 sm:w-7 sm:h-7 drop-shadow transition-transform duration-200 group-hover:scale-110 ${
              isLiked ? "fill-red-500 text-red-500" : "text-white group-hover:text-red-400"
            }`}
          />
        </div>
        <span
          className="text-xs font-semibold text-white/90 drop-shadow-md"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {likesCount}
        </span>
      </button>
    </div>
  );
};
