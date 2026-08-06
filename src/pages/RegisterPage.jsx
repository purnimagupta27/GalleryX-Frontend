import { Link } from "react-router-dom";
import formBackground from "../assets/form-background.png";

const RegisterPage = () => {
  return (
    <div className="min-h-screen bg-[#0e0d10] text-white flex flex-col items-center md:items-end justify-center p-6 md:px-12 lg:px-16 select-none relative overflow-hidden">
      <img
        src={formBackground}
        alt="Form Background"
        className="absolute inset-y-0 left-0 h-full w-auto max-w-none object-cover object-left opacity-100 pointer-events-none"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#0e0d10]/20 to-[#0e0d10] pointer-events-none" />

      <div className="relative z-10 w-full md:w-[46%] max-w-lg flex flex-col items-center md:items-start">
        <h1 className="text-3xl sm:text-4xl font-medium tracking-wider uppercase text-white/90 text-center md:text-left mb-12 sm:mb-16">
          JOIN US TODAY
        </h1>

        <form
          action=""
          className="w-full bg-transparent rounded-2xl px-0 py-0 flex flex-col gap-6.5 transition-all duration-500"
        >
          <label className="text-xs uppercase tracking-widest text-white/70 font-medium mb-0">
            Username
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full bg-transparent border-b border-white/30 hover:border-b-white/70 focus:border-b-white text-white placeholder-white/30 px-1 py-4 text-sm outline-none transition-all duration-300 rounded-none"
          />

          <label className="text-xs uppercase tracking-widest text-white/70 font-medium mb-0 mt-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Your email"
            className="w-full bg-transparent border-b border-white/30 hover:border-b-white/70 focus:border-b-white text-white placeholder-white/30 px-1 py-4 text-sm outline-none transition-all duration-300 rounded-none"
          />

          <label className="text-xs uppercase tracking-widest text-white/70 font-medium mb-0 mt-1">
            Password
          </label>
          <input
            type="password"
            placeholder="Create password"
            className="w-full bg-transparent border-b border-white/30 hover:border-b-white/70 focus:border-b-white text-white placeholder-white/30 px-1 py-4 text-sm outline-none transition-all duration-300 rounded-none"
          />

          <button
            type="button"
            className="w-full border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-widest uppercase py-4 px-6 rounded-xl transition-all duration-500 cursor-pointer text-sm mt-3"
          >
            Register
          </button>
        </form>

        <div className="mt-5 text-center md:text-left w-full text-xs text-white/60 font-normal">
          <p style={{ fontFamily: "'Outfit', sans-serif" }}>
            Already have an account?{" "}
            <Link to="/login" className="text-white font-semibold hover:underline ml-1">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;