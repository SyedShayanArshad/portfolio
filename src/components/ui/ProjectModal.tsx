"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Github, ExternalLink, Tag, ChevronRight,
  CheckCircle2, Layers, Zap, Calendar, TrendingUp, Award, Sparkles,
} from "lucide-react";
import ImageCarousel from "@/components/ui/ImageCarousel";
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
            className="relative w-full max-w-5xl max-h-[90vh] rounded-3xl border border-border-subtle bg-bg-primary shadow-2xl flex flex-col overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
          >
            {/* ── Ultra Minimal Header (Option 1) ──────────────────── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-card/50 backdrop-blur-sm">
              {/* Left: Category Badge + Title */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <span
                  className="inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 rounded-lg flex-shrink-0"
                  style={{ 
                    color: project.accent,
                    background: `${project.accent}15`,
                    border: `1px solid ${project.accent}30`
                  }}
                >
                  <Tag size={9} />
                  {project.categoryLabel}
                </span>
                <h2 className="text-base sm:text-lg font-bold text-text-primary truncate">
                  {project.title}
                </h2>
                {project.deployment && (
                  <span className="hidden md:inline-flex text-[9px] text-text-muted font-mono px-2 py-0.5 rounded-md bg-bg-secondary border border-border-subtle">
                    {project.deployment}
                  </span>
                )}
              </div>

              {/* Right: Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-text-muted hover:text-text-primary hover:bg-bg-secondary transition-all flex-shrink-0 ml-3"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* ── Scrollable content ──────────────────────────── */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Image Carousel Section */}
              {project.images && project.images.length > 0 && (
                <div className="px-6 sm:px-8 pt-6 sm:pt-8">
                  <ImageCarousel 
                    images={project.images} 
                    alt={project.title}
                    accent={project.accent}
                  />
                </div>
              )}

              {/* Main Content Area */}
              <div className="px-6 sm:px-8 py-6 sm:py-8 flex flex-col gap-8">
                {/* Description Card with Icon */}
                <div className="rounded-2xl border border-border-subtle bg-gradient-to-br from-bg-card to-bg-secondary/30 p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ 
                        background: `${project.accent}15`,
                        border: `1px solid ${project.accent}30`
                      }}
                    >
                      <Sparkles size={18} style={{ color: project.accent }} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-sm font-bold text-text-primary mb-2 uppercase tracking-wide">
                        Project Overview
                      </h3>
                      <p className="text-text-muted text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons - Enhanced */}
                <div className="flex flex-wrap gap-3">
                  {project.github ? (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border-2 border-border-subtle bg-bg-card text-text-primary text-sm font-semibold hover:border-neon-cyan/40 hover:text-neon-cyan hover:shadow-lg transition-all"
                    >
                      <Github size={16} />
                      <span>View Source Code</span>
                    </motion.a>
                  ) : (
                    <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl border-2 border-border-subtle bg-bg-card text-text-muted text-sm font-medium select-none">
                      <Github size={16} />
                      <span>Source on Request</span>
                    </span>
                  )}
                  {project.demo && (
                    <motion.a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-white text-sm font-bold shadow-lg hover:shadow-xl transition-all"
                      style={{
                        background: `linear-gradient(135deg, ${project.accent}, ${project.accent}dd)`,
                        boxShadow: `0 4px 20px ${project.accent}40`,
                      }}
                    >
                      <ExternalLink size={16} />
                      <span>Live Demo</span>
                      <ChevronRight size={14} className="ml-auto" />
                    </motion.a>
                  )}
                </div>

                {/* Divider with accent */}
                <div className="relative h-px bg-gradient-to-r from-transparent via-border-subtle to-transparent">
                  <div 
                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full"
                    style={{ background: project.accent, boxShadow: `0 0 12px ${project.accent}` }}
                  />
                </div>

                {/* Two-col layout - Enhanced */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Left Column - Features + Outcomes (2/3 width) */}
                  <div className="lg:col-span-2 flex flex-col gap-8">
                    {/* Key Features - Enhanced Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="rounded-2xl border border-border-subtle bg-gradient-to-br from-bg-card to-bg-secondary/20 p-6"
                    >
                      <div className="flex items-center gap-3 mb-6">
                        <div 
                          className="w-9 h-9 rounded-lg flex items-center justify-center"
                          style={{ background: `${project.accent}15` }}
                        >
                          <Zap size={16} style={{ color: project.accent }} />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-text-primary">Key Features</h3>
                          <p className="text-xs text-text-muted">Core capabilities & implementation</p>
                        </div>
                      </div>
                      <ul className="flex flex-col gap-4">
                        {project.highlights.map((h, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + i * 0.05 }}
                            className="flex items-start gap-3 group"
                          >
                            <span
                              className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-xs font-bold font-mono transition-transform group-hover:scale-110"
                              style={{
                                background: `${project.accent}18`,
                                color: project.accent,
                                border: `1.5px solid ${project.accent}30`,
                              }}
                            >
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <p className="text-text-primary text-sm leading-relaxed pt-1">{h}</p>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Outcomes - Enhanced Card */}
                    {project.outcomes && project.outcomes.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="rounded-2xl border border-border-subtle bg-gradient-to-br from-bg-card to-bg-secondary/20 p-6"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div 
                            className="w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{ background: `${project.accent}15` }}
                          >
                            <Award size={16} style={{ color: project.accent }} />
                          </div>
                          <div>
                            <h3 className="text-base font-bold text-text-primary">Project Outcomes</h3>
                            <p className="text-xs text-text-muted">Results & achievements</p>
                          </div>
                        </div>
                        <ul className="flex flex-col gap-3.5">
                          {project.outcomes.map((o, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 + i * 0.05 }}
                              className="flex items-start gap-3 group"
                            >
                              <div 
                                className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5 transition-transform group-hover:scale-110"
                                style={{ background: `${project.accent}18` }}
                              >
                                <CheckCircle2
                                  size={12}
                                  style={{ color: project.accent }}
                                />
                              </div>
                              <p className="text-sm text-text-muted leading-relaxed">{o}</p>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </div>

                  {/* Right Column - Tech Stack + Metadata (1/3 width) */}
                  <div className="lg:col-span-1 flex flex-col gap-5">
                    {/* Tech Stack - Premium Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 }}
                      className="rounded-2xl border border-border-subtle bg-gradient-to-br from-bg-card to-bg-secondary/30 p-6"
                    >
                      <div className="flex items-center gap-3 mb-5">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: `${project.accent}15` }}
                        >
                          <Layers size={14} style={{ color: project.accent }} />
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-text-primary">Tech Stack</h3>
                          <p className="text-[10px] text-text-muted">{project.tech.length} technologies</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((t, i) => (
                          <motion.span
                            key={t}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.25 + i * 0.03 }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            className="text-xs px-3 py-1.5 rounded-lg font-mono border transition-all cursor-default"
                            style={{
                              background: `${project.accent}08`,
                              borderColor: `${project.accent}25`,
                              color: project.accent
                            }}
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    </motion.div>

                    {/* Project Metadata - Info Cards */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-2xl border border-border-subtle bg-gradient-to-br from-bg-card to-bg-secondary/30 p-5 flex flex-col gap-5"
                    >
                      {/* Category */}
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Tag size={12} className="text-text-muted" />
                          <p className="text-[10px] text-text-muted font-mono font-semibold uppercase tracking-widest">
                            Category
                          </p>
                        </div>
                        <p className="font-bold text-sm" style={{ color: project.accent }}>
                          {project.categoryLabel}
                        </p>
                      </div>

                      {/* Deployment */}
                      {project.deployment && (
                        <>
                          <div className="h-px bg-gradient-to-r from-border-subtle to-transparent" />
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <TrendingUp size={12} className="text-text-muted" />
                              <p className="text-[10px] text-text-muted font-mono font-semibold uppercase tracking-widest">
                                Deployment
                              </p>
                            </div>
                            <p className="text-text-primary text-sm font-semibold">
                              {project.deployment}
                            </p>
                          </div>
                        </>
                      )}

                      {/* Status */}
                      <div className="h-px bg-gradient-to-r from-border-subtle to-transparent" />
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={12} className="text-text-muted" />
                          <p className="text-[10px] text-text-muted font-mono font-semibold uppercase tracking-widest">
                            Status
                          </p>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <div className="relative">
                            <span
                              className="w-2 h-2 rounded-full block animate-pulse"
                              style={{ background: project.accent }}
                            />
                            <span
                              className="absolute inset-0 w-2 h-2 rounded-full animate-ping"
                              style={{ background: project.accent, opacity: 0.4 }}
                            />
                          </div>
                          <p className="text-text-primary text-sm font-semibold">Production Ready</p>
                        </div>
                      </div>
                    </motion.div>
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
