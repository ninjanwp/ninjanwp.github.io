import { motion, useTransform, MotionValue } from "framer-motion";
import {
  DiReact,
  DiPython,
  DiPhp,
  DiJava,
  DiMysql,
  DiNodejs,
  DiJavascript1,
  DiBootstrap,
  DiAndroid,
  DiMsqlServer,
} from "react-icons/di";

import { SiR, SiTailwindcss, SiTypescript } from "react-icons/si";
import ZoopText from "./ZoopText";
import { DataGridVisual } from "./ProjectVisuals/DataGridVisual";
import { PhoneVisual } from "./ProjectVisuals/PhoneVisual";
import { DatabaseVisual } from "./ProjectVisuals/DatabaseVisual";
import { StorefrontVisual } from "./ProjectVisuals/StorefrontVisual";
import { PortfolioVisual } from "./ProjectVisuals/PortfolioVisual";

import { Project, ProjectVisualType } from "../types/project";
import { WebDesignVisual } from "./ProjectVisuals/WebDesignVisual";
import { FiTool } from "react-icons/fi";
import SectionHeader from "./SectionHeader";
import SubheadingDivider from "./SubheadingDivider";
import { useState, useRef } from "react";

// Remove GlyphCycler component as it's no longer needed

interface TechBadge {
  icon: JSX.Element;
  name: string;
}

const techStack: TechBadge[] = [
  { icon: <DiReact />, name: "React" },
  { icon: <DiPython />, name: "Python" },
  { icon: <DiPhp />, name: "PHP" },
  { icon: <DiJava />, name: "Java" },
  { icon: <DiMysql />, name: "MySQL" },
  { icon: <DiNodejs />, name: "Node.js" },
  { icon: <DiJavascript1 />, name: "JavaScript" },
  { icon: <DiBootstrap />, name: "Bootstrap" },
  { icon: <DiAndroid />, name: "Android" },
  { icon: <DiMsqlServer />, name: "MS SQL" },
  { icon: <SiR />, name: "R" },
  { icon: <SiTailwindcss />, name: "Tailwind" },
  { icon: <SiTypescript />, name: "TypeScript" },
];

const ProjectVisual = ({ type }: { type: ProjectVisualType }) => {
  switch (type) {
    case "portfolio":
      return <PortfolioVisual />;
    case "storefront":
      return <StorefrontVisual />;
    case "dataGrid":
      return <DataGridVisual />;
    case "webDesign":
      return <WebDesignVisual />;
    case "phone":
      return <PhoneVisual />;
    case "database":
      return <DatabaseVisual />;
    default:
      return null;
  }
};

const ProjectItem = ({
  title,
  glyphs,
  description,
  link,
  visualType,
  index,
  inProgress,
}: Project & { index: number }) => {
  const formattedIndex = String(index + 1).padStart(2, "0");

  const getTechBadges = (icons: JSX.Element[]) => {
    return icons
      .map((icon) => techStack.find((tech) => tech.icon.type === icon.type))
      .filter((tech): tech is TechBadge => tech !== undefined);
  };

  const techBadges = getTechBadges(glyphs);

  return (
    <motion.div className="group relative w-full select-none">
      <div className="relative flex flex-col h-[450px] rounded-lg border border-stone-950/5 shadow-lg transition-colors duration-300 group-hover:shadow-sm transition-shadow">
        {/* Visual Container */}
        <div className="relative h-[300px] rounded-t-lg overflow-hidden">
          <div className="w-full h-full bg-stone-950">
            <ProjectVisual type={visualType} />
          </div>

          {/* Top overlay for index and status */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-1">
            <span className="font-mono text-stone-300 text-sm bg-stone-950/50 px-2 py-1 rounded-full">
              {formattedIndex}
            </span>
            {inProgress && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1 text-xs bg-stone-500/20 text-stone-200 px-2 py-1 rounded-full border border-stone-500/20"
              >
                <FiTool /> In Progress
              </motion.div>
            )}
          </div>

          {/* Bottom overlay for technologies */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-wrap gap-2">
            {techBadges.map((tech, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-2 text-xs bg-stone-950/50 text-stone-200 px-2 py-1 rounded-full border border-stone-500/20"
              >
                <span className="text-lg">{tech.icon}</span>
                <span className="font-medium">{tech.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-5">
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-bold text-stone-950">{title}</h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {description}
            </p>
          </div>

          <motion.a
            className="select-none flex text-base text-stone-950 pt-3"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ZoopText>GITHUB</ZoopText>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectCarousel = ({
  projects,
  title,
}: {
  projects: Project[];
  title: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (container) {
      const scrollPosition = container.scrollLeft;
      const itemWidth = container.offsetWidth;
      const newIndex = Math.round(scrollPosition / itemWidth);
      setCurrentIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (container) {
      const itemWidth = container.offsetWidth;
      container.scrollTo({
        left: itemWidth * index,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  return (
    <div className="space-y-4">
      <SubheadingDivider title={title} />
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="grid grid-flow-col auto-cols-[100%] lg:auto-cols-[33.33%] overflow-x-auto snap-x snap-mandatory gap-3 pb-6 scrollbar-hide"
        >
          {projects.map((project, index) => (
            <div key={index} className="snap-start">
              <ProjectItem {...project} index={index} />
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                currentIndex === index ? "bg-stone-950 w-4" : "bg-stone-400"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProjectsProps {
  scrollProgress: MotionValue<number>;
}

export const Projects = ({ scrollProgress }: ProjectsProps) => {
  // const opacity = useTransform(scrollProgress, [0, 0.5], [0, 1]);
  const scale = useTransform(
    scrollProgress,
    [0, 0.3],
    [0.8, 1]
  );
  const x = useTransform(
    scrollProgress,
    [0, 0.2],
    ["20%", "0%"]
  );
  const skew = useTransform(
    scrollProgress,
    [0, 0.2],
    ["15deg", "0deg"]
  );

  const personalProjects: Project[] = [
    {
      title: "Personal Portfolio Website",
      slug: "portfolio",
      description:
        "Modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS",
      link: "https://github.com/ninjanwp/portfolio",
      glyphs: [<DiReact />, <SiTypescript />, <SiTailwindcss />],
      visualType: "portfolio",
    },
    {
      title: "CRUD Retail Application",
      slug: "webstore",
      description:
        "Full-stack webstore with CRUD support via Node.js RESTful API",
      link: "https://github.com/ninjanwp/webstore",
      glyphs: [<DiReact />, <DiNodejs />, <DiJavascript1 />],
      visualType: "storefront",
    },
  ];

  const academicProjects: Project[] = [
    {
      title: "Advanced Web App Development",
      slug: "lis4368",
      description: "Full-stack web development focusing on best practices",
      link: "https://github.com/ninjanwp/lis4368",
      glyphs: [<DiJava />, <DiJavascript1 />, <DiBootstrap />], // Multiple icons
      visualType: "webDesign",
      inProgress: true,
    },
    {
      title: "Mobile Web App Development",
      slug: "lis4381",
      description:
        "Cross-platform mobile development with responsive design principles",
      link: "https://github.com/ninjanwp/lis4381",
      glyphs: [<DiPhp />, <DiJava />], // Multiple icons
      visualType: "phone",
    },
    {
      title: "Extensible Enterprise Solutions",
      slug: "lis4369",
      description:
        "Data Science implementations using Python, R, and Business Intelligence tools",
      link: "https://github.com/ninjanwp/lis4369",
      glyphs: [<DiPython />, <SiR />], // Multiple icons
      visualType: "dataGrid",
    },
    {
      title: "Advanced Mobile App Development",
      slug: "lis4331",
      description:
        "Native mobile application development with advanced features",
      link: "https://github.com/ninjanwp/lis4331",
      glyphs: [<DiJava />, <DiAndroid />], // Multiple icons
      visualType: "phone",
      inProgress: true,
    },
    {
      title: "Advanced Database Management",
      slug: "lis3781",
      description: "Complex database systems design and implementation",
      link: "https://github.com/ninjanwp/lis3781",
      glyphs: [<DiMysql />, <DiMsqlServer />], // Multiple icons
      visualType: "database",
      inProgress: true,
    },
  ];

  return (
    <motion.section
      style={{ x, scale, skew }}
      id="projects"
      className="relative w-full h-full overflow-y-auto py-24 max-w-7xl mx-auto px-4 md:px-8 bg-stone-200 rounded-xl"
    >
      <SectionHeader
        title="Projects"
        label="A showcase of personal and academic projects demonstrating my experience with various technologies."
      />

      <div className="space-y-12">
        <ProjectCarousel title="Personal" projects={personalProjects} />
        <ProjectCarousel title="Academic" projects={academicProjects} />
      </div>
    </motion.section>
  );
};
