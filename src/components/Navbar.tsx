"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Journey", href: "#journey" },
  { name: "Certificates", href: "#certificates" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = useCallback((href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "glass shadow-lg shadow-indigo-500/5" : "bg-transparent"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.a href="#home" onClick={(e) => { e.preventDefault(); handleClick("#home"); }} className="text-xl sm:text-2xl font-bold tracking-tight" whileHover={{ scale: 1.05 }}>
              <span className="gradient-text">&lt;DK</span>
              <span className="text-zinc-300"> /&gt;</span>
            </motion.a>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <motion.a key={link.name} href={link.href}
                  onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-300 ${activeSection === link.href.replace("#", "") ? "text-white" : "text-zinc-400 hover:text-zinc-200"}`}
                  whileHover={{ y: -2 }} transition={{ duration: 0.2 }}
                >
                  {activeSection === link.href.replace("#", "") && (
                    <motion.span layoutId="activeNav" className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-lg" transition={{ type: "spring", stiffness: 380, damping: 30 }} />
                  )}
                  <span className="relative z-10">{link.name}</span>
                </motion.a>
              ))}
            </div>

            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden relative w-10 h-10 flex items-center justify-center" aria-label="Toggle menu">
              <div className="flex flex-col gap-1.5">
                <motion.span animate={mobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-zinc-300 block origin-center" />
                <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-zinc-300 block" />
                <motion.span animate={mobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-zinc-300 block origin-center" />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 md:hidden">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 25, stiffness: 200 }} className="absolute right-0 top-0 h-full w-72 glass border-l border-indigo-500/20 pt-24">
              <div className="flex flex-col px-6 gap-2">
                {navLinks.map((link, i) => (
                  <motion.a key={link.name} href={link.href}
                    onClick={(e) => { e.preventDefault(); handleClick(link.href); }}
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
                    className={`px-4 py-3 text-base font-medium rounded-xl transition-all ${activeSection === link.href.replace("#", "") ? "text-white bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20" : "text-zinc-400 hover:text-white hover:bg-white/5"}`}
                  >{link.name}</motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
