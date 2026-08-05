import images from "../utils/masonryImages";

const Masonry = () => {
  const doubledImages = [...images, ...images];

  return (
    <section className="w-full pt-4 sm:pt-6 pb-16 sm:pb-24 overflow-hidden">
      <div className="text-center mb-12 sm:mb-16 mt-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-wide uppercase text-white/90">
          Inspiration starts here
        </h2>
      </div>

      <div className="marquee-mask relative">
        <div className="marquee-track flex gap-5 w-max hover:[animation-play-state:paused]">
          {doubledImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`inspiration ${(i % images.length) + 1}`}
              loading="lazy"
              draggable={false}
              className="marquee-img h-64 sm:h-72 md:h-80 lg:h-96 w-auto aspect-[3/4] object-cover rounded-2xl border border-white/10 select-none
                         transition-all duration-300 ease-out
                         hover:scale-[1.03] hover:border-white/40 hover:shadow-[0_8px_30px_rgba(255,255,255,0.08)]"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Masonry;