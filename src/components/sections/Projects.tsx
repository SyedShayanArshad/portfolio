"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, List, ChevronRight, Github, ExternalLink, Tag } from "lucide-react";
import Image from "next/image";
import { projects, projectCategories, type Project } from "@/data/portfolio";
import SectionTitle from "@/components/ui/SectionTitle";
import ProjectModal from "@/components/ui/ProjectModal";
import { ProjectsGridSkeleton, ProjectsListSkeleton } from "@/components/ui/Skeleton";
import clsx from "clsx";

function ProjectCardGrid({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      onClick={onOpen}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group rounded-2xl border border-border-subtle bg-bg-card flex flex-col overflow-hidden transition-all cursor-pointer"
      style={{ "--accent": project.accent } as React.CSSProperties}
    >
      {/* Thumbnail */}
      <div
        className="relative overflow-hidden h-48 w-full flex-shrink-0 border-b border-border-subtle bg-bg-secondary"
      >
        {/* Main Image */}
        {project.thumbnail && (
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: isHovered && project.gif ? 0 : 1 }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
        {/* GIF Preview on Hover */}
        {project.gif && (
          <Image
            src={project.gif}
            alt={`${project.title} demo`}
            fill
            className="object-cover transition-opacity duration-500"
            style={{ opacity: isHovered ? 1 : 0 }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        )}
        
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
        <div className="relative sm:w-40 h-24 sm:h-auto overflow-hidden flex-shrink-0 border-b sm:border-b-0 sm:border-r border-border-subtle bg-bg-secondary">
          {project.thumbnail && (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 160px"
            />
          )}
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
