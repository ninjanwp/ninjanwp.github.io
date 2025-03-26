import { motion } from "framer-motion";
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
import { DataGridVisual } from "./ProjectVisuals/DataGridVisual";
import { PhoneVisual } from "./ProjectVisuals/PhoneVisual";
import { DatabaseVisual } from "./ProjectVisuals/DatabaseVisual";
import { StorefrontVisual } from "./ProjectVisuals/StorefrontVisual";
import { PortfolioVisual } from "./ProjectVisuals/PortfolioVisual";
import { CloudboardVisual } from "./ProjectVisuals/CloudboardVisual";

import { Project, ProjectVisualType } from "../types/project";
import { WebDesignVisual } from "./ProjectVisuals/WebDesignVisual";
import { FiTool } from "react-icons/fi";
import SectionHeader from "./SectionHeader";
import SubheadingDivider from "./SubheadingDivider";

interface TechBadge {
  icon: JSX.Element;
  name: string;
}

const techStack: TechBadge[] = [
  { icon: <DiReact />, name: "React" },
  { icon: <SiTypescript />, name: "TypeScript" },
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
];

const ProjectVisual = ({ type }: { type: ProjectVisualType }) => {
  switch (type) {
    case "cloudboard":
      return <CloudboardVisual />;
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
  inProgress,
}: Project & { index: number }) => {

  const getTechBadges = (icons: JSX.Element[]) => {
    return icons
      .map((icon) => techStack.find((tech) => tech.icon.type === icon.type))
      .filter((tech): tech is TechBadge => tech !== undefined);
  };

  const techBadges = getTechBadges(glyphs);
  const isGithubLink = link.includes('github.com');

  return (
    <motion.div 
      className="group relative w-full select-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative flex flex-col h-auto md:h-[400px] rounded-lg bg-[#27292E] border-4 border-[#27292E] shadow-sm">
        {/* Visual Container */}
        <div className="relative h-[200px] md:h-[250px] rounded-t-lg overflow-hidden">
          <div className="w-full h-full bg-[#16181C]">
            <ProjectVisual type={visualType} />
          </div>

          {/* Top overlay for index and status */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-1">
            {inProgress && (
              <div className="flex items-center gap-1 text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full">
                <FiTool /> In Progress
              </div>
            )}
          </div>

          {/* Bottom overlay for technologies */}
          <div className="p-3 flex flex-wrap gap-2">
            {techBadges.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-1 text-xs bg-green-400/20 text-green-400 px-2 py-1 rounded-full"
              >
                <span className="text-base">{tech.icon}</span>
                <span>{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-4 border-t border-green-200">
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-white">{title}</h3>
            <p className="text-white/70 font-semibold leading-relaxed">
              {description}
            </p>
          </div>

          <a
            className={`mt-4 inline-flex items-center text-sm font-medium ${
              isGithubLink 
                ? "text-green-300 hover:text-green-400" 
                : "text-red-300 hover:text-red-400"
            }`}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {isGithubLink ? (
              'View on GitHub'
            ) : (
              <>
                <span className="mr-1 relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full text-bold w-full bg-red-500"></span>
                </span>
                View Live Project
              </>
            )}
            <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </a>
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
  return (
    <div className="space-y-6">
      <SubheadingDivider title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectItem key={index} {...project} index={index} />
        ))}
      </div>
    </div>
  );
};

export const Projects = () => {
  const personalProjects: Project[] = [
    {
      title: "Cloudboard: Kanban Board",
      slug: "cloudboard",
      description:
        "Kanban-style board with drag-and-drop, user authentication, and real-time collaboration",
      link: "https://cloudboard.dev",
      glyphs: [<DiReact />, <SiTypescript />, <SiTailwindcss />],
      visualType: "cloudboard",
    },
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
    <section
      id="projects"
      className="relative w-full py-32 max-w-7xl mx-auto px-4 md:px-8"
    >
      <SectionHeader
        title="Projects"
        label="A showcase of personal and academic projects demonstrating my experience with various technologies."
      />

      <div className="space-y-12">
        <ProjectCarousel title="Personal" projects={personalProjects} />
        <ProjectCarousel title="Academic" projects={academicProjects} />
      </div>
    </section>
  );
};
