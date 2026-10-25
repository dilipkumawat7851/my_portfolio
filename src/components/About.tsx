"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const skills = [
  { name: "C / C++", level: 80 },
  { name: "DevOps & Cloud", level: 75 },
  { name: "AWS", level: 70 },
  { name: "Linux", level: 80 },
  { name: "Frontend (React/Next.js)", level: 75 },
  { name: "Docker", level: 65 },
  { name: "DSA", level: 70 },
];

const stats = [
  { label: "Projects", value: "5+", icon: "🚀" },
  { label: "Technologies", value: "10+", icon: "⚡" },
  { label: "Certificates", value: "5+", icon: "📜" },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal Text
      if (textRef.current) {
        const paragraphs = textRef.current.querySelectorAll("p");
        gsap.from(paragraphs, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
          },
        });
      }

      // Animated Counters
      countersRef.current.forEach((counter, i) => {
        if (!counter) return;
        const targetValue = parseInt(stats[i].value.replace(/\D/g, ""));
        const suffix = stats[i].value.replace(/\d/g, "");
        
        gsap.fromTo(
          counter,
          { innerHTML: 0 },
          {
            innerHTML: targetValue,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: counter,
              start: "top 85%",
            },
            onUpdate: function () {
              counter.innerHTML = Math.ceil(Number(this.targets()[0].innerHTML)) + suffix;
            },
          }
        );
      });

      // Stats Reveal
      if (statsRef.current) {
        const cards = statsRef.current.querySelectorAll(".stat-card");
        gsap.from(cards, {
          scale: 0.8,
          opacity: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 85%",
          },
        });
      }

      // Skills Bars
      if (skillsRef.current) {
        const skillBars = skillsRef.current.querySelectorAll(".skill-fill");
        gsap.from(skillBars, {
          width: 0,
          duration: 1.5,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    card.style.transition = "transform 0.5s ease";
    setTimeout(() => {
      card.style.transition = "";
    }, 500);
  };

  return (
    <section id="about" ref={containerRef} className="py-24 relative overflow-hidden bg-black">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <span className="text-emerald-500 uppercase tracking-wider font-semibold text-sm neon-glow-violet block mb-2">About Me</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get to Know <span className="gradient-text">Me</span>
          </h2>
          <div className="section-divider mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div ref={textRef} className="space-y-4 text-gray-300 text-lg leading-relaxed">
              <p>
                Hello! I am Dilip Kumawat, a passionate and dedicated technologist with a strong focus on Cloud, DevOps, and Full-Stack Development.
              </p>
              <p>
                My journey in technology is driven by a constant desire to learn and implement robust solutions that solve real-world problems.
              </p>
            </div>
            
            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="stat-card glass-card shimmer holo-border p-6 rounded-xl flex flex-col items-center justify-center text-center cursor-pointer will-change-transform"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="text-3xl mb-3">{stat.icon}</span>
                  <h3 className="text-3xl font-bold text-white mb-1 drop-shadow-md">
                    <span ref={(el) => { countersRef.current[index] = el; }}>
                      {stat.value}
                    </span>
                  </h3>
                  <p className="text-sm text-gray-400 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div ref={skillsRef} className="glass-card rounded-2xl p-8 space-y-6">
            <h3 className="text-2xl font-semibold text-white mb-6">Core Competencies</h3>
            {skills.map((skill, index) => (
              <div key={index} className="group">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300 font-medium">{skill.name}</span>
                  <span className="text-emerald-400 font-bold">{skill.level}%</span>
                </div>
                <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden relative">
                  <div 
                    className="skill-fill h-full bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500 rounded-full relative"
                    style={{ width: `${skill.level}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow-[0_0_8px_4px_rgba(255,255,255,0.6)]"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
