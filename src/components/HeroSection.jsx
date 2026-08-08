const HeroSection = () => {
  return (
    <div className="mt-16 min-h-[70vh] flex flex-col items-start justify-center px-6 sm:px-10 py-12 sm:py-16 max-w-7xl mx-auto text-left">
      <div className="text-left max-w-5xl">
        <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl font-medium tracking-wider uppercase leading-tight text-white/90">
          Turn Moments <br /> Into Memories
        </h1>
        <p
          className="mt-6 sm:mt-8 text-sm sm:text-base md:text-lg text-white/40 font-normal tracking-wide leading-relaxed max-w-2xl"
          style={{ fontFamily: "'Outfit', sans-serif" }}
        >
          Pixora is a place where creativity meets community. <br />
          Share stunning photos, discover inspiring creators <br /> and keep
          your private moments safe.
        </p>
        <div className="flex gap-8 mt-10 text-xl">
          <button className="text-xs sm:text-sm font-medium tracking-widest uppercase text-white/70 hover:text-white border border-white/20 hover:border-white/60 hover:bg-white/10 py-4 px-5 sm:px-6 rounded-xl transition-all duration-500 cursor-pointer">Upload Pictures</button>
        </div>
      </div>
      <div className="w-full max-w-7xl mx-auto mt-16 sm:mt-20"></div>
    </div>
  );
};

export default HeroSection;
