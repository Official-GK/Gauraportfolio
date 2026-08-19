import { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Contact() {
  const [time, setTime] = useState("");

  // Live Clock Logic (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to IST
      const timeString = now.toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setTime(`${timeString} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="bg-[#050505] relative min-h-screen flex flex-col overflow-hidden selection:bg-blue-500/30">
      
      {/* Deep Space Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_bottom,rgba(96,165,250,0.15),transparent_60%)] pointer-events-none" />
      
      {/* Top Status Bar */}
      <div className="w-full pt-12 px-6 sm:px-12 flex justify-center relative z-10">
        <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] sm:text-xs text-gray-400 font-mono tracking-widest uppercase">
            SYS.STATUS: ONLINE // KALYAN, IN // {time}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6 relative z-10 mt-10 md:mt-0">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-center flex flex-col items-center"
        >
          <span className="text-sm md:text-base text-gray-500 font-sans tracking-[0.3em] uppercase mb-6 block">
            Initiate Protocol
          </span>
          
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-[120px] leading-[0.9] font-display text-gray-200 tracking-tight mb-12">
            Let's build the <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-600">
              impossible.
            </span>
          </h2>

          {/* Custom Magnetic Button Wrapper */}
          <MagneticButton>
            <a 
              href="mailto:your.email@gmail.com"
              className="group relative inline-flex items-center justify-center w-[180px] h-[180px] sm:w-[220px] sm:h-[220px] rounded-full bg-transparent border border-white/20 text-white font-sans text-sm sm:text-base tracking-widest uppercase overflow-hidden transition-colors duration-500 hover:border-blue-500/50 hover:bg-blue-500/5"
            >
              {/* Radar sweep background effect */}
              <div className="absolute inset-0 bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,rgba(96,165,250,0.1)_50%,transparent_100%)] opacity-0 group-hover:opacity-100 group-hover:animate-[spin_4s_linear_infinite] transition-opacity duration-500" />
              
              <span className="relative z-10 flex flex-col items-center gap-2">
                Say Hello
                <svg className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </MagneticButton>
        </motion.div>
      </div>

      {/* Footer / Social Links */}
      <div className="w-full px-6 sm:px-12 pb-10 mt-20 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
        <div className="text-xs text-gray-600 font-mono tracking-widest">
          © {new Date().getFullYear()} GAURAV KULKARNI
        </div>
        
        <div className="flex items-center gap-8 text-xs font-mono tracking-widest text-gray-400">
          <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">
            GITHUB
          </a>
          <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noreferrer" className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">
            LINKEDIN
          </a>
          <a href="https://twitter.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-white transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-white hover:after:w-full after:transition-all after:duration-300">
            TWITTER
          </a>
        </div>
      </div>

    </section>
  );
}

// --- MAGNETIC PHYSICS WRAPPER ---
// This applies the high-end "pulling" physics when the mouse gets near the button
function MagneticButton({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Smooth spring physics for the magnetic pull
  const springX = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const springY = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    // Calculate the pull strength (adjust the divisor to make it more/less magnetic)
    x.set(middleX * 0.2);
    y.set(middleY * 0.2);
  };

  const handleMouseLeave = () => {
    // Snap back to center when the mouse leaves
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block p-4" // Padding increases the magnetic "hitbox"
    >
      {children}
    </motion.div>
  );
}
