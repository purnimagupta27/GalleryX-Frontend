import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6 select-none">
      <h2
        className="text-lg sm:text-xl font-normal tracking-wider uppercase text-white mb-8 text-center"
        style={{ fontFamily: "'Outfit', sans-serif" }}
      >
        Enter your info to login
      </h2>

      <form
        action=""
        className="w-full max-w-md bg-zinc-900/40 backdrop-blur-xl border border-white/20 hover:border-white/60 rounded-2xl p-8 sm:p-10 shadow-2xl flex flex-col gap-5 transition-all duration-500"
      >
        <label className="text-xs uppercase tracking-widest text-white/70 font-medium mb-0">
          Email or username
        </label>
        <input
          type="text"
          placeholder="Enter your email or username"
          className="w-full bg-white/5 border border-white/20 hover:border-white/60 focus:border-white/60 text-white placeholder-white/30 rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-300"
        />

        <label className="text-xs uppercase tracking-widest text-white/70 font-medium mb-0 mt-2">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          className="w-full bg-white/5 border border-white/20 hover:border-white/60 focus:border-white/60 text-white placeholder-white/30 rounded-xl px-5 py-3.5 text-sm outline-none transition-all duration-300"
        />

        <div className="flex items-center gap-2 mt-4 mb-2">
          <input
            type="checkbox"
            id="rememberMe"
            className="w-4 h-4 rounded border-white/30 bg-transparent accent-white cursor-pointer"
          />
          <label htmlFor="rememberMe" className="text-xs text-white/70 cursor-pointer select-none">
            Remember me
          </label>
        </div>

        <button
          type="button"
          className="w-full border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-widest uppercase py-3.5 px-6 rounded-xl transition-all duration-500 cursor-pointer text-sm mt-2"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center text-xs text-white/60 font-normal">
        <p style={{ fontFamily: "'Outfit', sans-serif" }}>
          Don't have an account? {" "}
          <Link to="/register" className="text-white font-semibold hover:underline ml-1">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
