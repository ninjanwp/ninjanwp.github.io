import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { HiHome, HiCode, HiCollection } from "react-icons/hi"; // Import icons for navigation

const Navigation = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [buttonWidths, setButtonWidths] = useState<number[]>([]);
  const [buttonPositions, setButtonPositions] = useState<number[]>([]);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const isScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const sections = [
    { name: "Home", href: "#hero", icon: <HiHome /> },
    { name: "Skills", href: "#tech", icon: <HiCode /> },
    { name: "Projects", href: "#projects", icon: <HiCollection /> },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const currentPosition = window.scrollY + 100;
      sections.forEach((section, index) => {
        const element = document.querySelector(section.href);
        if (element) {
          const { offsetTop, offsetHeight } = element as HTMLElement;
          if (
            currentPosition >= offsetTop &&
            currentPosition < offsetTop + offsetHeight &&
            !isScrollingRef.current // Only update if not manually scrolling
          ) {
            setActiveTab(index);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const calculateButtonMetrics = () => {
      const widths = buttonsRef.current.map((btn) => btn?.offsetWidth ?? 0);
      const positions = buttonsRef.current.map((btn) => btn?.offsetLeft ?? 0);
      setButtonWidths(widths);
      setButtonPositions(positions);
    };

    calculateButtonMetrics();
    window.addEventListener("resize", calculateButtonMetrics);
    return () => window.removeEventListener("resize", calculateButtonMetrics);
  }, []);

  const scrollToElement = (element: Element) => {
    const start = window.pageYOffset;
    const target = element.getBoundingClientRect().top + window.pageYOffset;
    const startTime = performance.now();
    const duration = 1500; // Increased duration for slower scroll

    const easeInOutQuad = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      window.scrollTo(0, start + (target - start) * easeInOutQuad(progress));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  const handleNavClick = (index: number, href: string) => {
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    setActiveTab(index);
    isScrollingRef.current = true;

    const element = document.querySelector(href);
    if (element) {
      scrollToElement(element);
    }

    clickTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1500); // Match the duration of the scroll animation
  };

  return (
    <div className="fixed bg-black border-b border-white/10 top-0 left-0 right-0 py-2 z-50 flex justify-center items-center">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", delay: 0.5, stiffness: 500, damping: 30 }}
      >
        <div className="relative bg-background border border-accent/10 backdrop-blur rounded-lg flex items-center gap-3 p-1">
          <motion.div
            className="absolute bg-accent rounded-lg"
            initial={false}
            animate={{
              x: (buttonPositions[activeTab] || 0) - 4,
              width: buttonWidths[activeTab] || 0,
              height: 38,
            }}
            transition={{
              type: "spring",
              stiffness: 700,
              damping: 35,
              duration: 0.2,
            }}
          />
          {sections.map((section, index) => (
            <motion.button
              key={index}
              ref={(el) => (buttonsRef.current[index] = el)}
              onClick={() => handleNavClick(index, section.href)}
              className="relative z-10 px-2 py-2 font-bold text-white rounded-lg mix-blend-difference"
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center justify-center gap-2">
                {section.icon}
                {section.name}
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export { Navigation };
