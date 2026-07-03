"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const certificates = [
  { title: "Certificate for the Completion of C Training", issuer: "Spoken Tutorial, IIT Bombay", date: "July 2025", image: "/assets/cert_c_training.png" },
  { title: "Programming in C", issuer: "Infosys Springboard", date: "June 2025", image: "/assets/cert_infosys.png" },
  { title: "Linux, Web Dev & Networking", issuer: "GRRAS Solutions, Jaipur", date: "June 2026", image: "/assets/media__1783081761940.png" },
  { title: "Geo Spatial Intelligence Hackathon", issuer: "Arya College of Engineering & I.T.", date: "February 2026", image: "/assets/media__1783081688026.jpg" },
  { title: "Projectathon 2.0", issuer: "Arya Cipher Coding Club", date: "March 2026", image: "/assets/media__1783081678013.jpg" },
  { title: "MongoDB Basics", issuer: "MongoDB, Inc.", date: "August 2025", image: "/assets/media__1783081651870.png" },
  { title: "Role of Women in New India", issuer: "Ministry of Defence", date: "2025", image: "/assets/media__1783081566895.jpg" },
];

export default function Certificates() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCert = () => {
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const prevCert = () => {
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  return (
    <section id="certificates" className="relative py-20 sm:py-28 lg:py-32">
      <div className="section-divider mb-20" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header matching the requested design */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 rounded-full border border-blue-500/20 bg-blue-500/10 text-xs sm:text-sm text-blue-300">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            CERTIFICATIONS
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3 text-white">
            My <span className="text-blue-400">Certificates</span>
          </h2>
          <p className="text-zinc-400 mt-4 text-sm sm:text-base">Validated knowledge through industry-recognized certifications.</p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="relative max-w-4xl mx-auto glass-card p-4 sm:p-6 md:p-8 overflow-hidden border border-white/5 bg-zinc-900/50 rounded-3xl">
          
          <div className="relative w-full aspect-[4/3] md:aspect-[3/2] bg-black/40 rounded-xl overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -50, scale: 0.95 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative w-full h-full p-4"
              >
                <Image 
                  src={certificates[currentIndex].image} 
                  alt={certificates[currentIndex].title} 
                  fill 
                  className="object-contain drop-shadow-2xl" 
                  unoptimized 
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <button 
            onClick={prevCert}
            className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 hover:bg-black/80 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 z-10"
            aria-label="Previous Certificate"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button 
            onClick={nextCert}
            className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-black/60 hover:bg-black/80 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 z-10"
            aria-label="Next Certificate"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>
          
          {/* Active Certificate Info */}
          <div className="mt-8 text-center">
            <motion.h3 
              key={`title-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-lg sm:text-xl md:text-2xl font-semibold text-white mb-2"
            >
              {certificates[currentIndex].title}
            </motion.h3>
            <motion.p 
              key={`desc-${currentIndex}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-sm sm:text-base text-blue-400"
            >
              {certificates[currentIndex].issuer} • <span className="text-zinc-500 font-mono">{certificates[currentIndex].date}</span>
            </motion.p>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-6 flex-wrap">
            {certificates.map((_, idx) => (
              <button 
                key={idx} 
                onClick={() => setCurrentIndex(idx)}
                className={`transition-all duration-300 rounded-full ${currentIndex === idx ? "w-6 sm:w-8 h-1.5 sm:h-2 bg-blue-500" : "w-1.5 sm:w-2 h-1.5 sm:h-2 bg-zinc-600 hover:bg-zinc-400"}`}
                aria-label={`Go to certificate ${idx + 1}`}
              />
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
}
