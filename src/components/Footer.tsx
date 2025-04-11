import { motion } from "framer-motion";
import { RiRssFill } from "react-icons/ri";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-background rounded-t-3xl"
    >
        <motion.div 
          className="py-9"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-center text-white">
            © {currentYear} Nicholas Pfeffer.
          </p> <br />
          <p className="text-center text-white/70 text-sm flex items-center justify-center gap-1">
            Built with React, TypeScript, and Tailwind CSS.
            <a 
              href="/feed/rss.xml" 
              target="_blank" 
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center text-accent"
              title="Subscribe to RSS feed"
            >
              <RiRssFill className="w-4 h-4" />
              <span className="ml-1">RSS</span>
            </a>
          </p>
        </motion.div>
    </footer>
  );
};

export default Footer;
