"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { Lock, Unlock } from "lucide-react";
import { usePortfolio } from "@/context/PortfolioContext";

const navLinks = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Skills", id: "skills" },
  { name: "Projects", id: "projects" },
  { name: "Journey", id: "journey" },
  { name: "Certificates", id: "certificates" },
  { name: "Contact", id: "contact" },
];

export default function Navbar() {
  const { openAdminModal, isAuthenticated } = usePortfolio();
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Entrance Animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2 } // wait for loading screen
    );

    // Scroll Handler
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    // Intersection Observer for Active Section
    const observers: IntersectionObserver[] = [];
    
    navLinks.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                setActiveSection(id);
              }
            });
          },
          { threshold: 0.5, rootMargin: "-50px 0px -50% 0px" }
        );
        observer.observe(element);
        observers.push(observer);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: "smooth",
      });
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (mobileMenuRef.current) {
      if (mobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          height: "auto",
          opacity: 1,
          duration: 0.3,
          ease: "power2.out",
          display: "block"
        });
      } else {
        gsap.to(mobileMenuRef.current, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          display: "none"
        });
      }
    }
  }, [mobileMenuOpen]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-black/80 backdrop-blur-md shadow-lg border-b border-white/5"
          : "bg-transparent backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#home" onClick={(e) => handleSmoothScroll(e, "home")}>
              <span className="text-3xl font-bold tracking-tighter text-white">
                &lt;DK /&gt;
              </span>
            </a>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-baseline space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleSmoothScroll(e, link.id)}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors hover:text-white ${
                    activeSection === link.id ? "text-white" : "text-zinc-300"
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white shadow-[0_0_8px_#ffffff] rounded-full" />
                  )}
                </a>
              ))}
            </div>

            {/* Owner Button */}
            <button
              onClick={() => openAdminModal("certificates")}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isAuthenticated
                  ? "bg-white text-black hover:bg-zinc-200 shadow-md"
                  : "bg-white/10 hover:bg-white/20 text-white border border-white/15"
              }`}
              title={isAuthenticated ? "Owner Mode Active (Dilip)" : "Owner Access (Restricted to Dilip)"}
            >
              {isAuthenticated ? (
                <>
                  <Unlock size={13} />
                  <span>👑 Owner</span>
                </>
              ) : (
                <>
                  <Lock size={13} />
                  <span>Owner</span>
                </>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-3">
            <button
              onClick={() => openAdminModal("certificates")}
              className="p-1.5 rounded-lg bg-white/10 text-white border border-white/15 text-xs flex items-center gap-1"
              title="Owner Portal"
            >
              {isAuthenticated ? <Unlock size={14} /> : <Lock size={14} />}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-300 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ease-in-out ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${mobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div ref={mobileMenuRef} className="md:hidden overflow-hidden hidden bg-black/95 backdrop-blur-lg border-b border-white/10">
        <div className="px-4 pt-2 pb-4 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => handleSmoothScroll(e, link.id)}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                activeSection === link.id
                  ? "text-white bg-white/10"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              openAdminModal("certificates");
            }}
            className="w-full mt-2 py-2 px-3 rounded-md text-left text-sm font-semibold text-white bg-white/10 flex items-center gap-2"
          >
            {isAuthenticated ? <Unlock size={16} /> : <Lock size={16} />}
            Owner Control Portal
          </button>
        </div>
      </div>
    </nav>
  );
}
