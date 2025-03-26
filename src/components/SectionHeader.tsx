import { motion } from "framer-motion";

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
      <h2 className="text-4xl md:text-7xl font-bold text-white tracking-wider mb-6">
        {title}
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-base md:text-lg lg:text-xl text-white/75 max-w-3xl leading-relaxed border-l-4 border-green-300 pl-4"
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;
