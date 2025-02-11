import "./App.css";
import { Projects } from "./components/Projects";
import { SmoothScrollHero } from "./components/SmoothScrollHero";
import AboutSection from "./components/AboutSection";
import { Navigation } from "./components/Header";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FiArrowUp } from "react-icons/fi";
import Footer from "./components/Footer";

function App() {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Dark background layer */}
      <div className="fixed inset-0 -z-20 bg-stone-950" />

      <main className="relative flex flex-col">
        <Navigation />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: scrollPosition > 500 ? 1 : 0 }}
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="flex gap-4 fixed bottom-0 right-0 z-30 m-4 sm:m-12 "
        >
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="p-4 bg-stone-800 text-stone-200 rounded-full hover:bg-stone-700 transition-colors text-4xl"
          >
            <FiArrowUp />
          </button>
        </motion.div>
        <section id="home" className="w-screen h-screen mt-[80px]">
          <SmoothScrollHero />
        </section>
        <section id="about" className="w-screen min-h-screen">
          <AboutSection />
        </section>
        <section id="projects" className="w-screen min-h-screen">
          <Projects />
        </section>
        <Footer />
      </main>
    </>
  );
}

export default App;
