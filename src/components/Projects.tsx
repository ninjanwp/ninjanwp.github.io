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
import { FontSwitch } from "./FontSwitch";
import { WarmText } from "./WarmText";

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
        className="text-6xl"
      >
        {glyphs[currentGlyph]}
      </motion.span>
    </AnimatePresence>
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
  const formattedIndex = String(index + 1).padStart(2, "#");

  return (
    <motion.div
      className="py-3 relative rounded-lg w-full h-full backdrop-blur-sm flex-col justify-between"
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ ease: "easeInOut", damping: 16, type: "spring" }}
    >
      <div className="flex-col items-center justify-between mx-5 px-3 py-5">
        <div className="flex flex-col items-start">
          <div className="mb-1 overflow-hidden text-6xl px-3 font-mono text-zinc-200 flex justify-between items-center w-full">
            <motion.span
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <WarmText intensity="low">{formattedIndex}</WarmText>
            </motion.span>
            <WarmText intensity="low">
              <GlyphCycler glyphs={glyphs} index={index} />
            </WarmText>
          </div>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            className="w-full mb-6 h-px bg-stone-400"
          />
          <p className="mb-1.5 text-xl text-zinc-50 transition-all duration-300 ease-in-out group-hover:text-zinc-200">
            {title}
          </p>
          <p className="text-sm uppercase text-zinc-400">{description}</p>
        </div>
        <div className="flex justify-start items-center w-full mt-6">
          <motion.a
            className="cursor-none"
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0 }}
            transition={{ delay: 1 }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <ZoopText IconComponent={<SiGithub />}>GITHUB/{slug}</ZoopText>
          </motion.a>
        </div>
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
    <section id="projects" className="relative text-white pb-32 z-0">
      <motion.h1
        initial={{ y: 48, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
        className="text-[10vw] px-8 md:px-16 font-black py-32 h-[50vh] uppercase leading-none tracking-tight"
      >
        Projects
      </motion.h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8">
        {projects.map((project, index) => (
          <ProjectItem key={index} {...project} index={index} />
        ))}
      </div>
    </section>
  );
};
