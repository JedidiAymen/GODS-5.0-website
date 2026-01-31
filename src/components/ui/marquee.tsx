"use client";

import { cn } from "@/lib/utils";

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean;
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean;
  /**
   * Whether to apply a vertical orientation
   * @default false
   */
  vertical?: boolean;
  /**
   * Number of times to repeat the children
   * @default 4
   */
  repeat?: number;
  /**
   * Duration of one complete animation cycle in seconds
   * @default 40
   */
  duration?: number;
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  repeat = 4,
  duration = 40,
  children,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--gap:1rem] [gap:var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
      style={
        {
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              vertical ? "flex-col animate-marquee-vertical" : "flex-row animate-marquee",
              pauseOnHover && "group-hover:[animation-play-state:paused]",
              reverse && "direction-reverse"
            )}
            style={{
              animationDirection: reverse ? "reverse" : "normal",
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
}
