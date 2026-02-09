"use client";

import { useEffect, useState, useCallback } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  rotation: number;
  velocityX: number;
  velocityY: number;
  rotationSpeed: number;
}

const COLORS = [
  "#0d9488", // teal-600
  "#14b8a6", // teal-500
  "#f59e0b", // amber-500
  "#3b82f6", // blue-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#10b981", // emerald-500
];

export function Confetti() {
  const [particles, setParticles] = useState<Particle[]>([]);

  const createParticles = useCallback(() => {
    const newParticles: Particle[] = [];
    for (let i = 0; i < 80; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100,
        y: -10 - Math.random() * 20,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 6 + Math.random() * 6,
        rotation: Math.random() * 360,
        velocityX: (Math.random() - 0.5) * 3,
        velocityY: 2 + Math.random() * 3,
        rotationSpeed: (Math.random() - 0.5) * 10,
      });
    }
    setParticles(newParticles);
  }, []);

  useEffect(() => {
    createParticles();
    const timer = setTimeout(() => setParticles([]), 4000);
    return () => clearTimeout(timer);
  }, [createParticles]);

  useEffect(() => {
    if (particles.length === 0) return;
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.velocityX * 0.3,
            y: p.y + p.velocityY * 0.3,
            rotation: p.rotation + p.rotationSpeed,
            velocityY: p.velocityY + 0.05,
          }))
          .filter((p) => p.y < 110)
      );
    }, 30);
    return () => clearInterval(interval);
  }, [particles.length > 0]);

  if (particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            transform: `rotate(${p.rotation}deg)`,
            borderRadius: Math.random() > 0.5 ? "50%" : "2px",
            opacity: p.y > 80 ? (110 - p.y) / 30 : 1,
          }}
        />
      ))}
    </div>
  );
}
