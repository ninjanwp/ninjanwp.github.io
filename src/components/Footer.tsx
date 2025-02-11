import { motion } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="w-full bg-gradient-to-b from-stone-50 to-purple-50 rounded-t-[30px] mt-24"
      initial={{ opacity: 0, y: "50%" }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-stone-900">Let's Connect</h3>
            <p className="text-stone-500 text-lg">
              Building the future, one line at a time.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-stone-900 hover:text-stone-500 transition-colors"
            >
              <SiGithub />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-stone-900 hover:text-stone-500 transition-colors"
            >
              <SiLinkedin />
            </a>
            <a
              href="mailto:np22i@fsu.edu"
              className="text-3xl text-stone-900 hover:text-stone-500 transition-colors"
            >
              <HiMail />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-200">
          <p className="text-center text-stone-500">
            © {currentYear} Nicholas Pfeffer. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
