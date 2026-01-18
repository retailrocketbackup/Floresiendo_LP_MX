"use client";

import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: Date;
  variant?: "light" | "dark";
  size?: "xs" | "sm" | "md" | "lg";
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({
  targetDate,
  variant = "dark",
  size = "md",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        };
      }

      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    setTimeLeft(calculateTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!mounted) {
    return null;
  }

  const sizeClasses = {
    xs: {
      container: "gap-1",
      box: "w-10 h-10",
      number: "text-sm",
      label: "text-[7px]",
    },
    sm: {
      container: "gap-2",
      box: "w-12 h-12 sm:w-14 sm:h-14",
      number: "text-lg sm:text-xl",
      label: "text-[8px] sm:text-[10px]",
    },
    md: {
      container: "gap-2 sm:gap-3",
      box: "w-14 h-14 sm:w-16 sm:h-16",
      number: "text-xl sm:text-2xl",
      label: "text-[9px] sm:text-xs",
    },
    lg: {
      container: "gap-3 sm:gap-4",
      box: "w-16 h-16 sm:w-20 sm:h-20",
      number: "text-2xl sm:text-3xl",
      label: "text-[10px] sm:text-xs",
    },
  };

  const variantClasses = {
    light: {
      box: "bg-white/20 backdrop-blur-sm border border-white/30",
      number: "text-white",
      label: "text-white/80",
    },
    dark: {
      box: "bg-burgundy/10 border border-burgundy/20",
      number: "text-burgundy",
      label: "text-warm-gray-600",
    },
  };

  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Min" },
    { value: timeLeft.seconds, label: "Seg" },
  ];

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size].container}`}>
      {timeUnits.map((unit, index) => (
        <div key={unit.label} className="flex items-center">
          <div
            className={`${sizeClasses[size].box} ${variantClasses[variant].box} rounded-xl flex flex-col items-center justify-center`}
          >
            <span
              className={`${sizeClasses[size].number} ${variantClasses[variant].number} font-bold tabular-nums`}
            >
              {String(unit.value).padStart(2, "0")}
            </span>
            <span
              className={`${sizeClasses[size].label} ${variantClasses[variant].label} uppercase tracking-wider font-medium`}
            >
              {unit.label}
            </span>
          </div>
          {index < timeUnits.length - 1 && (
            <span
              className={`${variantClasses[variant].number} opacity-50 mx-1 text-lg font-bold`}
            >
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
