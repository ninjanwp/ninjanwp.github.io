import { motion } from "framer-motion";

interface BigTextProps {
  className?: string;
}

const BigText = ({ className = "" }: BigTextProps) => {
  return (
    <div className={`flex flex-row items-start justify-center ${className}`}>
      {/* First line: Nick with accent */}
        <motion.span 
          className="text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[16rem] font-regular font-serif text-rose-500 tracking-tighter leading-none"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2}}
        >
        Nick Pfeffer
        </motion.span>
    </div>
  );
};

export default BigText;
