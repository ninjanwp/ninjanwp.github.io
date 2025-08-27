import { motion } from "framer-motion";
import { 
  DiReact, 
  DiPython,
  DiJava,
  DiGit,
  DiPhotoshop,
} from "react-icons/di";
import { ThreeOrigami } from "./ThreeOrigami";



interface SkillSection {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  skills: string[];
  icon: React.ReactNode;
}

const Portfolio = () => {
  // Animation variants for consistent animations
  const sectionVariants = {
    hidden: { opacity: 1 }, // Keep background visible, only animate content
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 5 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut",
        delay: 0.5
      }
    }
  };

  // Hero section component
  const HeroSection = () => {
    return (
      <motion.section
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
        id="hero"
        className="w-full text-black overflow-hidden flex items-center"
      >
        {/* Full Screen Grid Container */}
        <div className="w-full h-screen relative">
          {/* Grid Background - Responsive grid cells */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-8 md:grid-cols-8 md:grid-rows-10 lg:grid-cols-12 lg:grid-rows-12 pointer-events-none">
            {/* Mobile: 5x8 = 40 cells, Tablet: 8x10 = 80 cells, Desktop: 12x12 = 144 cells */}
            {Array.from({ length: 144 }, (_, i) => (
              <div 
                key={i} 
                className="border-l border-r border-black/5 hidden lg:block"
              />
            ))}
            {Array.from({ length: 80 }, (_, i) => (
              <div 
                key={`md-${i}`} 
                className="border-l border-r border-black/5 hidden md:block lg:hidden"
              />
            ))}
            {Array.from({ length: 40 }, (_, i) => (
              <div 
                key={`sm-${i}`} 
                className="border-l border-r border-black/5 block md:hidden"
              />
            ))}
          </div>

          {/* Content Layer */}
          <motion.div 
            variants={contentVariants}
            className="relative z-10 w-full h-screen grid grid-cols-5 grid-rows-8 md:grid-cols-8 md:grid-rows-10 lg:grid-cols-12 lg:grid-rows-12"
          >
            {/* Main Name - Center - Behind Moon (z-10) */}
            <motion.div 
              variants={itemVariants}
              className="col-span-5 col-start-1 row-start-3 md:col-span-6 md:col-start-1 md:row-start-4 lg:col-span-8 lg:col-start-1 lg:row-start-5 overflow-visible flex flex-col items-start justify-center text-left z-20 text-black"
              style={{ 
                mixBlendMode: 'difference',
                isolation: 'isolate'
              }}
            >
                          <h1 className="text-8xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-semibold leading-[0.8] tracking-tight mb-2">
              NICK
            </h1>
            <h1 className="text-8xl md:text-[12rem] lg:text-[16rem] xl:text-[20rem] font-semibold leading-[0.8] tracking-tight mb-6">
              PFEFFER
            </h1>
              <h2 className="text-lg md:text-xl lg:text-2xl font-light leading-tight tracking-wide">
                Digital Portfolio
              </h2>
            </motion.div>

            {/* Description - In Front of Moon (z-30) */}
            <motion.div 
              variants={itemVariants}
              className="col-span-2 col-start-4 row-start-6 md:col-span-2 md:col-start-6 md:row-start-7 lg:col-span-2 lg:col-start-10 lg:row-start-7 flex items-start overflow-visible z-20"
              style={{ mixBlendMode: 'difference', color: 'black' }}
            >
              <p className="text-sm md:text-base leading-relaxed font-light uppercase text-left">
                Full-Stack Developer specializing in modern web applications, mobile development, and data visualization.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  };

  // Individual section component with asymmetrical grid layout
  const SkillSection = ({ skill, index }: { skill: SkillSection; index: number }) => {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
        id={index === 0 ? "skills" : skill.id}
        className="h-screen text-black overflow-hidden flex items-center"
      >
        {/* Full Screen Grid Container */}
        <div className="w-full h-screen relative">
          {/* Grid Background - Responsive grid cells */}
          <div className="absolute inset-0 grid grid-cols-5 grid-rows-8 md:grid-cols-8 md:grid-rows-10 lg:grid-cols-12 lg:grid-rows-12 pointer-events-none">
            {/* Mobile: 5x8 = 40 cells, Tablet: 8x10 = 80 cells, Desktop: 12x12 = 144 cells */}
            {Array.from({ length: 144 }, (_, i) => (
              <div 
                key={i} 
                className="border-l border-r border-black/5 hidden lg:block"
              />
            ))}
            {Array.from({ length: 80 }, (_, i) => (
              <div 
                key={`md-${i}`} 
                className="border-l border-r border-black/5 hidden md:block lg:hidden"
              />
            ))}
            {Array.from({ length: 40 }, (_, i) => (
              <div 
                key={`sm-${i}`} 
                className="border-l border-r border-black/5 block md:hidden"
              />
            ))}
          </div>

          {/* Content Layer */}
          <motion.div 
            variants={contentVariants}
            className="relative z-10 w-full h-screen grid grid-cols-5 grid-rows-8 md:grid-cols-8 md:grid-rows-10 lg:grid-cols-12 lg:grid-rows-12"
          >
            {/* Section Number - Top Left */}
            <motion.div 
              variants={itemVariants}
              className="col-span-2 row-span-1 col-start-1 row-start-1 md:col-span-3 md:row-span-1 lg:col-span-3 lg:row-span-1 overflow-visible flex flex-row items-center justify-start"
            >
              <img 
                src={`/assets/qrcode_${index + 1}.svg`}
                alt={`Code ${index + 1}`}
                className="h-12 w-12 lg:h-16 lg:w-16 flex-shrink-0"
              />
              <div className="text-6xl md:text-8xl font-light leading-none">
                {skill.number}
              </div>

            </motion.div>

            {/* Background Icon - Top Right */}
                        <motion.div
              variants={iconVariants}
              className="col-span-1 row-span-1 col-start-5 row-start-8 md:col-span-1 md:row-span-1 md:col-start-8 md:row-start-10 lg:col-span-1 lg:row-span-1 lg:col-start-12 lg:row-start-12 flex items-end justify-end pointer-events-none overflow-visible"
            >
              <div className="text-8xl md:text-[8rem] lg:text-[12rem] text-black">
                {skill.icon}
              </div>
            </motion.div>

            {/* Main Title - Third Row */}
            <motion.div 
              variants={itemVariants}
              className="col-span-4 col-start-1 row-start-3 md:col-span-3 md:col-start-2 md:row-start-3 lg:col-span-4 lg:col-start-2 lg:row-start-4 overflow-visible flex items-center"
            >
              <div>
                <h2 className="text-6xl lg:text-7xl xl:text-9xl font-semibold leading-[0.9] tracking-tight font-mono">
                  {skill.title}
                </h2>
                <h3 className="text-lg md:text-xl lg:text-xl font-light leading-tight tracking-wide mt-6 pl-1">
                  {skill.subtitle}
                </h3>
              </div>
            </motion.div>

            {/* Description - Right Side, Middle */}
            <motion.div 
              variants={itemVariants}
              className="col-span-2 col-start-4 row-start-5 md:col-span-2 md:col-start-6 md:row-start-6 lg:col-span-2 lg:col-start-10 lg:row-start-6 flex items-start overflow-visible"
            >
              <p className="text-base leading-loose font-light uppercase text-left">
                {skill.description}
              </p>
            </motion.div>

            {/* Skills Grid - Left Side, Bottom */}
            <motion.div 
              variants={itemVariants}
              className="col-span-2 row-span-3 col-start-1 row-start-6 md:col-span-2 md:row-span-2 md:col-start-1 md:row-start-8 lg:col-span-2 lg:row-span-3 lg:col-start-2 lg:row-start-8 flex items-start overflow-visible"
            >
              <div className="flex flex-col w-full justify-start md:divide-y-4 divide-black">
                {skill.skills.map((tech, techIndex) => (
                  <motion.span
                    key={tech}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.8 + (techIndex * 0.1),
                      ease: "easeOut"
                    }}
                    viewport={{ once: true }}
                    className="md:text-2xl text-sm font-light font-mono text-black tracking-widest"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    );
  };

  const skillSections: SkillSection[] = [
    {
      id: "web-development",
      number: "01",
      title: "Web Development",
      subtitle: "Full-Stack Applications",
      description: "Four years of experience building full-stack applications with Next.js, React, TypeScript, and Tailwind CSS. Integrations with LLMs and Restful APIs.",
      skills: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "Firebase"],
      icon: <DiReact />
    },
    {
      id: "mobile-development",
      number: "02", 
      title: "Mobile Development",
      subtitle: "Cross-Platform Apps",
      description: "Worked on native and cross-platform mobile apps using React Native and Java. Development with Android and iOS apps.",
      skills: ["React Native", "Java", "JetBrains", "Android Studio"],
      icon: <DiJava />
    },
    {
      id: "data-analysis",
      number: "03",
      title: "Data Analysis",
      subtitle: "Modeling & Representation",
      description: "Statistical analysis and machine learning with Python and R. Data architechture and ERD modeling with SQL.",
      skills: ["Python", "NumPy", "Matplotlib", "SQL", "MSSQL", "SQLite"],
      icon: <DiPython />
    },
    {
      id: "devops",
      number: "04",
      title: "DevOps",
      subtitle: "Infrastructure & Automation",
      description: "Version control, containerization, and Linux system management. CI/CD pipelines and infrastructure automation.",
      skills: ["Git", "Linux", "Docker", "CI/CD", "Bash", "SSH"],
      icon: <DiGit />
    },
    {
      id: "ui-design",
      number: "05",
      title: "Design", 
      subtitle: "UI/UX & Prototyping",
      description: "Interface design and user research. Prototyping in Figma and Photoshop.",
      skills: ["Figma", "Photoshop", "Prototyping", "Wireframing"],
      icon: <DiPhotoshop />
    }
  ];

  return (
    <div className="w-full relative m-0 p-0">
      {/* Sticky Running 3D Model - Fixed to viewport, behind all content */}
      <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none" style={{ isolation: 'isolate' }}>
        <ThreeOrigami />
      </div>
      
      {/* Global backdrop blur overlay for all sections */}
      <div className="fixed inset-0 w-screen h-screen z-10 pointer-events-none backdrop-blur-lg"></div>
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Portfolio Sections */}
      {skillSections.map((skill, index) => (
        <SkillSection 
          key={skill.id}
          skill={skill}
          index={index}
        />
      ))}
    </div>
  );
};

export default Portfolio;
