"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Mail, Lock } from "lucide-react";
import { Github, Linkedin, Instagram } from "@/components/Icons";
import { usePortfolio } from "@/context/PortfolioContext";

export default function Footer() {
  const { openAdminModal } = usePortfolio();
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
      <div className="section-divider absolute top-0 left-0 w-full h-px bg-white/10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="mb-6 text-3xl font-bold tracking-tighter">
          <span className="text-white">
            &lt;DK /&gt;
          </span>
        </div>
        
        <div className="flex space-x-6 mb-8">
          <a href="https://github.com/dilipkumawat7851" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full hover:bg-white/10 p-2.5">
            <Github size={22} />
          </a>
          <a href="https://www.linkedin.com/in/dilip-kumawat78/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full hover:bg-white/10 p-2.5">
            <Linkedin size={22} />
          </a>
          <a href="https://www.instagram.com/dilip______78/" target="_blank" rel="noopener noreferrer" className="text-zinc-300 hover:text-white transition-colors duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full hover:bg-white/10 p-2.5">
            <Instagram size={22} />
          </a>
          <a href="mailto:dilipkumawat785188@gmail.com" className="text-zinc-300 hover:text-white transition-colors duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] rounded-full hover:bg-white/10 p-2.5">
            <Mail size={22} />
          </a>
        </div>
        
        <div className="text-center space-y-2">
          <p className="text-zinc-300 text-sm">
            © 2026 Dilip Kumawat. All rights reserved.
          </p>
          <p className="text-zinc-400 text-xs">
            Crafted with precision using Next.js, Three.js, GSAP & Tailwind CSS
          </p>

          <div className="pt-3">
            <button
              onClick={() => openAdminModal("certificates")}
              className="text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1.5 py-1 px-3 rounded-full border border-white/5 hover:border-white/20 hover:bg-white/5 cursor-pointer"
            >
              <Lock size={12} />
              <span>Owner Access</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
