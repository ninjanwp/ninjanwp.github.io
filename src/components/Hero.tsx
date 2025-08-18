import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress for this section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"]
  });

  // Blue bar transition matches Portfolio's SectionTransition exactly
  const bar1Scale = useTransform(scrollYProgress, [0.8, 0.85], [0, 1]);
  const bar2Scale = useTransform(scrollYProgress, [0.82, 0.87], [0, 1]);
  const bar3Scale = useTransform(scrollYProgress, [0.84, 0.89], [0, 1]);
  const bar4Scale = useTransform(scrollYProgress, [0.86, 0.91], [0, 1]);

  // Text animations
  const nameOpacity = useTransform(scrollYProgress, [0.1, 0.3], [1, 0]);
  const nameY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0.3, 0.5, 0.9], [0, 1, 0]);
  const subtitleY = useTransform(scrollYProgress, [0.3, 0.5, 0.8], [50, 0, -50]);

  return (
    <section 
      ref={sectionRef}
      id="hero" 
      className="w-full h-[400dvh] relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Background Horizontal Bars - Only Blue for seamless transition */}
        <div className="absolute inset-0 flex flex-col">
          <motion.div 
            className="h-1/4 bg-blue-700 origin-left"
            style={{ scaleX: bar1Scale }}
          />
          <motion.div 
            className="h-1/4 bg-blue-700 origin-left"
            style={{ scaleX: bar2Scale }}
          />
          <motion.div 
            className="h-1/4 bg-blue-700 origin-left"
            style={{ scaleX: bar3Scale }}
          />
          <motion.div 
            className="h-1/4 bg-blue-700 origin-left"
            style={{ scaleX: bar4Scale }}
          />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full h-full px-4 md:px-8 lg:px-12 flex flex-col items-center justify-center">
          {/* Big Text */}
          <motion.div 
            className="relative flex flex-col items-center justify-center"
            style={{ 
              opacity: nameOpacity,
              y: nameY 
            }}
          >
            <span className="text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[16rem] font-bold text-white text-center">
              Nick Pfeffer
            </span>
          </motion.div>

          {/* Subtitle */}
          <motion.div
            className="mt-8 text-center relative"
            style={{ 
              opacity: subtitleOpacity,
              y: subtitleY 
            }}
          >
            <p className="text-[1rem] md:text-[2rem] lg:text-[4rem] xl:text-[8rem] text-white/80 font-light tracking-wider">
              Digital Portfolio
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
