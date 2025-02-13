import "./App.css";
import { Projects } from "./components/Projects";
import { Navigation } from "./components/Navigation";
import { Hero } from "./components/Hero";
import Technology from "./components/Technology";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ReactLenis } from "@studio-freight/react-lenis";

function App() {
  const heroContainerRef = useRef<HTMLElement>(null);
  const techRef = useRef<HTMLElement>(null);
  const projectsRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: techProgress } = useScroll({
    target: techRef,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsRef,
    offset: ["start end", "start start"],
  });

  const { scrollYProgress: stickyHeroProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end end"],
  });

  const overlayTransform = useTransform(
    heroProgress,
    [0, 0.7],
    ["translateY(100%)", "translateY(0%)"]
  );

  const techOverlayTransform = useTransform(
    techProgress,
    [0, 1],
    ["translateX(120%) skew(-45deg)", "translateX(0%) skew(0deg)"]
  );

  const techTransform = useTransform(
    techProgress,
    [0, 1],
    ["translateY(100%)", "translateY(0%)"]
  );

  const projectsTransform = useTransform(
    projectsProgress,
    [0, 1],
    ["translateY(100%)", "translateY(0%)"]
  );

  return (
    <ReactLenis root options={{ smoothWheel: true }}>
      <div className="fixed inset-0 z-[-3] bg-stone-950" />
      <main className="relative">
        <Navigation />

        <section
          ref={heroContainerRef}
          id="hero"
          className="relative w-full h-[300vh] z-10"
        >
          <div className="sticky top-0 w-full h-screen overflow-hidden">
            <Hero scrollProgress={stickyHeroProgress} />
            <div className="overflow-hidden">
              <motion.div
                style={{ transform: overlayTransform }}
                className="absolute inset-0 z-[5] bg-stone-200 w-full shadow-stone-200"
              />
            </div>
          </div>
        </section>

        <section
          style={{ transform: techTransform }}
          ref={techRef}
          id="tech"
          className="relative min-h-screen w-full bg-stone-200 z-20"
        >
          <Technology />
        </section>

        <section
          style={{ transform: projectsTransform }}
          ref={projectsRef}
          id="projects"
          className="relative w-full min-h-screen overflow-hidden bg-stone-200 z-30"
        >
          <Projects />
        </section>
      </main>
    </ReactLenis>
  );
}

export default App;
