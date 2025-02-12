interface GradientTextProps {
  children: string;
  className?: string;
}

export const GradientText = ({
  children,
  className = "",
}: GradientTextProps) => {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="absolute top-0 left-0 bg-gradient-to-r from-purple-400 via-purple-600 to-purple-400 text-transparent bg-clip-text blur-[20px] select-none">
        {children}
      </span>
      <span className="relative bg-gradient-to-r from-purple-300 via-purple-400 to-purple-300 text-transparent bg-clip-text">
        {children}
      </span>
    </span>
  );
};
