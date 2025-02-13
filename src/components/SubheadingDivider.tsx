import { motion } from "framer-motion";

interface SubheadingDividerProps {
  title: string;
}

const SubheadingDivider = ({ title }: SubheadingDividerProps) => {
  return (
    <div className="flex w-full gap-3 items-center mb-8">
      <motion.h3
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-lg font-bold uppercase text-stone-700 text-nowrap font-leaguespartan"
      >
        {title}
      </motion.h3>
      <div className="w-full h-[2px] bg-stone-700" />
    </div>
  );
};

export default SubheadingDivider;
