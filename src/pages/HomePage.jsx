import { useEffect, useState } from "react";
import { feed } from "../services/feed.service";
import { HomeNavbar } from "../components/HomeNavbar";
import { useNavigate } from "react-router-dom";
import Shimmer from "../components/Shimmer";

const HomePage = () => {
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        setLoading(true);
        const imageData = await feed();
        setImages(imageData?.data?.data?.posts || []);
      } catch (err) {
        if (err.response?.status === 401) {
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchImageData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <HomeNavbar />
      <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8 flex-1">
        {loading ? (
          <Shimmer />
        ) : (
          <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-3.5 sm:gap-4.5 [column-fill:_balance]">
            {images?.map((img) => {
              return (
                <div
                  key={img.id}
                  className="relative group w-full rounded-xl overflow-hidden border border-white/10 select-none
             mb-3.5 sm:mb-4.5 break-inside-avoid
             transition-all duration-300 ease-out
             hover:scale-[1.03] hover:border-white/40 hover:shadow-[0_6px_20px_rgba(255,255,255,0.08)]"
                >
                  <img
                    src={img.url}
                    alt={img.caption || "Inspiration"}
                    loading="lazy"
                    className="w-full h-auto block object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent
               pointer-events-none opacity-0 group-hover:opacity-100
               transition-opacity duration-300 ease-out"
                  />

                  {img.caption && (
                    <div
                      className="absolute inset-x-2.5 bottom-2.5
                 opacity-0 translate-y-2 pointer-events-none
                 group-hover:opacity-100 group-hover:translate-y-0
                 transition-all duration-300 ease-out delay-[50ms]"
                    >
                      <p
                        className="text-[11px] sm:text-xs font-normal text-white/80 leading-tight line-clamp-2"
                        style={{ fontFamily: "'Outfit', sans-serif" }}
                      >
                        {img.caption}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
