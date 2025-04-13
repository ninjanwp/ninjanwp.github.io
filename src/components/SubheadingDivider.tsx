import { motion } from "framer-motion";
import { DiCode } from "react-icons/di";
import { FiTool, FiCode, FiLayers, FiDatabase, FiMonitor, FiUser, FiBookOpen, FiBook } from "react-icons/fi";

interface SubheadingDividerProps {
  title: string;
}

const SubheadingDivider = ({ title }: SubheadingDividerProps) => {
  // Function to get the appropriate icon based on title
  const getIconForTitle = (title: string) => {
    switch (title.toLowerCase()) {
      case "personal":
        return <FiUser className="mr-2" />;
      case "academic":
        return <FiBook className="mr-2" />;
      case "frontend":
        return <FiMonitor className="mr-2" />;
      case "backend":
        return <FiDatabase className="mr-2" />;
      case "tools":
        return <FiTool className="mr-2" />;
      case "skills":
        return <FiLayers className="mr-2" />;
      default:
        return <DiCode className="mr-2" />;
    }
  };

  return (
    <div className="mb-1 w-full">
      <motion.h3
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-lg font-light text-white/60 leading-none text-nowrap flex items-center"
      >
        {getIconForTitle(title)}
        {title}
      </motion.h3>
    </div>
  );
};

export default SubheadingDivider;
