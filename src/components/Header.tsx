import { delay, hover, motion } from "framer-motion";
import { SiBitbucket, SiGithub, SiLinkedin } from "react-icons/si";
import ZoopText from "./ZoopText";
import { FiCode } from "react-icons/fi";
import Flicker from "./Flicker";

export const HeaderTitle = () => (
  <motion.div
    initial={{ y: 48, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ ease: "easeInOut", duration: 0.75 }}
    className="px-4 flex justify-center items-center w-full pointer-events-none"
  >
    <div className="relative text-center w-full">
      <h1 className="font-black text-custom-red-400 text-[18vw] w-full font-leaguespartan uppercase leading-[0.8] -mb-[0.1em]">
        Portfolio
      </h1>
    </div>
  </motion.div>
);

export const HeaderSubtitle = () => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ duration: 0.5, delay: 1 }}
    className="px-4 flex justify-center items-center w-full pointer-events-none"
  >
    <p className="text-[4vw] uppercase text-custom-red-400 text-right w-full font-black font-leaguespartan leading-[1] mb-0">
      &copy; Nicholas Pfeffer
    </p>
  </motion.div>
);

export const HeaderLinks = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
    hover: { scale: 2 },
  };

  return (
    <div className="w-full">
      <motion.ul
        variants={container}
        initial="hidden"
        animate="show"
        className="flex w-full justify-evenly items-center gap-8 text-start"
      >
        <motion.li variants={item}>
          <a
            href="https://github.com/ninjanwp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex text-start items-center justify-center"
          >
            <ZoopText IconComponent={<SiGithub />}>GITHUB</ZoopText>
          </a>
        </motion.li>
        <motion.li variants={item}>
          <a
            href="https://bitbucket.org/np22i/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex text-start items-center gap-2 text-zinc-400 hover:text-zinc-100"
          >
            <ZoopText IconComponent={<SiBitbucket />}>BITBUCKET</ZoopText>
          </a>
        </motion.li>
        <motion.li variants={item}>
          <a
            href="https://www.linkedin.com/in/nicholas-pfeffer-51713434a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100"
          >
            <ZoopText IconComponent={<SiLinkedin />}>LINKEDIN</ZoopText>
          </a>
        </motion.li>
        <motion.li variants={item}>
          <button
            onClick={() => {
              document.getElementById("projects")?.scrollIntoView({
                behavior: "smooth",
              });
            }}
            className="flex items-center gap-2 text-zinc-400 hover:text-zinc-100"
          >
            <ZoopText IconComponent={<FiCode />}>PROJECTS</ZoopText>
          </button>
        </motion.li>
      </motion.ul>
    </div>
  );
};

// export const Header = () => {
//   return (
//     <section className="py-9 h-screen w-full text-white flex justify-center items-center">
//       <div className="w-full">
//         <HeaderTitle />
//         <HeaderSubtitle />
//         <HeaderLinks />
//       </div>
//     </section>
//   );
// };
