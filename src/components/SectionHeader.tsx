import { motion } from "framer-motion";
import ZoopText, { ZoopVariant } from "./ZoopText";

interface SectionHeaderProps {
  label: string;
  title: string;
  align?: "left" | "center";
}

const SectionHeader = ({
  label,
  title,
  align = "left",
}: SectionHeaderProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex flex-col gap-3 mb-9 ${
        align === "center" ? "items-center text-center" : ""
      }`}
    >
      <h2 className="text-4xl md:text-7xl font-serif font-semibold text-stone-800 tracking-wider">
        <ZoopText variant={ZoopVariant.WHEN_VISIBLE}>{title}</ZoopText>
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base md:text-lg lg:text-xl text-stone-700 max-w-2xl font-serif leading-relaxed"
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;
