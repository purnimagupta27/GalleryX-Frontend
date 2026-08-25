import { useState, useEffect } from "react";
import { editMyPostById } from "../services/post.service";
import toast from "react-hot-toast";
import { X, Loader2 } from "lucide-react";

export const EditPost = ({ postId, post, onClose, onPostUpdated }) => {
  const [editedPost, setEditedPost] = useState({
    caption: post?.caption ?? "",
    isPrivate: Boolean(post?.isPrivate),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (post) {
      setEditedPost({
        caption: post.caption ?? "",
        isPrivate: Boolean(post.isPrivate),
      });
    }
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await editMyPostById(postId, editedPost);
      toast.success("Post updated successfully!");
      if (onPostUpdated) {
        onPostUpdated(response?.data || editedPost);
      }
      if (onClose) {
        onClose();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-zinc-900/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
          <h2
            className="text-base sm:text-lg font-bold tracking-wide text-white uppercase"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Edit Post
          </h2>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors duration-200 p-1.5 rounded-xl hover:bg-white/10 cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label
              htmlFor="edit-caption"
              className="block text-[11px] uppercase tracking-widest text-white/70 font-medium mb-1.5"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              Caption
            </label>
            <textarea
              id="edit-caption"
              rows="4"
              value={editedPost.caption}
              onChange={(e) =>
                setEditedPost({ ...editedPost, caption: e.target.value })
              }
              placeholder="Write a new caption..."
              className="w-full bg-white/5 border border-white/15 focus:border-white/50 text-white placeholder-white/30 p-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-300 resize-none shadow-inner"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            />
          </div>

          <label
            htmlFor="edit-isPrivate"
            className="flex items-center justify-between p-3 bg-white/5 border border-white/10 hover:border-white/20 rounded-xl cursor-pointer transition-colors select-none"
          >
            <div>
              <p
                className="text-xs font-medium text-white/90"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Keep private
              </p>
              <p
                className="text-[10px] text-white/50"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Only visible to you
              </p>
            </div>
            <input
              id="edit-isPrivate"
              type="checkbox"
              checked={Boolean(editedPost.isPrivate)}
              onChange={(e) =>
                setEditedPost((prev) => ({
                  ...prev,
                  isPrivate: e.target.checked,
                }))
              }
              className="w-4 h-4 rounded cursor-pointer accent-white"
            />
          </label>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10 mt-1">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-white/70 hover:text-white text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="bg-white text-zinc-950 border border-white hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.25)] font-medium tracking-widest uppercase py-2.5 px-5 rounded-xl transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ fontFamily: "'Outfit', sans-serif" }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-950" />
                  <span>Saving...</span>
                </>
              ) : (
                "Save changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
