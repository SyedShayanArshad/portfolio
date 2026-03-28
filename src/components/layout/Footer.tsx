import { personalInfo } from "@/data/portfolio";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border-subtle bg-bg-secondary/50">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="font-mono text-sm text-neon-cyan font-semibold">
            Syed Shayan Arshad
          </p>
          <p className="text-text-muted text-xs mt-1">
            AI / Machine Learning Engineer
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-text-muted hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all"
            aria-label="LinkedIn"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-text-muted hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="p-2 rounded-lg text-text-muted hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <p className="text-text-muted text-xs">
          &copy; {year} Syed Shayan Arshad. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
