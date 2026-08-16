import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById } from "../services/post.service";
import { Download, Bookmark, ArrowLeft, User } from "lucide-react";
import {Likes} from "../components/Likes";
import { Comments } from "../components/Comments";

const PostPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true)
                const response = await getPostById(postId)
                setPost(response.data)
                console.log(response.data)
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setLoading(false)
            }
        }
        fetchPost()
    }, [postId])

    const handleDownload = async () => {
        if (!post?.url) return
        try {
            const response = await fetch(post.url)
            const blob = await response.blob()
            const blobUrl = window.URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = blobUrl
            link.download = `post-${postId}.jpg`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            window.URL.revokeObjectURL(blobUrl)
        } catch {
            window.open(post.url, "_blank")
        }
    }

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
                    <p className="text-white/40 text-xs tracking-wider uppercase font-medium">Loading Post...</p>
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

                    <div className="absolute right-3 sm:right-4 bottom-28 sm:bottom-32 z-20 flex flex-col items-center gap-5 sm:gap-6">
                        <Likes post={post} />

                        <Comments post={post}/>

                        <button className="flex flex-col items-center gap-1 text-white cursor-pointer group">
                            <div className="p-2.5 rounded-full bg-black/35 backdrop-blur-md border border-white/10 group-hover:bg-amber-500/20 group-hover:border-amber-500/40 transition-all">
                                <Bookmark className="w-6 h-6 sm:w-7 sm:h-7 drop-shadow group-hover:scale-110 group-hover:text-amber-400 transition-transform duration-200" />
                            </div>
                            <span
                                className="text-[11px] font-medium text-white/80 drop-shadow-md"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Save
                            </span>
                        </button>

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

                            <span
                                className="text-sm sm:text-base font-bold text-white drop-shadow-md truncate"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                {post?.user?.username || "Unknown"}
                            </span>

                            <button
                                className="ml-1 px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white text-black text-xs font-bold hover:bg-white/90 active:scale-95 transition-all cursor-pointer shadow-md shrink-0"
                                style={{ fontFamily: "'Outfit', sans-serif" }}
                            >
                                Follow
                            </button>
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
                    <p className="text-white/40 text-sm" style={{ fontFamily: "'Outfit', sans-serif" }}>
                        Post not found.
                    </p>
                </div>
            )}
        </div>
    )
};

export default PostPage;