"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Plus, Award } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Certificates() {
  const { certificates, openAdminModal } = usePortfolio();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

  // Keep index within bounds if certificates list changes
  useEffect(() => {
    if (currentIndex >= certificates.length) {
      setCurrentIndex(Math.max(0, certificates.length - 1));
    }
  }, [certificates.length, currentIndex]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        }
      );
    }, containerRef);
    
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  useEffect(() => {
    if (isHovered || certificates.length <= 1) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 4500);
    
    return () => clearInterval(timer);
  }, [isHovered, certificates.length]);

  const handleNext = () => {
    if (certificates.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    if (certificates.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5 },
    }),
  };

  const currentCert = certificates[currentIndex];

  return (
    <section id="certificates" className="py-24 relative z-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="inline-block py-1 px-3.5 rounded-full bg-white/10 border border-white/15 text-white text-xs font-semibold tracking-wider uppercase mb-4 shadow-sm">
            CERTIFICATIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            My Certificates
          </h2>
          <p className="text-zinc-300 text-sm max-w-xl mx-auto mt-3">
            Industry verified certifications and credentials in DevOps, Cloud Computing, and Software Engineering.
          </p>

          {/* Upload Button */}
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              onClick={() => openAdminModal("certificates")}
              className="px-5 py-2.5 rounded-full bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm font-semibold flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)] transition-all cursor-pointer"
            >
              <Plus size={16} />
              Upload New Certificate
            </button>
          </div>
        </div>

        {certificates.length > 0 && currentCert ? (
          <div 
            className="max-w-4xl mx-auto relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="glass-card border border-white/10 bg-[#0a0a0a]/70 p-4 md:p-8 rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[3/2] relative">
              
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentCert.id || currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="absolute inset-0 p-4 md:p-8 flex flex-col items-center justify-center"
                >
                  <div className="relative w-full h-3/4 mb-4">
                    <Image 
                      src={currentCert.image}
                      alt={currentCert.title}
                      fill
                      unoptimized
                      className="object-contain drop-shadow-2xl"
                    />
                  </div>
                  <div className="text-center w-full mt-2">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2 truncate px-4">
                      {currentCert.title}
                    </h3>
                    <p className="text-zinc-200 font-medium">
                      {currentCert.issuer}
                    </p>
                    <p className="text-zinc-400 text-sm mt-1">
                      {currentCert.date}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {certificates.length > 1 && (
                <>
                  <button 
                    onClick={handlePrev}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/70 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20"
                    aria-label="Previous Certificate"
                  >
                    <ChevronLeft size={24} />
                  </button>

                  <button 
                    onClick={handleNext}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/70 border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:text-black hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] z-20"
                    aria-label="Next Certificate"
                  >
                    <ChevronRight size={24} />
                  </button>
                </>
              )}
            </div>

            {certificates.length > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {certificates.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setDirection(idx > currentIndex ? 1 : -1);
                      setCurrentIndex(idx);
                    }}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      idx === currentIndex
                        ? 'bg-white w-8 shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                        : 'bg-white/20 hover:bg-white/40 w-2.5'
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center py-12 p-8 rounded-2xl border border-white/10 bg-white/5">
            <Award size={40} className="mx-auto text-zinc-400 mb-3" />
            <h3 className="text-lg font-bold text-white mb-2">No certificates added yet</h3>
            <p className="text-sm text-zinc-400 mb-4">Click below to upload your first certificate.</p>
            <button
              onClick={() => openAdminModal("certificates")}
              className="px-4 py-2 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200"
            >
              Upload Certificate
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
