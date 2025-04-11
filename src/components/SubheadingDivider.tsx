import { motion } from "framer-motion";

interface SubheadingDividerProps {
  title: string;
}

const SubheadingDivider = ({ title }: SubheadingDividerProps) => {
  return (
    <div className="mb-1 w-full text-center">
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        className="text-lg font-mono text-white/60 leading-none text-nowrap flex justify-center items-center"
      >
        {title}:
        
      </motion.h3>
    </div>
  );
};

export default SubheadingDivider;
