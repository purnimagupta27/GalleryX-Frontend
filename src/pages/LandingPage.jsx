import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CTA from "../components/CTA";
import Features from "../components/Features";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import LandingNavbar from "../components/LandingNavbar";
import Masonry from "../components/Masonry";
import ImageUpload from "../components/ImageUpload";

const LandingPage = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="landing-hero-bg min-h-screen bg-zinc-950 text-white">
      <LandingNavbar />
      <HeroSection onUploadClick={() => setIsUploadOpen(true)} />
      <section id="masonry">
        <Masonry />
      </section>
      <section id="features">
        <Features />
      </section>
      <CTA />
      <Footer />

      <ImageUpload
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onPostCreated={() => {
          setIsUploadOpen(false);
          navigate("/homepage");
        }}
      />
    </div>
  );
};

export default LandingPage;