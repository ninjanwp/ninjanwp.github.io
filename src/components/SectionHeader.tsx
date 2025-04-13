import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  const [words, setWords] = useState<{ chars: string[], isSpace: boolean }[]>([]);

  useEffect(() => {
    // Split the label into words, then characters within words
    const wordArray = label.split(/(\s+)/).filter(Boolean);
    const wordsWithChars = wordArray.map(word => ({
      chars: word.split(''),
      isSpace: /^\s+$/.test(word)
    }));
    
    setWords(wordsWithChars);
  }, [label]);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.005,
        delayChildren: 0.1,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        type: "tween",
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`flex flex-col gap-3 mb-12 w-full ${
        align === "center" ? "items-center text-center" : ""
      }`}
    >
      <div className="relative">
        <h1 className="text-4xl md:text-6xl w-fit font-bold text-white tracking-tighter">
          {title}
        </h1>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="overflow-hidden"
      >
        <div className="flex flex-wrap text-base md:text-lg lg:text-xl text-white/50 max-w-3xl leading-relaxed tracking-tight">
          {words.map((word, wordIndex) => (
            <div 
              key={`word-${wordIndex}`} 
              className="inline-flex"
              style={{ 
                whiteSpace: word.isSpace ? 'pre' : 'normal',
              }}
            >
              {word.chars.map((char, charIndex) => (
                <motion.span
                  key={`char-${wordIndex}-${charIndex}`}
                  variants={child}
                  style={{ 
                    display: 'inline-block',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SectionHeader;
