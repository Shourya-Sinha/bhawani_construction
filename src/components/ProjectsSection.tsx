import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GetProjectSectionData } from "../constant/Constant";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string; // or the correct type for your image
}
interface ProjectData {
  secTitleSec: string;
  secTtileFirst: string;
  secSubHeding: string;
  _id: string;
  projects: ProjectItem[];
}

const ProjectsSection = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [projectData, setProjecteData] = useState<ProjectData | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const listRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const projectsPerPage = 3;

  const totalPages = Math.ceil(projectData?.projects.length / projectsPerPage);
  // const displayedProjects = projects.slice(
  //   currentPage * projectsPerPage,
  //   (currentPage + 1) * projectsPerPage
  // );

  const displayedProjects =
    projectData?.projects.slice(
      currentPage * projectsPerPage,
      (currentPage + 1) * projectsPerPage
    ) || [];

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        setError(null);
        const response = await GetProjectSectionData();
        const projectKeys = Object.keys(response).filter((key) =>
          key.startsWith("secData")
        );
        const projectItems: ProjectItem[] = projectKeys.map((key) => {
          const item = response[key];
          return {
            id: item.id,
            title: item.title,
            category: item.category,
            description: item.desc,
            image: item.dataImage?.url || item.firstImage?.url || "", // adjust based on your structure
          };
        });
        setProjecteData({
          ...response,
          projects: projectItems,
        });
      } catch (error) {
        console.log("error while fetching", error);
        setError(error)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  // console.log("response data", projectData);

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

  if (!projectData) {
    return null; // nothing to show, but safe
  }

  return (
    <section id="projects" className="py-16 md:py-24 bg-white">
      <div className="section-container" ref={sectionRef}>
        <h2 className="section-title">
          {/* Featured */}{projectData?.secTtileFirst || ""} &nbsp;
           <span className="text-construction-blue">
            {/* Projects */}{projectData?.secTitleSec || ""}
            </span>
        </h2>
        <p className="section-subtitle">
          {/* Discover our portfolio of successful construction projects */} {projectData?.secSubHeding || ""}
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
          <div
            className="flex justify-center items-center mt-12 space-x-4"
            ref={listRef}
          >
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
