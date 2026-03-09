import { useEffect, useRef, useState } from "react";
import { GetAboutSectionData } from "../constant/Constant";
interface CounterProps {
  target: number;
  label: string;
}
interface AboutData {
  sectionTitle: string;
  sectionSubTitle: string;
  sectionStoryTitle: string;
  storyParagraphSec: string;
  storyParagraphFirst: string;
  experienceYear: number;
  industryAward: number;
  professionalTeam: number;
  subtitleYear: number;
  completedProject: number;
  _id: string;
}

const CounterBox = ({ target, label }: CounterProps) => {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated) {
          let current = 0;
          const duration = 1000;
          const increment = Math.ceil(target / (duration / 30));

          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(current);
            }
          }, 30);

          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [target, hasAnimated]);

  return (
    <div
      ref={ref}
      className="bg-construction-gray-light p-4 rounded-lg text-center"
    >
      <h4 className="text-construction-blue text-4xl font-bold">{count}+</h4>
      <p className="text-sm">{label}</p>
    </div>
  );
};

const AboutSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try { // start loading
        setError(null); // clear any old error
        const response = await GetAboutSectionData();
        console.log("response", response);
        // setAboutData(response.data);
        if (response) {
          setAboutData(response);
        } else {
          setError("No about section data received");
        }
      } catch (error) {
        console.error("error in fetching", error);
        setError("Failed to fetch about section");
      } finally {
        setLoading(false);       // stop loading
      }
    };
    fetchData();
  }, []);
  // console.log("statte data", aboutData);

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

  if (!aboutData) {
    return null; // nothing to show, but safe
  }

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title">
          About <span className="text-construction-blue">Us</span>
        </h2>
        <p className="section-subtitle">
          {/* Building excellence since 2014 */}{" "}
          {aboutData?.sectionStoryTitle || ""} since{" "}
          {aboutData?.subtitleYear || ""}
        </p>

        <div
          ref={sectionRef}
          className="grid md:grid-cols-2 gap-8 reveal-on-scroll"
        >
          <div className="w-full h-100 group" style={{ perspective: "1000px" }}>
            <div
              className="w-full h-full rounded-lg overflow-hidden shadow-xl transition-transform duration-500"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "rotateX(6deg) rotateY(-6deg)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform =
                  "rotateX(0deg) rotateY(0deg)";
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1459767129954-1b1c1f9b9ace?auto=format&fit=crop&w=800&q=80"
                alt="Construction site"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col justify-center">
            <h3 className="text-2xl font-semibold text-construction-blue mb-4">
              {/* Your Trusted Partner in Construction Excellence */}{" "}
              {aboutData?.sectionSubTitle || ""}
            </h3>
            <p className="mb-4">
              {/* BHAWANI CON. has been at the forefront of the construction
              industry for over two decades, delivering exceptional quality and
              innovation in every project. */}{" "}
              {aboutData?.storyParagraphFirst || ""}.
            </p>
            <p className="mb-6">
              {/* We specialize in providing comprehensive construction services
              including construction of commercial project ,construction of
              Residensial project including fabrication,and all civil related
              Works. */}{" "}
              {aboutData?.storyParagraphSec || ""}
            </p>

            <div className="grid grid-cols-2 gap-4">
              <CounterBox
                target={aboutData?.experienceYear || 10}
                label="Years of Experience"
              />
              <CounterBox
                target={aboutData?.completedProject || 50}
                label="Projects Completed"
              />
              <CounterBox
                target={aboutData?.professionalTeam || 100}
                label="Professional Team"
              />
              <CounterBox
                target={aboutData?.industryAward || 50}
                label="Industry Awards"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
