import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const VIDEO_SRC =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_112712_da9d53df-6d27-4b12-bdf6-aa9dc2622bdf.mp4";

export default function Ending() {
  const sectionRef = useRef<HTMLElement>(null);

  /* ── IntersectionObserver for entrance animation ── */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("in-view");
            }, 150);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="nl-stage relative w-full min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video plate */}
      <div className="absolute inset-0 z-0">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>
        {/* Dark overlay so text reads clearly */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Thank You Message — centered */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center text-center px-6"
      >
        <span className="text-xs text-white/40 font-mono uppercase tracking-[0.4em] mb-6">
          — end of transmission —
        </span>

        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-display italic leading-[0.9] text-white tracking-tight mb-8">
          Thank you<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-gray-300 to-gray-600">
            for scrolling.
          </span>
        </h2>

        <p className="text-sm md:text-base text-white/40 font-sans max-w-md leading-relaxed">
          You made it to the bottom. That already says something about you.
          <br className="hidden md:block" />
          Let's build something worth scrolling all the way through.
        </p>
      </motion.div>
    </section>
  );
}
