"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const titles = ["DevOps Enthusiast", "AWS Cloud Intern", "Full Stack Developer", "Problem Solver", "Linux Lover"];

export default function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = titles[titleIndex];
    let timeout: NodeJS.Timeout;
    if (!isDeleting && charIndex < current.length) {
      timeout = setTimeout(() => setCharIndex((c) => c + 1), 80);
    } else if (!isDeleting && charIndex === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex((c) => c - 1), 40);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setTitleIndex((i) => (i + 1) % titles.length);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, titleIndex]);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden grid-pattern pt-20">
      {/* Subtle Blue Glows */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute top-1/4 -left-32 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-blue-900/20 rounded-full blur-[120px]" />
      <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.4, 0.2] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute bottom-1/4 -right-32 w-72 h-72 sm:w-[500px] sm:h-[500px] bg-sky-900/20 rounded-full blur-[120px]" />
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] opacity-[0.05] pointer-events-none">
        <div className="w-full h-full border border-blue-500 rounded-full animate-spin-slow" />
        <div className="absolute inset-12 border border-sky-400 rounded-full animate-spin-slow" style={{ animationDirection: "reverse", animationDuration: "35s" }} />
      </div>

      <div className="relative z-10 px-4 sm:px-6 max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left mt-10 md:mt-0">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 text-sm text-blue-300 shimmer">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for opportunities
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-base sm:text-lg md:text-xl text-zinc-400 font-mono mb-3">
            Hello, I&apos;m
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }} className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-4">
            <span className="text-white">Dilip</span>{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Kumawat</span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="text-lg sm:text-xl md:text-2xl font-medium text-zinc-300 mb-6 min-h-[2rem]">
            <span className="text-blue-500/60 font-mono">&gt; </span>
            <span>{titles[titleIndex].substring(0, charIndex)}</span>
            <span className="typing-cursor" />
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }} className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
            B.Tech 3rd Year CSE student at Arya College of Engineering, Jaipur. Passionate about DevOps, Cloud Computing, and building scalable solutions.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4">
            <motion.a href="#projects" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-glow w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm sm:text-base border border-blue-500/20 bg-blue-600/10">
              ⚡ View Projects
            </motion.a>
            <motion.a href="#contact" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="btn-outline w-full sm:w-auto px-6 py-3 rounded-xl font-semibold text-sm sm:text-base border-blue-500/30 hover:bg-blue-500/10">
              📬 Contact Me
            </motion.a>
          </motion.div>
        </div>

        {/* Avatar Image */}
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.3 }} className="flex-1 flex justify-center md:justify-end">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 to-sky-900 rounded-full animate-spin-slow opacity-30 blur-2xl" />
            <div className="absolute inset-4 rounded-full border border-blue-500/30 glass p-2 shadow-2xl shadow-blue-500/20">
              <div className="relative w-full h-full rounded-full overflow-hidden border border-blue-400/20">
                {/* Changed to unoptimized={true} to fix 404/broken image issues */}
                <Image src="/assets/avatar.jpg" alt="Dilip Kumawat Avatar" fill className="object-cover" priority unoptimized={true} />
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-zinc-900 border border-blue-500/30 rounded-2xl p-4 glass-card shadow-xl transform rotate-6 hover:rotate-12 transition-transform cursor-default">
              <span className="text-3xl">🔥</span>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 1.2 }} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="w-5 h-8 mx-auto border-2 border-blue-500/50 rounded-full flex items-start justify-center p-1.5">
          <motion.div animate={{ opacity: [0.4, 1, 0.4], height: [4, 8, 4] }} transition={{ duration: 2, repeat: Infinity }} className="w-1 bg-blue-400 rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
