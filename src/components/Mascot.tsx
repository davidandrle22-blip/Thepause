"use client";

import { motion } from "framer-motion";

interface MascotProps {
  message?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Mascot({ message, size = "md", className = "" }: MascotProps) {
  const sizes = {
    sm: { width: 60, height: 72 },
    md: { width: 90, height: 108 },
    lg: { width: 130, height: 156 },
  };

  const { width, height } = sizes[size];

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative bg-white rounded-2xl px-4 py-2 shadow-lg border border-teal-200 max-w-xs text-center"
        >
          <p className="text-sm text-navy-800 font-medium">{message}</p>
          {/* Speech bubble triangle */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />
        </motion.div>
      )}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width={width}
          height={height}
          viewBox="0 0 90 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Water drop body */}
          <defs>
            <linearGradient id="dropGradient" x1="45" y1="0" x2="45" y2="108" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#5eead4" />
              <stop offset="50%" stopColor="#14b8a6" />
              <stop offset="100%" stopColor="#0d9488" />
            </linearGradient>
            <linearGradient id="shineGradient" x1="30" y1="20" x2="60" y2="80" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="white" stopOpacity="0.4" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Drop shape */}
          <path
            d="M45 4C45 4 10 52 10 72C10 92 25 104 45 104C65 104 80 92 80 72C80 52 45 4 45 4Z"
            fill="url(#dropGradient)"
            stroke="#0f766e"
            strokeWidth="2"
          />

          {/* Shine highlight */}
          <path
            d="M35 30C35 30 20 58 20 72C20 82 28 88 35 88"
            fill="none"
            stroke="url(#shineGradient)"
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Left eye */}
          <ellipse cx="33" cy="66" rx="6" ry="7" fill="white" />
          <motion.ellipse
            cx="34"
            cy="67"
            rx="3.5"
            ry="4"
            fill="#0f172a"
            animate={{ cy: [67, 65, 67] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="36" cy="64" r="1.5" fill="white" />

          {/* Right eye */}
          <ellipse cx="57" cy="66" rx="6" ry="7" fill="white" />
          <motion.ellipse
            cx="58"
            cy="67"
            rx="3.5"
            ry="4"
            fill="#0f172a"
            animate={{ cy: [67, 65, 67] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <circle cx="60" cy="64" r="1.5" fill="white" />

          {/* Smile */}
          <path
            d="M36 80C36 80 41 87 45 87C49 87 54 80 54 80"
            fill="none"
            stroke="#0f172a"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Rosy cheeks */}
          <ellipse cx="25" cy="78" rx="5" ry="3" fill="#f9a8d4" opacity="0.5" />
          <ellipse cx="65" cy="78" rx="5" ry="3" fill="#f9a8d4" opacity="0.5" />
        </svg>
      </motion.div>
    </div>
  );
}
