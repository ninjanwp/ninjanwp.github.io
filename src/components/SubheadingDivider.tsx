import { motion } from "framer-motion";
import { HiFolder } from "react-icons/hi";

interface SubheadingDividerProps {
  title: string;
}

const SubheadingDivider = ({ title }: SubheadingDividerProps) => {
  return (
    <div className="mb-8 py-4 border-b border-white/20">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-2xl font-bold text-white/70 leading-none text-nowrap flex items-center"
      >
        <HiFolder className="inline mr-2"/>
        {title}
        
      </motion.h3>
    </div>
  );
};

export default SubheadingDivider;
