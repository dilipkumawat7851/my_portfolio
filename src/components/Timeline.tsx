"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";

const milestones = [
  {year:'2024', title:'Started Programming Journey', description:'Began my B.Tech CSE degree and started learning C, C++, and basic programming concepts.', icon:'🌱', color:'from-emerald-400 to-green-500'},
  {year:'2025', title:'Web Development & Certifications', description:'Learned Web Development, earned certifications in C Programming from IIT Bombay & Infosys, and completed MongoDB Basics.', icon:'🌐', color:'from-amber-400 to-orange-500'},
  {year:'2026', title:'Cloud & DevOps Internship', description:'Completed internship at GRRAS Solutions focusing on Linux, Web Dev, GitHub, Networking & Prompt Engineering. Participated in Hackathons.', icon:'☁️', color:'from-purple-400 to-pink-500'},
  {year:'Present', title:'3rd Year B.Tech & Building Projects', description:'Currently in my 3rd year of B.Tech. Expanding skills in AWS, Docker, and building full-stack applications.', icon:'🚀', color:'from-red-400 to-rose-500'}
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const dotsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          },
        }
      );

      // Line animation (Draws down)
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 50%",
              end: "bottom 80%",
              scrub: 0.5,
            },
          }
        );
      }

      // Cards and dots animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        const isEven = index % 2 === 0;
        const dot = dotsRef.current[index];

        // Card sliding in
        gsap.fromTo(
          card,
          { 
            opacity: 0, 
            x: isEven ? -100 : 100 
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
        );

        // Dot pulsing
        if (dot) {
          gsap.fromTo(
            dot,
            { scale: 0, opacity: 0 },
            {
              scale: 1,
              opacity: 1,
              duration: 0.5,
              ease: "back.out(2)",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
              },
            }
          );
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="journey" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium tracking-wider uppercase mb-4 neon-glow-violet">
            My Journey
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            The Timeline
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="relative">
          {/* Central Line Background */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2 rounded-full"></div>
          
          {/* Animated Drawing Line */}
          <div 
            ref={lineRef}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-500 via-amber-500 to-purple-500 -translate-x-1/2 rounded-full transform origin-top"
          ></div>

          <div className="space-y-16">
            {milestones.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`relative flex flex-col md:flex-row items-start ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Center Dot */}
                  <div 
                    ref={(el) => { dotsRef.current[index] = el; }}
                    className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-black border-4 border-emerald-500 -translate-x-1/2 mt-6 flex items-center justify-center z-20 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
                  >
                    <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                  </div>

                  {/* Empty space for the other side on desktop */}
                  <div className="hidden md:block w-1/2 px-12"></div>

                  {/* Card Content */}
                  <div 
                    ref={(el) => { cardsRef.current[index] = el; }}
                    className="w-full md:w-1/2 pl-14 md:pl-0 md:px-12"
                  >
                    <div className="glass-card tilt-card holo-border p-8 rounded-2xl bg-[#0a0a0a]/50 relative group hover:bg-[#0a0a0a]/80 transition-colors duration-300">
                      
                      <div className="absolute -top-4 -right-4 md:-left-4 md:right-auto w-20 h-20 bg-gradient-to-br from-emerald-500/15 to-amber-500/15 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500"></div>

                      <div className="flex items-center space-x-4 mb-4 relative z-10">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg bg-gradient-to-br ${milestone.color}`}>
                          {milestone.icon}
                        </div>
                        <div>
                          <span className="text-emerald-400 font-mono font-semibold tracking-wider">
                            {milestone.year}
                          </span>
                          <h3 className="text-2xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-amber-400 transition-all duration-300">
                            {milestone.title}
                          </h3>
                        </div>
                      </div>
                      
                      <p className="text-zinc-400 leading-relaxed relative z-10">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
