import { motion, MotionValue, useTransform } from "framer-motion";
import { useRef, useState } from "react"; // Remove useEffect
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";
import { HiMail, HiDocumentDownload } from "react-icons/hi";

interface HeroProps {
  scrollProgress: MotionValue<number>;
}

export const Hero = ({ scrollProgress }: HeroProps) => {
  const [shouldAnimate] = useState(() => window.scrollY < 100);
  const portfolioTextRef = useRef<HTMLDivElement>(null);

  const textScale = useTransform(scrollProgress, [0, 1], [1, 0.9]);
  const titleScale = useTransform(scrollProgress, [0, 2], [1, 0.7]);
  const textSkew = useTransform(scrollProgress, [0, 1], [0, 12]);
  const textY = useTransform(scrollProgress, [0, 1], [0, -50]);
  const rotateText = useTransform(scrollProgress, [0, 1], [0, 0]);
  const bioScale = useTransform(scrollProgress, [0, 1], [1, 1.1]);
  const letterSpacing = useTransform(scrollProgress, [0, 1], ["0ch", "0.05ch"]);

  const text =
    "I am an IT student at Florida State University, highly motivated about learning and practically applying technology. Specializing in Full Stack development with a focus on modern Web Development.";

  const characters = text.split("");
  // Calculate timing for each character based on total length
  const characterOpacities = characters.map((_, index) => {
    const start = (index / characters.length) * 0.8; // Distribute over first 50% of scroll
    const end = start + 0.1; // Each character takes 10% of scroll to fade in
    return useTransform(scrollProgress, [start, end], [0, 1]);
  });

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
      label: "Resume PDF",
      download: true,
    },
  ];

  return (
    <motion.section
      className="w-full h-screen relative overflow-hidden bg-stone-200"
      initial={{ scale: shouldAnimate ? 3 : 1 }}
      animate={{ scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        delay: shouldAnimate ? 0.5 : 0,
      }}
    >
      <div className="relative h-full w-full">
        <motion.div
          className="h-full flex flex-col items-center justify-center relative z-10 text-stone-200 mix-blend-difference"
          style={{ scale: textScale, y: textY }}
        >
          <div className="w-full mx-auto px-0">
            <div className="flex flex-col items-start justify-center space-y-12">
              <motion.div
                className="uppercase w-full text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-none tracking-wider"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                &copy; Nicholas Pfeffer
              </motion.div>
              <motion.div className="w-full">
                <motion.div
                  ref={portfolioTextRef}
                  className="font-akira uppercase font-black w-full text-center bg-clip-text text-stone-200 tracking-tight leading-none"
                  style={{
                    fontSize: "clamp(2rem, 12vw, 12rem)",
                    letterSpacing: letterSpacing,
                    rotate: rotateText,
                    scale: titleScale,
                    skewX: textSkew,
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Portfolio*
                </motion.div>
              </motion.div>

              <div className="flex items-center justify-center w-full">
                <motion.p
                  className="text-xs sm:text-sm md:text-lg max-w-lg text-left font-semibold tracking-widest leading-loose text-stone-300 px-3 py-2 mt-2"
                  style={{ scale: bioScale }}
                >
                  {characters.map((char, index) => (
                    <motion.span
                      key={index}
                      style={{
                        opacity: characterOpacities[index],
                      }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.p>
              </div>

              <motion.div
                className="fixed bottom-8 left-0 right-0 sm:bottom-12 sm:right-12 sm:left-auto flex justify-center sm:justify-end gap-8 sm:gap-10 items-center px-4 sm:px-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target={link.download ? undefined : "_blank"}
                    rel={link.download ? undefined : "noopener noreferrer"}
                    download={link.download}
                    className="relative group"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl text-stone-300 transition-colors duration-200 group-hover:text-stone-100">
                      {link.icon}
                    </div>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 text-xs sm:text-sm text-stone-400 whitespace-nowrap transition-all duration-200 group-hover:-translate-y-1 pointer-events-none">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
