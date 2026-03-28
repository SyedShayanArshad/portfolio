"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import { Send, Mail, Phone, Linkedin, Loader2, CheckCircle } from "lucide-react";
import { personalInfo } from "@/data/portfolio";
import SectionTitle from "@/components/ui/SectionTitle";

// Replace these with your real EmailJS credentials
const EMAILJS_SERVICE_ID = "service_YOUR_ID";
const EMAILJS_TEMPLATE_ID = "template_YOUR_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSending(true);
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      setSent(true);
      toast.success("Message sent successfully! I'll get back to you soon.");
      formRef.current.reset();
      setTimeout(() => setSent(false), 5000);
    } catch {
      toast.error("Failed to send. Please email me directly.");
    } finally {
      setSending(false);
    }
  };

  const contactItems = [
    {
      icon: Mail,
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      color: "#00d4ff",
    },
    {
      icon: Phone,
      label: "Phone",
      value: personalInfo.phone,
      href: `tel:${personalInfo.phone}`,
      color: "#7c3aed",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "@syedshayanarshad",
      href: personalInfo.linkedin,
      color: "#0ea5e9",
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-18 px-6 bg-bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Get In Touch"
          title="Let's Work Together"
          subtitle="Have a project in mind or want to discuss AI/ML opportunities? I'd love to hear from you."
          accent="cyan"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Left — contact info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <div>
              <h3 className="text-xl font-bold text-text-primary mb-2">
                Get In Touch
              </h3>
              <p className="text-text-muted text-sm leading-relaxed">
                I&apos;m open to AI/ML internships, freelance projects, and collaborative
                research. Currently based in Lahore, Pakistan — available remotely worldwide.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              {contactItems.map(({ icon: Icon, label, value, href, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  target={label === "LinkedIn" ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  whileHover={{ x: 4 }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-border-subtle bg-bg-card hover:border-opacity-80 transition-all group"
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: `${color}18`, border: `1px solid ${color}30` }}
                  >
                    <Icon size={18} style={{ color }} />
                  </div>
                  <div>
                    <p className="text-text-muted text-xs">{label}</p>
                    <p className="text-text-primary text-sm font-medium group-hover:text-neon-cyan transition-colors truncate">
                      {value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Availability badge */}
            <div className="p-4 rounded-xl border border-neon-cyan/20 bg-neon-cyan/5">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-neon-cyan animate-pulse" />
                <span className="text-neon-cyan text-sm font-semibold">Available for Opportunities</span>
              </div>
              <p className="text-text-muted text-xs">
                Open to AI/ML roles, internships, and freelance projects.
              </p>
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3"
          >
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="rounded-2xl border border-border-subtle bg-bg-card p-8 flex flex-col gap-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-text-muted text-xs font-mono">
                    Your Name <span className="text-neon-cyan">*</span>
                  </label>
                  <input
                    name="from_name"
                    required
                    placeholder="John Doe"
                    className="px-4 py-3 rounded-xl bg-bg-secondary border border-border-subtle text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-text-muted text-xs font-mono">
                    Your Email <span className="text-neon-cyan">*</span>
                  </label>
                  <input
                    name="from_email"
                    type="email"
                    required
                    placeholder="john@example.com"
                    className="px-4 py-3 rounded-xl bg-bg-secondary border border-border-subtle text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-text-muted text-xs font-mono">
                  Subject <span className="text-neon-cyan">*</span>
                </label>
                <input
                  name="subject"
                  required
                  placeholder="AI/ML Project Collaboration"
                  className="px-4 py-3 rounded-xl bg-bg-secondary border border-border-subtle text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30 transition-all"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-text-muted text-xs font-mono">
                  Message <span className="text-neon-cyan">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about your project or opportunity..."
                  className="px-4 py-3 rounded-xl bg-bg-secondary border border-border-subtle text-text-primary text-sm placeholder-text-muted focus:outline-none focus:border-neon-cyan/60 focus:ring-1 focus:ring-neon-cyan/30 transition-all resize-none"
                />
              </div>

              <motion.button
                type="submit"
                disabled={sending || sent}
                whileHover={!sending && !sent ? { scale: 1.02, boxShadow: "0 0 30px rgba(0,212,255,0.35)" } : {}}
                whileTap={!sending && !sent ? { scale: 0.98 } : {}}
                className="w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 bg-gradient-to-r from-neon-cyan to-neon-purple text-bg-primary transition-all disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Sending...
                  </>
                ) : sent ? (
                  <>
                    <CheckCircle size={18} />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Send Message
                  </>
                )}
              </motion.button>

              <p className="text-text-muted text-xs text-center">
                Or email directly at{" "}
                <a href={`mailto:${personalInfo.email}`} className="text-neon-cyan hover:underline">
                  {personalInfo.email}
                </a>
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
