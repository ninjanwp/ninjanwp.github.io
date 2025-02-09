import { SiBitbucket, SiGithub, SiLinkedin } from "react-icons/si";
import { FiCode } from "react-icons/fi";
import { motion } from "framer-motion";
import ZoopText from "./ZoopText";

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
    <p className="text-[4vw] uppercase text-transparent text-right w-full font-black font-leaguespartan leading-[1] mb-0" style={{ WebkitTextStroke: '2px #ff3333' }}>
      Nicholas Pfeffer
    </p>
  </motion.div>
);

export const HeaderLinks = () => {
  return (
    <nav className="flex w-full justify-evenly items-center gap-x-2 text-start transition-all duration-300">
      {[
        { icon: <SiGithub />, text: "GITHUB", href: "https://github.com/ninjanwp" },
        { icon: <SiBitbucket />, text: "BITBUCKET", href: "https://bitbucket.org/np22i/" },
        { icon: <SiLinkedin />, text: "LINKEDIN", href: "https://www.linkedin.com/in/nicholas-pfeffer-51713434a/" },
        { icon: <FiCode />, text: "PROJECTS", href: "#projects" },
      ].map(({ icon, text, href }) => (
        <a
          className="cursor-none"
          key={text}
          href={href}
          target={href.startsWith('http') ? "_blank" : undefined}
          rel={href.startsWith('http') ? "noopener noreferrer" : undefined}
        >
          <ZoopText IconComponent={icon}>{text}</ZoopText>
        </a>
      ))}
    </nav>
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
