import { cn } from "@/lib/utils";

interface DynamicLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function DynamicLogo({ className, size = 'md' }: DynamicLogoProps) {
  const sizeClasses = {
    sm: "text-3xl",
    md: "text-5xl",
    lg: "text-7xl",
  };

  return (
    <div
      className={cn(
        "font-mono font-bold text-primary select-none",
        "animate-spin-y [animation-duration:10s]", // Slower spin
        sizeClasses[size],
        className
      )}
      style={{ textShadow: "0 0 8px hsl(var(--primary) / 0.5)" }}
    >
      DD
    </div>
  );
}
