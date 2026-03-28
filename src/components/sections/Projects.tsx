"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, ChevronRight, Github, ExternalLink, Tag } from "lucide-react";
import { projects, projectCategories, type Project } from "@/data/portfolio";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectModal from "@/components/ui/ProjectModal";
import { ProjectsGridSkeleton, ProjectsListSkeleton } from "@/components/ui/Skeleton";
import clsx from "clsx";

// SVG thumbnails — category/project specific abstract visualizations
function ProjectThumbnail({ project }: { project: Project }) {
  const c = project.accent;

  if (project.id === "plant-disease") {
    // Neural activation grid
    return (
      <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="320" height="120" fill={`${c}0a`} />
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 10 }).map((_, col) => {
            const opacity = Math.random() * 0.7 + 0.15;
            return (
              <rect
                key={`${row}-${col}`}
                x={col * 32 + 4}
                y={row * 22 + 8}
                width="26"
                height="16"
                rx="3"
                fill={c}
                opacity={opacity}
              />
            );
          })
        )}
        {/* Leaf silhouette overlay */}
        <ellipse cx="160" cy="60" rx="45" ry="30" fill={`${c}18`} stroke={c} strokeWidth="1.5" strokeOpacity="0.6" />
        <path d="M160 30 Q185 60 160 90 Q135 60 160 30Z" fill={`${c}20`} stroke={c} strokeWidth="1" strokeOpacity="0.5" />
      </svg>
    );
  }

  if (project.id === "crypto-volatility") {
    // Candlestick chart
    const candles = [18, 35, 22, 55, 40, 70, 48, 85, 60, 95, 72, 88, 65, 78, 55];
    return (
      <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="320" height="120" fill={`${c}08`} />
        {/* Grid lines */}
        {[30, 60, 90].map((y) => (
          <line key={y} x1="10" y1={y} x2="310" y2={y} stroke={c} strokeWidth="0.5" strokeOpacity="0.15" />
        ))}
        {/* Candlesticks */}
        {candles.map((h, i) => {
          const x = i * 20 + 12;
          const top = 110 - h;
          const bullish = i % 3 !== 1;
          return (
            <g key={i}>
              <line x1={x + 5} y1={top - 6} x2={x + 5} y2={top} stroke={bullish ? c : "#f472b6"} strokeWidth="1.5" strokeOpacity="0.8" />
              <rect x={x} y={top} width="10" height={Math.max(h * 0.4, 4)} rx="1" fill={bullish ? c : "#f472b6"} opacity="0.7" />
              <line x1={x + 5} y1={top + h * 0.4} x2={x + 5} y2={top + h * 0.4 + 8} stroke={bullish ? c : "#f472b6"} strokeWidth="1.5" strokeOpacity="0.8" />
            </g>
          );
        })}
        {/* Forecast line */}
        <polyline
          points={candles.map((h, i) => `${i * 20 + 17},${110 - h}`).join(" ")}
          fill="none"
          stroke={c}
          strokeWidth="2"
          strokeOpacity="0.5"
          strokeDasharray="4 3"
        />
      </svg>
    );
  }

  if (project.id === "movie-recommendation") {
    // Film strip + rating stars grid
    return (
      <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="320" height="120" fill={`${c}08`} />
        {/* Film strip frames */}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i}>
            <rect x={i * 64 + 10} y="15" width="54" height="40" rx="3" fill={`${c}15`} stroke={c} strokeWidth="1" strokeOpacity="0.4" />
            <rect x={i * 64 + 14} y="18" width="8" height="5" rx="1" fill={c} opacity="0.4" />
            <rect x={i * 64 + 52} y="18" width="8" height="5" rx="1" fill={c} opacity="0.4" />
            <rect x={i * 64 + 14} y="47" width="8" height="5" rx="1" fill={c} opacity="0.4" />
            <rect x={i * 64 + 52} y="47" width="8" height="5" rx="1" fill={c} opacity="0.4" />
          </g>
        ))}
        {/* Star ratings */}
        {[0, 1, 2, 3].map((row) => (
          <g key={row}>
            {[0, 1, 2, 3, 4].map((star) => (
              <text
                key={star}
                x={star * 16 + 60 * row + 12}
                y="100"
                fontSize="12"
                fill={c}
                opacity={star < (3 - row + 4) % 5 + 2 ? 0.8 : 0.2}
              >★</text>
            ))}
          </g>
        ))}
      </svg>
    );
  }

  if (project.id === "aqi-prediction") {
    // Waveform / bar chart
    const bars = [30, 55, 40, 75, 60, 85, 45, 70, 50, 90, 65, 55, 80, 45, 60, 35];
    return (
      <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="320" height="120" fill={`${c}08`} />
        {/* Horizontal grid */}
        {[30, 60, 90].map((y) => (
          <line key={y} x1="10" y1={y} x2="310" y2={y} stroke={c} strokeWidth="0.5" strokeOpacity="0.12" />
        ))}
        {bars.map((h, i) => (
          <g key={i}>
            <rect
              x={i * 19 + 8}
              y={110 - h}
              width="14"
              height={h}
              rx="2"
              fill={c}
              opacity={0.3 + (i / bars.length) * 0.5}
            />
          </g>
        ))}
        {/* Trend line */}
        <polyline
          points={bars.map((h, i) => `${i * 19 + 15},${110 - h}`).join(" ")}
          fill="none"
          stroke={c}
          strokeWidth="2"
          strokeOpacity="0.7"
        />
        {/* AQI label */}
        <text x="280" y="25" fontSize="10" fill={c} opacity="0.6" fontFamily="monospace">AQI</text>
      </svg>
    );
  }

  if (project.id === "inventory-management") {
    // Table / dashboard UI mockup
    return (
      <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <rect width="320" height="120" fill={`${c}08`} />
        {/* Sidebar */}
        <rect x="0" y="0" width="56" height="120" fill={`${c}12`} />
        {[20, 40, 60, 80, 100].map((y) => (
          <rect key={y} x="8" y={y} width="40" height="10" rx="3" fill={c} opacity="0.25" />
        ))}
        {/* Table header */}
        <rect x="64" y="12" width="248" height="14" rx="3" fill={c} opacity="0.3" />
        {/* Table rows */}
        {[32, 50, 68, 86, 104].map((y, i) => (
          <g key={y}>
            <rect x="64" y={y} width="248" height="12" rx="2" fill={c} opacity={i % 2 === 0 ? 0.08 : 0.04} />
            <rect x="68" y={y + 2} width="60" height="8" rx="2" fill={c} opacity="0.2" />
            <rect x="140" y={y + 2} width="40" height="8" rx="2" fill={c} opacity="0.15" />
            <rect x="260" y={y + 2} width="40" height="8" rx="2" fill={c} opacity="0.3" />
          </g>
        ))}
      </svg>
    );
  }

  // Fallback generic visualization
  return (
    <svg viewBox="0 0 320 120" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect width="320" height="120" fill={`${c}0a`} />
      <circle cx="160" cy="60" r="40" fill={`${c}18`} stroke={c} strokeWidth="1.5" strokeOpacity="0.4" />
    </svg>
  );
}

function ProjectCardGrid({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      className="group rounded-2xl border border-border-subtle bg-bg-card flex flex-col overflow-hidden transition-all cursor-pointer"
      style={{ "--accent": project.accent } as React.CSSProperties}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden h-32 w-full flex-shrink-0 border-b border-border-subtle"
        style={{ background: `${project.accent}08` }}
      >
        <ProjectThumbnail project={project} />
        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-bg-primary/50 backdrop-blur-[2px]">
          <span className="text-xs font-mono text-text-primary border border-border-subtle bg-bg-card px-3 py-1.5 rounded-full">
            click to expand
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col gap-3.5 flex-1">
        {/* Category badge + actions */}
        <div className="flex items-center justify-between">
          <span
            className="text-xs font-mono px-2.5 py-1 rounded-full flex items-center gap-1.5"
            style={{ color: project.accent, background: `${project.accent}15` }}
          >
            <Tag size={9} />
            {project.categoryLabel}
          </span>
          <div className="flex items-center gap-1.5">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-bg-secondary transition-colors" style={{ color: project.accent }} aria-label="GitHub">
                <Github size={13} />
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-1.5 rounded-lg hover:bg-bg-secondary transition-colors" style={{ color: project.accent }} aria-label="Live demo">
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>

        <h3 className="font-bold text-text-primary text-base leading-tight group-hover:text-neon-cyan transition-colors">
          {project.title}
        </h3>

        <p className="text-text-muted text-sm leading-relaxed flex-1 line-clamp-2">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-border-subtle">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-bg-secondary text-text-muted font-mono">{t}</span>
          ))}
          {project.tech.length > 4 && (
            <span className="text-[11px] px-2 py-0.5 rounded bg-bg-secondary text-text-muted font-mono">+{project.tech.length - 4}</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectCardList({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ x: 3 }}
      onClick={onOpen}
      className="group rounded-xl border border-border-subtle bg-bg-card overflow-hidden transition-all cursor-pointer"
    >
      <div className="flex flex-col sm:flex-row">
        {/* Thumbnail strip */}
        <div className="sm:w-32 h-20 sm:h-auto overflow-hidden flex-shrink-0 border-b sm:border-b-0 sm:border-r border-border-subtle" style={{ background: `${project.accent}08` }}>
          <ProjectThumbnail project={project} />
        </div>

        <div className="p-4 flex flex-col gap-2.5 flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-mono px-2 py-0.5 rounded" style={{ color: project.accent, background: `${project.accent}15` }}>
              {project.categoryLabel}
            </span>
            <h3 className="font-bold text-text-primary text-sm group-hover:text-neon-cyan transition-colors">{project.title}</h3>
            {project.deployment && (
              <span className="text-[11px] text-text-muted border border-border-subtle px-2 py-0.5 rounded font-mono">{project.deployment}</span>
            )}
          </div>
          <p className="text-text-muted text-xs line-clamp-2 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 5).map((t) => (
              <span key={t} className="text-[11px] px-2 py-0.5 rounded bg-bg-secondary text-text-muted font-mono">{t}</span>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 flex items-center gap-1.5 p-4 sm:pl-0">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded-lg border border-border-subtle text-text-muted hover:text-neon-cyan hover:border-neon-cyan/30 transition-all" aria-label="GitHub">
              <Github size={14} />
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} className="p-2 rounded-lg border border-border-subtle text-text-muted hover:text-neon-cyan hover:border-neon-cyan/30 transition-all" aria-label="Live demo">
              <ExternalLink size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data load
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="py-16 md:py-18 px-6" aria-label="Projects">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Portfolio"
          title="Featured Projects"
          subtitle="End-to-end AI/ML projects from research to deployment. Click any card to explore details."
          accent="cyan"
        />

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {projectCategories.map((cat) => (
              <motion.button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={clsx(
                  "px-4 py-1.5 rounded-full text-sm font-medium border transition-all",
                  activeFilter === cat.id
                    ? "bg-neon-cyan text-white border-neon-cyan glow-cyan"
                    : "border-border-subtle text-text-muted hover:border-neon-cyan/40 hover:text-text-primary"
                )}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>

          <div className="flex items-center gap-1 p-1 rounded-lg border border-border-subtle bg-bg-card">
            <button onClick={() => setViewMode("grid")} className={clsx("p-2 rounded-md transition-all", viewMode === "grid" ? "bg-neon-cyan/10 text-neon-cyan" : "text-text-muted hover:text-text-primary")} aria-label="Grid view">
              <LayoutGrid size={16} />
            </button>
            <button onClick={() => setViewMode("list")} className={clsx("p-2 rounded-md transition-all", viewMode === "list" ? "bg-neon-cyan/10 text-neon-cyan" : "text-text-muted hover:text-text-primary")} aria-label="List view">
              <List size={16} />
            </button>
          </div>
        </div>

        {/* Cards */}
        {isLoading ? (
          viewMode === "grid" ? (
            <ProjectsGridSkeleton count={6} />
          ) : (
            <ProjectsListSkeleton count={4} />
          )
        ) : (
          <AnimatePresence mode="wait">
            {viewMode === "grid" ? (
              <motion.div key="grid" layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                <AnimatePresence>
                  {filteredProjects.map((p, i) => (
                    <ProjectCardGrid key={p.id} project={p} index={i} onOpen={() => setSelectedProject(p)} />
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div key="list" layout className="flex flex-col gap-3">
                <AnimatePresence>
                  {filteredProjects.map((p, i) => (
                    <ProjectCardList key={p.id} project={p} index={i} onOpen={() => setSelectedProject(p)} />
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {!isLoading && filteredProjects.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-text-muted py-16">
            No projects in this category yet.
          </motion.p>
        )}
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
