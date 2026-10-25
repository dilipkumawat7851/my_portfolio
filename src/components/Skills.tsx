"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = [
  {
    title: "DevOps & Cloud",
    icon: "☁️",
    color: "from-orange-500 to-amber-400",
    skills: ["AWS", "Docker", "Linux", "CI/CD", "Networking"],
  },
  {
    title: "Programming",
    icon: "⚡",
    color: "from-emerald-500 to-green-400",
    skills: ["C", "C++", "Python", "DSA"],
  },
  {
    title: "Web Development",
    icon: "🌐",
    color: "from-purple-500 to-pink-500",
    skills: ["HTML", "CSS", "JavaScript", "React", "Next.js"],
  },
  {
    title: "Tools & Platforms",
    icon: "🛠️",
    color: "from-amber-400 to-yellow-500",
    skills: ["Git", "GitHub", "VS Code", "Vercel", "Prompt Engineering"],
  },
];

export default function Skills() {
  const containerRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Staggered Card Entrance
      const cards = cardsRef.current.filter(Boolean);
      
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        rotationX: 10,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      // Gradient Bar and Skill Tags Animation for each card
      cards.forEach((card) => {
        if (!card) return;
        
        const gradientBar = card.querySelector(".gradient-bar");
        const skillTags = card.querySelectorAll(".skill-tag");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
          },
        });

        if (gradientBar) {
          tl.from(gradientBar, {
            scaleX: 0,
            transformOrigin: "left",
            duration: 0.8,
            ease: "power2.out",
          });
        }

        if (skillTags.length) {
          tl.from(skillTags, {
            scale: 0,
            opacity: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "back.out(1.5)",
          }, "-=0.4");
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="skills" ref={containerRef} className="py-24 relative bg-black">
      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-16 text-center">
          <span className="text-emerald-500 uppercase tracking-wider font-semibold text-sm neon-glow-violet block mb-2">My Skills</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Tech <span className="gradient-text">Arsenal</span>
          </h2>
          <div className="section-divider mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              ref={(el) => { cardsRef.current[index] = el; }}
              className="glass-card shimmer holo-border tilt-card rounded-2xl overflow-hidden group hover:neon-glow-violet transition-all duration-300 relative flex flex-col h-full bg-white/5 border border-white/10"
            >
              <div 
                className={`gradient-bar absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${category.color}`}
              ></div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl">{category.icon}</span>
                  <h3 className="text-xl font-bold text-white tracking-wide">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3 mt-auto">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="skill-tag px-3 py-1.5 text-sm font-medium text-gray-200 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 hover:text-white transition-colors cursor-default shadow-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
