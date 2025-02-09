import { SiBitbucket, SiGithub, SiLinkedin } from "react-icons/si";
import { FiCode } from "react-icons/fi";
import { motion } from "framer-motion";
import ZoopText from "./ZoopText";
import { useState } from "react";

const HeaderSubtitle = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 1 }}
    className="px-4 flex justify-center items-center w-full pointer-events-none"
  >
    <p 
      className="text-[3vw] uppercase text-transparent text-right w-full font-black font-leaguespartan leading-[1] mb-0" 
      style={{ WebkitTextStroke: '1px #e7e5e4' }}
    >
      Nicholas Pfeffer
    </p>
  </motion.div>
);

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuVariants = {
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="hoverable fixed top-6 right-6 z-50 w-12 h-12 flex flex-col justify-center items-center gap-2 cursor-none"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 10 } : { rotate: 0, y: 0 }}
          className="w-8 h-0.5 bg-white block"
        />
        <motion.span
          animate={isOpen ? { opacity: 0, x: 10 } : { opacity: 1 }}
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
        className="fixed top-0 right-0 w-full md:w-96 h-screen bg-stone-950/50 backdrop-blur-lg z-40 flex flex-col justify-center items-start px-12"
      >
        <div className="flex flex-col gap-8">
          {[
            { icon: <SiGithub />, text: "GITHUB", href: "https://github.com/ninjanwp" },
            { icon: <SiBitbucket />, text: "BITBUCKET", href: "https://bitbucket.org/np22i/" },
            { icon: <SiLinkedin />, text: "LINKEDIN", href: "https://www.linkedin.com/in/nicholas-pfeffer-51713434a/" },
            { icon: <FiCode />, text: "PROJECTS", href: "#projects" },
          ].map(({ icon, text, href }) => (
            <a
              className="cursor-none"
              key={text}
              href={href}
              onClick={() => setIsOpen(false)}
              target={href.startsWith('http') ? "_blank" : undefined}
              rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
            >
              <ZoopText IconComponent={icon}>{text}</ZoopText>
            </a>
          ))}
        </div>
      </motion.nav>
    </>
  );
};

export { HeaderSubtitle, Navigation };
