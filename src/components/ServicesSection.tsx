import { useEffect, useRef } from "react";
import { Factory, Building, Flame, House, Shovel, Sun } from "lucide-react";

const services = [
  {
    id: 1,
    title: "Fabrication",
    description:
      "Custom metal fabrication and structural steel manufacturing for various industrial applications.",
    icon: Factory,
  },
  {
    id: 2,
    title: "Erection",
    description:
      "Expert installation and erection of steel structures, ensuring stability and durability.",
    icon: Building,
  },
  {
    id: 3,
    title: "Fireproofing",
    description:
      "Comprehensive fireproofing solutions to protect structures and ensure compliance with safety standards.",
    icon: Flame,
  },
  {
    id: 4,
    title: "Roofing & Cladding",
    description:
      "High-quality roofing and cladding services for commercial and industrial buildings.",
    icon: House,
  },
  {
    id: 5,
    title: "Civil Works",
    description:
      "Complete civil engineering and construction services for foundations, infrastructure, and more.",
    icon: Shovel,
  },
  {
    id: 6,
    title: "Solar System Installation",
    description:
      "Professional installation of solar power systems for sustainable energy solutions.",
    icon: Sun,
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.9 }
    );

    const serviceCards = document.querySelectorAll(".service-card");
    serviceCards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      serviceCards.forEach((card) => {
        observer.unobserve(card);
      });
    };
  }, []);

  return (
    <section
      id="services"
      className="py-16 md:py-24 parallax-bg"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?auto=format&fit=crop&w=1600&q=80")',
      }}
    >
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title">
          Our <span className="text-construction-red">Services</span>
        </h2>
        <p className="section-subtitle">
          Comprehensive construction solutions tailored to your needs
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className={`
        group service-card bg-white p-6 rounded-lg shadow-md reveal-on-scroll 
        transition-all duration-300 cursor-pointer 
        hover:bg-[#d22630] hover:text-white 
        ${index % 2 === 0 ? "animate-slide-in-left" : "animate-slide-in-right"}
      `}
              style={{
                animationDelay: `${index * 0.9}s`,
                animationFillMode: "both",
              }}
            >
              <div className="flex justify-center mb-4">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full 
          bg-construction-blue/10 group-hover:bg-white/20 transition-all duration-300"
                >
                  <service.icon className="w-8 h-8 text-construction-blue group-hover:text-white transition-all duration-300" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center transition-all duration-300 group-hover:text-white">
                {service.title}
              </h3>
              <p className="text-center transition-all duration-300 group-hover:text-white">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
