import { motion } from "framer-motion";

interface SubheadingDividerProps {
  title: string;
}

const SubheadingDivider = ({ title }: SubheadingDividerProps) => {
  return (
    <div className="mb-4 py-1 tracking-wide w-full text-center">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-lg font-bold text-white/60 leading-none text-nowrap flex items-center"
      >
        {title}
        
      </motion.h3>
    </div>
  );
};

export default SubheadingDivider;
