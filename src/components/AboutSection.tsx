import { motion } from "framer-motion";
import {
  SiJavascript,
  SiTypescript,
  SiDocker,
  SiApache,
  SiTailwindcss,
} from "react-icons/si";
import { IoLogoFirebase } from "react-icons/io5";
import {
  DiBootstrap,
  DiCss3,
  DiGit,
  DiHtml5,
  DiJava,
  DiMysql,
  DiNodejs,
  DiNpm,
  DiPhp,
  DiPython,
  DiReact,
  DiUbuntu,
} from "react-icons/di";
import ZoopText, { ZoopVariant } from "./ZoopText";

const GradientText = ({ children }: { children: React.ReactNode }) => {
  return (
    <span className="bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text font-semibold">
      {children}
    </span>
  );
};

// Blob component removed

const CircularIcons = ({
  icons,
  index,
}: {
  icons: Array<{ Icon: React.ElementType; label: string }>;
  index: number;
}) => {
  const radius = 140; // Increased from 100 to 140
  const numberOfIcons = icons.length;
  const initialDelay = 0.5; // 1 second initial delay

  return (
    <div className="relative w-96 h-96 mb-16 flex items-center justify-center">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className="w-40 h-40 bg-stone-950 rounded-full z-0"
      />
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="text-8xl font-bold font-mono text-stone-50 z-10">
          0{index + 1}
        </h1>
      </motion.div>

      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
          delay: initialDelay, // Delay the rotation
        }}
        className="absolute inset-0"
      >
        {icons.map((tech, i) => {
          const angle = i * (360 / numberOfIcons) * (Math.PI / 180);
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);

          return (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: "linear",
                  delay: initialDelay, // Delay the counter-rotation
                }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.3,
                    delay: initialDelay + i * 0.1, // Add initial delay to the staggered appearance
                  }}
                >
                  <tech.Icon className="text-7xl text-stone-900" />
                </motion.div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};

const ContentSection = ({
  children,
  icons,
  index,
}: {
  children: React.ReactNode;
  icons: Array<{ Icon: React.ElementType; label: string }>;
  index: number;
}) => {
  return (
    <div className="w-full mb-32">
      <div className="max-w-5xl mx-auto px-4 flex flex-col items-center">
        <CircularIcons icons={icons} index={index} />
        <div className="flex flex-col gap-4 items-start">{children}</div>
      </div>
    </div>
  );
};

const AboutSection = () => {
  return (
    <motion.section
      id="about"
      className="relative w-full pt-24 pb-12 bg-gradient-to-b from-stone-50 to-purple-50 rounded-[30px]"
      viewport={{ once: true }}
    >
      <div className="relative max-w-7xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-2"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-md uppercase tracking-widest text-stone-400 -mb-3"
          >
            // About
          </motion.p>
          <h2 className="text-5xl md:text-7xl font-bold text-stone-900 tracking-tight flex flex-col sm:flex-row sm:justify-center justify-start items-start gap-9">
            <ZoopText variant={ZoopVariant.WHEN_VISIBLE}>Background</ZoopText>{" "}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.5 }}
              viewport={{ once: true }}
              className="w-full h-px bg-stone-900 origin-center"
            />
          </h2>
        </motion.div>

        <div className="flex flex-col items-center justify-center py-16 space-y-24">
          <ContentSection
            icons={[
              { Icon: DiJava, label: "Java" },
              { Icon: DiPython, label: "Python" },
              { Icon: DiHtml5, label: "Html" },
              { Icon: DiCss3, label: "Css" },
              { Icon: SiJavascript, label: "JavaScript" },
              { Icon: SiTypescript, label: "TypeScript" },
            ]}
            index={0}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-4xl md:text-5xl lg:text-6xl text-stone-900"
            >
              Student
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-light text-2xl md:text-3xl lg:text-4xl text-start leading-relaxed tracking-wide"
            >
              <span className="text-stone-500">
                Currently pursuing a B.S. in
              </span>{" "}
              <GradientText>Information Technology</GradientText>{" "}
              <span className="text-stone-500">
                at Florida State University. Specializing in
              </span>{" "}
              <GradientText>Software Engineering</GradientText>{" "}
              <span className="text-stone-500">
                with emphasis on modern development practices.
              </span>
            </motion.p>
          </ContentSection>

          <ContentSection
            icons={[
              { Icon: DiUbuntu, label: "Ubuntu" },
              { Icon: DiGit, label: "Git" },
              { Icon: SiApache, label: "Apache" },
              { Icon: DiPhp, label: "Php" },
              { Icon: DiMysql, label: "MySQL" },
              { Icon: SiDocker, label: "Docker" },
            ]}
            index={1}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-4xl md:text-5xl lg:text-6xl text-stone-900"
            >
              Infrastructure
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-light text-2xl md:text-3xl lg:text-4xl text-start leading-relaxed tracking-wide"
            >
              <span className="text-stone-500">Proficient with</span>{" "}
              <GradientText>Git Version Control</GradientText>{" "}
              <span className="text-stone-500">and experienced in</span>{" "}
              <GradientText>Linux Server Administration</GradientText>{" "}
              <span className="text-stone-500">
                through self-hosted projects.
              </span>
            </motion.p>
          </ContentSection>

          <ContentSection
            icons={[
              { Icon: DiReact, label: "React" },
              { Icon: DiNpm, label: "Npm" },
              { Icon: SiTailwindcss, label: "Tailwind" },
              { Icon: DiBootstrap, label: "Bootstrap" },
              { Icon: DiNodejs, label: "Node.js" },
              { Icon: IoLogoFirebase, label: "Firebase" },
            ]}
            index={2}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-bold text-4xl md:text-5xl lg:text-6xl text-stone-900"
            >
              Developer
            </motion.span>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-light text-2xl md:text-3xl lg:text-4xl text-start leading-relaxed tracking-wide"
            >
              <span className="text-stone-500">
                Crafting modern web experiences using
              </span>{" "}
              <GradientText>React</GradientText>{" "}
              <span className="text-stone-500">and</span>{" "}
              <GradientText>Tailwind.css</GradientText>{" "}
              <span className="text-stone-500">
                with a strong focus on responsive design and user experience.
              </span>
            </motion.p>
          </ContentSection>
        </div>
      </div>
    </motion.section>
  );
};

export default AboutSection;
