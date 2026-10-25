"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";

const certificates = [
  {title:'Certificate for the Completion of C Training', issuer:'Spoken Tutorial, IIT Bombay', date:'July 2025', image:'/assets/cert_c_training.png'},
  {title:'Programming in C', issuer:'Infosys Springboard', date:'June 2025', image:'/assets/cert_infosys.png'},
  {title:'Linux, Web Dev & Networking', issuer:'GRRAS Solutions, Jaipur', date:'June 2026', image:'/assets/media__1783081761940.png'},
  {title:'Geo Spatial Intelligence Hackathon', issuer:'Arya College of Engineering & I.T.', date:'February 2026', image:'/assets/media__1783081688026.jpg'},
  {title:'Projectathon 2.0', issuer:'Arya Cipher Coding Club', date:'March 2026', image:'/assets/media__1783081678013.jpg'},
  {title:'MongoDB Basics', issuer:'MongoDB, Inc.', date:'August 2025', image:'/assets/media__1783081651870.png'},
  {title:'Role of Women in New India', issuer:'Ministry of Defence', date:'2025', image:'/assets/media__1783081566895.jpg'}
];

export default function Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(1);

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
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  useEffect(() => {
    if (isHovered) return;
    
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % certificates.length);
    }, 4000);
    
    return () => clearInterval(timer);
  }, [isHovered]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % certificates.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + certificates.length) % certificates.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.5 }
    })
  };

  return (
    <section id="certificates" className="py-20 relative z-10" ref={containerRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-sm font-medium tracking-wider mb-4 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
            CERTIFICATIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">Certificates</span>
          </h2>
        </div>

        <div 
          className="max-w-4xl mx-auto relative group"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="glass-card border border-white/5 bg-[#0a0a0a]/50 p-4 md:p-8 rounded-2xl overflow-hidden aspect-[4/3] md:aspect-[3/2] relative">
            
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0 p-4 md:p-8 flex flex-col items-center justify-center"
              >
                <div className="relative w-full h-3/4 mb-4">
                  <Image 
                    src={certificates[currentIndex].image}
                    alt={certificates[currentIndex].title}
                    fill
                    unoptimized
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="text-center w-full mt-2">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 truncate px-4">{certificates[currentIndex].title}</h3>
                  <p className="text-emerald-300/80 font-medium">{certificates[currentIndex].issuer}</p>
                  <p className="text-gray-400 text-sm mt-1">{certificates[currentIndex].date}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            <button 
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-900/50 hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20"
            >
              <ChevronLeft size={24} />
            </button>

            <button 
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/50 border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-emerald-900/50 hover:border-emerald-500/50 hover:text-emerald-400 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] z-20"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="flex justify-center mt-6 space-x-2">
            {certificates.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setDirection(idx > currentIndex ? 1 : -1);
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-emerald-500 w-8 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
