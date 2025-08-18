import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  DiReact, 
  DiPython,
  DiAndroid
} from "react-icons/di";
import { 
  SiFigma
} from "react-icons/si";

interface SkillSection {
  id: string;
  number: string;
  title: string;
  description: string;
  skills: string[];
  link?: string;
  icon: React.ReactNode; // Single icon instead of array
}

const Portfolio = () => {
  // Transition component that appears between sections
  const SectionTransition = ({ toIndex, sectionRef }: { 
    toIndex: number;
    sectionRef: React.RefObject<HTMLDivElement>;
  }) => {
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start center", "end center"]
    });

    // Create horizontal bars that transition to the next section's color
    const transitionOpacity = useTransform(scrollYProgress, [0.8, 1], [1, 1]);
    const bar1Scale = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);
    const bar2Scale = useTransform(scrollYProgress, [0.85, 0.9], [0, 1]);
    const bar3Scale = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);
    const bar4Scale = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

    const nextSectionColors = [
      "bg-blue-700",    // Web Development
      "bg-purple-700",  // Mobile Development  
      "bg-emerald-700", // Data Analysis
      "bg-rose-700",     // UI/UX Design
      "bg-black"         // Other
    ];

    const nextColor = nextSectionColors[toIndex % 5];

    return (
      <motion.div 
        className="absolute inset-0 z-20 pointer-events-none"
        style={{ opacity: transitionOpacity }}
      >
        <div className="absolute inset-0 flex flex-col">
          <motion.div 
            className={`h-1/4 ${nextColor} origin-left`}
            style={{ scaleX: bar1Scale }}
          />
          <motion.div 
            className={`h-1/4 ${nextColor} origin-left`}
            style={{ scaleX: bar2Scale }}
          />
          <motion.div 
            className={`h-1/4 ${nextColor} origin-left`}
            style={{ scaleX: bar3Scale }}
          />
          <motion.div 
            className={`h-1/4 ${nextColor} origin-left`}
            style={{ scaleX: bar4Scale }}
          />
        </div>
      </motion.div>
    );
  };

  // Individual section component with scroll-based animations
  const ScrollSection = ({ skill, index }: { skill: SkillSection; index: number }) => {
    const sectionRef = useRef<HTMLDivElement>(null);
    
    // Track scroll progress for this specific section
    const { scrollYProgress } = useScroll({
      target: sectionRef,
      offset: ["start center", "end center"]
    });

    // Subtle and cool icon animations with parallax
    const iconScale = useTransform(scrollYProgress, [0, 1], [0.9, 1.05]);
    const iconY = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]); // Smooth parallax
    const iconX = useTransform(scrollYProgress, [0, 1], ["0%", "0%"]); // Smooth parallax
    const iconRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "10deg"]); // Slow rotation
    const iconOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.15, 0.4, 0.4, 0.15]);

    
    // Content parallax effects with blur
    const numberOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
    const numberScale = useTransform(scrollYProgress, [0, 1], [1.5, 1.5]);
    const numberY = useTransform(scrollYProgress, [0, 1], [ "0%", "100%"]); // Number parallax
    const numberX = useTransform(scrollYProgress, [0, 0.5], ["0%", "0%"]); // Number parallax
    const numberBlur = useTransform(scrollYProgress, [0.1, 0.3], [0, 0]); // Blur from 5px to 0px
    
    const titleOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
    const titleY = useTransform(scrollYProgress, [0.2, 0.4, 1], [50, 0, -50]); // Extended parallax
    const titleBlur = useTransform(scrollYProgress, [0.2, 0.4], [5, 0]); // Blur from 5px to 0px
    
    const descriptionOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
    const descriptionY = useTransform(scrollYProgress, [0.3, 0.5, 1], [50, 0, -50]); // Parallax
    const descriptionBlur = useTransform(scrollYProgress, [0.3, 0.5], [5, 0]); // Blur from 5px to 0px
    
    const tagsOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
    const tagsY = useTransform(scrollYProgress, [0.4, 0.6, 1], [20, 0, -20]); // Subtle parallax

    return (
      <motion.div 
        ref={sectionRef}
        key={skill.id}
        id={index === 0 ? "skills" : skill.id}
        className={`min-h-screen h-[300dvh] relative ${backgroundColors[index]}`}
        // initial={{ opacity: 0 }}
        // whileInView={{ opacity: 1 }}
        // transition={{ duration: 0.6, delay: 0.2 }}
        // viewport={{ once: true }}
      >
        <div className="top-0 sticky h-screen overflow-hidden">
          {/* Section Transition Bars */}
          <SectionTransition 
            toIndex={index + 1}
            sectionRef={sectionRef}
          />
          
          {/* Single Background Icon with subtle parallax and cool effects */}
          <motion.div 
            className="absolute right-[-60%] -bottom-[50%] md:-right-[25%] md:-bottom-[25%] flex h-full items-center origin-center pointer-events-none"
            style={{ 
              scale: iconScale,
              x: iconX,
              y: iconY,
              opacity: iconOpacity,
              rotate: iconRotate
            }}
          >
            <motion.div 
              className="text-[30rem] md:text-[40rem] lg:text-[50rem] xl:text-[80rem] text-black/20 transform"
            >
              {skill.icon}
            </motion.div>
          </motion.div>
                          {/* Large Number with parallax, improved scaling, and blur */}
                <motion.div 
                  className="text-[14rem] md:text-[28rem] font-bold text-yellow-100 leading-none tracking-tighter absolute left-0 top-0"
                  style={{ 
                    opacity: numberOpacity,
                    scale: numberScale,
                    y: numberY,
                    x: numberX,
                    filter: useTransform(numberBlur, (blur) => `blur(${blur}px)`)
                  }}
                >
                  {skill.number}
                </motion.div>

          {/* Content */}
          <div className="w-full h-full px-4 md:px-8 lg:px-12 flex items-center relative z-10">
            <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-start w-full">
              
              <div className="space-y-6">


                {/* Title with extended parallax slide up and blur */}
                <motion.h2 
                  className="text-4xl md:text-6xl font-bold tracking-tight text-black leading-tight"
                  style={{ 
                    opacity: titleOpacity,
                    y: titleY,
                    filter: useTransform(titleBlur, (blur) => `blur(${blur}px)`)
                  }}
                >
                  {skill.title}
                </motion.h2>

                {/* Description with parallax slide up and blur */}
                <motion.p 
                  className="text-xl md:text-2xl text-black leading-relaxed max-w-2xl"
                  style={{ 
                    opacity: descriptionOpacity,
                    y: descriptionY,
                    filter: useTransform(descriptionBlur, (blur) => `blur(${blur}px)`)
                  }}
                >
                  {skill.description}
                </motion.p>

                {/* Skills Tags with staggered succession animations */}
                <motion.div 
                  className="flex flex-wrap gap-3"
                  style={{ 
                    opacity: tagsOpacity,
                    y: tagsY 
                  }}
                >
                  {skill.skills.map((tech, techIndex) => {
                    // Create individual animations for each tech item with shorter delays
                    const techOpacity = useTransform(
                      scrollYProgress, 
                      [0.4 + (techIndex * 0.02), 0.55 + (techIndex * 0.02)], 
                      [0, 1]
                    );
                    const techY = useTransform(
                      scrollYProgress, 
                      [0.4 + (techIndex * 0.02), 0.55 + (techIndex * 0.02)], 
                      [30, 0]
                    );
                    const techScale = useTransform(
                      scrollYProgress, 
                      [0.4 + (techIndex * 0.02), 0.55 + (techIndex * 0.02)], 
                      [0.8, 1]
                    );

                    return (
                      <motion.span
                        key={tech}
                        className={`px-4 py-2 border border-black bg-black ${textColors[index]} font-black rounded-lg text-sm tracking-wider`}
                        style={{
                          opacity: techOpacity,
                          y: techY,
                          scale: techScale
                        }}
                      >
                        // {tech}
                      </motion.span>
                    );
                  })}
                </motion.div>

                {/* Link with parallax fade in */}
                {skill.link && (
                  <motion.a
                    href={skill.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 text-black hover:text-accent transition-colors font-mono tracking-wider group"
                    style={{ 
                      opacity: tagsOpacity,
                      y: tagsY 
                    }}
                    whileHover={{ x: 10 }}
                  >
                    <span>View Work</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </motion.a>
                )}
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const skillSections: SkillSection[] = [
    {
      id: "web-development",
      number: "01",
      title: "Four Years Experience With Web Development",
      description: "Full-stack applications with Next.js, React, TypeScript, and NoSQL. Integrations with LLMs and Restful APIs.",
      skills: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS", "Firebase"],
      icon: <DiReact />,
      link: "https://github.com/ninjanwp"
    },
    {
      id: "mobile-development",
      number: "02", 
      title: "Mobile Development with React Native and Java",
      description: "Native and cross-platform mobile apps. Android and iOS development.",
      skills: ["React Native", "Java", "JetBrains", "Android Studio"],
      icon: <DiAndroid />,
      link: "https://github.com/ninjanwp"
    },
    {
      id: "data-analysis",
      number: "03",
      title: "Enterprise Data Analysis and Modeling",
      description: "Statistical analysis and machine learning with Python and R. Data architechture and ERD modeling with SQL.",
      skills: ["Python", "NumPy", "Matplotlib", "SQL", "MSSQL", "SQLite"],
      icon: <DiPython />,
      link: "https://github.com/ninjanwp"
    },
    {
      id: "ui-design",
      number: "04",
      title: "Design and Conceptual Proofing", 
      description: "Interface design and user research. Prototyping in Figma and Photoshop.",
      skills: ["Figma", "Adobe Photoshop", "Prototyping", "Wireframing"],
      icon: <SiFigma />,
      link: "https://github.com/ninjanwp"
    }
  ];

  const backgroundColors = [
    "bg-blue-700",    // Web Development - Deep blue
    "bg-purple-700",  // Mobile Development - Deep purple  
    "bg-emerald-700", // Data Analysis - Deep emerald
    "bg-rose-700"     // UI/UX Design - Deep rose
  ];

  const textColors = [
    "text-blue-700",    // Web Development - Deep blue
    "text-purple-700",  // Mobile Development - Deep purple  
    "text-emerald-700", // Data Analysis - Deep emerald
    "text-rose-700"     // UI/UX Design - Deep rose
  ];

  return (
    <section className="w-full">
      {skillSections.map((skill, index) => (
        <ScrollSection 
          key={skill.id}
          skill={skill}
          index={index}
        />
      ))}
    </section>
  );
};

export default Portfolio;
