import { Link, useNavigate } from "react-router-dom";
import formBackground from "../assets/form-background.png";
import { useState } from "react";
import { login } from "../services/auth.service";

const LoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (!formData.identifier || !formData.password) {
        setError("Please provide all required details");
        return;
      }

      await login(formData);
      navigate('/homepage')
    } 
    catch (err) {
      if (err.response?.status === 404) {
        setError("User does not exist");
      }
      if(err.response?.status === 401){
        setError("Incorrect password")
      } 
      else {
        setError("Something went wrong");
      }
    } 
    finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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
          Welcome Back
        </h1>

        <form
          action=""
          className="w-full bg-transparent rounded-2xl px-0 py-0 flex flex-col gap-6.5 transition-all duration-500"
          onSubmit={handleSubmit}
        >
          <label className="text-xs uppercase tracking-widest text-white/70 font-medium mb-0">
            Account
          </label>
          <input
            type="text"
            name="identifier"
            placeholder="Email or username"
            value={formData.identifier}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-white/30 hover:border-b-white/70 focus:border-b-white text-white placeholder-white/30 px-1 py-4 text-sm outline-none transition-all duration-300 rounded-none"/>

          <label className="text-xs uppercase tracking-widest text-white/70 font-medium mb-0 mt-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={formData.password}
            onChange={handleChange}
            className="w-full bg-transparent border-b border-white/30 hover:border-b-white/70 focus:border-b-white text-white placeholder-white/30 px-1 py-4 text-sm outline-none transition-all duration-300 rounded-none"
          />

          <button
            type="submit"
            className="w-full border border-white/20 hover:border-white/60 hover:bg-white/10 text-white font-medium tracking-widest uppercase py-4 px-6 rounded-xl transition-all duration-500 cursor-pointer text-sm mt-3"
            disabled={loading}
          >
            {loading ? "Please wait..." : "Login"}
          </button>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}
        </form>

        <div className="mt-5 text-center md:text-left w-full text-xs text-white/60 font-normal">
          <p style={{ fontFamily: "'Outfit', sans-serif" }}>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-white font-semibold hover:underline ml-1"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
