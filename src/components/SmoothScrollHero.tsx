import {
  motion,
} from "framer-motion";
import { ReactLenis } from "lenis/react";
import { HiAcademicCap, HiLocationMarker } from "react-icons/hi";
import { Navigation } from "./Header";
import { DataGrid } from "./DataGrid";

// Removed CircuitGrid component

const BrutalistHeader = () => {

  

  return (
    <div className="relative flex min-h-screen w-full">
      <div className="relative z-10 flex flex-col md:flex-row justify-center items-center w-full min-h-screen max-w-7xl mx-auto">
        <div className="w-full md:w-1/2 px-8 md:px-16 flex flex-col gap-6">
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm uppercase tracking-widest text-stone-400"
            >
              Software Engineer
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl md:text-5xl font-bold text-stone-200 leading-tight"
            >
              Nicholas Pfeffer
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6 text-stone-400"
          >
            <p className="text-lg leading-relaxed">
              Full-stack developer with a focus on modern web technologies and
              data manipulation.
            </p> <hr />

            <div className="flex flex-col md:flex-row gap-4 text-sm">
              <span className="flex items-center gap-2">
                <HiLocationMarker className="text-lg text-stone-500" />
                Tallahassee, Florida
              </span>
              <span className="flex items-center gap-2">
                <HiAcademicCap className="text-lg text-stone-500" />
                Florida State University
              </span>
            </div>
          </motion.div>
        </div>
        <DataGrid />
      </div>
      <Navigation />
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
