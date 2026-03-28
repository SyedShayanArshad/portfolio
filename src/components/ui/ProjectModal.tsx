"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Github, ExternalLink, Tag, ChevronRight,
  CheckCircle2, Layers, Zap,
} from "lucide-react";
import type { Project } from "@/data/portfolio";

interface Props {
  project: Project | null;
  onClose: () => void;
}

// Staggered positions for floating tech chips in preview area
const CHIP_SLOTS = [
  { top: "18%", left: "6%"  },
  { top: "55%", left: "12%" },
  { top: "28%", left: "38%" },
  { top: "65%", left: "45%" },
  { top: "20%", left: "66%" },
  { top: "52%", left: "72%" },
];

export default function ProjectModal({ project, onClose }: Props) {
  // Lock body scroll while open
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        // Backdrop
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[60] bg-bg-secondary/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 lg:p-10"
          onClick={onClose}
        >
          {/* Panel — width/height constrained, never overflows viewport */}
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[88vh] rounded-2xl border border-border-subtle bg-bg-primary shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            {/* ── Preview area ──────────────────────────────── */}
            <div
              className="relative flex-shrink-0 h-52 sm:h-64 overflow-hidden"
              style={{
                background: `linear-gradient(140deg, ${project.accent}1a 0%, ${project.accent}06 55%, var(--bg-primary) 100%)`,
              }}
            >
              {/* Dot grid */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `radial-gradient(circle, ${project.accent}30 1px, transparent 1px)`,
                  backgroundSize: "26px 26px",
                  opacity: 0.5,
                }}
              />

              {/* Glow orb */}
              <div
                className="absolute -top-16 right-0 w-80 h-80 rounded-full blur-3xl"
                style={{ background: project.accent, opacity: 0.1 }}
              />

              {/* Floating tech chips */}
              {project.tech.slice(0, 6).map((t, i) => (
                <motion.span
                  key={t}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 0.8, scale: 1 }}
                  transition={{ delay: 0.06 + i * 0.07, duration: 0.3, ease: "easeOut" }}
                  className="absolute text-[10px] font-mono px-2.5 py-1 rounded-lg border pointer-events-none select-none"
                  style={{
                    color: project.accent,
                    borderColor: `${project.accent}35`,
                    background: `${project.accent}0e`,
                    backdropFilter: "blur(6px)",
                    top: CHIP_SLOTS[i]?.top,
                    left: CHIP_SLOTS[i]?.left,
                  }}
                >
                  {t}
                </motion.span>
              ))}

              {/* Browser-chrome dots */}
              <div className="absolute top-4 left-5 flex items-center gap-1.5">
                {(["#ff5f57", "#febc2e", "#28c840"] as const).map((c) => (
                  <div key={c} className="w-2.5 h-2.5 rounded-full opacity-75" style={{ background: c }} />
                ))}
              </div>

              {/* Accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{ background: `linear-gradient(to right, ${project.accent}, ${project.accent}00)` }}
              />

              {/* Title block */}
              <div className="absolute bottom-5 left-6 right-16">
                <span
                  className="inline-flex items-center gap-1.5 text-[11px] font-mono mb-2"
                  style={{ color: project.accent }}
                >
                  <Tag size={9} />
                  {project.categoryLabel}
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-text-primary leading-tight">
                  {project.title}
                </h2>
              </div>

              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-3.5 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-white/10 transition-all"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* ── Scrollable content ──────────────────────────── */}
            <div className="flex-1 overflow-y-auto overscroll-contain p-6 sm:p-8 flex flex-col gap-6">
              {/* Description */}
              <p className="text-text-muted text-sm leading-relaxed">
                {project.description}
              </p>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle bg-bg-card text-text-primary text-sm font-medium hover:border-neon-cyan/40 hover:text-neon-cyan transition-all"
                  >
                    <Github size={14} />
                    View Source
                  </a>
                ) : (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle bg-bg-card text-text-muted text-sm select-none">
                    <Github size={14} />
                    Source on Request
                  </span>
                )}
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-bg-primary text-sm font-semibold hover:opacity-90 transition-opacity"
                    style={{
                      background: `linear-gradient(135deg, ${project.accent}, ${project.accent}aa)`,
                      boxShadow: `0 0 16px ${project.accent}30`,
                    }}
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
                {project.deployment && (
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle text-text-muted text-xs font-mono">
                    {project.deployment}
                  </span>
                )}
              </div>

              <div className="h-px bg-border-subtle" />

              {/* Two-col layout */}
              <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Left — features + outcomes */}
                <div className="md:col-span-3 flex flex-col gap-8">
                  {/* Key Features */}
                  <div>
                    <div className="flex items-center gap-2 mb-5">
                      <Zap size={13} style={{ color: project.accent }} />
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                        Key Features
                      </span>
                    </div>
                    <ul className="flex flex-col gap-4">
                      {project.highlights.map((h, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 text-[10px] font-bold font-mono mt-px"
                            style={{
                              background: `${project.accent}15`,
                              color: project.accent,
                              border: `1px solid ${project.accent}28`,
                            }}
                          >
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <p className="text-text-primary text-sm leading-relaxed pt-0.5">{h}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcomes */}
                  {project.outcomes && project.outcomes.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-5">
                        <CheckCircle2 size={13} style={{ color: project.accent }} />
                        <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                          Outcomes
                        </span>
                      </div>
                      <ul className="flex flex-col gap-3">
                        {project.outcomes.map((o, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-text-muted leading-relaxed">
                            <ChevronRight
                              size={13}
                              className="flex-shrink-0 mt-0.5"
                              style={{ color: project.accent }}
                            />
                            {o}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Right — tech + meta */}
                <div className="md:col-span-2 flex flex-col gap-4">
                  {/* Tech stack */}
                  <div className="rounded-xl border border-border-subtle bg-bg-card p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <Layers size={13} className="text-text-muted" />
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                        Stack
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="text-xs px-2.5 py-1 rounded-lg bg-bg-secondary text-text-muted font-mono border border-border-subtle"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Metadata */}
                  <div className="rounded-xl border border-border-subtle bg-bg-card p-5 flex flex-col gap-4 text-sm">
                    <div>
                      <p className="text-[10px] text-text-muted font-mono mb-1.5">CATEGORY</p>
                      <p className="font-semibold" style={{ color: project.accent }}>
                        {project.categoryLabel}
                      </p>
                    </div>
                    {project.deployment && (
                      <div>
                        <p className="text-[10px] text-text-muted font-mono mb-1.5">DEPLOYMENT</p>
                        <p className="text-text-primary">{project.deployment}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-[10px] text-text-muted font-mono mb-1.5">TECHNOLOGIES</p>
                      <p className="text-text-primary">{project.tech.length} in stack</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-text-muted font-mono mb-1.5">STATUS</p>
                      <div className="flex items-center gap-2">
                        <span
                          className="w-1.5 h-1.5 rounded-full animate-pulse"
                          style={{ background: project.accent }}
                        />
                        <p className="text-text-primary">Completed</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
