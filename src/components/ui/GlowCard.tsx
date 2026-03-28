"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { ReactNode } from "react";

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  delay?: number;
  hover?: boolean;
}

export default function GlowCard({
  children,
  className,
  glowColor = "rgba(0,212,255,0.1)",
  delay = 0,
  hover = true,
}: GlowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay }}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: `0 20px 60px ${glowColor}, 0 0 0 1px ${glowColor}`,
            }
          : undefined
      }
      className={clsx(
        "relative rounded-2xl border border-border-subtle bg-bg-card p-6 transition-all duration-300",
        className
      )}
    >
      {/* Subtle top edge glow */}
      <div
        className="absolute top-0 left-6 right-6 h-px rounded-full opacity-60"
        style={{
          background: `linear-gradient(to right, transparent, ${glowColor.replace("0.1", "0.6")}, transparent)`,
        }}
      />
      {children}
    </motion.div>
  );
}
