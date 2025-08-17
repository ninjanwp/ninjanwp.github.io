import { motion, useInView } from "framer-motion";
import { useEffect, useState, useRef } from "react";

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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

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
    hidden: {},
    visible: {
      transition: { 
        staggerChildren: 0.01,
        delayChildren: 0.1,
      },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
    hidden: {
      opacity: 0,
    },
  };

  return (
    <div
      className={`flex flex-col gap-3 mb-12 w-full ${
        align === "center" ? "items-center text-center" : ""
      }`}
    >
      <div className="relative">
        <motion.h1 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl md:text-6xl w-fit font-mono uppercase font-extralight text-white tracking-loose">
          {title}
        </motion.h1>
      </div>

      <motion.div
        ref={ref}
        variants={container}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="overflow-hidden"
      >
        <div className="flex flex-wrap text-base md:text-lg lg:text-xl text-muted max-w-3xl leading-relaxed tracking-tight">
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
    </div>
  );
};

export default SectionHeader;
