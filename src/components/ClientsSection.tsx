import { useEffect, useRef } from "react";

const clients = [
  {
    id: 1,
    name: "Kean Corporation",
    logo: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/KEAN-removebg-preview.png?updatedAt=1746793773995",
    quote:
      "BHAWANI CON. delivered our factory expansion project on time and within budget. Their attention to detail was impressive.",
  },
  {
    id: 2,
    name: "Shine Industries",
    logo: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/SHINE-removebg-preview.png?updatedAt=1746793772876",
    quote:
      "We've worked with BHAWANI CON. on multiple projects. Their team consistently delivers quality work and innovative solutions.",
  },
  {
    id: 3,
    name: "Global Energy Ltd",
    logo: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/GLOBAL-removebg-preview.png?updatedAt=1746793774405",
    quote:
      "The solar installation by BHAWANI CON. has significantly reduced our energy costs. Professional service from start to finish.",
  },
  {
    id: 4,
    name: "Metro Developments",
    logo: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/metro-removebg-preview.png?updatedAt=1746793772758",
    quote:
      "BHAWANI CON.'s civil works team provided exceptional service for our commercial development. Highly recommended.",
  },
  {
    id: 5,
    name: "InnoTech Systems",
    logo: "https://ik.imagekit.io/p66ljstle/Construction%20Assets/inno-removebg-preview.png?updatedAt=1746793772843",
    quote:
      "The fireproofing solution installed by BHAWANI CON. gives us peace of mind about our facility's safety.",
  },
];

const ClientsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const elements = entry.target.querySelectorAll(".client-item");
          elements.forEach((el, i) => {
            setTimeout(() => {
              el.classList.add("active");
            }, i * 100);
          });
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="clients"
      className="py-16 md:py-24 parallax-bg"
      style={{
        backgroundImage:
          'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://images.unsplash.com/photo-1427751840561-9852520f8ce8?auto=format&fit=crop&w=1600&q=80")',
      }}
    >
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title">
          Our <span className="text-construction-red">Clients</span>
        </h2>
        <p className="section-subtitle">
          Companies who trust our expertise and services
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-16">
          {clients.map((client) => (
            <div
              key={client.id}
              className="client-item reveal-on-scroll bg-white p-4 rounded-lg shadow-md flex items-center justify-center"
            >
              <img src={client.logo} alt={client.name} className="max-h-16" />
            </div>
          ))}
        </div>

        <h3 className="text-2xl font-semibold text-center mb-10">
          What Our Clients Say
        </h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((client, index) => (
            <div
              key={`quote-${client.id}`}
              className="group client-item reveal-on-scroll bg-white p-6 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
            >
              <div className="mb-4 text-construction-blue group-hover:text-[#d22630] transition-all duration-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="mb-4 italic">{client.quote}</p>
              <div className="font-medium transition-all duration-300 group-hover:text-[#d22630]">
                {client.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientsSection;
