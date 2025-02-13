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

  const { scrollYProgress: stickyHeroProgress } = useScroll({
    target: heroContainerRef,
    offset: ["start start", "end end"],
  });

  const overlay1Transform = useTransform(
    stickyHeroProgress,
    [0, 0.33],
    ["translateY(100%)", "translateY(0%)"]
  );
  const overlay2Transform = useTransform(
    stickyHeroProgress,
    [0.33, 0.66],
    ["translateY(100%)", "translateY(0%)"]
  );
  const overlay3Transform = useTransform(
    stickyHeroProgress,
    [0.66, 1],
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
          className="relative w-full h-[400vh] z-10"
        >
          <div className="sticky top-0 w-full h-screen">
            <Hero scrollProgress={stickyHeroProgress} />
            <div className="overflow-hidden ">
              <motion.div
                style={{ transform: overlay1Transform }}
                className="absolute inset-0 z-[5] bg-stone-200 w-full"
              />
              <motion.div
                style={{ transform: overlay2Transform }}
                className="absolute inset-0 z-[6] bg-stone-950 w-full"
              />
              <motion.div
                style={{ transform: overlay3Transform }}
                className="absolute inset-0 z-[7] bg-stone-200 w-full"
              />
            </div>
          </div>
        </section>

        <section
          ref={techRef}
          id="tech"
          className="relative min-h-screen w-full bg-stone-200 z-20"
        >
          <Technology />
        </section>

        <section
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
