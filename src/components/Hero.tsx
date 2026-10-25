"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

export default function Hero() {
  const container = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const helloRef = useRef<HTMLParagraphElement>(null);
  const firstNameRef = useRef<HTMLSpanElement>(null);
  const lastNameRef = useRef<HTMLSpanElement>(null);
  const typewriterRef = useRef<HTMLDivElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const btnsRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  
  const titles = ['DevOps Enthusiast', 'AWS Cloud Intern', 'Full Stack Developer', 'Problem Solver', 'Linux Lover'];
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const title = titles[currentTitleIndex];
    let timeoutId: NodeJS.Timeout;

    if (!isDeleting && currentText === title) {
      timeoutId = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
    } else {
      timeoutId = setTimeout(() => {
        setCurrentText(title.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }, isDeleting ? 50 : 100);
    }

    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentTitleIndex, titles]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Entrance Timeline
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    tl.fromTo(badgeRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
      .fromTo(helloRef.current, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.5 }, "-=0.2")
      .fromTo(firstNameRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.2")
      .fromTo(lastNameRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")
      .fromTo(typewriterRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.1")
      .fromTo(descRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.2")
      .fromTo(btnsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .fromTo(avatarRef.current, { opacity: 0, scale: 0.8, filter: "blur(10px)" }, { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }, "-=1");

    // Parallax Orbs
    gsap.to(".glow-orb-1", {
      y: -150,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    });

    gsap.to(".glow-orb-2", {
      y: -100,
      scrollTrigger: {
        trigger: container.current,
        start: "top top",
        end: "bottom top",
        scrub: 1.5
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section id="home" ref={container} className="relative min-h-screen grid-pattern flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Background glow orbs */}
      <motion.div 
        className="glow-orb-1 absolute top-1/4 left-1/4 w-64 h-64 bg-emerald-600/15 rounded-full blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="glow-orb-2 absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-600/15 rounded-full blur-[100px] pointer-events-none"
        animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          
          {/* Left Content */}
          <div className="flex-1 flex flex-col items-start text-left space-y-6">
            <div ref={badgeRef} className="glass-card px-4 py-2 rounded-full flex items-center space-x-2 border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-sm font-medium text-gray-300">Available for opportunities</span>
            </div>

            <div className="space-y-2">
              <p ref={helloRef} className="text-xl md:text-2xl text-gray-400 font-medium tracking-wide">Hello, I'm</p>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white flex flex-col sm:flex-row sm:space-x-4">
                <span ref={firstNameRef}>Dilip</span>
                <span ref={lastNameRef} className="gradient-text-hero">Kumawat</span>
              </h1>
            </div>

            <div ref={typewriterRef} className="h-8 text-xl md:text-3xl font-semibold text-gray-300 flex items-center">
              <span>I am a </span>
              <span className="ml-2 text-emerald-400">{currentText}</span>
              <span className="w-1 h-8 bg-emerald-400 ml-1 animate-pulse"></span>
            </div>

            <p ref={descRef} className="text-gray-400 text-lg md:text-xl max-w-2xl leading-relaxed">
              B.Tech 3rd Year CSE student at Arya College of Engineering, Jaipur. Passionate about DevOps, Cloud Computing, and building scalable solutions.
            </p>

            <div ref={btnsRef} className="flex flex-wrap gap-4 pt-4">
              <a href="#projects" className="btn-glow px-8 py-3 rounded-full font-medium text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center space-x-2">
                <span>⚡ View Projects</span>
              </a>
              <a href="#contact" className="btn-outline px-8 py-3 rounded-full font-medium text-white border border-white/20 hover:border-emerald-500 hover:bg-white/5 transition-all flex items-center space-x-2">
                <span>📬 Contact Me</span>
              </a>
            </div>
          </div>

          {/* Right Content - Avatar */}
          <div ref={avatarRef} className="relative w-64 h-64 md:w-80 md:h-80 flex-shrink-0">
            {/* Spinning decorative rings */}
            <div className="absolute inset-[-20px] rounded-full border border-emerald-500/20 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-[-40px] rounded-full border border-amber-500/10 animate-[spin_15s_linear_infinite_reverse]" />
            
            {/* Main Avatar Container */}
            <div className="relative w-full h-full rounded-full p-2 bg-gradient-to-tr from-emerald-600 to-amber-500 animate-[spin_4s_linear_infinite]">
              <div className="w-full h-full rounded-full overflow-hidden bg-black animate-[spin_4s_linear_infinite_reverse]">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image 
                    src="/assets/avatar.jpg"
                    alt="Dilip Kumawat"
                    fill
                    unoptimized={true}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating Badge */}
            <motion.div 
              className="absolute bottom-4 right-4 glass-card p-3 rounded-2xl border border-white/10 shadow-xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <span className="text-2xl">🔥</span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
        <div className="w-6 h-10 border-2 border-gray-500 rounded-full p-1">
          <motion.div 
            className="w-1.5 h-1.5 bg-gray-400 rounded-full mx-auto"
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
