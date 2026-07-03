'use client';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Timeline from '@/components/Timeline';
import Certificates from '@/components/Certificates';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Scene3D = dynamic(() => import('@/components/Scene3D'), { ssr: false });

export default function Home() {
  return (
    <main className='relative gradient-bg min-h-screen'>
      <Scene3D />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <Certificates />
      <Contact />
      <Footer />
    </main>
  );
}
