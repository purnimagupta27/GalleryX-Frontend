import { MessageCircle, X, Loader2, MoreVertical, Trash2 } from "lucide-react";
import { createComment, getComments, deleteComment } from "../services/comment.service";
import { useState, useRef, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { getMe } from "../services/auth.service";

export const Comments = ({ post, currentUser: propCurrentUser }) => {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [commentMessage, setCommentMessage] = useState("");
  const [showComments, setShowComments] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [commentCount, setCommentCount] = useState(
    Number(post?.comments?.commentsCount ?? 0),
  );
  const [currentUser, setCurrentUser] = useState(propCurrentUser || null);
  const [activeMenuCommentId, setActiveMenuCommentId] = useState(null);
  const [deletingCommentId, setDeletingCommentId] = useState(null);

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
    setActiveMenuCommentId(null);
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

  const handleDeleteComment = async (commentId) => {
    setDeletingCommentId(commentId);
    try {
      await deleteComment(commentId);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setCommentCount((prev) => Math.max(0, prev - 1));
      toast.success("Comment deleted");
    } catch {
      toast.error("Failed to delete comment");
    } finally {
      setDeletingCommentId(null);
      setActiveMenuCommentId(null);
    }
  };

  useEffect(() => {
    if (!propCurrentUser) {
      const fetchUser = async () => {
        try {
          const response = await getMe();
          setCurrentUser(response.data);
        } catch {
          toast.error("Something went wrong")
        }
      };
      fetchUser();
    } else {
      setCurrentUser(propCurrentUser);
    }
  }, [propCurrentUser]);

  useEffect(() => {
    const handleDocumentClick = () => {
      setActiveMenuCommentId(null);
    };

    if (activeMenuCommentId) {
      document.addEventListener("click", handleDocumentClick);
    }
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [activeMenuCommentId]);

  const currentUserId = currentUser?.user?.id || currentUser?.id;

  return (
    <>
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

      {showComments && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={handleCloseComments}
        >
          <div
            className="w-full max-w-lg bg-zinc-900/95 backdrop-blur-2xl border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh] sm:max-h-[80vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4 shrink-0">
              <div className="flex items-center gap-2.5">
                <h2
                  className="text-base sm:text-lg font-bold tracking-wide text-white uppercase"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Comments
                </h2>
                <span
                  className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/70 font-medium"
                  style={{ fontFamily: "'Outfit', sans-serif" }}
                >
                  {comments.length}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCloseComments}
                className="text-white/40 hover:text-white transition-colors duration-200 p-1.5 rounded-xl hover:bg-white/10 cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-10 gap-3 text-white/50">
                  <Loader2 className="w-6 h-6 animate-spin text-white/80" />
                  <p
                    className="text-xs uppercase tracking-wider text-white/50"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Loading comments...
                  </p>
                </div>
              ) : comments.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center text-white/40 gap-1.5">
                  <p
                    className="text-sm font-medium text-white/70"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    No comments yet
                  </p>
                  <p
                    className="text-xs text-white/40"
                    style={{ fontFamily: "'Outfit', sans-serif" }}
                  >
                    Be the first to share what you think!
                  </p>
                </div>
              ) : (
                comments.map((comment, index) => {
                  const initial = (comment.username || "U")
                    .charAt(0)
                    .toUpperCase();
                  const isCommentOwner = Boolean(
                    currentUserId &&
                      comment?.userId &&
                      currentUserId === comment.userId
                  );

                  return (
                    <div
                      key={comment.id || index}
                      className="group/comment flex items-start justify-between gap-2.5 text-xs sm:text-sm leading-relaxed rounded-xl p-2 hover:bg-white/5 transition-colors"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        <div
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-tr from-rose-500/30 via-white/15 to-purple-500/30 p-0.5 shadow-sm flex items-center justify-center border border-white/15 shrink-0 select-none cursor-pointer hover:scale-105 transition-transform duration-200"
                          onClick={() =>
                            comment.userId && navigate(`/profile/${comment.userId}`)
                          }
                        >
                          <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center">
                            <span className="text-[10px] sm:text-xs font-bold text-white uppercase select-none">
                              {initial}
                            </span>
                          </div>
                        </div>

                        <div className="flex-1 min-w-0 pt-0.5">
                          <span
                            className="font-semibold text-white mr-2 cursor-pointer hover:underline"
                            onClick={() =>
                              comment.userId && navigate(`/profile/${comment.userId}`)
                            }
                          >
                            {comment.username || "User"}
                          </span>
                          <span className="text-zinc-300 break-words font-normal">
                            {comment.message}
                          </span>
                        </div>
                      </div>

                      {isCommentOwner && (
                        <div className="relative shrink-0 pt-0.5">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuCommentId((prev) =>
                                prev === comment.id ? null : comment.id
                              );
                            }}
                            className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
                            title="More options"
                          >
                            <MoreVertical className="w-4 h-4" />
                          </button>

                          {activeMenuCommentId === comment.id && (
                            <div
                              className="absolute right-0 top-full mt-1 w-32 bg-zinc-900/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-in fade-in zoom-in-95 duration-150"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={() => handleDeleteComment(comment.id)}
                                disabled={deletingCommentId === comment.id}
                                className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors text-left cursor-pointer disabled:opacity-50"
                              >
                                {deletingCommentId === comment.id ? (
                                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                ) : (
                                  <Trash2 className="w-3.5 h-3.5" />
                                )}
                                <span>Delete</span>
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
              <div ref={commentsEndRef} />
            </div>

            <form
              onSubmit={handleComment}
              className="flex items-center gap-2 pt-4 border-t border-white/10 mt-3 shrink-0"
            >
              <input
                type="text"
                value={commentMessage}
                onChange={(e) => setCommentMessage(e.target.value)}
                placeholder="Write a comment..."
                className="flex-1 bg-white/5 border border-white/15 focus:border-white/50 text-white placeholder-white/30 px-4 py-2.5 text-xs sm:text-sm rounded-xl outline-none transition-all duration-300 shadow-inner"
                style={{ fontFamily: "'Outfit', sans-serif" }}
              />
              <button
                type="submit"
                disabled={submitting || !commentMessage.trim()}
                className={`border font-medium tracking-widest uppercase py-2.5 px-4 sm:px-5 rounded-xl transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-1.5 cursor-pointer shrink-0 disabled:cursor-not-allowed ${
                  commentMessage.trim() && !submitting
                    ? "bg-white text-zinc-950 border-white hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                    : "bg-white/5 text-white/40 border-white/10 cursor-not-allowed"
                }`}
                style={{ fontFamily: "'Outfit', sans-serif" }}
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-zinc-950" />
                    <span>Posting...</span>
                  </>
                ) : (
                  "Post"
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
