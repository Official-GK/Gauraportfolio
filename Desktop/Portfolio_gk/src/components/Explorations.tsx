import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { src: "/images/exploration_1.png", label: "Data Streams" },
  { src: "/images/exploration_2.png", label: "Neural Nets" },
  { src: "/images/exploration_3.png", label: "Topography" },
  { src: "/images/exploration_4.png", label: "Bio-Tech" },
  { src: "/images/exploration_5.png", label: "Waveforms" },
];

export default function Explorations() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {

      // 1. Bulletproof Video Scrubbing Logic
      const video = videoRef.current;
      if (video) {
        const initVideoScrub = () => {
          // Get the exact duration from the loaded video
          const duration = video.duration || 10;

          // Use a proxy object instead of tweening the video directly for maximum smoothness
          const proxy = { time: 0 };

          gsap.to(proxy, {
            time: duration - 0.1, // Scrub up to right before the very end to prevent loop flashing
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 1.5, // Buttery smooth inertia
            },
            onUpdate: () => {
              if (video.readyState >= 1) {
                video.currentTime = proxy.time;
              }
            }
          });
        };

        // Ensure we only build the timeline AFTER the browser knows the exact video length
        if (video.readyState >= 1) {
          initVideoScrub();
        } else {
          video.addEventListener("loadedmetadata", initVideoScrub);
        }
      }

      // 2. Parallax Column 1 (Extended travel for taller 400vh section)
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: -1200,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      // 3. Parallax Column 2 (Extended travel for taller 400vh section)
      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          y: -1500,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const leftItems = ITEMS.filter((_, i) => i % 2 === 0);
  const rightItems = ITEMS.filter((_, i) => i % 2 !== 0);

  return (
    <>
      <section
        ref={sectionRef}
        id="explorations"
        className="relative min-h-[400vh] bg-bg" /* Increased track length */
      >
        {/* Layer 1: Native CSS Sticky center content + Scroll Video */}
        <div className="sticky top-0 z-10 h-screen flex flex-col items-center justify-center text-center px-6 pointer-events-none overflow-hidden">

          {/* Scroll-Scrubbed Background Video */}
          <div className="absolute inset-0 z-[-1]">
            <video
              ref={videoRef}
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260815_030633_1712fc71-4979-4e14-98f9-9f95702ab3da.mp4"
              className="w-full h-full object-cover opacity-50 mix-blend-screen"
              muted
              playsInline
              preload="auto"
            />
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
          </div>

          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
              Explorations
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-body font-light text-text-primary mb-3">
            Visual{" "}
            <span className="font-display italic">playground</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-md mb-8 font-body">
            Experimental visual work exploring the intersection of code and
            aesthetics.
          </p>
          <a
            href="#"
            className="group relative pointer-events-auto inline-flex items-center gap-2 rounded-full text-sm px-6 py-3 font-body font-medium text-text-primary border border-stroke hover:border-transparent transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
          >
            <span
              className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              style={{
                inset: "-2px",
                background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
              }}
            />
            View on GitHub
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
        </div>

        {/* Layer 2: Parallax columns */}
        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden">
          <div className="max-w-[1400px] mx-auto h-full px-6 md:px-16">
            <div className="grid grid-cols-2 gap-12 md:gap-40 h-full pt-[10vh]">

              {/* Left column */}
              <div ref={col1Ref} className="flex flex-col gap-32">
                {leftItems.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setLightbox(item.src)}
                    className="pointer-events-auto cursor-pointer aspect-square max-w-[320px] bg-surface/80 backdrop-blur-md border border-stroke rounded-3xl overflow-hidden group transition-transform duration-500 hover:scale-105 shadow-2xl"
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className="w-full h-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>

              {/* Right column */}
              <div ref={col2Ref} className="flex flex-col gap-40 mt-[25vh]">
                {rightItems.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setLightbox(item.src)}
                    className="pointer-events-auto cursor-pointer aspect-[4/5] max-w-[320px] bg-surface/80 backdrop-blur-md border border-stroke rounded-3xl overflow-hidden group transition-transform duration-500 hover:scale-105 shadow-2xl ml-auto"
                  >
                    <img
                      src={item.src}
                      alt={item.label}
                      className="w-full h-full object-cover opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-xl flex items-center justify-center p-8 cursor-pointer transition-opacity duration-300"
          onClick={() => setLightbox(null)}
        >
          <img
            src={lightbox}
            alt="Exploration"
            className="max-w-full max-h-[85vh] rounded-[32px] border border-stroke shadow-2xl transform scale-95 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="absolute top-8 right-8 text-white/50 hover:text-white p-3 bg-black/40 rounded-full backdrop-blur-sm transition-colors"
            onClick={() => setLightbox(null)}
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
      )}
    </>
  );
}