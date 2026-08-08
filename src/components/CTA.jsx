import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate()
  return (
    <section className='max-w-7xl mx-auto px-6 sm:px-10 py-16 sm:py-24 text-center'>
      <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-wide uppercase text-white/90 mb-4 sm:mb-6 md:whitespace-nowrap'>Ready to Share Your Creativity?</h2>
      <p className='text-xs sm:text-sm md:text-base text-white/40 font-normal leading-relaxed max-w-xl sm:max-w-2xl mx-auto mb-8 sm:mb-10' style={{ fontFamily: "'Outfit', sans-serif" }}>
        Join Gallery X today and start sharing your favourite moments, discover
        inspiring creators and build your own visual gallery.
      </p>
      <button
        onClick={() => navigate('/register')}
        className='text-xs sm:text-sm font-medium tracking-widest uppercase text-white/80 hover:text-white border border-white/30 hover:border-white/60 hover:bg-white/10 py-3 sm:py-3.5 px-5 sm:px-5.5 rounded-xl transition-all duration-300 cursor-pointer shadow-md'
      >
        Get Started
      </button>
    </section>
  );
};

export default CTA;
