import CTA from "../components/CTA"
import Features from "../components/Features"
import Footer from "../components/Footer"
import HeroSection from "../components/HeroSection"
import LandingNavbar from "../components/LandingNavbar"
import Masonry from "../components/Masonry"

const LandingPage = () => {
  return (
    <div className="landing-hero-bg min-h-screen bg-zinc-950 text-white">
      <LandingNavbar />
      <HeroSection />
      <Masonry />
      <Features />
      <CTA />
      <Footer />
    </div>
  )
}

export default LandingPage