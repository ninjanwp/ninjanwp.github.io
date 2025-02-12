import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";
import { HiMail, HiDocumentDownload } from "react-icons/hi";
import { GradientText } from "./GradientText";

const HERO_CONTENT = {
  name: "NICHOLAS PFEFFER",
  headline: {
    firstLine: ["Full Stack", " for"],
    secondLine: ["the modern ", "Web"],
  },
};

export const Hero = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Simpler animations
  const textOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -30]);

  const socialLinks = [
    {
      icon: <RiGithubFill />,
      href: "https://github.com/ninjanwp",
      label: "GitHub Profile",
    },
    {
      icon: <RiLinkedinFill />,
      href: "https://www.linkedin.com/in/nicholas-pfeffer-51713434a/",
      label: "LinkedIn Profile",
    },
    {
      icon: <HiMail />,
      href: "mailto:np22i@fsu.edu",
      label: "Email Contact",
    },
    {
      icon: <HiDocumentDownload />,
      href: "/assets/Nicholas Pfeffer Resume Spring 2025.pdf",
      label: "Download Resume PDF",
      download: true,
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen"
    >
      <div className="relative h-full w-full">
        <div className="relative h-full container mx-auto px-8">
          <motion.div
            className="h-full flex flex-col items-center justify-center text-center"
            style={{ opacity: textOpacity, scale: textScale, y: textY }}
          >
            <motion.p
              className="text-stone-400 tracking-wider mb-4 text-start sm:text-center w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {HERO_CONTENT.name}
            </motion.p>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-start sm:text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <GradientText>{HERO_CONTENT.headline.firstLine[0]}</GradientText>
              {HERO_CONTENT.headline.firstLine[1]}
              <br />
              {HERO_CONTENT.headline.secondLine[0]}
              <GradientText>{HERO_CONTENT.headline.secondLine[1]}</GradientText>
            </motion.h1>

            <motion.div
              className="flex gap-8 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target={link.download ? undefined : "_blank"}
                  rel={link.download ? undefined : "noopener noreferrer"}
                  download={link.download}
                  className="relative group"
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-2xl p-3 rounded-full bg-stone-800/50 text-stone-300 group-hover:text-purple-300 group-hover:bg-stone-800 transition-colors">
                    {link.icon}
                  </div>
                  <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs text-stone-400 whitespace-nowrap transition-opacity pointer-events-none">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
