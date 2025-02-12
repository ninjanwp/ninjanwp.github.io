import { motion } from "framer-motion";
// import { ReactLenis } from "lenis/react";
import { HiAcademicCap, HiLocationMarker } from "react-icons/hi";
// import { DataGrid } from "./DataGrid";
import { FiArrowDownCircle } from "react-icons/fi";

// Removed CircuitGrid component

const BrutalistHeader = () => {
  return (
    <div className="relative flex h-full w-full">
      <div className="relative z-10 flex flex-col justify-center items-center w-full h-full">
        <div className="w-full px-6 flex flex-col gap-8">
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col gap-2"
            >
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="text-sm uppercase tracking-widest text-stone-400"
              >
                // Full-stack Developer
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl sm:text-5xl font-bold text-stone-200 leading-tight"
              >
                Nicholas Pfeffer
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              <div className="flex gap-4">
                <motion.a
                  href="#about"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r text-xl from-purple-200 to-purple-300 text-stone-900 font-medium rounded hover:bg-stone-300 transition-colors cursor-pointer no-underline"
                >
                  About Me
                  <FiArrowDownCircle />
                </motion.a>

                <motion.a
                  href="#projects"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="flex items-center gap-2 px-4 py-3 border text-xl border-stone-200 text-stone-200 font-medium rounded hover:bg-stone-200/10 transition-colors cursor-pointer no-underline"
                >
                  Showcase
                  <FiArrowDownCircle />
                </motion.a>
              </div>

              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  whileInView={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-px bg-stone-800"
                />

                <div className="flex flex-col md:flex-row gap-6 text-base">
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <HiLocationMarker className="text-xl text-stone-400" />
                    <span className="text-stone-300">Tallahassee, Florida</span>
                  </motion.span>
                  <motion.span
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex items-center gap-3"
                  >
                    <HiAcademicCap className="text-xl text-stone-400" />
                    <span className="text-stone-300">
                      Florida State University
                    </span>
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SmoothScrollHero = () => (
  <div className="w-full h-full overflow-hidden">
    <BrutalistHeader />
  </div>
);

export { SmoothScrollHero };
