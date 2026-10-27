"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { PortfolioProvider } from "@/context/PortfolioContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Certificates from "@/components/Certificates";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AdminModal from "@/components/AdminModal";

const Scene3D = dynamic(() => import("@/components/Scene3D"), { ssr: false });
const TechBubbles = dynamic(() => import("@/components/TechBubbles"), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Loading Animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          setLoading(false);
        },
      });

      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1, ease: "power2.out" }
      )
        .to(logoRef.current, {
          textShadow: "0 0 25px rgba(255, 255, 255, 0.9)",
          duration: 0.5,
          yoyo: true,
          repeat: 1,
        })
        .to(loaderRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power2.inOut",
          delay: 0.2,
        });
    });

    // Spotlight mouse follower
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <PortfolioProvider>
      <main className="relative gradient-bg min-h-screen overflow-x-hidden text-white">
        {/* Loading Screen */}
        {loading && (
          <div
            ref={loaderRef}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
          >
            <h1
              ref={logoRef}
              className="text-6xl md:text-8xl font-bold text-white tracking-widest drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
            >
              &lt;DK /&gt;
            </h1>
          </div>
        )}

        {/* Spotlight Mouse Follower */}
        <div ref={spotlightRef} className="spotlight" />

        {/* Noise Texture Overlay for Depth */}
        <div className="noise-overlay" />

        {/* 3D Background */}
        <div className="fixed inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen">
          <Scene3D />
        </div>

        {/* Floating Tech Bubbles */}
        <TechBubbles />

        {/* Main Sections */}
        <div className="relative z-10">
          <Navbar />
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Timeline />
          <Certificates />
          <Contact />
          <Footer />
        </div>

        {/* Owner Admin Modal */}
        <AdminModal />
      </main>
    </PortfolioProvider>
  );
}
