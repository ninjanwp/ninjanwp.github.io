import { motion } from "framer-motion";

interface SubheadingDividerProps {
  title: string;
}

const SubheadingDivider = ({ title }: SubheadingDividerProps) => {
  return (
    <div className="flex bg-gradient-to-r from-red-400/20 to-red-400/0 rounded-full flex-col w-full gap-1 items-start justify-center mb-8 p-1">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-xl font-bold text-white bg-red-400 px-4 py-1 rounded-full text-nowrap font-leaguespartan"
      >
        {title}
      </motion.h3>
    </div>
  );
};

export default SubheadingDivider;
