import { SiTypescript, SiDocker, SiTailwindcss } from "react-icons/si";
import { motion } from "framer-motion";
import {
  DiBootstrap,
  DiGit,
  DiJava,
  DiMysql,
  DiNodejs,
  DiPhp,
  DiPython,
  DiReact,
  DiUbuntu,
} from "react-icons/di";
import SectionHeader from "./SectionHeader";
import SubheadingDivider from "./SubheadingDivider";

const TechCard = ({
  Icon,
  name,
  description,
}: {
  Icon: React.ElementType;
  name: string;
  description: string;
  color: string;
}) => (
  <div className="flex flex-row">
    <div
      className="flex items-center justify-center rounded-lg text-6xl"
    >
      <Icon />
    </div>
    <div className="p-4 flex flex-col">
      <h3 className="text-xl font-bold text-white tracking-tighter">{name}</h3>
      <p className="font-medium text-white/50 leading-relaxed tracking-tight">{description}</p>
    </div>
  </div>
);

const Technology = () => {
  const frontendTechnologies = [
    {
      Icon: DiReact,
      name: "React",
      description: "Component-based library for building web apps",
      color: "#61DAFB",
    },
    {
      Icon: SiTypescript,
      name: "TypeScript",
      description: "Type-safe JavaScript for scalable applications",
      color: "#3178C6",
    },
    {
      Icon: SiTailwindcss,
      name: "Tailwind",
      description: "Utility-first CSS framework for rapid UI development",
      color: "#06B6D4",
    },
    {
      Icon: DiBootstrap,
      name: "Bootstrap",
      description: "CSS framework for responsive web development",
      color: "#7952B3",
    },
  ];

  const backendTechnologies = [
    {
      Icon: DiJava,
      name: "Java",
      description: "Object-oriented language for backend systems",
      color: "#E32C2E",
    },
    {
      Icon: DiPython,
      name: "Python",
      description: "Versatile language for data processing & full stack",
      color: "#FFD43B",
    },
    {
      Icon: DiNodejs,
      name: "Node.js",
      description: "JS runtime environment for network applications",
      color: "#539E43",
    },
    {
      Icon: DiPhp,
      name: "PHP",
      description: "Server-side scripting language for web development",
      color: "#777BB4",
    },
  ];

  const infrastructureTechnologies = [
    {
      Icon: DiMysql,
      name: "MySQL",
      description: "Open-source relational DBMS for data storage",
      color: "#00758F",
    },
    {
      Icon: DiGit,
      name: "Git",
      description: "The definitive distributed version control system",
      color: "#F05032",
    },
    {
      Icon: SiDocker,
      name: "Docker",
      description: "Platform for creating containerized applications",
      color: "#2496ED",
    },
    {
      Icon: DiUbuntu,
      name: "Ubuntu",
      description: "Linux distro for server deployment & development",
      color: "#E95420",
    },
  ];

  return (
    <section
      id="tech"
      className="relative w-full pt-12 max-w-7xl mx-auto px-4 md:px-8"
    >
      <SectionHeader
        title="Skills"
        label="An overview of the languages, libraries, and tools that I have the most experience with."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Frontend Section */}
        <motion.div 
          className="rounded-lg border border-white/10 bg-white/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="px-4 pt-4">
            <SubheadingDivider title="Frontend" />
          </div>
          <div className="grid grid-cols-1 gap-4 p-4">
            {frontendTechnologies.map((tech, index) => (
              <div key={index}>
                <TechCard {...tech} />
                {index < frontendTechnologies.length - 1 && (
                  <hr className="border-white/10 rounded-full my-2 mx-2" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Backend Section */}
        <motion.div 
          className="rounded-lg border border-white/10 bg-white/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
        >
          <div className="px-4 pt-4">
            <SubheadingDivider title="Backend" />
          </div>
          <div className="grid grid-cols-1 gap-4 p-4">
            {backendTechnologies.map((tech, index) => (
              <div key={index}>
                <TechCard {...tech} />
                {index < backendTechnologies.length - 1 && (
                  <hr className="border-white/10 rounded-full my-2 mx-2" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tools Section */}
        <motion.div 
          className="rounded-lg border border-white/10 bg-white/5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="px-4 pt-4">
            <SubheadingDivider title="Tools" />
          </div>
          <div className="grid grid-cols-1 gap-4 p-4">
            {infrastructureTechnologies.map((tech, index) => (
              <div key={index}>
                <TechCard {...tech} />
                {index < infrastructureTechnologies.length - 1 && (
                  <hr className="border-white/10 rounded-full my-2 mx-2" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Technology;
