export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  image: string;
}

export const defaultCertificates: Certificate[] = [
  {
    id: "1",
    title: "Certificate for the Completion of C Training",
    issuer: "Spoken Tutorial, IIT Bombay",
    date: "July 2025",
    image: "/assets/cert_c_training.png",
  },
  {
    id: "2",
    title: "Programming in C",
    issuer: "Infosys Springboard",
    date: "June 2025",
    image: "/assets/cert_infosys.png",
  },
  {
    id: "3",
    title: "Linux, Web Dev & Networking",
    issuer: "GRRAS Solutions, Jaipur",
    date: "June 2026",
    image: "/assets/media__1783081761940.png",
  },
  {
    id: "4",
    title: "Geo Spatial Intelligence Hackathon",
    issuer: "Arya College of Engineering & I.T.",
    date: "February 2026",
    image: "/assets/media__1783081688026.jpg",
  },
  {
    id: "5",
    title: "Projectathon 2.0",
    issuer: "Arya Cipher Coding Club",
    date: "March 2026",
    image: "/assets/media__1783081678013.jpg",
  },
  {
    id: "6",
    title: "MongoDB Basics",
    issuer: "MongoDB, Inc.",
    date: "August 2025",
    image: "/assets/media__1783081651870.png",
  },
  {
    id: "7",
    title: "Role of Women in New India",
    issuer: "Ministry of Defence",
    date: "2025",
    image: "/assets/media__1783081566895.jpg",
  },
];

export const defaultAvatarUrl = "/assets/avatar.jpg";
