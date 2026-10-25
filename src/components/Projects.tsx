"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Github } from "@/components/Icons";

const projects = [
  {title:'Self-Tracker', description:'A habit and self-improvement tracking application that helps users monitor daily goals, habits, and personal growth with intuitive dashboards and analytics.', tech:['React','Node.js','MongoDB','Express'], github:'https://github.com/dilipkumawat7851/Self-tracker', gradient:'from-emerald-500 to-green-400', emoji:'📊'},
  {title:'Portfolio Website', description:'A stunning 3D portfolio website built with Next.js, React Three Fiber, and Framer Motion. Features immersive 3D backgrounds, smooth animations, and responsive design.', tech:['Next.js','Three.js','Tailwind CSS','Framer Motion'], github:'https://github.com/dilipkumawat7851', live:'https://dilipkumawat.vercel.app', gradient:'from-amber-500 to-orange-500', emoji:'🚀'},
  {title:'Expense Tracker', description:'A smart expense tracking application that helps users manage finances, categorize spending, visualize budgets, and track income vs expenses over time.', tech:['React','JavaScript','CSS','LocalStorage'], github:'https://github.com/dilipkumawat7851', gradient:'from-purple-500 to-pink-500', emoji:'💰'}
];

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
          },
        }
      );

      // Cards Animation
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        const tags = card.querySelectorAll(".tech-tag");
        
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });

        tl.fromTo(
          card,
          { opacity: 0, scale: 0.85, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: "back.out(1.2)",
            delay: index * 0.1,
          }
        ).fromTo(
          tags,
          { opacity: 0, scale: 0.5 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            stagger: 0.1,
            ease: "back.out(1.5)",
          },
          "-=0.4"
        );
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div ref={headerRef} className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/10 text-emerald-400 text-sm font-medium tracking-wider uppercase mb-4 neon-glow-violet">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text-hero">
            Featured Projects
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-amber-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => {
                cardsRef.current[index] = el;
              }}
              className="glass-card shimmer holo-border tilt-card rounded-2xl overflow-hidden group relative bg-[#0a0a0a]/50 flex flex-col h-full"
            >
              {/* Gradient Top Border */}
              <div className={`h-2 w-full bg-gradient-to-r ${project.gradient}`}></div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/50 flex items-center justify-center text-3xl shadow-lg border border-white/5 group-hover:scale-110 transition-transform duration-300">
                    {project.emoji}
                  </div>
                  <div className="flex space-x-3">
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-white transition-colors duration-300 p-2 bg-zinc-800/30 rounded-full hover:bg-zinc-700/50 group/link"
                      >
                        <Github size={20} className="group-hover/link:rotate-12 transition-transform duration-300" />
                      </Link>
                    )}
                    {project.live && (
                      <Link
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-zinc-400 hover:text-emerald-400 transition-colors duration-300 p-2 bg-zinc-800/30 rounded-full hover:bg-zinc-700/50 group/link"
                      >
                        <ExternalLink size={20} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                      </Link>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
                  {project.title}
                </h3>
                
                <p className="text-zinc-400 mb-8 flex-grow leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="tech-tag text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Subtle hover glow effect via pseudo-element is handled by CSS, but we can add an absolute div here for extra flair */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/30 rounded-2xl transition-colors duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
