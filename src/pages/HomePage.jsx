import { useEffect, useState } from "react";
import { feed } from "../services/auth.service";
import { HomeNavbar } from "../components/HomeNavbar";

const HomePage = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        setLoading(true);
        const imageData = await feed();
        console.log(imageData);
        setImages(imageData?.data?.data?.posts || []);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchImageData();
  }, []);

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">
      <HomeNavbar />
      <div className="max-w-[1600px] mx-auto w-full p-4 sm:p-6 md:p-8 flex-1">
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <p className="text-white/60 text-sm tracking-wider uppercase">Loading...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {images?.map((img) => {
              return (
                <div
                  key={img.id}
                  className="relative group aspect-[3/4] w-full rounded-2xl overflow-hidden border border-white/10 select-none
                             transition-all duration-300 ease-out
                             hover:scale-[1.03] hover:border-white/40 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
                >
                  <img
                    src={img.url}
                    alt={img.caption || "Inspiration"}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

                  <div className="absolute inset-x-3.5 bottom-3.5 p-3.5 sm:p-4 rounded-xl backdrop-blur-md bg-zinc-950/75 border border-transparent shadow-lg transition-all duration-300 group-hover:bg-zinc-950/90">
                    <p
                      className="text-xs sm:text-sm font-medium text-white/90 leading-snug line-clamp-2"
                      style={{ fontFamily: "'Outfit', sans-serif" }}
                    >
                      {img.caption}
                    </p>
                  </div>
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
