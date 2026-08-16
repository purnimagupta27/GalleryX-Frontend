import { MessageCircle, X, Send, User, Loader2 } from "lucide-react";
import { createComment, getComments } from "../services/comment.service";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

export const Comments = ({ post }) => {
  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [commentCount, setCommentCount] = useState(
    Number(post?.comments?.commentsCount ?? 0)
  );

  const commentsEndRef = useRef(null);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleOpenComments = async () => {
    setShowComments(true);
    setLoading(true);
    try {
      const response = await getComments(post.id);
      setComments(Array.isArray(response.data) ? response.data : []);
    } catch {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseComments = () => {
    setShowComments(false);
  };

  const handleComment = async (e) => {
    if (e) e.preventDefault();
    if (!commentMessage.trim() || submitting) return;

    setSubmitting(true);
    try {
      const response = await createComment(commentMessage.trim(), post.id);
      const newComment = response.data;
      setComments((prev) => [...(Array.isArray(prev) ? prev : []), newComment]);
      setCommentCount((prev) => prev + 1);
      setCommentMessage("");
      setTimeout(scrollToBottom, 100);
    } catch {
      toast.error("Failed to post comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={handleOpenComments}
        className="flex flex-col items-center gap-1 text-white cursor-pointer group focus:outline-none"
        title="View comments"
      >
        <div className="p-2.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 group-hover:bg-blue-500/20 group-hover:border-blue-500/40 transition-all">
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow group-hover:scale-110 group-hover:text-blue-400 transition-transform duration-200" />
        </div>
        <span
          className="text-xs font-semibold text-white/90 drop-shadow-md"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          {commentCount}
        </span>
      </button>

      {/* Comments Modal Overlay */}
      {showComments && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={handleCloseComments}
        >
          <div
            className="w-full max-w-lg bg-zinc-900/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh] relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.02]">
              <div className="flex items-center gap-2.5">
                <MessageCircle className="w-5 h-5 text-blue-400" />
                <h3
                  className="text-base sm:text-lg font-bold text-white tracking-wide"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Comments
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-medium">
                  {comments.length}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseComments}
                className="text-white/50 hover:text-white transition-colors duration-200 p-1.5 rounded-lg hover:bg-white/10 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Comments List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-12 gap-3 text-white/50">
                  <Loader2 className="w-7 h-7 animate-spin text-blue-400" />
                  <p className="text-xs uppercase tracking-wider">Loading comments...</p>
                </div>
              ) : comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center text-white/40 gap-2">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <MessageCircle className="w-6 h-6 text-white/30" />
                  </div>
                  <p className="text-sm font-medium text-white/70">No comments yet</p>
                  <p className="text-xs text-white/40">Be the first to share what you think!</p>
                </div>
              ) : (
                comments.map((comment, index) => (
                  <div
                    key={comment.id || index}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.04] border border-white/[0.06] hover:border-white/15 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/30 to-purple-500/30 border border-white/15 flex items-center justify-center shrink-0 text-white/90 text-xs font-bold uppercase">
                      {comment.username ? (
                        comment.username.charAt(0)
                      ) : (
                        <User className="w-4 h-4 text-white/60" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white/90 truncate">
                          {comment.username || "User"}
                        </span>
                      </div>
                      <p className="text-sm text-white/80 mt-0.5 break-words font-normal leading-relaxed">
                        {comment.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
              <div ref={commentsEndRef} />
            </div>

            {/* Comment Input Footer */}
            <form
              onSubmit={handleComment}
              className="p-3 sm:p-4 border-t border-white/10 bg-zinc-950/60 flex items-center gap-2"
            >
              <input
                type="text"
                value={commentMessage}
                onChange={(e) => setCommentMessage(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-white/5 border border-white/15 focus:border-blue-500/60 focus:bg-white/[0.08] text-white placeholder-white/40 px-4 py-2.5 text-sm rounded-xl outline-none transition-all duration-200 shadow-inner"
              />
              <button
                type="submit"
                disabled={submitting || !commentMessage.trim()}
                className={`p-2.5 sm:px-4 sm:py-2.5 rounded-xl border flex items-center justify-center gap-2 transition-all duration-200 text-xs sm:text-sm font-semibold cursor-pointer ${
                  commentMessage.trim() && !submitting
                    ? "bg-blue-600 hover:bg-blue-500 text-white border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 text-white/30 border-white/10 cursor-not-allowed"
                }`}
                title="Post comment"
              >
                {submitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span className="hidden sm:inline">Post</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
