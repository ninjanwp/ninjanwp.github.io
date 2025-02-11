import { SiBitbucket, SiGithub, SiLinkedin } from "react-icons/si";
import { FiCode } from "react-icons/fi";
import { motion } from "framer-motion";
import ZoopText, { ZoopVariant } from "./ZoopText";
import { useState, useEffect } from "react";

const HeaderSubtitle = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 1 }}
    className="px-4 flex justify-center items-center w-full"
  >
    <p
      className="text-[3vw] uppercase text-transparent text-right w-full font-black font-leaguespartan leading-[1] mb-0"
      style={{ WebkitTextStroke: "1px #e7e5e4" }}
    >
      Nicholas Pfeffer
    </p>
  </motion.div>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuVariants = {
    closed: {
      y: "-100%",
      transition: {
        type: "spring",
        stiffness: 1000,
        damping: 40,
      },
    },
    open: {
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 40,
      },
    },
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-[80px] flex justify-between items-center z-50 bg-stone-950/95 backdrop-blur-sm shadow-lg px-3">
      
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: scrollPosition > 500 ? 1 : 0, y: scrollPosition > 500 ? 0 : -20 }}
        className="flex flex-col z-50 ">
        <p className="leading-none text-xs uppercase tracking-widest text-stone-400">
          // Nicholas Pfeffer
        </p>
        <h3 className="leading-none text-5xl font-bold text-stone-200 select-none">
          Portfolio
        </h3>
      </motion.div>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="z-50 w-12 h-12 flex flex-col justify-center items-center gap-2"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
          className="w-8 h-0.5 bg-white block"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1 }}
          className="w-8 h-0.5 bg-white block"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -10 } : { rotate: 0, y: 0 }}
          className="w-8 h-0.5 bg-white block"
        />
      </button>

      <motion.nav
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        className="fixed top-0 left-0 w-full h-screen bg-stone-950 z-40 flex flex-col justify-center items-start px-12"
      >
        <div className="flex flex-col gap-8">
          {[
            {
              icon: <SiGithub />,
              text: "GITHUB",
              href: "https://github.com/ninjanwp",
            },
            {
              icon: <SiBitbucket />,
              text: "BITBUCKET",
              href: "https://bitbucket.org/np22i/",
            },
            {
              icon: <SiLinkedin />,
              text: "LINKEDIN",
              href: "https://www.linkedin.com/in/nicholas-pfeffer-51713434a/",
            },
            { icon: <FiCode />, text: "PROJECTS", href: "#projects" },
          ].map(({ text, href }) => (
            <a
              key={text}
              href={href}
              onClick={(e) => {
                if (href.startsWith("#")) {
                  e.preventDefault();
                  document
                    .querySelector(href)
                    ?.scrollIntoView({ behavior: "smooth" });
                }
                setIsOpen(false);
              }}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="text-5xl sm:text-8xl font-bold text-stone-200 uppercase"
            >
              <ZoopText>{text}</ZoopText>
            </a>
          ))}
        </div>
      </motion.nav>
    </div>
  );
};

export { HeaderSubtitle, Navigation };
