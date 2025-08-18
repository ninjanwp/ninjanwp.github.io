import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StyledButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  isActive?: boolean;
}

const StyledButton = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  isActive = false,
}: StyledButtonProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2",
    lg: "px-6 py-3 text-lg",
  };

  const variantClasses = {
    primary: "bg-background border border-accent/10 backdrop-blur",
    secondary: "bg-accent/10 border border-accent/20",
  };

  return (
    <motion.button
      onClick={onClick}
      className={`
        relative ${sizeClasses[size]} ${variantClasses[variant]} 
        font-extralight font-mono tracking-widest text-white rounded-lg 
        flex items-center justify-center group overflow-hidden
        transition-all duration-200 hover:ring-2 hover:ring-rose-500
        ${className}
      `}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Left bracket */}
      <span className={`transition-all duration-200 ${
        isActive 
          ? 'opacity-100 translate-x-0 text-rose-500' 
          : 'opacity-0 group-hover:opacity-50 -translate-x-3 group-hover:translate-x-0'
      }`}>
        [
      </span>
      
      {/* Content */}
      <span className={`mx-1 transition-all duration-200 ${
        isActive 
          ? 'opacity-100 text-white' 
          : 'opacity-70 group-hover:opacity-100'
      }`}>
        {children}
      </span>
      
      {/* Right bracket */}
      <span className={`transition-all duration-200 ${
        isActive 
          ? 'opacity-100 translate-x-0 text-rose-500' 
          : 'opacity-0 group-hover:opacity-50 translate-x-3 group-hover:translate-x-0'
      }`}>
        ]
      </span>

      {/* Hover background effect */}
      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.button>
  );
};

export default StyledButton;
