"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";

const socials = [
  { name: "Email", value: "dilipkumawat785188@gmail.com", href: "mailto:dilipkumawat785188@gmail.com", color: "hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/5", bg: "bg-zinc-800",
    icon: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg> },
  { name: "LinkedIn", value: "in/dilip-kumawat78", href: "https://www.linkedin.com/in/dilip-kumawat78/", color: "hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-500/5", bg: "bg-zinc-800",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
  { name: "GitHub", value: "dilipkumawat7851", href: "https://github.com/dilipkumawat7851", color: "hover:text-white hover:border-white/30 hover:bg-white/5", bg: "bg-zinc-800",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg> },
  { name: "Instagram", value: "@dilip______78", href: "https://www.instagram.com/dilip______78/", color: "hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-500/5", bg: "bg-zinc-800",
    icon: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg> },
];

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
    
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28 lg:py-32">
      <div className="section-divider mb-20" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-zinc-800/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12 sm:mb-16">
          <span className="text-sm font-mono text-zinc-500 tracking-wider uppercase">Get in Touch</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 text-white">Let&apos;s Connect</h2>
          <p className="text-zinc-400 mt-4 max-w-xl mx-auto text-sm sm:text-base">Have a project in mind or want to collaborate? Feel free to reach out!</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2"><span className="text-2xl">🌐</span> Find me on</h3>
            <div className="space-y-3 sm:space-y-4">
              {socials.map((s, i) => (
                <motion.a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ x: 8, scale: 1.01 }} className={`group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-white/5 bg-white/[0.02] text-zinc-400 transition-all duration-300 holo-border ${s.color}`}>
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${s.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all text-white`}>{s.icon}</div>
                  <div className="min-w-0">
                    <div className="text-sm sm:text-base font-medium text-white">{s.name}</div>
                    <div className="text-xs sm:text-sm text-zinc-500 truncate">{s.value}</div>
                  </div>
                  <svg className="w-4 h-4 ml-auto flex-shrink-0 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-6 flex items-center gap-2"><span className="text-2xl">✉️</span> Send a message</h3>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-zinc-400 mb-1.5">Name</label>
                <input id="name" type="text" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all text-sm sm:text-base" placeholder="Your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-1.5">Email</label>
                <input id="email" type="email" required value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all text-sm sm:text-base" placeholder="your@email.com" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-zinc-400 mb-1.5">Message</label>
                <textarea id="message" required rows={4} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/10 text-white placeholder-zinc-600 focus:outline-none focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all resize-none text-sm sm:text-base" placeholder="Your message..." />
              </div>
              <motion.button type="submit" disabled={status === "loading"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className={`btn-glow w-full py-3 sm:py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed ${status === "success" ? "bg-green-600 text-white" : status === "error" ? "bg-red-600 text-white" : "bg-white text-black"}`}>
                {status === "loading" ? "Sending..." : status === "success" ? "✓ Message Sent!" : status === "error" ? "Error Sending!" : "🚀 Send Message"}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
