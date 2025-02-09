import "./App.css";
import { Projects } from "./components/Projects";
import { SmoothScrollHero } from "./components/SmoothScrollHero";
import { GlowCursor } from "./components/GlowCursor";
import { useScroll, useTransform, motion } from "framer-motion";
import topographyPattern from "/svgs/topography.svg?url";

function App() {
  const { scrollY } = useScroll();
  const backgroundX = useTransform(scrollY, [0, 1000], [0, -200]); // Changed to X transform

  return (
    <>
      {/* Background pattern layer */}
      <motion.div 
        className="fixed inset-0 -z-10"
        style={{ 
          x: backgroundX, // Changed from y to x
          backgroundImage: `url(${topographyPattern})`,
          backgroundSize: "2500px 2500px",
          backgroundRepeat: "repeat",
          opacity: 0.1, // Set opacity to 1
          width: '400vw', // Changed from height to width
          left: '-50vw', // Changed from top to left
          mixBlendMode: 'overlay', // Use screen blend mode
        }}
      />
      {/* Dark background layer */}
      <div className="fixed inset-0 -z-20 bg-stone-900"/>
      <main className="relative">
        <SmoothScrollHero />
        <div className="relative z-10">
          <Projects />
        </div>
      </main>
      <GlowCursor />
    </>
  );
}

export default App;
