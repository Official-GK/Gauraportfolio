import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const ROLES = [
  {
    title: 'FULL STACK DEV',
    skills: 'React.js, Vite, TypeScript, Tailwind CSS, GSAP, MERN Stack. Architecting seamless, cinematic user interfaces linked to robust data layers.',
    src: '/images/fulll_stack_dev.png',
    bg: '#06080A'
  },
  {
    title: 'BACKEND SYSTEMS ENGINEER',
    skills: 'Python, C++, FastAPI, Distributed Task Schedulers, Microservices, AWS. Architecting fault-tolerant infrastructure and high-throughput server logic.',
    src: '/images/backend_dev.png',
    bg: '#050806'
  },
  {
    title: 'AI & DATA ENGINEER',
    skills: 'PyTorch, Computer Vision, Streamlit, Geospatial AI, Pandas. Building automated machine learning pipelines and real-time data analytics engines.',
    src: '/images/ai_data_eng.png',
    bg: '#0A050A'
  }
];

export default function RoleCapabilitiesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Preload images
    ROLES.forEach(role => {
      const img = new Image();
      img.src = role.src;
    });

    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navigate = (dir: 'next' | 'prev') => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (dir === 'next') {
      setActiveIndex(prev => (prev + 1) % 3);
    } else {
      setActiveIndex(prev => (prev + 2) % 3);
    }
    setTimeout(() => {
      setIsAnimating(false);
    }, 650);
  };

  const getStyle = (idx: number) => {
    if (idx === activeIndex) {
      // Center
      return {
        transform: `translateX(-50%) scale(${isMobile ? 1.25 : 1.68})`,
        filter: 'blur(0px)',
        opacity: 1,
        zIndex: 20,
        left: '50%',
        height: isMobile ? '60%' : '92%',
        bottom: isMobile ? '22%' : '0'
      };
    } else if (idx === (activeIndex + 2) % 3) {
      // Left
      return {
        transform: `translateX(-50%) scale(1)`,
        filter: 'blur(4px)',
        opacity: 0.4,
        zIndex: 10,
        left: isMobile ? '15%' : '25%',
        height: isMobile ? '20%' : '32%',
        bottom: isMobile ? '32%' : '12%'
      };
    } else {
      // Right
      return {
        transform: `translateX(-50%) scale(1)`,
        filter: 'blur(4px)',
        opacity: 0.4,
        zIndex: 10,
        left: isMobile ? '85%' : '75%',
        height: isMobile ? '20%' : '32%',
        bottom: isMobile ? '32%' : '12%'
      };
    }
  };

  return (
    <section
      id="capabilities"
      className="relative w-full h-screen overflow-hidden"
      style={{ backgroundColor: ROLES[activeIndex].bg, transition: 'background-color 650ms cubic-bezier(0.4,0,0.2,1)' }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-[50]"
        style={{
          opacity: 0.4,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E")`
        }}
      />

      {/* Giant Ghost Text */}
      <div className="absolute inset-x-0 flex items-center justify-center pointer-events-none select-none z-[2]" style={{ top: '20%' }}>
        <h2
          className="font-display italic text-white opacity-[0.04] whitespace-nowrap"
          style={{ fontSize: 'clamp(60px, 18vw, 250px)', lineHeight: 1, letterSpacing: '-0.02em' }}
        >
          CAPABILITIES
        </h2>
      </div>

      {/* Top-left label */}
      <div className="absolute top-8 left-6 sm:left-12 z-[60]">
        <span className="text-xs font-semibold uppercase text-muted" style={{ letterSpacing: '0.25em' }}>
          SYSTEM ARCHITECTURE
        </span>
      </div>

      {/* Carousel items */}
      {ROLES.map((role, idx) => {
        const style = getStyle(idx);
        return (
          <div
            key={idx}
            className="absolute aspect-[0.6/1]"
            style={{
              ...style,
              transition: 'transform 650ms cubic-bezier(0.4,0,0.2,1), filter 650ms cubic-bezier(0.4,0,0.2,1), opacity 650ms cubic-bezier(0.4,0,0.2,1), left 650ms cubic-bezier(0.4,0,0.2,1), height 650ms cubic-bezier(0.4,0,0.2,1), bottom 650ms cubic-bezier(0.4,0,0.2,1)',
              willChange: 'transform, filter, opacity, left'
            }}
          >
            <img
              src={role.src}
              alt={role.title}
              className="w-full h-full object-contain object-bottom pointer-events-none"
              draggable="false"
            />
          </div>
        );
      })}

      {/* Bottom UI */}
      <div className="absolute bottom-8 left-6 sm:bottom-16 sm:left-12 max-w-[420px] z-[60]">
        <h3 className="font-body font-light text-2xl sm:text-4xl text-text-primary mb-3 transition-all duration-300">
          {ROLES[activeIndex].title}
        </h3>
        <p className="font-body text-sm sm:text-base text-muted mb-6 leading-[1.6] transition-all duration-300">
          {ROLES[activeIndex].skills}
        </p>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('prev')}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-transparent border border-stroke flex items-center justify-center hover:scale-105 hover:bg-white/10 transition-all duration-300 group"
          >
            <ArrowLeft className="w-5 h-5 text-white group-hover:-translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigate('next')}
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-transparent border border-stroke flex items-center justify-center hover:scale-105 hover:bg-white/10 transition-all duration-300 group"
          >
            <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Bottom Right Link */}
      <div className="absolute bottom-8 right-6 sm:bottom-16 sm:right-12 z-[60]">
        <a
          href="#work"
          className="group flex items-center gap-2 font-display italic text-text-primary opacity-70 hover:opacity-100 transition-opacity"
          style={{ fontSize: 'clamp(28px, 4vw, 48px)' }}
        >
          View works
          <ArrowRight className="w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-2 transition-transform" />
        </a>
      </div>
    </section>
  );
}
