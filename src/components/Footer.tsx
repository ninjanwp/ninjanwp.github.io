import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-[#27292E] border-t border-green-200"
    >

        <motion.div 
          className="py-9"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-center text-white">
            © {currentYear} Nicholas Pfeffer.
          </p> <br />
          <p className="text-center text-white/70 text-sm">
            Built with React, TypeScript, and Tailwind CSS.
          </p>
        </motion.div>
    </footer>
  );
};

export default Footer;
