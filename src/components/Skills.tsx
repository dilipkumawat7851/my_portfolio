"use client";

import { motion } from "framer-motion";

const categories = [
  { title: "DevOps & Cloud", icon: "☁️", color: "from-orange-500 to-amber-400", skills: ["AWS", "Docker", "Linux", "CI/CD", "Networking"] },
  { title: "Programming", icon: "⚡", color: "from-indigo-500 to-cyan-400", skills: ["C", "C++", "Python", "DSA"] },
  { title: "Web Development", icon: "🌐", color: "from-purple-500 to-pink-500", skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"] },
  { title: "Tools & Platforms", icon: "🛠️", color: "from-green-400 to-emerald-500", skills: ["Git", "GitHub", "VS Code", "Vercel", "Prompt Engineering"] },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-20 sm:py-28 lg:py-32">
      <div className="section-divider mb-20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-16">
          <span className="text-sm font-mono text-indigo-400 tracking-wider uppercase">My Skills</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">Tech <span className="gradient-text">Arsenal</span></h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">Technologies and tools I use to bring ideas to life</p>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat, i) => (
            <motion.div key={cat.title} variants={{ hidden: { opacity: 0, y: 50, rotateX: 10 }, visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7 } } }} whileHover={{ y: -10, scale: 1.03, rotateY: 3 }} className="glass-card group p-5 sm:p-6 relative overflow-hidden shimmer holo-border tilt-card">
              <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} opacity-0 group-hover:opacity-[0.08] transition-opacity duration-500`} />
              <motion.div className={`h-1 rounded-full bg-gradient-to-r ${cat.color} mb-5`} initial={{ width: "3rem" }} whileInView={{ width: "100%" }} viewport={{ once: true }} transition={{ duration: 1, delay: i * 0.2 }} />
              <motion.div className="text-3xl sm:text-4xl mb-3" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}>{cat.icon}</motion.div>
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 neon-underline inline-block">{cat.title}</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {cat.skills.map((skill, j) => (
                  <motion.span key={skill} initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 + j * 0.05 }} whileHover={{ scale: 1.1, borderColor: "rgba(99,102,241,0.5)" }} className="px-3 py-1 text-xs sm:text-sm rounded-lg bg-white/5 border border-white/10 text-zinc-300 hover:text-white hover:bg-indigo-500/10 transition-all duration-300 cursor-default">
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
