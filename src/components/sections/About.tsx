"use client";

import { motion } from "framer-motion";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { personalInfo } from "@/data/portfolio";
import SectionTitle from "@/components/ui/SectionTitle";
import { Cpu, CheckCircle } from "lucide-react";

const infoTags = [
  { icon: Cpu, text: "AI / ML Specialist" },
];

const highlights = [
  "End-to-end ML pipelines from raw data to production",
  "Deep learning architectures: CNN, RNN, LSTM, Transformers",
  "Deployed AI apps with Streamlit, Gradio & Flask",
];

// Decorative data tokens floating around the avatar
const tokens = [
  { label: "CNN", angle: 0 },
  { label: "LSTM", angle: 72 },
  { label: "GRU", angle: 144 },
  { label: "PCA", angle: 216 },
  { label: "ALS", angle: 288 },
];

export default function About() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <section id="about" className="py-16 md:py-18 px-6" aria-label="About me">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="About Me"
          title="Who Am I?"
          subtitle="Passionate about building AI systems that actually work in the real world."
          accent="cyan"
        />

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* ── Bio card (2/3 width on lg) ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-2 rounded-2xl border border-border-subtle bg-bg-card p-7 flex flex-col gap-6"
          >
            <div>
              <p className="text-text-muted text-base leading-relaxed">
                I&apos;m an{" "}
                <span className="text-text-primary font-semibold">AI/Machine Learning Engineer</span>{" "}
                specializing in Artificial Intelligence and Machine Learning. I bridge the gap
                between research-quality models and production-ready systems, delivering end-to-end
                solutions that work in the real world.
              </p>
            </div>

            {/* Highlights */}
            <ul className="flex flex-col gap-2.5">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 text-sm text-text-muted">
                  <CheckCircle size={15} className="text-neon-cyan mt-0.5 shrink-0" />
                  {h}
                </li>
              ))}
            </ul>

            {/* Info tags */}
            <div className="flex flex-wrap gap-2 pt-1">
              {infoTags.map(({ icon: Icon, text }) => (
                <span
                  key={text}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border-subtle bg-bg-secondary text-text-muted text-xs font-mono"
                >
                  <Icon size={13} className="text-neon-cyan" />
                  {text}
                </span>
              ))}
              <span className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-xs font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan animate-pulse" />
                Open to work
              </span>
            </div>
          </motion.div>

          {/* ── Avatar card (1/3 width on lg) ──────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-2xl border border-border-subtle bg-bg-card p-6 flex flex-col items-center justify-center gap-4 min-h-[280px]"
          >
            {/* Avatar: geometric monogram with orbital tokens */}
            <div className="relative w-40 h-40">
              {/* Orbit ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
                aria-hidden="true"
              >
                <svg viewBox="0 0 160 160" className="w-full h-full opacity-30">
                  <circle cx="80" cy="80" r="74" fill="none" stroke="url(#orbit-grad)" strokeWidth="1" strokeDasharray="8 6" />
                  <defs>
                    <linearGradient id="orbit-grad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#f472b6" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* Floating tech tokens */}
              {tokens.map(({ label, angle }) => {
                const rad = (angle * Math.PI) / 180;
                const r = 72;
                const x = 80 + r * Math.cos(rad);
                const y = 80 + r * Math.sin(rad);
                return (
                  <div
                    key={label}
                    className="absolute text-[9px] font-mono text-neon-cyan bg-bg-secondary border border-neon-cyan/25 rounded px-1 py-0.5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ left: `${(x / 160) * 100}%`, top: `${(y / 160) * 100}%` }}
                    aria-hidden="true"
                  >
                    {label}
                  </div>
                );
              })}

              {/* Center monogram */}
              <div className="absolute inset-5 rounded-2xl bg-gradient-to-br from-neon-cyan/15 to-neon-purple/15 border border-neon-cyan/20 flex flex-col items-center justify-center gap-0.5">
                <span className="text-3xl font-extrabold gradient-text font-mono tracking-tight leading-none">SA</span>
                <span className="text-[9px] font-mono text-text-muted">AI · ML · DL</span>
              </div>
            </div>

            {/* Name under avatar */}
            <div className="text-center">
              <p className="text-text-primary font-semibold text-sm">Syed Shayan Arshad</p>
              <p className="text-text-muted text-xs font-mono mt-0.5">AI / ML Engineer</p>
            </div>
          </motion.div>

          {/* ── Stats row (full width, 4 cards) ────────────── */}
          <div ref={ref} className="md:col-span-2 lg:col-span-3 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {personalInfo.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="rounded-2xl border border-border-subtle bg-bg-card p-5 flex flex-col items-center justify-center gap-1.5 text-center"
              >
                <div className="text-3xl font-extrabold gradient-text font-mono tabular-nums">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  ) : (
                    `0${stat.suffix}`
                  )}
                </div>
                <div className="text-text-muted text-xs font-mono">{stat.label}</div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
