import { motion, AnimatePresence } from "framer-motion";
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
import { useState, useEffect } from "react";
import { SiR, SiGithub } from "react-icons/si";
import ZoopText from "./ZoopText"; // Adjust the path as necessary

type ProjectItemProps = {
  title: string;
  slug: string;
  glyphs: JSX.Element[];
  description: string;
  link: string;
  index: number;
};

const GlyphCycler = ({
  glyphs,
  index,
}: {
  glyphs: JSX.Element[];
  index: number;
}) => {
  const [currentGlyph, setCurrentGlyph] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGlyph((prev) => (prev + 1) % glyphs.length);
    }, 3000 + index * 50); // Change glyph every 2 seconds
    return () => clearInterval(interval);
  }, [glyphs.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.span
        key={currentGlyph}
        initial={{ opacity: 0, scale: 0, translateY: "100%" }}
        animate={{ opacity: 1, scale: 1, translateY: "0%" }}
        exit={{ opacity: 0, scale: 0, translateY: "-100%" }}
        transition={{ duration: 0.5, type: "spring" }}
        className="text-4xl"
      >
        {glyphs[currentGlyph]}
      </motion.span>
    </AnimatePresence>
  );
};

const GridBackground = ({ isHovered }: { isHovered: boolean }) => {
  const GRID_STEPS = 10; // Match DataGrid steps
  const SIZE = 100;

  return (
    <svg
      className="absolute inset-0 w-full h-full -z-10"
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      preserveAspectRatio="none"
    >
      <defs>
        <filter id="projectGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g filter="url(#projectGlow)">
        {Array.from({ length: GRID_STEPS + 1 }).map((_, i) => (
          <motion.line
            key={`h-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.05 : 0 }}
            transition={{ duration: 0.5, type: "spring", damping: 15 }}
            x1="0"
            y1={SIZE * (i / GRID_STEPS)}
            x2={SIZE}
            y2={SIZE * (i / GRID_STEPS)}
            stroke="#fff"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {Array.from({ length: GRID_STEPS + 1 }).map((_, i) => (
          <motion.line
            key={`v-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.05 : 0 }}
            transition={{ duration: 0.5, type: "spring", damping: 15 }}
            x1={SIZE * (i / GRID_STEPS)}
            y1="0"
            x2={SIZE * (i / GRID_STEPS)}
            y2={SIZE}
            stroke="#fff"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </motion.g>
    </svg>
  );
};

const ProjectItem = ({
  title,
  slug,
  glyphs,
  description,
  link,
  index,
}: ProjectItemProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const formattedIndex = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      className="relative w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", damping: 15 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative flex flex-col justify-between gap-4 h-full p-8 bg-stone-950/30 border border-stone-800/50 overflow-hidden">
        <GridBackground isHovered={isHovered} />
        <div className="flex justify-between items-start">
          <span className="font-mono text-stone-500 text-lg">
            {formattedIndex}
          </span>
          <GlyphCycler glyphs={glyphs} index={index} />
        </div>

        <div className="space-y-3 h-full">
          <h3 className="text-2xl font-bold text-stone-200">{title}</h3>
          <p className="text-sm text-stone-400 leading-relaxed">
            {description}
          </p>
        </div>

        <motion.a
          className="cursor-none mt-4 inline-flex"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ZoopText IconComponent={<SiGithub />}>{slug}</ZoopText>
        </motion.a>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const projects = [
    {
      title: "CRUD Retail Application",
      slug: "webstore",
      description:
        "Full-stack webstore with CRUD support via Node.js RESTful API",
      link: "https://github.com/ninjanwp/webstore",
      glyphs: [<DiReact />, <DiNodejs />, <DiJavascript1 />], // Multiple icons
    },
    {
      title: "Advanced Web App Development",
      slug: "lis4368",
      description: "Full-stack web development focusing on best practices",
      link: "https://github.com/ninjanwp/lis4368",
      glyphs: [<DiJava />, <DiJavascript1 />, <DiBootstrap />], // Multiple icons
    },
    {
      title: "Mobile Web App Development",
      slug: "lis4381",
      description:
        "Cross-platform mobile development with responsive design principles",
      link: "https://github.com/ninjanwp/lis4381",
      glyphs: [<DiPhp />, <DiJava />], // Multiple icons
    },
    {
      title: "Extensible Enterprise Solutions",
      slug: "lis4369",
      description:
        "Data Science implementations using Python, R, and Business Intelligence tools",
      link: "https://github.com/ninjanwp/lis4369",
      glyphs: [<DiPython />, <SiR />], // Multiple icons
    },
    {
      title: "Advanced Mobile App Development",
      slug: "lis4331",
      description:
        "Native mobile application development with advanced features",
      link: "https://github.com/ninjanwp/lis4331",
      glyphs: [<DiJava />, <DiAndroid />], // Multiple icons
    },
    {
      title: "Advanced Database Management",
      slug: "lis3781",
      description: "Complex database systems design and implementation",
      link: "https://github.com/ninjanwp/lis3781",
      glyphs: [<DiMysql />, <DiMsqlServer />], // Multiple icons
    },
  ];

  return (
    <section
      id="projects"
      className="relative w-full max-w-7xl mx-auto px-8 py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4 mb-24"
      >
        <p className="text-sm uppercase tracking-widest text-stone-400">
          // Showcase
        </p>
        <h2 className="text-4xl md:text-6xl font-bold text-stone-200">
          Projects
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {projects.map((project, index) => (
          <ProjectItem key={index} {...project} index={index} />
        ))}
      </div>
    </section>
  );
};
