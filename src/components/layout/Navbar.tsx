"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, Zap } from "lucide-react";
import clsx from "clsx";
import { personalInfo } from "@/data/portfolio";
import ThemeToggle from "@/components/ui/ThemeToggle";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Service", href: "#service" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState("");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href === "#") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX }}
      />

      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-bg-primary/90 backdrop-blur-xl border-b border-border-subtle"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2 group"
            whileHover={{ scale: 1.02 }}
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center glow-cyan">
              <Zap size={16} className="text-white" />
            </div>
            <span className="font-mono font-semibold text-sm text-text-primary group-hover:text-neon-cyan transition-colors">
              Shayan<span className="text-neon-cyan">.dev</span>
            </span>
          </motion.a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={clsx(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 nav-link relative",
                    active === link.href
                      ? "text-neon-cyan bg-neon-cyan/5"
                      : "text-text-muted hover:text-text-primary hover:bg-bg-card"
                  )}
                >
                  {link.label}
                  {active === link.href && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-px bg-neon-cyan mx-3"
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Right: theme toggle + CTA */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <motion.a
              href={`mailto:${personalInfo.email}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-neon-cyan to-neon-purple text-white glow-cyan transition-all ml-1"
            >
              Hire Me
            </motion.a>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 rounded-lg text-text-muted hover:text-neon-cyan transition-colors"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-[72px] z-40 bg-bg-secondary/95 backdrop-blur-xl border-b border-border-subtle md:hidden"
          >
            <ul className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={clsx(
                      "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all",
                      active === link.href
                        ? "text-neon-cyan bg-neon-cyan/10"
                        : "text-text-muted hover:text-text-primary hover:bg-bg-card"
                    )}
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="mt-2">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="block text-center px-4 py-3 rounded-lg text-sm font-semibold bg-gradient-to-r from-neon-cyan to-neon-purple text-white"
                >
                  Hire Me
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
