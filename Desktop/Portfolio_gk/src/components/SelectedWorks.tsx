import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParallaxCarousel } from "./ParallaxCarousel";
import { X } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tech: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
};

const PROJECTS: Project[] = [
  {
    id: 0,
    title: "Questly",
    category: "Web Application",
    description: "Questly Vibrance Hub, an interactive dashboard and management platform.",
    longDescription: "Developed Questly, a dynamic web application providing an intuitive dashboard for users. Features a vibrant, modern UI with seamless navigation and data visualization capabilities.",
    tech: ["React", "Tailwind CSS", "Vite"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    githubUrl: "https://github.com/Official-GK/questly_12.git",
    liveUrl: "https://official-gk.github.io/questly_12/#/dashboard"
  },
  {
    id: 0.5,
    title: "CryptoVault",
    category: "Web3 & Fintech",
    description: "A comprehensive cryptocurrency wallet dashboard and landing page.",
    longDescription: "Developed CryptoVault, a sleek cryptocurrency wallet interface. Features a modern landing page, authentication flow, faucet, and an intuitive dashboard for managing digital assets.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=2069&auto=format&fit=crop",
    githubUrl: "https://github.com/Official-GK/crypto-wallet.git",
    liveUrl: "https://official-gk.github.io/crypto-wallet/"
  },
  {
    id: 1,
    title: "TATA Retail Analytics",
    category: "AI & Full Stack",
    description: "Production-grade retail analytics platform featuring automated revenue monitoring and AI-driven customer segmentation.",
    longDescription: "Architected a scalable analytics pipeline for TATA Retail using Python and Pandas to parse gigabytes of daily POS transaction data. Built a real-time dashboard using Streamlit that empowers store managers to dynamically segment customers and optimize inventory routing across regional warehouses.",
    tech: ["Python", "Streamlit", "Pandas", "Scikit-Learn"],
    image: "/images/project_tata_retail.png",
  },
  {
    id: 2,
    title: "Climate Risk Insight Engine",
    category: "Geospatial ML Pipeline",
    description: "Automated satellite radar (SAR) processing pipeline executing real-time flood perimeter detection and risk status classification.",
    longDescription: "Engineered an end-to-end computer vision pipeline utilizing PyTorch to segment flood boundaries from SAR imagery. Deployed the inference engine on AWS, integrated with GeoPandas for mapping risk zones, achieving a 40% reduction in reporting latency during crisis events.",
    tech: ["PyTorch", "Computer Vision", "GeoPandas", "AWS"],
    image: "/images/project_climate_risk.png",
  },
  {
    id: 3,
    title: "KAMBALA Trading RMS",
    category: "Fintech Systems",
    description: "High-throughput algorithmic trading execution layer integrated with real-time Risk Management Systems and exchange APIs.",
    longDescription: "Developed the core C++ execution engine for a high-frequency trading platform. Optimized WebSocket connections to the Noren API for sub-millisecond market data ingestion and integrated a FastAPI microservice to serve live portfolio risk metrics to the frontend GUI.",
    tech: ["C++", "WebSockets", "FastAPI", "Noren API"],
    image: "/images/project_kambala_gui.png",
  },
  {
    id: 4,
    title: "RewardSync",
    category: "Distributed Systems",
    description: "Real-time loyalty architecture providing instant POS feedback, integrated via WebSockets for sub-second latency.",
    longDescription: "Designed a distributed loyalty points system using Node.js and Redis pub/sub. The architecture guarantees atomicity in concurrent transactions and delivers instant push notifications to mobile clients via WebSockets when customers earn rewards at checkout.",
    tech: ["Node.js", "Redis", "React", "PostgreSQL"],
    image: "/images/project_rewardsync.png",
  },
  {
    id: 5,
    title: "Distributed Task Scheduler",
    category: "Core Infrastructure",
    description: "Fault-tolerant asynchronous job orchestration engine built with automatic worker failover and queue prioritization.",
    longDescription: "Built a robust distributed task scheduler inspired by Celery. Implemented a master-worker architecture using gRPC for ultra-fast RPC communication. It supports priority queues, automatic node failure detection, and graceful task retries within isolated Docker containers.",
    tech: ["Python", "gRPC", "Docker", "AWS"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=2034&auto=format&fit=crop",
  }
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function SelectedWorks() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock body scroll when modal is open
  if (typeof window !== "undefined") {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  return (
    <section id="work" className="bg-bg py-12 md:py-20 overflow-hidden relative">
      <div className="w-full px-6 sm:px-12">

        {/* Header Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
                FEATURED PROJECTS
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-body font-light text-text-primary mb-4">
              Architecting the{" "}
              <span className="font-display italic">future.</span>
            </h2>
            <p className="text-sm md:text-base text-muted max-w-md font-body">
              A curated collection of my most impactful work, spanning distributed systems, high-frequency execution pipelines, and machine learning models.
            </p>
          </div>

          {/* View all button (desktop) */}
          <a
            href="#"
            className="hidden md:inline-flex group relative items-center gap-2 rounded-full text-sm px-6 py-3 font-body font-medium text-text-primary border border-stroke hover:border-transparent transition-all duration-300 mt-6 md:mt-0"
          >
            <span
              className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              style={{
                inset: "-2px",
                background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
              }}
            />
            View all architecture
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
        </motion.div>
      </div>

      {/* Parallax Carousel Wrapper */}
      <div className="w-full pb-10 mt-8">
        <ParallaxCarousel
          data={PROJECTS}
          renderItem={(project: Project) => (
            <div 
              className="relative group w-full h-[350px] md:h-[450px] rounded-3xl overflow-hidden border border-stroke cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >

              {/* Project Image */}
              <img
                src={project.image}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />

              {/* Halftone Overlay */}
              <div
                className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                  backgroundSize: "4px 4px",
                }}
              />

              {/* Dark Gradient Fade at bottom for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Project Details Overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col justify-end transform transition-transform duration-500">
                <span className="text-xs font-semibold text-muted uppercase tracking-widest mb-2">
                  {project.category}
                </span>

                <h3 className="text-2xl md:text-3xl font-display italic text-text-primary mb-3">
                  {project.title}
                </h3>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-body text-text-primary bg-white/5 border border-white/10 px-3 py-1 rounded-full backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hover View Label */}
              <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs px-4 py-2 rounded-full font-body">
                  View Details
                </span>
              </div>
            </div>
          )}
        />
      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative w-full max-w-5xl bg-surface border border-stroke rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl z-10"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 bg-black/50 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-1/2 h-[250px] sm:h-[350px] md:h-auto relative border-b md:border-b-0 md:border-r border-stroke">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none" style={{ backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)", backgroundSize: "4px 4px" }} />
              </div>

              <div className="w-full md:w-1/2 p-8 sm:p-10 md:p-12 flex flex-col justify-center bg-bg/50">
                <span className="text-xs font-semibold text-accent uppercase tracking-widest mb-3">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-display italic text-text-primary mb-6">
                  {selectedProject.title}
                </h3>
                <p className="text-muted font-body text-sm md:text-base leading-relaxed mb-8">
                  {selectedProject.longDescription}
                </p>
                
                {(selectedProject.githubUrl || selectedProject.liveUrl) && (
                  <div className="flex flex-wrap gap-4 mb-8">
                    {selectedProject.githubUrl && (
                      <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-body text-text-primary hover:text-black hover:bg-white transition-all border border-stroke px-4 py-2 rounded-full">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        GitHub
                      </a>
                    )}
                    {selectedProject.liveUrl && (
                      <a href={selectedProject.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-body text-text-primary hover:text-black hover:bg-white transition-all border border-stroke px-4 py-2 rounded-full">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                )}
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {selectedProject.tech.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs font-body text-text-primary bg-surface border border-stroke px-4 py-2 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}