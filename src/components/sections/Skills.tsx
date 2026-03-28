"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SectionTitle from "@/components/ui/SectionTitle";
import { skillCategories } from "@/data/portfolio";
import { SkillCategorySkeleton } from "@/components/ui/Skeleton";

export default function Skills() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="skills" className="py-16 md:py-20 px-6 bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          label="Technical Stack"
          title="Skills & Technologies"
          subtitle="Core competencies in AI/ML development and deployment."
          accent="purple"
        />

        {/* Skills Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <SkillCategorySkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.1 }}
                className="p-6 rounded-2xl border border-border-subtle bg-bg-card"
              >
                {/* Category Header */}
                <div className="mb-5">
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: `${category.accent}20` }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ background: category.accent }}
                      />
                    </div>
                    <h3
                      className="text-lg font-bold"
                      style={{ color: category.accent }}
                    >
                      {category.title}
                    </h3>
                  </div>
                  <div
                    className="h-0.5 w-12 rounded-full"
                    style={{ backgroundColor: category.accent }}
                  />
                </div>

                {/* Skills List - Compact */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.03 }}
                      whileHover={{ scale: 1.05 }}
                      className="group relative"
                    >
                      <div
                        className="px-3 py-2 rounded-lg text-sm font-medium border transition-all cursor-default"
                        style={{
                          borderColor: `${skill.color}30`,
                          background: `${skill.color}08`,
                          color: skill.color,
                        }}
                      >
                        {skill.name}
                      </div>

                      {/* Tooltip with proficiency on hover */}
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        <div
                          className="px-2 py-1 rounded text-xs font-bold whitespace-nowrap"
                          style={{
                            background: skill.color,
                            color: '#fff',
                          }}
                        >
                          {skill.proficiency}%
                          <div
                            className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45"
                            style={{ background: skill.color }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
