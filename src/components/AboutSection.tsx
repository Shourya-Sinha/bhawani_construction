import { useEffect, useRef, useState } from "react";

interface CounterProps {
  target: number;
  label: string;
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

  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="section-container">
        <h2 className="section-title">
          About <span className="text-construction-blue">Us</span>
        </h2>
        <p className="section-subtitle">Building excellence since 2020</p>

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
              Your Trusted Partner in Construction Excellence
            </h3>
            <p className="mb-4">
              BHAWANI CON. has been at the forefront of the construction
              industry for over two decades, delivering exceptional quality and
              innovation in every project.
            </p>
            <p className="mb-6">
              We specialize in providing comprehensive construction services
              including fabrication, erection, fireproofing, roofing & cladding,
              civil works, and solar system installation.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <CounterBox target={25} label="Years of Experience" />
              <CounterBox target={500} label="Projects Completed" />
              <CounterBox target={300} label="Professional Team" />
              <CounterBox target={50} label="Industry Awards" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
