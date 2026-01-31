import { useEffect, useState } from "react";

// Countdown to February 15, 2026
const COUNTDOWN_FROM = "2026-02-15T00:00:00";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type TimeUnit = "Day" | "Hour" | "Minute" | "Second";

interface CountdownItemProps {
  unit: TimeUnit;
  label: string;
}

function getTimeValue(unit: TimeUnit, distance: number): number {
  switch (unit) {
    case "Day":
      return Math.max(0, Math.floor(distance / DAY));
    case "Hour":
      return Math.max(0, Math.floor((distance % DAY) / HOUR));
    case "Minute":
      return Math.max(0, Math.floor((distance % HOUR) / MINUTE));
    default:
      return Math.max(0, Math.floor((distance % MINUTE) / SECOND));
  }
}

function getInitialTime(unit: TimeUnit): number {
  const end = new Date(COUNTDOWN_FROM);
  const now = new Date();
  const distance = end.getTime() - now.getTime();
  return getTimeValue(unit, distance);
}

export default function ShiftingCountdown() {
  return (
    <div className="flex w-full items-center bg-transparent">
      <CountdownItem unit="Day" label="Days" />
      <CountdownItem unit="Hour" label="Hours" />
      <CountdownItem unit="Minute" label="Minutes" />
      <CountdownItem unit="Second" label="Seconds" />
    </div>
  );
}

function CountdownItem({ unit, label }: CountdownItemProps) {
  const [time, setTime] = useState<number>(() => getInitialTime(unit));

  useEffect(() => {
    const interval = setInterval(() => {
      const end = new Date(COUNTDOWN_FROM);
      const now = new Date();
      const distance = end.getTime() - now.getTime();
      setTime(getTimeValue(unit, distance));
    }, 1000);

    return () => clearInterval(interval);
  }, [unit]);

  // Format display - pad with zeros
  const display =
    unit === "Second" || unit === "Minute" || unit === "Hour"
      ? String(time).padStart(2, "0")
      : time;

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-1 px-2 py-4 md:gap-2 md:px-4 md:py-6">
      <div className="relative w-full overflow-hidden text-center">
        <span className="block text-2xl font-mono font-semibold text-foreground md:text-4xl lg:text-5xl transition-all duration-300">
          {display}
        </span>
      </div>
      <span className="text-xs font-light text-muted-foreground md:text-sm lg:text-base">
        {label}
      </span>
    </div>
  );
}
