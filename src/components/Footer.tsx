import { motion } from "framer-motion";
import { RiGithubFill, RiLinkedinFill } from "react-icons/ri";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      className="w-full bg-stone-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-3xl md:text-4xl font-serif font-semibold text-stone-800 tracking-wide">Let's Connect</h3>
            <p className="text-stone-700 text-base md:text-lg font-serif leading-relaxed max-w-2xl">
              Here's how you can reach me. Feel free to send me an email or
              connect with me on social media.
            </p>
          </motion.div>

          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {[
              { icon: <RiGithubFill />, href: "https://github.com/ninjanwp" },
              { icon: <RiLinkedinFill />, href: "https://www.linkedin.com/in/nicholas-pfeffer-51713434a/" },
              { icon: <HiMail />, href: "mailto:np22i@fsu.edu" }
            ].map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="flex items-center justify-center p-3 rounded-full bg-red-400 text-white text-2xl transition-all duration-300 hover:bg-red-500 shadow-md"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div 
          className="mt-12 pt-6 border-t border-stone-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="text-center text-stone-600 font-serif">
            © {currentYear} Nicholas Pfeffer. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
