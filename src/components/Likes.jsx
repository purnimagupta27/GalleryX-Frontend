import { Heart } from "lucide-react";
import { useState } from "react";
import { likePost, unlikePost } from "../services/likes.service";
import toast from "react-hot-toast";

export const Likes = ({ post }) => {
  console.log(post)
  const [isLiked, setIsLiked] = useState(post?.likes?.isLiked);
  const [likeId, setLikeId] = useState(post?.likeId);
  const [likesCount, setLikesCount] = useState(post?.likes?.likesCount);

  const handleLike = async () => {
    try {
      if (isLiked) {
        await unlikePost(post.id);
        setIsLiked(false);
        setLikeId(null);
        setLikesCount((prev) => prev - 1);
      } else {
        const response = await likePost(post.id);
        console.log(response)
        setIsLiked(true);
        setLikeId(response.data.likeId);
        setLikesCount((prev) => prev + 1);
      }
    }
    catch (err) {
      if (err) {
        toast.error("Something went wrong")
      }
    }
  };

  return (
    <div>
      <button className="flex flex-col items-center gap-1 text-white cursor-pointer group">
        <div className="p-2.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 group-hover:bg-red-500/20 group-hover:border-red-500/40 transition-all">
          <Heart
            className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow group-hover:scale-110 group-hover:text-red-400 transition-transform duration-200"
            onClick={handleLike}
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
