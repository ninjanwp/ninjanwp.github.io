import { motion } from "framer-motion";
import { useRef } from "react";
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";
import { HiMail, HiDocumentDownload } from "react-icons/hi";

export const Hero = () => {
  const nameRef = useRef<HTMLHeadingElement>(null);

  const text =
    "Information Technology student, focusing on full-stack development.";

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
    <section 
      id="hero" 
      className="max-w-7xl w-full mx-auto px-4 md:px-8 min-h-screen flex items-center"
    >
      <div className="w-full">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-8 md:gap-12">
          {/* Content container */}
          <div className="flex flex-col space-y-10">
            {/* Name heading and bio grouped together */}
            <div className="flex flex-col space-y-6">
              {/* Main heading with your name */}
              <motion.h1
                ref={nameRef}
                className="text-4xl md:text-7xl font-bold text-white tracking-wide"
              >
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.5 }}
                  className="inline-block"
                >
                  Nick
                </motion.span>{" "}
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2, delay: 0.75 }}
                  className="inline-block"
                >
                  Pfeffer
                </motion.span>
              </motion.h1>

              {/* Bio paragraph */}
              <motion.p
                className="text-base md:text-lg lg:text-2xl text-white/75 max-w-2xl leading-relaxed border-l-4 border-green-300 pl-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1}}
              >
                {text}
              </motion.p>
            </div>

            {/* Social links with improved animations */}
            <motion.div
              className="flex gap-2 bg-[#27292E]/50 backdrop-blur-xl p-1 rounded-full max-w-fit"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  target={link.download ? undefined : "_blank"}
                  rel={link.download ? undefined : "noopener noreferrer"}
                  download={link.download}
                  className="relative group flex items-center overflow-hidden rounded-full hover:text-green-300 hover:bg-green-400/40 bg-transparent transition-all"
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div 
                    className="text-2xl md:text-3xl p-2 flex-shrink-0"
                    layoutId={`icon-${index}`}
                  >
                    {link.icon}
                  </motion.div>
                  <motion.span 
                    className="max-w-0 whitespace-nowrap overflow-hidden group-hover:max-w-[100px] opacity-0 group-hover:opacity-100 ml-0 group-hover:mr-4 text-sm md:text-base text-green-300 font-semibold transition-all duration-300 ease-in-out"
                  >
                    {link.label.split(' ')[0]}
                  </motion.span>
                </motion.a>
              ))}
            </motion.div>
          </div>
          
          {/* Headshot Component */}
          <div className="relative w-full md:w-1/3 lg:w-2/5 flex justify-center md:justify-end">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                delay: 1,
                duration: 0.2,
              }}
              style={{
                transformOrigin: "center center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              {/* Image container with border effect */}
              <div className="relative overflow-hidden rounded-full border-2 border-green-300 bg-gradient-to-t from-green-200/50 to-to-transparent shadow-xl shadow-black/50 w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80">
                {/* Image with position translation */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  <motion.img
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.15 }}
                    src="/assets/headshot_transparent.png"
                    alt="Nick Pfeffer headshot"
                    className="grayscale"
                    style={{
                      width: "130%",
                      height: "130%",
                      objectFit: "cover",
                      objectPosition: "center"
                    }}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
