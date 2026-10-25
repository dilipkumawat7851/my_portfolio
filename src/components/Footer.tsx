"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/Icons";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 95%",
          }
        }
      );
    }, footerRef);
    
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <footer ref={footerRef} className="relative z-10 pt-10 pb-8 mt-10">
      <div className="section-divider absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="mb-8 text-3xl font-bold tracking-tighter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-amber-400 to-emerald-400 bg-[length:200%_auto] animate-gradient-x">
            &lt;DK /&gt;
          </span>
        </div>
        
        <div className="flex space-x-6 mb-8">
          <a href="https://github.com/dilipkumawat7851" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.5)] rounded-full hover:bg-white/10 p-2">
            <Github size={24} />
          </a>
          <a href="https://www.linkedin.com/in/dilip-kumawat78/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-emerald-400 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(16,185,129,0.5)] rounded-full hover:bg-emerald-400/10 p-2">
            <Linkedin size={24} />
          </a>
          <a href="https://www.instagram.com/dilip______78/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-pink-400 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(236,72,153,0.5)] rounded-full hover:bg-pink-400/10 p-2">
            <Instagram size={24} />
          </a>
          <a href="mailto:dilipkumawat785188@gmail.com" className="text-gray-400 hover:text-amber-400 transition-colors duration-300 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] rounded-full hover:bg-amber-400/10 p-2">
            <Mail size={24} />
          </a>
        </div>
        
        <div className="text-center">
          <p className="text-gray-500 mb-2">
            © 2026 Dilip Kumawat
          </p>
          <p className="text-gray-600 text-sm">
            Crafted with <span className="text-red-500 animate-pulse inline-block">❤️</span> using Next.js, Three.js, GSAP & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}
