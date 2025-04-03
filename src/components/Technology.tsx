import { motion } from "framer-motion";
import { SiTypescript, SiDocker, SiTailwindcss } from "react-icons/si";
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
  color,
}: {
  Icon: React.ElementType;
  name: string;
  description: string;
  color: string;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0}}
    whileTap={{
      backgroundColor: `${color}50`,
      scale: 1
    }}
    whileHover={{ 
      backgroundColor: `${color}50`,
      scale: 1.05
    }}
    viewport={{ once: true }}
    className="flex flex-row items-stretch rounded-xl bg-[#27292E]/50 backdrop-blur-xl"
    style={{ border: `2px solid ${color}15` }}
  >
    <div
      className="flex items-center justify-center rounded-l-xl text-6xl px-5 flex-shrink-0"
      style={{ backgroundColor: `${color}15`, color: color }}
    >
      <Icon />
    </div>
    <div className="p-4 flex flex-col">
      <h3 className="text-xl font-bold text-white">{name}</h3>
      <p className="text-sm text-white/75 leading-relaxed">{description}</p>
    </div>
  </motion.div>
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
      className="relative w-full py-32 max-w-7xl mx-auto px-4 md:px-8"
    >
      <SectionHeader
        title="Technology"
        label="An overview of the languages, libraries, and tools that I have the most experience with."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Frontend Section */}
        <div>
          <SubheadingDivider title="Frontend" />
          <div className="grid grid-cols-1 gap-4">
            {frontendTechnologies.map((tech, index) => (
              <TechCard key={index} {...tech} />
            ))}
          </div>
        </div>

        {/* Backend Section */}
        <div>
          <SubheadingDivider title="Backend" />
          <div className="grid grid-cols-1 gap-4">
            {backendTechnologies.map((tech, index) => (
              <TechCard key={index} {...tech} />
            ))}
          </div>
        </div>

        {/* Infrastructure Section */}
        <div>
          <SubheadingDivider title="Infrastructure" />
          <div className="grid grid-cols-1 gap-4">
            {infrastructureTechnologies.map((tech, index) => (
              <TechCard key={index} {...tech} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Technology;
