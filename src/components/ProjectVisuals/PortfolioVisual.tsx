import { motion } from "framer-motion";

export const PortfolioVisual = () => {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full">
        <motion.img
          src="/images/portfolio.png"
          alt="Portfolio Website"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
    </div>
  );
};
