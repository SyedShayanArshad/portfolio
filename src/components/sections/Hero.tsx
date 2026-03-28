"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Mail, ArrowDown, ArrowRight, Download } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import AuroraBackground from "@/components/ui/AuroraBackground";

const ROLES = [
  "AI Engineer",
  "Data Scientist",
  "ML Engineer",
  "Deep Learning",
  "Python Developer",
  "Full-Stack Dev",
];

const socials = [
  { icon: Github, href: personalInfo.github, label: "GitHub", external: true },
  { icon: Linkedin, href: personalInfo.linkedin, label: "LinkedIn", external: true },
  { icon: Mail, href: `mailto:${personalInfo.email}`, label: "Email", external: false },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] } },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordVisible(false);
      setTimeout(() => {
        setRoleIndex((i) => (i + 1) % ROLES.length);
        setWordVisible(true);
      }, 380);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Introduction"
    >
      {/* Aurora — replaces tsParticles, pure CSS, zero JS overhead */}
      <AuroraBackground />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(139,92,246,1) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,1) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-7"
        >
          {/* Status badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neon-cyan/25 bg-neon-cyan/5 text-xs font-mono text-text-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
              Open to opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.div variants={itemVariants}>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05]">
              <span className="text-text-primary">Syed Shayan</span>
              <br />
              <span className="gradient-text">Arshad</span>
            </h1>
          </motion.div>

          {/* Role — clip-path word swap, no typewriter cursor */}
          <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 h-9">
            <span className="font-mono text-text-muted text-lg select-none">./</span>
            <div className="relative overflow-hidden h-9 flex items-center" style={{ minWidth: 210 }}>
              <AnimatePresence mode="wait">
                {wordVisible && (
                  <motion.span
                    key={ROLES[roleIndex]}
                    initial={{ clipPath: "inset(0 0 100% 0)", y: 14, opacity: 0 }}
                    animate={{ clipPath: "inset(0 0 0% 0)", y: 0, opacity: 1 }}
                    exit={{ clipPath: "inset(100% 0 0% 0)", y: -10, opacity: 0 }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute text-neon-cyan text-xl font-semibold font-mono whitespace-nowrap left-0"
                  >
                    {ROLES[roleIndex]}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="max-w-xl text-base sm:text-lg text-text-muted leading-relaxed"
          >
            Building{" "}
            <span className="text-text-primary font-medium">end-to-end ML pipelines</span> and{" "}
            <span className="text-text-primary font-medium">deep learning systems</span> — from
            raw data to production deployment.
          </motion.p>

          {/* CTAs — distinct primary (filled) vs ghost hierarchy */}
          <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-3 justify-center">
            <motion.button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.05, boxShadow: "0 0 36px rgba(139,92,246,0.55)" }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-neon-cyan to-neon-purple text-white glow-cyan transition-all"
            >
              View Projects
              <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
            </motion.button>

            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-semibold border border-neon-cyan/35 text-neon-cyan hover:bg-neon-cyan/8 transition-all"
            >
              <Mail size={15} />
              Contact
            </motion.a>

            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium border border-border-subtle text-text-muted hover:text-text-primary hover:border-border-subtle/80 bg-bg-card/50 backdrop-blur-sm transition-all"
            >
              <Download size={14} />
              Resume
            </motion.a>
          </motion.div>

          {/* Social icons */}
          <motion.div variants={itemVariants} className="flex items-center gap-3 pt-1">
            {socials.map(({ icon: Icon, href, label, external }) => (
              <motion.a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{ scale: 1.18, y: -2 }}
                whileTap={{ scale: 0.92 }}
                className="w-10 h-10 rounded-xl border border-border-subtle bg-bg-card flex items-center justify-center text-text-muted hover:text-neon-cyan hover:border-neon-cyan/40 transition-colors"
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-text-muted"
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase">scroll</span>
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}>
          <ArrowDown size={13} />
        </motion.div>
      </motion.div>
    </section>
  );
}
