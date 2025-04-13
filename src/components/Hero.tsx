import { motion } from "framer-motion";
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";
import { HiMail, HiDocumentDownload } from "react-icons/hi";

import SectionHeader from "./SectionHeader";

export const Hero = () => {

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

  // Using the accent color from Tailwind config
  const accentColor = "rgba(255, 255, 255, 0.2)"; // Low opacity white color for gradient effect

  // Function to determine if it's daytime (between 6am and 6pm)

  return (
    <section 
      id="hero" 
      className="max-w-7xl w-full mx-auto px-4 md:px-8 min-h-screen flex items-center relative"
    >
      {/* Background video effect - moved from App.tsx */}
      <motion.div 
        className='fixed w-full h-full inset-0 -z-10 overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          className="w-full h-full object-cover blur-3xl"
        >
          <source src="/assets/test.mp4" type="video/mp4"  />
          Your browser does not support the video tag.
        </video>
        
        {/* Grain overlay on top of the video */}
        <div 
          className="absolute inset-0 w-screen h-screen z-[9]"
          style={{ 
            background: "radial-gradient(circle, transparent 20%, rgba(0, 0, 0, 1) 80%)",
            backgroundRepeat: "repeat",
          }}
        />
        <div 
          className="absolute inset-0 w-full h-full z-10 opacity-100 grayscale invert"
          style={{ 
            background: "url(https://grainy-gradients.vercel.app/noise.svg)",
            backgroundRepeat: "repeat",
            mixBlendMode: "overlay"
          }}
        />
      </motion.div>

      <div className="w-full">
        <div className="flex flex-col-reverse md:flex-row md:items-center md:justify-between gap-0 md:gap-12">
          {/* Content container */}
          <div className="flex flex-col">
            {/* Name heading and bio grouped together */}
            <SectionHeader 
              label="Information Technology student — studying full-stack and software development."
              title="Nick Pfeffer"
            />

            {/* Links section with subheading */}
            <div className="flex w-full justify-start items-center">
              
              {/* Social links with improved animations */}
              <motion.div
                className="flex gap-2 bg-background border border-accent/20 backdrop-blur p-1 rounded-lg max-w-fit"
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                
                {socialLinks.map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    target={link.download ? undefined : "_blank"}
                    rel={link.download ? undefined : "noopener noreferrer"}
                    download={link.download}
                    className="relative group flex items-center overflow-hidden rounded-lg hover:text-black hover:bg-accent bg-transparent transition-all"
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div 
                      className="text-2xl md:text-3xl p-2 flex-shrink-0"
                      layoutId={`icon-${index}`}
                    >
                      {link.icon}
                    </motion.div>
                    <motion.span 
                      className="max-w-0 whitespace-nowrap overflow-hidden group-hover:max-w-[100px] opacity-0 group-hover:opacity-100 ml-0 group-hover:mr-4 text-sm md:text-base text-black font-semibold transition-all duration-300 ease-in-out"
                    >
                      {link.label.split(' ')[0]}
                    </motion.span>
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
          
          {/* Headshot Component */}
          <div className="relative w-full md:w-1/3 lg:w-2/5 flex justify-center md:justify-end p-4 md:p-0">
            <motion.div
              className="relative"
              style={{
                transformOrigin: "center center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >

              {/* Wrapper div to position both the gradient and image container */}
              <div className="relative">
                <motion.div
                  className="absolute rounded-full"
                  style={{
                    top: "-0.5%",
                    left: "-0.5%", 
                    width: "101%",
                    height: "101%",
                    zIndex: 6
                  }}
                  initial={{ background: `conic-gradient(from 0deg, ${accentColor} 0%, transparent 0%)` }}
                  animate={{ 
                    background: [
                      `conic-gradient(from 0deg, ${accentColor} 0%, transparent 0%)`,
                      `conic-gradient(from 0deg, ${accentColor} 100%, transparent 100%)`,
                    ]
                  }}
                  transition={{ 
                    delay: 0.3,
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                />

                {/* Image container with overflow hidden for the image only */}
                <motion.div
                  className="relative w-60 h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 z-10 bg-black rounded-full"
                >
                  {/* Image with position translation */}
                  <div className="absolute bottom-0 left-0 flex items-center justify-center rounded-b-full overflow-hidden h-[150%]">
                    <motion.img
                      initial={{ opacity: 0, y: "10%"}}
                      animate={{ opacity: 1, y: "10%"}}
                      transition={{ duration: 0.8, delay: 0, ease: "easeInOut" }}
                      src="/assets/headshot_transparent.png"
                      alt="Nick Pfeffer headshot"
                      className="grayscale-"
                      style={{
                        width: "85%",
                        height: "85%",
                        objectFit: "cover",
                        objectPosition: "center"
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
