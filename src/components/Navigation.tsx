import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const Navigation = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [buttonWidths, setButtonWidths] = useState<number[]>([]);
  const [buttonPositions, setButtonPositions] = useState<number[]>([]);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const isScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout>();

  const sections = [
    { name: "Home", href: "#hero" },
    { name: "Tech", href: "#tech" },
    { name: "Projects", href: "#projects" },
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

  const handleNavClick = (index: number, href: string) => {
    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    setActiveTab(index);
    isScrollingRef.current = true;

    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

    // Set a longer timeout to prevent scroll detection from changing the active tab
    clickTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center items-center">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      >
        <div className="relative bg-stone-900/20 backdrop-blur-md rounded-full flex items-center p-1">
          <motion.div
            className="absolute bg-stone-100 rounded-full"
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
              className="relative z-10 px-4 py-2 rounded-full mix-blend-difference text-white transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {section.name}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export { Navigation };
