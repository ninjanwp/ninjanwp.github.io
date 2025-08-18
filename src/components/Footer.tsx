import { motion } from "framer-motion";
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full min-h-[60vh] bg-background flex flex-col justify-end">
      <motion.div 
        className="py-24 max-w-3xl mx-auto w-full flex flex-col items-center gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-3xl md:text-4xl font-bold text-white text-center mb-2">Thank you for visiting!</p>
        <p className="text-lg text-white/80 text-center max-w-xl mb-4">
          I appreciate you taking the time to explore my portfolio. If you'd like to connect, collaborate, or just say hello, feel free to reach out below!
        </p>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-4">
          <a
            href="https://github.com/ninjanwp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-accent text-lg transition-colors"
            title="GitHub"
          >
            <RiGithubFill size={28} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/nicholas-pfeffer-51713434a/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-white hover:text-accent text-lg transition-colors"
            title="LinkedIn"
          >
            <RiLinkedinFill size={28} /> LinkedIn
          </a>
          <a
            href="mailto:np22i@fsu.edu"
            className="flex items-center gap-2 text-white hover:text-accent text-lg transition-colors"
            title="Email"
          >
            <HiMail size={28} /> Email
          </a>
        </div>
        <p className="text-center text-white mt-8">
          © {currentYear} Nicholas Pfeffer.
        </p>
        <p className="text-center text-white/70 text-sm flex items-center justify-center gap-1">
          Built with React, TypeScript, and Tailwind CSS - hosted on Ubuntu Server.
          <a 
            href="/feed/rss.xml" 
            target="_blank" 
            rel="noopener noreferrer"
            className="ml-2 inline-flex items-center text-accent"
            title="Subscribe to RSS feed"
          >
            RSS
          </a>
        </p>
      </motion.div>
    </footer>
  );
};

export default Footer;
