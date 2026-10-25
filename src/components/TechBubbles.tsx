"use client";

import { useEffect, useRef, useState } from "react";

const techWords = [
  "Linux", "Docker", "Nginx", "DevOps", "Cloud", "AWS", "Kubernetes",
  "CI/CD", "Git", "React", "Next.js", "TypeScript", "Node.js", "Python",
  "C++", "MongoDB", "Redis", "Terraform", "Ansible", "Jenkins",
  "Prometheus", "Grafana", "Bash", "SSH", "DNS", "TCP/IP",
  "Load Balancer", "Microservices", "API Gateway", "Lambda",
  "S3", "EC2", "CloudFront", "Vercel", "GitHub Actions",
  "Networking", "Firewall", "SSL", "HTTP/3", "WebSocket",
  "REST API", "GraphQL", "PostgreSQL", "Helm", "ArgoCD",
  "Linux Kernel", "systemd", "iptables", "HAProxy", "Vagrant",
];

interface Bubble {
  id: number;
  text: string;
  x: number;
  size: number;
  speed: number;
  opacity: number;
  delay: number;
  blur: number;
  glowColor: string;
}

const glowColors = [
  "rgba(16, 185, 129, 0.6)",  // emerald
  "rgba(245, 158, 11, 0.5)",  // amber
  "rgba(168, 85, 247, 0.4)",  // purple
  "rgba(236, 72, 153, 0.4)",  // pink
  "rgba(34, 211, 238, 0.4)",  // cyan-ish (teal, not blue)
  "rgba(251, 191, 36, 0.5)",  // yellow
  "rgba(239, 68, 68, 0.4)",   // red
  "rgba(163, 230, 53, 0.4)",  // lime
];

export default function TechBubbles() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [scrollY, setScrollY] = useState(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Generate bubbles
    const generated: Bubble[] = [];
    for (let i = 0; i < 40; i++) {
      generated.push({
        id: i,
        text: techWords[i % techWords.length],
        x: Math.random() * 100,
        size: 0.65 + Math.random() * 0.6,
        speed: 0.3 + Math.random() * 0.7,
        opacity: 0.15 + Math.random() * 0.45,
        delay: Math.random() * 20,
        blur: Math.random() > 0.7 ? 1 + Math.random() * 2 : 0,
        glowColor: glowColors[Math.floor(Math.random() * glowColors.length)],
      });
    }
    setBubbles(generated);

    let currentScroll = 0;
    const handleScroll = () => {
      currentScroll = window.scrollY;
    };

    const animate = () => {
      setScrollY(currentScroll);
      animationRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {bubbles.map((bubble) => {
        // Each bubble rises based on scroll + its own animation delay
        const scrollOffset = scrollY * bubble.speed * 0.15;
        const baseY = 110 + bubble.delay * 5; // start below viewport
        const currentY = baseY - scrollOffset;
        
        // Wrap around: if bubble goes too far up, bring it back from bottom
        const wrappedY = ((currentY % 140) + 140) % 140 - 20;
        
        // Slight horizontal wave
        const waveX = Math.sin((scrollY * 0.002 + bubble.delay) * bubble.speed) * 3;

        return (
          <div
            key={bubble.id}
            className="absolute tech-bubble"
            style={{
              left: `${bubble.x + waveX}%`,
              top: `${wrappedY}%`,
              transform: `scale(${bubble.size}) translateZ(0)`,
              opacity: bubble.opacity,
              filter: bubble.blur > 0 ? `blur(${bubble.blur}px)` : undefined,
              willChange: "transform, top",
              transition: "top 0.08s linear",
            }}
          >
            <div
              className="tech-bubble-inner"
              style={{
                boxShadow: `0 0 15px ${bubble.glowColor}, 0 0 30px ${bubble.glowColor.replace(/[\d.]+\)$/, '0.15)')}`,
                borderColor: bubble.glowColor.replace(/[\d.]+\)$/, '0.3)'),
              }}
            >
              <span className="tech-bubble-text">{bubble.text}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
