"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SparklesProps {
  className?: string;
  size?: number;
  density?: number;
  speed?: number;
  color?: string;
  background?: string;
  [key: string]: any;
}

/**
 * Pure canvas-based sparkles effect — no @tsparticles dependency needed.
 * Renders animated particles on a canvas element.
 */
export function Sparkles({
  className,
  size = 1,
  density = 800,
  speed = 1,
  color = "#FFFFFF",
  background = "transparent",
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    canvas.width = width;
    canvas.height = height;

    // Clamp density to a reasonable count
    const count = Math.min(Math.floor((width * height * density) / 500000), 600);

    // Parse hex color to rgb
    const hex = color.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16) || 255;
    const g = parseInt(hex.substring(2, 4), 16) || 255;
    const b = parseInt(hex.substring(4, 6), 16) || 255;

    type Particle = {
      x: number;
      y: number;
      radius: number;
      opacity: number;
      opacityDelta: number;
      speedX: number;
      speedY: number;
    };

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * size + 0.5,
      opacity: Math.random(),
      opacityDelta: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      speedX: (Math.random() - 0.5) * speed * 0.3,
      speedY: (Math.random() - 0.5) * speed * 0.3,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      if (background !== "transparent") {
        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);
      }

      for (const p of particles) {
        // Update
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.opacityDelta;

        if (p.opacity <= 0 || p.opacity >= 1) p.opacityDelta *= -1;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Draw
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${Math.max(0, Math.min(1, p.opacity))})`;
        ctx.fill();
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    const onResize = () => {
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [size, density, speed, color, background]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full", className)}
      style={{ background: "transparent" }}
    />
  );
}
