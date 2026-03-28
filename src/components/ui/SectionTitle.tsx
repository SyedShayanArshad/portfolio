"use client";

import { motion } from "framer-motion";
import clsx from "clsx";

interface SectionTitleProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  accent?: "cyan" | "purple";
}

export default function SectionTitle({
  label,
  title,
  subtitle,
  align = "center",
  accent = "cyan",
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6 }}
      className={clsx(
        "flex flex-col gap-3 mb-14",
        align === "center" && "items-center text-center",
        align === "left" && "items-start text-left"
      )}
    >
      <span
        className={clsx(
          "font-mono text-xs font-semibold tracking-widest uppercase px-3 py-1 rounded-full border",
          accent === "cyan"
            ? "text-neon-cyan border-neon-cyan/30 bg-neon-cyan/5"
            : "text-neon-purple border-neon-purple/30 bg-neon-purple/5"
        )}
      >
        {label}
      </span>
      <h2 className="text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-muted max-w-xl text-base leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={clsx(
          "h-px w-20 rounded-full mt-1",
          accent === "cyan"
            ? "bg-gradient-to-r from-neon-cyan to-transparent"
            : "bg-gradient-to-r from-neon-purple to-transparent",
          align === "center" && "mx-auto"
        )}
      />
    </motion.div>
  );
}
