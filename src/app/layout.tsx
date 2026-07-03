import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Dilip Kumawat | Full Stack Developer & DevOps Enthusiast',
  description: 'Portfolio of Dilip Kumawat — B.Tech 3rd Year CSE student, DevOps & AWS Cloud Intern, skilled in Linux, Docker, React, C++, and AI.',
  keywords: ['Dilip Kumawat', 'Portfolio', 'DevOps', 'AWS', 'React', 'Next.js', 'Full Stack Developer'],
  authors: [{ name: 'Dilip Kumawat' }],
  openGraph: { title: 'Dilip Kumawat | Developer Portfolio', description: 'Explore projects, skills, and journey of Dilip Kumawat.', type: 'website' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className='scroll-smooth'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
        <link href='https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap' rel='stylesheet' />
      </head>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
