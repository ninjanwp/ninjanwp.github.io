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

import { SiFirebase, SiR, SiTailwindcss, SiTypescript } from "react-icons/si";
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
  { icon: <SiFirebase />, name: "Firebase" },
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
  githubLink,
  visualType,
  inProgress,
}: Project & { index: number }) => {

  const getTechBadges = (icons: JSX.Element[]) => {
    return icons
      .map((icon) => techStack.find((tech) => tech.icon.type === icon.type))
      .filter((tech): tech is TechBadge => tech !== undefined);
  };

  const techBadges = getTechBadges(glyphs);

  return (
    <motion.div 
      className="group relative w-full select-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="relative flex flex-col h-auto md:h-[400px] overflow-hidden">
        {/* Visual Container */}
        <div className="relative h-[200px] md:h-[300px] overflow-hidden rounded-lg bg-black border border-white/10">
          <div className="w-full h-full">
            <ProjectVisual type={visualType} />
          </div>

          {/* Top overlay for index and status */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-start p-1">
            {inProgress && (
              <div className="flex items-center gap-1 text-xs glass-card text-accent px-2 py-1">
                <FiTool /> In Progress
              </div>
            )}
          </div>

          {/* Technology badges - repositioned and restyled for better visibility */}
          <div className="absolute bottom-0 left-0 right-0 p-3 flex flex-wrap gap-2">
            {techBadges.map((tech, i) => (
              <div
                key={i}
                className="flex items-center gap-1 text-xs bg-accent/30 text-accent px-2 py-1 glass-card"
              >
                <span className="text-base">{tech.icon}</span>
                <span className="font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Content Container */}
        <div className="flex flex-col flex-1 p-4">
          <div className="flex-1 space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tighter">{title}</h3>
            <p className="text-white/60 leading-relaxed tracking-tight">
              {description}
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {link && (
              <motion.a
                className="inline-flex items-center text-sm font-medium bg-background hover:bg-background/50 transition-colors w-fit p-2 rounded-lg border border-accent/20 text-red-300"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  boxShadow: "inset 0 0 20px 5px rgba(255, 255, 255, 0.05)",
                }}
                transition={{ duration: 0.2 }}
              >
                <span className="mr-1 relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-full text-bold w-full bg-red-500"></span>
                </span>
                View Live Project
                <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </motion.a>
            )}
            
            {githubLink && (
              <motion.a
                className="inline-flex items-center text-sm font-medium bg-background hover:bg-background/50 transition-colors w-fit p-2 rounded-lg border border-accent/20 text-white"
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ 
                  boxShadow: "inset 0 0 20px 5px rgba(255, 255, 255, 0.05)",
                }}
                transition={{ duration: 0.2 }}
              >
                View on GitHub
                <svg className="ml-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </motion.a>
            )}
          </div>
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
      <div className="rounded-lg border border-white/10 bg-white/5">
        <div className="px-4 pt-4">
          <SubheadingDivider title={title} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
          {projects.map((project, index) => (
            <ProjectItem key={index} {...project} index={index} />
          ))}
        </div>
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
      githubLink: "https://github.com/ninjanwp/cloudboard",
      glyphs: [<DiReact />, <SiTypescript />, <SiFirebase />, <SiTailwindcss />],
      visualType: "cloudboard",
    },
    {
      title: "Personal Portfolio Website",
      slug: "portfolio",
      description:
        "Modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS",
      githubLink: "https://github.com/ninjanwp/portfolio",
      glyphs: [<DiReact />, <SiTypescript />, <SiTailwindcss />],
      visualType: "portfolio",
    },
    {
      title: "CRUD Retail Application",
      slug: "webstore",
      description:
        "Full-stack webstore with CRUD support via Node.js RESTful API",
      githubLink: "https://github.com/ninjanwp/webstore",
      glyphs: [<DiReact />, <DiNodejs />, <DiJavascript1 />],
      visualType: "storefront",
    },
  ];

  const academicProjects: Project[] = [
    {
      title: "Advanced Web App Development",
      slug: "lis4368",
      description: "Full-stack web development focusing on best practices",
      githubLink: "https://github.com/ninjanwp/lis4368",
      glyphs: [<DiJava />, <DiJavascript1 />, <DiBootstrap />],
      visualType: "webDesign",
      inProgress: true,
    },
    {
      title: "Mobile Web App Development",
      slug: "lis4381",
      description:
        "Cross-platform mobile development with responsive design principles",
      githubLink: "https://github.com/ninjanwp/lis4381",
      glyphs: [<DiPhp />, <DiJava />],
      visualType: "phone",
    },
    {
      title: "Extensible Enterprise Solutions",
      slug: "lis4369",
      description:
        "Data Science implementations using Python, R, and Business Intelligence tools",
      githubLink: "https://github.com/ninjanwp/lis4369",
      glyphs: [<DiPython />, <SiR />],
      visualType: "dataGrid",
    },
    {
      title: "Advanced Mobile App Development",
      slug: "lis4331",
      description:
        "Native mobile application development with advanced features",
      githubLink: "https://github.com/ninjanwp/lis4331",
      glyphs: [<DiJava />, <DiAndroid />],
      visualType: "phone",
      inProgress: true,
    },
    {
      title: "Advanced Database Management",
      slug: "lis3781",
      description: "Complex database systems design and implementation",
      githubLink: "https://github.com/ninjanwp/lis3781",
      glyphs: [<DiMysql />, <DiMsqlServer />],
      visualType: "database",
      inProgress: true,
    },
  ];

  return (
    <section
      id="projects"
      className="relative w-full min-h-screen pt-12 max-w-7xl mx-auto px-4 md:px-8"
    >
      <SectionHeader
        title="Projects"
        label="A showcase of personal and academic projects demonstrating my understanding of various technologies."
      />

      <div className="space-y-12">
        <ProjectCarousel title="Personal" projects={personalProjects} />
        <ProjectCarousel title="Academic" projects={academicProjects} />
      </div>
    </section>
  );
};
