import { motion } from "framer-motion";
import { useState, useRef, Dispatch, SetStateAction, ReactNode } from "react";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

interface ButtonGroupItem {
  id: string;
  icon: ReactNode;
  href?: string;
  label: string;
  onClick?: () => void;
}

interface ButtonGroupProps {
  items: ButtonGroupItem[];
  className?: string;
}

const ButtonGroup = ({ items, className = "" }: ButtonGroupProps) => {
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <div className={`relative ${className}`}>
      <div 
        onMouseLeave={() => {
          setPosition((pv) => ({
            ...pv,
            opacity: 0,
          }));
        }}
        className="relative bg-background border border-accent/10 backdrop-blur rounded-lg flex items-center gap-3 p-1"
      >
        {items.map((item, index) => (
          <ButtonGroupItem
            key={item.id}
            item={item}
            index={index}
            setPosition={setPosition}
          />
        ))}
        
        <BracketCursor position={position} />
      </div>
    </div>
  );
};

const ButtonGroupItem = ({
  item,
  index,
  setPosition,
}: {
  item: ButtonGroupItem;
  index: number;
  setPosition: Dispatch<SetStateAction<Position>>;
}) => {
  const ref = useRef<null | HTMLButtonElement | HTMLAnchorElement>(null);

  const handleMouseEnter = () => {
    if (!ref?.current) return;

    const { width } = ref.current.getBoundingClientRect();

    setPosition({
      left: ref.current.offsetLeft,
      width,
      opacity: 1,
    });
  };

  const commonProps = {
    ref: ref as any,
    onMouseEnter: handleMouseEnter,
    className: "relative z-10 px-3 py-2 font-extralight font-mono tracking-widest text-white rounded-lg mix-blend-difference flex items-center justify-center group",
    title: item.label,
  };

  const content = (
    <span className="text-xl transition-all duration-200">
      {item.icon}
    </span>
  );

  if (item.href) {
    return (
      <motion.a
        {...commonProps}
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      {...commonProps}
      onClick={item.onClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
    >
      {content}
    </motion.button>
  );
};

const BracketCursor = ({ position }: { position: Position }) => {
  return (
    <>
      {/* Left bracket */}
      <motion.div
        animate={{
          x: position.left - 8,
          opacity: position.opacity,
        }}
        className="absolute z-20 h-[38px] flex items-center justify-center text-rose-500 font-mono text-xl font-extralight"
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 35,
          duration: 0.2,
        }}
      >
        [
      </motion.div>
      
      {/* Right bracket */}
      <motion.div
        animate={{
          x: position.left + position.width - 8,
          opacity: position.opacity,
        }}
        className="absolute z-20 h-[38px] flex items-center justify-center text-rose-500 font-mono text-xl font-extralight"
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 35,
          duration: 0.2,
        }}
      >
        ]
      </motion.div>
    </>
  );
};

export default ButtonGroup;
