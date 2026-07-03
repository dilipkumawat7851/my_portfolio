"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const skills = [
  { name: "C / C++", level: 80 },
  { name: "DevOps & Cloud", level: 75 },
  { name: "AWS", level: 70 },
  { name: "Linux", level: 80 },
  { name: "Frontend (React/Next.js)", level: 75 },
  { name: "Docker", level: 65 },
  { name: "DSA", level: 70 },
];

const stats = [
  { label: "Projects", value: "5+", icon: "🚀" },
  { label: "Technologies", value: "10+", icon: "⚡" },
  { label: "Certificates", value: "5+", icon: "📜" },
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32">
      <div className="section-divider mb-20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-16">
          <span className="text-sm font-mono text-indigo-400 tracking-wider uppercase">About Me</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
            Get to <span className="gradient-text">Know Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="space-y-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              <p>
                I&apos;m <span className="text-white font-semibold">Dilip Kumawat</span>, a passionate B.Tech 3rd Year Computer Science student at <span className="text-indigo-400">Arya College of Engineering & I.T., Jaipur</span>.
              </p>
              <p>
                I specialize in <span className="text-white">DevOps & Cloud Computing</span> with hands-on experience as an <span className="text-indigo-400">AWS Cloud & Linux Intern</span>. I love automating workflows, building CI/CD pipelines, and deploying scalable applications.
              </p>
              <p>
                Beyond cloud, I&apos;m skilled in <span className="text-white">C++, DSA, Frontend Development</span>, and exploring <span className="text-white">AI & Docker</span>. I enjoy participating in hackathons and building real-world projects that solve problems.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -6, scale: 1.03 }} className="glass-card p-3 sm:p-4 text-center shimmer holo-border">
                  <div className="text-lg mb-1">{stat.icon}</div>
                  <div className="text-xl sm:text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-zinc-500 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div ref={ref} initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="space-y-5 sm:space-y-6">
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 sm:mb-8 flex items-center gap-2">
              <span className="text-2xl">🎯</span> Core Competencies
            </h3>
            {skills.map((skill, i) => (
              <motion.div key={skill.name} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm sm:text-base text-zinc-300 font-medium">{skill.name}</span>
                  <motion.span className="text-sm text-indigo-400 font-mono" initial={{ opacity: 0 }} animate={isInView ? { opacity: 1 } : { opacity: 0 }} transition={{ delay: i * 0.15 + 0.8 }}>
                    {skill.level}%
                  </motion.span>
                </div>
                <div className="h-2.5 sm:h-3 rounded-full bg-zinc-800/80 overflow-hidden relative">
                  <motion.div className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-violet-500 relative" initial={{ width: 0 }} animate={isInView ? { width: `${skill.level}%` } : { width: 0 }} transition={{ duration: 1.2, delay: i * 0.15, ease: "easeOut" }}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmerSlide_2s_ease-in-out_infinite]" />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
