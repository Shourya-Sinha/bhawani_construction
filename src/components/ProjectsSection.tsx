import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Industrial & Commercial Construction",
    category: "Construction",
    description:
      "Hands-on experience with Mivan board, Nova board, and RMD board formwork systems.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=800&q=80", // factory / industrial site
  },
  {
    id: 2,
    title: "Modern Office Building",
    category: "Civil Works & Cladding",
    description:
      "Corporate headquarters with distinctive architectural cladding and advanced civil engineering.",
    image:
       "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=80", // modern building
  },
  {
    id: 3,
    title: "Complete Turnkey Solution",
    category: "Turnkey Projects",
    description:
      "Capable of delivering turnkey solutions from structure to final finishing, ensuring quality and timely completion.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80", // generic construction solution
  },
  {
    id: 4,
    title: "Industrial Fireproofing",
    category: "Fireproofing",
    description:
      "Comprehensive fireproofing solutions to protect structures and ensure compliance with safety standards.",
    image:
      "https://images.unsplash.com/photo-1488972685288-c3fd157d7c7a?auto=format&fit=crop&w=800&q=80", // industrial site
  },
  {
    id: 5,
    title: "Finishing Works",
    category: "Finishing",
    description:
      "Lead an expert finishing team specialized in plastering, putty filling, and interior finishing works.",
    image:
      "https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?auto=format&fit=crop&w=800&q=80", // interior finishing
  },
  {
    id: 6,
    title: "Civil Works Development",
    category: "Civil Works",
    description:
      "Complete civil engineering and construction services for foundations, infrastructure, and more.",
    image:
      "https://images.unsplash.com/photo-1527596428173-1aa3d1bdaa3f?auto=format&fit=crop&w=800&q=80", // infrastructure
  },
];

const ProjectsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const displayedProjects = projects.slice(
    currentPage * projectsPerPage,
    (currentPage + 1) * projectsPerPage
  );

  const nextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
    if (listRef.current) {
      listRef.current.scrollBy({ top: 50, behavior: "smooth" });
    }
  };

  const prevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
    if (listRef.current) {
      listRef.current.scrollBy({ top: 50, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
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
    <section id="projects" className="py-16 md:py-24 bg-white">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title">
          Featured <span className="text-construction-blue">Projects</span>
        </h2>
        <p className="section-subtitle">
          Discover our portfolio of successful construction projects
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {displayedProjects.map((project, index) => (
            <div
              key={project.id}
              className="project-card bg-white rounded-lg shadow-md overflow-hidden reveal-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="h-60 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <span className="text-sm font-medium text-construction-red mb-2 block">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="mb-4">{project.description}</p>
                <Button
                  variant="outline"
                  className="w-full border-construction-blue text-construction-blue hover:bg-construction-blue hover:text-white"
                >
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-12 space-x-4" ref={listRef}>
            <Button
              onClick={prevPage}
              variant="outline"
              size="icon"
              className="border-construction-blue text-construction-blue hover:bg-construction-blue hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="text-construction-gray">
              {currentPage + 1} / {totalPages}
            </div>

            <Button
              onClick={nextPage}
              variant="outline"
              size="icon"
              className="border-construction-blue text-construction-blue hover:bg-construction-blue hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
