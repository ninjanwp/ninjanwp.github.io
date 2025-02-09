import {
  useScroll,
  useTransform,
  motion,
  useMotionValueEvent,
} from "framer-motion";
import { ReactLenis } from "lenis/react";
import { HeaderLinks } from "./Header";
import { useState } from "react";
import { HiAcademicCap, HiLocationMarker } from "react-icons/hi"; // Add this import

import { WarmText } from "./WarmText";

const ImageBlob = () => (
  <motion.div
    initial={{ opacity: 0, x: 20, scale: 0 }}
    whileInView={{ opacity: 1, x: 0, scale: 1 }}
    className="relative w-full md:w-1/2 h-[300px] md:h-auto flex items-center justify-center">
    <svg
      viewBox="0 0 200 200"
      className="hoverable w-[300px] h-[300px] md:w-[400px] md:h-[400px]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="blob">
          <path
            fill="#ff4400"
            d="M45,-54.3C58.2,-42.5,68.9,-28.3,74.1,-11.2C79.2,5.8,79,25.6,69.9,39.5C60.9,53.3,43,61.2,24.6,68C6.3,74.9,-12.6,80.7,-29.3,76.4C-46,72.1,-60.5,57.7,-64.1,41.7C-67.7,25.7,-60.5,8.2,-57.1,-9.9C-53.8,-28.1,-54.3,-46.8,-45.5,-59.4C-36.6,-71.9,-18.3,-78.4,-1.2,-77C15.9,-75.5,31.7,-66.1,45,-54.3Z"
            transform="translate(100 100)"
          />
        </clipPath>
      </defs>
      <g clipPath="url(#blob)">
        <rect width="200" height="200" fill="#ff4400" />
      </g>
    </svg>
  </motion.div>
);

const BrutalistHeader = () => {
  const { scrollY } = useScroll();
  const [isSticky, setIsSticky] = useState(false);
  const greetingX = useTransform(scrollY, [0, 300], [0, -100]);
  const nameX = useTransform(scrollY, [0, 300], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsSticky(latest > window.innerHeight * 0.7);
  });

  return (
    <div className="relative flex min-h-screen w-full">
      <div className="relative z-10 flex flex-col md:flex-row justify-center items-center w-full min-h-screen">
        <div className="w-full md:w-1/2 px-4 md:px-16">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ x: greetingX, opacity }}
            className="text-[8vw] md:text-[6vw] leading-none tracking-tight text-stone-400"
          >
            <WarmText intensity="low">Hey, I'm</WarmText>
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ x: nameX, opacity }}
            className="text-[24vw] md:text-[20vw] font-black uppercase leading-none tracking-tight"
          >
            Nick
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mt-6 md:mt-9 text-lg md:text-xl"
          >
            <span className="flex items-center gap-2 text-stone-400">
              <WarmText intensity="low">
                <HiLocationMarker className="text-2xl" />
              </WarmText>
              Tallahassee
            </span>
            <span className="flex items-center gap-2 text-stone-400">
              <WarmText intensity="low">
                <HiAcademicCap className="text-2xl" />
              </WarmText>
              Information Technology
            </span>
          </motion.div>
        </div>
        <ImageBlob />
      </div>

      <motion.div
        className="fixed left-0 right-0 z-[999] backdrop-blur-sm px-4 md:px-0"
        style={{
          position: isSticky ? "fixed" : "absolute",
          top: isSticky ? 0 : "auto",
          bottom: isSticky ? "auto" : "2.5rem",
          transform: isSticky ? "translateY(0)" : "none",
        }}
        animate={
          isSticky
            ? {
                padding: "1rem",
              }
            : {
                padding: "1rem",
                borderRadius: "0.5rem",
              }
        }
      >
        <motion.div
          layout
          className={`${isSticky ? "max-w-5xl mx-auto" : "px-6 py-4"}`}
        >
          <HeaderLinks />
        </motion.div>
      </motion.div>
    </div>
  );
};

const SmoothScrollHero = () => (
  <ReactLenis root>
    <div className="w-full flex items-center justify-center">
      <BrutalistHeader />
    </div>
  </ReactLenis>
);

export { SmoothScrollHero };
