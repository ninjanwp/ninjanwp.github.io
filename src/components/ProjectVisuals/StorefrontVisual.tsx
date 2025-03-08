import { motion } from "framer-motion";

export const StorefrontVisual = () => {
  return (
    <div className="w-full h-full">
      <div className="relative w-full h-full">
        {/* <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-stone-900/10 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        /> */}
        <motion.img
          src="/images/storefront.png"
          alt="Retail Storefront"
          className="w-full h-full object-cover opacity-90"
        />
      </div>
    </div>
  );
};
