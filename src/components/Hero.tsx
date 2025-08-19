import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ThreeBlobs } from "./ThreeBlobs";

export const Hero = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  
  // Scale variables based on scroll progress
  const textScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);

  

  return (
    <section ref={sectionRef} id="hero" className="w-full h-[200dvh] relative">
      <div className="sticky top-0 h-screen overflow-hidden isolate">
        {/* White base */}
        <motion.div className="absolute inset-0 bg-white z-0" />

        {/* Three.js 3D blobs */}
        <div className="blur-md">
          <ThreeBlobs scrollProgress={scrollYProgress} />
        </div>

        {/* Blended text (single layer) */}
        <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center">
          <div className="text-center text-black">
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-black tracking-tighter leading-[0.7] mb-8"
              style={{ scale: textScale }}
            >
              NICK
            </motion.h1>
            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl xl:text-[9rem] font-black tracking-tighter leading-[0.7] mb-8"
              style={{ scale: textScale }}
            >
              PFEFFER
            </motion.h1>
            <motion.p 
              className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-wide"
              style={{ scale: textScale }}
            >
              PORTFOLIO
            </motion.p>
          </div>
        </div>

        {/* Section transition behind text */}
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
        />
      </div>
    </section>
  );
};
