import "./App.css";
import { Projects } from "./components/Projects";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import Technology from "./components/Technology";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";
import Footer from "./components/Footer";

function App() {
  const heroContainerRef = useRef<HTMLElement>(null);
  const techContainerRef = useRef<HTMLElement>(null);
  const projectsContainerRef = useRef<HTMLElement>(null);

  const { scrollYProgress: techProgress } = useScroll({
    target: techContainerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsContainerRef,
    offset: ["start end", "end start"],
  });

  // const {
  //   ref: techRef,
  //   scale: techScale,
  //   opacity: techOpacity,
  // } = useScrollTransform({
  //   scale: [0.8, 1],
  //   opacity: [0, 1],
  // });

  // const {
  //   ref: projectsRef,
  //   y: projectsY,
  //   opacity: projectsOpacity,
  // } = useScrollTransform({
  //   y: [100, 0],
  //   opacity: [0, 1],
  // });

  const { scrollYProgress: stickyHeroProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end end"],
  });

  const overlay1Transform = useTransform(
    stickyHeroProgress,
    [0, 0.33],
    ["translateY(100%) scale(1)", "translateY(0%) scale(2)"]
  );
  const overlay2Transform = useTransform(
    stickyHeroProgress,
    [0.33, 0.66],
    ["translateY(100%) scale(1)", "translateY(0%) scale(2)"]
  );
  const overlay3Transform = useTransform(
    stickyHeroProgress,
    [0.66, 1],
    ["translateY(100%) scale(1)", "translateY(0%) scale(2)"]
  );

  return (
    <ReactLenis root options={{ smoothWheel: true }}>
      <div className="fixed inset-0 z-[-3] bg-stone-950" />
      <main className="relative">
        <Navigation />

        <section
          ref={heroContainerRef}
          id="hero"
          className="relative w-full h-[400vh] z-10"
        >
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            <Hero scrollProgress={stickyHeroProgress} />
            <div className="overflow-hidden ">
              <motion.div
                style={{ transform: overlay1Transform }}
                className="absolute inset-0 z-[5] bg-stone-950 w-full rounded-full"
              />
              <motion.div
                style={{ transform: overlay2Transform }}
                className="absolute inset-0 z-[6] bg-stone-200 w-full rounded-full"
              />
              <motion.div
                style={{ transform: overlay3Transform }}
                className="absolute inset-0 z-[7] bg-stone-950 w-full rounded-full"
              />
            </div>
          </div>
        </section>

        <motion.section
          ref={techContainerRef}
          id="tech"
          className="relative w-full z-20 mb-9"
        >
          <div className="h-full w-full overflow-hidden">
            <Technology scrollProgress={techProgress} />
          </div>
        </motion.section>

        <motion.section
          ref={projectsContainerRef}
          id="projects"
          className="relative w-full z-30 mb-9"
        >
          <div className="w-full h-full overflow-hidden">
            <Projects scrollProgress={projectsProgress} />
          </div>
        </motion.section>
        <Footer />
      </main>
    </ReactLenis>
  );
}

export default App;
