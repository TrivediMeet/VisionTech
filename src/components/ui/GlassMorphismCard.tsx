
import { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface GlassMorphismCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  style?: CSSProperties;
  onClick?: () => void;
}

export const GlassMorphismCard = ({
  children,
  className,
  hoverEffect = false,
  style,
  onClick,
}: GlassMorphismCardProps) => {
  return (
    <div
      style={style}
      className={cn(
        "relative rounded-xl bg-white/70 p-6 backdrop-blur-md border border-white/20 shadow-sm",
        hoverEffect && "transition-all duration-300 hover:shadow-md hover:-translate-y-1",
        className
      )}
      onClick={onClick}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/50 to-transparent opacity-50 pointer-events-none" />
      <div className="relative z-10">{children}</div>
    </div>
  );
};
