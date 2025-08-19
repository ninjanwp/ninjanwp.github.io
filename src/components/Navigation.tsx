import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { RiMenuLine, RiCloseLine } from "react-icons/ri";

const Navigation = () => {
  const [, setActiveTab] = useState(0); // activeTab unused, keep setActiveTab for scroll logic
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrollingRef = useRef(false);
  const clickTimeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const sections = [
    { name: "Home", href: "#hero", color: "bg-white" },
    { name: "Web", href: "#skills", color: "bg-blue-700" },
    { name: "Mobile", href: "#mobile-development", color: "bg-purple-700" },
    { name: "Data", href: "#data-analysis", color: "bg-emerald-700" },
    { name: "DevOps", href: "#devops", color: "bg-orange-600" },
    { name: "Design", href: "#ui-design", color: "bg-rose-700" },
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
            !isScrollingRef.current
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

  const scrollToElement = (element: Element, sectionIndex: number) => {
    const start = window.pageYOffset;
    const elementTop = element.getBoundingClientRect().top + window.pageYOffset;
    const elementHeight = (element as HTMLElement).offsetHeight;
    
    // For portfolio sections (index > 0), scroll to 50% of the section
    // For hero section (index 0), scroll to the beginning
    let target;
    if (sectionIndex === 0) {
      // Hero section - scroll to beginning
      target = elementTop;
    } else {
      // Portfolio sections - scroll to 50% of the section
      target = elementTop + (elementHeight * 0.6
  
      );
    }
    
    const startTime = performance.now();
    const duration = 1500;

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
    setIsMenuOpen(false);
    isScrollingRef.current = true;

    const element = document.querySelector(href);
    if (element) {
      scrollToElement(element, index);
    }

    clickTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1500);
  };

  return (
    <>
      {/* Menu Button */}
      <div className="fixed top-0 right-0 p-4 z-50">
        <motion.button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="bg-black/20 border border-white/10 backdrop-blur-lg rounded-lg p-3 text-white hover:border-white/30 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isMenuOpen ? <RiCloseLine size={24} /> : <RiMenuLine size={24} />}
        </motion.button>
      </div>

      {/* Full Screen Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center"
          >
            {/* Navigation Links */}
            <div className="absolute top-0 left-0 flex flex-col items-start gap-1">
              {sections.map((section, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleNavClick(index, section.href)}
                  className="text-6xl md:text-7xl lg:text-8xl font-light text-white hover:text-white/80 transition-colors group relative flex items-center gap-6"
                  style={{ lineHeight: 1 }}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                >
                  <span className="flex items-center h-full">
                    {section.name}
                  </span>
                  <motion.div
                    className={`${section.color} rotate-45 opacity-0 group-hover:opacity-100 scale-0 group-hover:scale-100 transition-all duration-200`}
                    style={{ width: 50, height: 50, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export { Navigation };
