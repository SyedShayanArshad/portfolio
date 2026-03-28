"use client";

import { motion } from "framer-motion";
import { Brain, Network, BarChart3, Code2, CheckCircle, Sparkles } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";

type Service = {
  icon: any;
  title: string;
  description: string;
  features: string[];
  color: string;
  gradient: string;
};

const services: Service[] = [
  {
    icon: Brain,
    title: "Machine Learning",
    description: "Build predictive models and intelligent systems that learn from data.",
    features: [
      "Supervised & unsupervised learning",
      "Feature engineering & selection",
      "Model training & hyperparameter tuning",
      "Ensemble methods (Random Forest, XGBoost)",
      "Model evaluation & optimization",
    ],
    color: "#06b6d4",
    gradient: "from-cyan-500/10 to-blue-500/10",
  },
  {
    icon: Network,
    title: "Deep Learning",
    description: "Advanced neural networks for complex pattern recognition and predictions.",
    features: [
      "CNN for image classification & detection",
      "RNN, LSTM, GRU for sequences",
      "Transformers & attention mechanisms",
      "Transfer learning with pre-trained models",
      "Explainable AI with Grad-CAM",
    ],
    color: "#f472b6",
    gradient: "from-pink-500/10 to-purple-500/10",
  },
  {
    icon: BarChart3,
    title: "Data Analysis",
    description: "Extract insights and patterns from complex datasets with statistical rigor.",
    features: [
      "Exploratory data analysis (EDA)",
      "Data cleaning & preprocessing",
      "Statistical analysis & hypothesis testing",
      "Time series forecasting",
      "Data visualization & reporting",
    ],
    color: "#10b981",
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web applications with modern frameworks and best practices.",
    features: [
      "React & Next.js applications",
      "RESTful API design & development",
      "Database design (SQL & NoSQL)",
      "Authentication & authorization",
      "Responsive UI with Tailwind CSS",
    ],
    color: "#f59e0b",
    gradient: "from-amber-500/10 to-orange-500/10",
  },
];

export default function Services() {
  return (
    <section id="service" className="py-16 md:py-18 px-6" aria-label="Services">
      <div className="max-w-7xl mx-auto">
        <SectionTitle
          label="Services"
          title="What I Offer"
          subtitle="Comprehensive AI/ML solutions and full-stack development services."
          accent="purple"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, idx) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
                className={`group rounded-2xl border border-border-subtle bg-gradient-to-br ${service.gradient} bg-bg-card p-7 transition-all duration-300 hover:border-[${service.color}]/30 hover:shadow-lg hover:shadow-[${service.color}]/10`}
              >
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                      border: `1px solid ${service.color}30`,
                    }}
                  >
                    <Icon size={26} style={{ color: service.color }} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-text-primary mb-1.5 group-hover:text-neon-cyan transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-sm text-text-muted leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-text-muted">
                      <CheckCircle
                        size={15}
                        className="mt-0.5 shrink-0 transition-colors"
                        style={{ color: service.color }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative sparkle */}
                <div className="mt-6 flex items-center gap-2 text-xs font-mono text-text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                  <Sparkles size={12} style={{ color: service.color }} />
                  <span>Available for projects</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
