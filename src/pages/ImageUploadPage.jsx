import { useState } from "react";
import Logo from "../components/Logo";
import { Link, useNavigate } from "react-router-dom";
import { createPost } from "../services/post.service";
import toast from "react-hot-toast";

const ImageUploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (selectedFile) => {
    if (selectedFile) {
      if (!selectedFile.type.startsWith("image/")) {
        toast.error("Please upload an image file (PNG, JPG, WEBP)");
        return;
      }
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please select an image to upload");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("caption", caption);
    formData.append("isPrivate", isPrivate);

    try {
      setLoading(true);
      await createPost(formData);
      toast.success("Post created successfully!");
      navigate("/homepage");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col select-none">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-3 sm:px-6 md:px-10 py-0 sticky top-0 z-50 backdrop-blur-md bg-zinc-950/40 border-b border-white/5 w-full">
        <Logo />
        <div className="flex items-center gap-2 sm:gap-3 mr-0 sm:mr-4 md:mr-20 mt-0 pt-0 shrink-0">
          <Link
            to="/homepage"
            className="border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-wider sm:tracking-widest uppercase py-2 px-4 sm:py-2.5 sm:px-5 rounded-xl transition-all duration-300 cursor-pointer text-xs sm:text-sm backdrop-blur-md bg-zinc-950/40 shrink-0 whitespace-nowrap flex items-center justify-center"
          >
            Cancel
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col justify-center">
        <div className="text-center sm:text-left mb-8">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wide text-white uppercase mb-2"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Share Your Creativity
          </h1>
          <p className="text-sm sm:text-base text-white/60">
            Upload a photo and let your imagination speak.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-start">
          {/* Upload Dropzone */}
          <div className="md:col-span-6 flex flex-col items-center">
            <label
              htmlFor="image-upload"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`w-full min-h-[320px] sm:min-h-[380px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur-md ${isDragging
                ? "border-white bg-white/15 scale-[1.01]"
                : "border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10"
                }`}
            >
              {imagePreview ? (
                <div className="relative group w-full h-full flex flex-col items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-h-[300px] sm:max-h-[340px] w-auto object-contain rounded-xl shadow-lg"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity duration-300">
                    <span className="text-xs sm:text-sm font-medium uppercase tracking-wider text-white bg-white/20 border border-white/30 px-4 py-2 rounded-xl backdrop-blur-sm">
                      Change Photo
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-4 text-white/80 group-hover:text-white transition-all duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-7 h-7"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-6L12 6m0 0l4.5 4.5M12 6v9"
                      />
                    </svg>
                  </div>
                  <p className="text-sm sm:text-base font-medium text-white/90 mb-1">
                    Drag and drop your image here
                  </p>
                  <p className="text-xs sm:text-sm text-white/50 mb-4">
                    or <span className="text-white underline underline-offset-4">browse files</span>
                  </p>
                  <span className="text-[11px] text-white/40 uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border border-white/10">
                    JPG, PNG, WEBP · Max 5MB
                  </span>
                </div>
              )}

              <input
                id="image-upload"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          {/* Post Details Form */}
          <div className="md:col-span-6 flex flex-col gap-5 bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-5 sm:p-6">
            <div>
              <label
                htmlFor="caption"
                className="block text-xs uppercase tracking-widest text-white/70 font-medium mb-2"
              >
                Caption & Description
              </label>
              <textarea
                id="caption"
                rows="4"
                placeholder="What's this photo about? Add tags or inspiration..."
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full bg-black/40 border border-white/15 focus:border-white/50 text-white placeholder-white/30 p-3.5 text-sm rounded-xl outline-none transition-all duration-300 resize-none"
              />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-black/20 border border-white/10 rounded-xl">
              <div>
                <p className="text-xs sm:text-sm font-medium text-white/90">Keep this post private</p>
                <p className="text-[11px] text-white/50">Only you will be able to see it in your profile</p>
              </div>
              <input
                type="checkbox"
                id="isPrivate"
                checked={isPrivate}
                onChange={(e) => setIsPrivate(e.target.checked)}
                className="w-4 h-4 rounded cursor-pointer accent-white"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !file}
              className={`w-full border font-medium tracking-widest uppercase py-3.5 px-6 rounded-xl transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer mt-2 ${file && !loading
                ? "bg-white text-zinc-950 border-white hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                : "bg-white/5 text-white/40 border-white/10 cursor-not-allowed"
                }`}
            >
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUploadPage;
