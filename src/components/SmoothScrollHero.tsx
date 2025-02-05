import { useScroll, useTransform, motion } from "framer-motion";
import { ReactLenis } from "lenis/react";
import { HeaderTitle, HeaderLinks, HeaderSubtitle } from "./Header";
import { DiApple } from "react-icons/di";
import { useRef } from "react";

const BackgroundContainer = () => {
  const { scrollY } = useScroll();
  const backgroundColor = useTransform(
    scrollY,
    [0, 200],
    ["#09090b", "#ff3333"],
    { clamp: false }
  );

  return (
    <motion.div
      className="fixed inset-0 w-full h-full -z-10 transition-colors duration-300"
      style={{ backgroundColor }}
    />
  );
};

import { useEffect, useState } from "react";

const TopBar = () => {
  const timeString = new Date().toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "numeric",
  });

  const dateString = new Date()
    .toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
    })
    .replace(",", "");

  return (
    <div className="absolute z-20 w-full h-10 top-0">
      {/* Backdrop blur - desktop only */}
      <div className="absolute inset-0 bg-zinc-950/20 backdrop-blur-md hidden md:block" />

      {/* Content container - above backdrop */}
      <div className="relative z-30 h-full">
        {/* Desktop view */}
        <div className="hidden md:flex justify-between items-center h-full px-3">
          <div className="text-white text-xl font-bold flex items-center">
            <DiApple className="me-3" />
            Portfolio
          </div>
          <div className="text-white font-semibold text-md">
            {dateString} {timeString}
          </div>
        </div>

        {/* Mobile view - time only */}
        <div className="md:hidden flex justify-end items-center h-full px-3">
          <div className="text-white font-semibold text-sm">{timeString}</div>
        </div>
      </div>

      {/* Notch */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-48 z-40">
        <div className="h-9 bg-zinc-950 rounded-b-2xl" />
      </div>
    </div>
  );
};

const BackgroundImage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [0.5, 0.75]);
  const opacity = useTransform(scrollY, [0, 2250], [1, 1]);
  const scrollRotateX = useTransform(scrollY, [0, 2250], [15, 0]);

  // Separate state for mouse-based transforms
  const [mouseRotate, setMouseRotate] = useState({ x: 0, y: 0 });

  const videoSources = [
    "public/videos/glitch.mp4",
    "public/videos/terminal.mp4",
    "public/videos/glitch2.mp4",
    // "src/assets/glitch3.mp4",
    "public/videos/terminal2.mp4",
    // "src/assets/glitch4.mp4",
  ];
  const [currentVideo, setCurrentVideo] = useState(videoSources[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => {
        const currentIndex = videoSources.indexOf(prev);
        const nextIndex = (currentIndex + 1) % videoSources.length;
        return videoSources[nextIndex];
      });
    }, 1000); // Change video every 5 seconds

    return () => clearInterval(interval);
  }, [videoSources]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const { clientX, clientY } = event;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();

    const x = (clientX - left) / width;
    const y = (clientY - top) / height;

    // Smoother mouse-based rotation
    const tiltX = -(y - 0.5) * 20;
    const tiltY = (x - 0.5) * 20;

    setMouseRotate({ x: tiltX, y: tiltY });
  };

  const handleMouseLeave = () => {
    setMouseRotate({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="fixed inset-0 w-screen h-screen z-10 flex items-center justify-center"
      style={{
        scale,
        opacity,
        perspective: 1000,
      }}
      initial={{ opacity: 0, scale: 0.5, rotateX: 90, translateY: "50%" }}
      animate={{
        opacity: 1,
        scale: 0.5,
        rotateX: 0,
        translateY: "0%",
        filter: "drop-shadow(0px 0px 0px rgba(255, 51, 51, 0))",
      }}
      whileHover={{
        filter: "drop-shadow(0px 0px 20px rgba(255, 51, 51, 0.5))",
        rotateX: 0,
      }}
      transition={{ type: "spring", damping: 10 }}
    >
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-screen h-screen relative border-zinc-950 border-[10px] rounded-[30px] overflow-hidden flex flex-col justify-between items-center"
        style={{
          transformStyle: "preserve-3d",
          transform: `
            rotateX(${scrollRotateX.get() + mouseRotate.x}deg)
            rotateY(${mouseRotate.y}deg)
          `,
          transition: "transform 0.1s ease-out",
        }}
      >
        <TopBar />
        <video
          src={currentVideo}
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover grayscale rounded-[20px] pointer-events-none bg-zinc-500"
        />
        <div className="absolute bottom-1 z-20 h-auto w-full flex justify-center items-center">
          <div className="bg-zinc-950/20 h-auto w-auto rounded-3xl p-6 backdrop-blur-md">
            <HeaderLinks />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedHeader = () => {
  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 300], [0, -50]);
  const titleScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const subtitleScale = useTransform(scrollY, [0, 300], [1, 0.9]);
  const subtitleY = useTransform(scrollY, [0, 300], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.div style={{ opacity }} className="relative z-10">
      <motion.div style={{ y: titleY, scale: titleScale }}>
        <HeaderTitle />
      </motion.div>
      <motion.div style={{ y: subtitleY, scale: subtitleScale }}>
        <HeaderSubtitle />
      </motion.div>
    </motion.div>
  );
};

const SmoothScrollHero = () => {
  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      <div className="sticky top-0 w-full h-[300vh] pt-9 overflow-hidden">
        <BackgroundContainer />
        <BackgroundImage />
        <div className="relative h-screen">
          <AnimatedHeader />
        </div>
      </div>
    </ReactLenis>
  );
};

export { SmoothScrollHero };
