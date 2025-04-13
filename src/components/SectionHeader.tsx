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
      initial={{ opacity: 0, y: 5 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex flex-col gap-3 mb-12 mt-32 w-full ${
        align === "center" ? "items-center text-center" : ""
      }`}
    >
      <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter">
        {title}
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 5 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-base md:text-lg lg:text-xl text-white/50 max-w-3xl leading-relaxed tracking-tight"
      >
        {label}
      </motion.p>
    </motion.div>
  );
};

export default SectionHeader;
