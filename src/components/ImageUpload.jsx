import { useState } from "react";
import toast from "react-hot-toast";
import { createPost } from "../services/post.service";

const ImageUpload = ({ isOpen = true, onClose, onPostCreated }) => {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setFile(null);
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setImagePreview(null);
    setCaption("");
    setIsPrivate(false);
    setIsDragging(false);
  };

  const handleClose = () => {
    resetForm();
    if (onClose) onClose();
  };

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

  const handleRemoveImage = (e) => {
    e.stopPropagation();
    if (imagePreview) {
      URL.revokeObjectURL(imagePreview);
    }
    setFile(null);
    setImagePreview(null);
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
      const response = await createPost(formData);
      toast.success("Post created successfully!");
      if (onPostCreated) {
        onPostCreated(response);
      }
      handleClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto select-none"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-xl md:max-w-2xl max-h-[90vh] flex flex-col backdrop-blur-2xl bg-zinc-900/95 border border-white/15 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative animate-in zoom-in-95 duration-200 overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5 shrink-0">
          <div>
            <h2
              className="text-lg sm:text-xl font-bold tracking-wide text-white uppercase"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Share Your Creativity
            </h2>
            <p className="text-xs sm:text-sm text-white/50 mt-0.5">
              Upload a photo and let your imagination speak.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="text-white/40 hover:text-white transition-colors duration-200 p-1.5 rounded-xl hover:bg-white/10 cursor-pointer text-lg leading-none"
            title="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-start">
            <div className="w-full">
              <label
                htmlFor="modal-image-upload"
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`w-full min-h-[220px] sm:min-h-[260px] max-h-[300px] rounded-2xl border-2 border-dashed flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 relative overflow-hidden backdrop-blur-md ${
                  isDragging
                    ? "border-white bg-white/15 scale-[1.01]"
                    : "border-white/20 hover:border-white/50 bg-white/5 hover:bg-white/10"
                }`}
              >
                {imagePreview ? (
                  <div className="relative group w-full h-full flex flex-col items-center justify-center">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="max-h-[220px] sm:max-h-[250px] w-auto object-contain rounded-xl shadow-lg"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 rounded-xl transition-opacity duration-300">
                      <span className="text-xs font-medium uppercase tracking-wider text-white bg-white/20 border border-white/30 px-3 py-1.5 rounded-xl backdrop-blur-sm">
                        Change
                      </span>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="text-xs font-medium uppercase tracking-wider text-rose-300 bg-rose-500/20 border border-rose-500/30 hover:bg-rose-500/30 px-3 py-1.5 rounded-xl backdrop-blur-sm cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-white/80 transition-all duration-300">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-6L12 6m0 0l4.5 4.5M12 6v9"
                        />
                      </svg>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-white/90 mb-1">
                      Drag & drop image here
                    </p>
                    <p className="text-[11px] text-white/50 mb-3">
                      or <span className="text-white underline underline-offset-2">browse files</span>
                    </p>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider px-2.5 py-0.5 bg-white/5 rounded-full border border-white/10">
                      JPG, PNG, WEBP
                    </span>
                  </div>
                )}

                <input
                  id="modal-image-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="flex flex-col gap-3.5 sm:gap-4">
              <div>
                <label
                  htmlFor="modal-caption"
                  className="block text-[11px] uppercase tracking-widest text-white/70 font-medium mb-1.5"
                >
                  Caption
                </label>
                <textarea
                  id="modal-caption"
                  rows="4"
                  placeholder="What's this photo about? Add tags or notes..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 focus:border-white/50 text-white placeholder-white/30 p-3 text-xs sm:text-sm rounded-xl outline-none transition-all duration-300 resize-none shadow-inner"
                />
              </div>

              <div className="flex items-center justify-between p-3 bg-white/5 border border-white/10 rounded-xl">
                <div>
                  <p className="text-xs font-medium text-white/90">Keep private</p>
                  <p className="text-[10px] text-white/50">Only visible to you</p>
                </div>
                <input
                  type="checkbox"
                  id="modal-isPrivate"
                  checked={isPrivate}
                  onChange={(e) => setIsPrivate(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer accent-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10 mt-1">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-white/70 hover:text-white text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !file}
              className={`border font-medium tracking-widest uppercase py-2.5 px-5 rounded-xl transition-all duration-300 text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer ${
                file && !loading
                  ? "bg-white text-zinc-950 border-white hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                  : "bg-white/5 text-white/40 border-white/10 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-2 border-zinc-950/40 border-t-zinc-950 animate-spin" />
                  <span>Publishing...</span>
                </>
              ) : (
                "Publish Post"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ImageUpload;
