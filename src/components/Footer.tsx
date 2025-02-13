import { motion } from "framer-motion";
import { SiGithub, SiLinkedin } from "react-icons/si";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="w-full bg-stone-950"
      //   initial={{ opacity: 0, y: "50%" }}
      //   whileInView={{ opacity: 1, y: 0 }}
      //   viewport={{ once: true }}
      //   transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-8 py-24">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4">
            <h3 className="text-4xl font-bold text-stone-100">Let's Connect</h3>
            <p className="text-stone-400 text-lg">
              Here's how you can reach me. Feel free to send me an email or
              connect with me on social media.
            </p>
          </div>

          <div className="flex gap-6">
            <a
              href="https://github.com/ninjanwp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-stone-300 hover:text-stone-100 transition-colors"
            >
              <SiGithub />
            </a>
            <a
              href="https://www.linkedin.com/in/nicholas-pfeffer-51713434a/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-3xl text-stone-300 hover:text-stone-100 transition-colors"
            >
              <SiLinkedin />
            </a>
            <a
              href="mailto:np22i@fsu.edu"
              className="text-3xl text-stone-300 hover:text-stone-100 transition-colors"
            >
              <HiMail />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-stone-300">
          <p className="text-center text-stone-400">
            © {currentYear} Nicholas Pfeffer. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
