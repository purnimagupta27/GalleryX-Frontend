import { useState } from "react";
import toast from "react-hot-toast";
import { createCollection } from "../services/collection.service";

const Bookmark = ({ isOpen = true, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [collectionName, setCollectionName] = useState("");

  if (!isOpen) return null;

  const handleCreate = async (e) => {
    e.preventDefault();
    if (collectionName.trim() === "") {
      return toast.error("Collection name is required");
    }

    setLoading(true);
    try {
      await createCollection(collectionName);
      toast.success("Collection created");
      setCollectionName("");
      if (onClose) onClose();
    } catch (err) {
      if (err.response?.status === 409) {
        toast.error("Name with this collection already exists");
      } else {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => onClose && onClose()}
    >
      <div
        className="w-full max-w-md backdrop-blur-2xl bg-zinc-900/95 border border-white/15 rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2
            className="text-lg sm:text-xl font-bold tracking-wide text-white"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Give this collection a title
          </h2>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="text-white/40 hover:text-white transition-colors duration-200 p-1 rounded-lg hover:bg-white/10 cursor-pointer text-lg leading-none"
            >
              ✕
            </button>
          )}
        </div>

        <form onSubmit={handleCreate} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="e.g. Architecture, Moodboard, Places..."
            value={collectionName}
            onChange={(e) => setCollectionName(e.target.value)}
            autoFocus
            className="w-full bg-white/5 border border-white/15 focus:border-white/50 text-white placeholder-white/40 px-4 py-3 text-sm rounded-xl outline-none transition-all duration-300 shadow-inner"
          />

          <div className="flex items-center justify-end gap-2.5 mt-2">
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-white/10 hover:border-white/30 text-white/70 hover:text-white text-xs sm:text-sm font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer"
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading || !collectionName.trim()}
              className={`border font-medium tracking-widest uppercase py-2.5 px-5 rounded-xl transition-all duration-300 text-xs sm:text-sm cursor-pointer ${
                collectionName.trim() && !loading
                  ? "bg-white text-zinc-950 border-white hover:bg-white/90 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  : "bg-white/5 text-white/40 border-white/10 cursor-not-allowed"
              }`}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Bookmark;
