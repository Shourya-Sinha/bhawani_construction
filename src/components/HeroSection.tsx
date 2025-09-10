import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { GetHeroSectionData } from "../constant/Constant";

interface HeroData {
  mainTitle: string;
  heroDescription: string;
  heroYear: number;
  _id: string;
}

const HeroSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setError(null);
        const response = await GetHeroSectionData();
        // console.log("response", response);
        setHeroData(response);
      } catch (error) {
        console.log("error in fetching", error);
        setError(error)
      } finally {
        setLoading(false); // stop loading
      }
    };
    fetchData();
  }, []);
  // console.log("statte data", heroData);
  if (loading) {
    return (
      <section
        id="about"
        className="flex items-center justify-center min-h-[400px]"
      >
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </section>
    );
  }

  if (error) {
    return (
      <section
        id="about"
        className="flex items-center justify-center min-h-[400px]"
      >
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  if (!heroData) {
    return null; // nothing to show, but safe
  }
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center parallax-bg"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url("https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1600&q=80")',
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
          {/* Building Tomorrow's Infrastructure Today */}{" "}
          {heroData?.mainTitle || ""}
        </h1>
        <p
          className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto animate-fade-in"
          style={{ animationDelay: "0.2s" }}
        >
          {/* Excellence in construction, fabrication, and engineering solutions for
          over 10 years. */}{" "}
          {heroData?.heroDescription || ""}
        </p>
        <div className="animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button
            className="bg-construction-red hover:bg-construction-red/90 text-white text-lg px-8 py-6"
            onClick={() => document.querySelector("#contact")?.scrollIntoView()}
          >
            Get in Touch
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
