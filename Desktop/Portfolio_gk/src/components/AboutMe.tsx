import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutMe() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightTextRef = useRef<HTMLDivElement>(null);
  const bentoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      // Reveal left column and right narrative
      tl.fromTo(
        [leftColRef.current, rightTextRef.current],
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", stagger: 0.2 }
      );

      // Stagger in bento boxes
      tl.fromTo(
        bentoRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
        },
        "-=0.6"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="bg-bg border-t border-stroke/50"
    >
      <div className="max-w-[1200px] mx-auto py-24 px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Left Column (Span 5): The Statement */}
          <div ref={leftColRef} className="md:col-span-5 flex flex-col">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
                THE ARCHITECT
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-body font-light text-text-primary leading-tight mb-8">
              Engineering logic into <br />
              <span className="font-display italic text-accent">
                resilient infrastructure.
              </span>
            </h2>
            {/* Subtle glowing accent line/circuit node */}
            <div className="mt-auto pt-8">
              <svg
                width="120"
                height="40"
                viewBox="0 0 120 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="opacity-60"
              >
                <path
                  d="M0 20H40L50 10H80L90 30H120"
                  stroke="url(#paint0_linear)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="40" cy="20" r="3" fill="#89AACC" />
                <circle cx="50" cy="10" r="3" fill="#89AACC" />
                <circle cx="80" cy="10" r="3" fill="#4E85BF" />
                <circle cx="90" cy="30" r="3" fill="#4E85BF" />
                <defs>
                  <linearGradient
                    id="paint0_linear"
                    x1="0"
                    y1="20"
                    x2="120"
                    y2="20"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="#89AACC" />
                    <stop offset="1" stopColor="#4E85BF" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>

          {/* Right Column (Span 7): The Narrative & Data */}
          <div className="md:col-span-7 flex flex-col gap-12">
            {/* Block 1: The Narrative */}
            <div ref={rightTextRef}>
              <p className="text-base md:text-lg text-muted leading-relaxed font-body">
                I am a Second-Year University Student and Software Developer
                based in Kalyan, Maharashtra. My core focus is translating
                complex algorithmic theory into production-grade systems. From
                building low-latency algorithmic trading interfaces and Risk
                Management Systems (RMS) to architecting distributed task
                schedulers, I build for scale, speed, and zero downtime.
              </p>
            </div>

            {/* Block 2: Milestones & Stack (Mini Bento Grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Box A (Experience) */}
              <div
                ref={(el) => { bentoRefs.current[0] = el; }}
                className="bg-surface/50 border border-stroke rounded-2xl p-5 hover:bg-surface transition-colors group flex flex-col justify-between min-h-[140px]"
              >
                <div className="text-muted mb-4 group-hover:text-text-primary transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-widest mb-1 font-body">
                    Experience
                  </div>
                  <div className="text-lg font-medium text-text-primary font-body">
                    SDE Intern @ 8 Bits
                  </div>
                </div>
              </div>

              {/* Box B (Academics) */}
              <div
                ref={(el) => { bentoRefs.current[1] = el; }}
                className="bg-surface/50 border border-stroke rounded-2xl p-5 hover:bg-surface transition-colors group flex flex-col justify-between min-h-[140px]"
              >
                <div className="text-muted mb-4 group-hover:text-text-primary transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 14l9-5-9-5-9 5 9 5z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-widest mb-1 font-body">
                    Academics
                  </div>
                  <div className="text-lg font-medium text-text-primary font-body">
                    9.78 CGPA
                  </div>
                </div>
              </div>

              {/* Box C (Core Languages) */}
              <div
                ref={(el) => { bentoRefs.current[2] = el; }}
                className="bg-surface/50 border border-stroke rounded-2xl p-5 hover:bg-surface transition-colors group flex flex-col justify-between min-h-[140px]"
              >
                <div className="text-muted mb-4 group-hover:text-text-primary transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-widest mb-1 font-body">
                    Core Languages
                  </div>
                  <div className="text-sm font-medium text-text-primary font-body leading-snug">
                    Python, C++, JavaScript / TypeScript
                  </div>
                </div>
              </div>

              {/* Box D (Infrastructure & IoT) */}
              <div
                ref={(el) => { bentoRefs.current[3] = el; }}
                className="bg-surface/50 border border-stroke rounded-2xl p-5 hover:bg-surface transition-colors group flex flex-col justify-between min-h-[140px]"
              >
                <div className="text-muted mb-4 group-hover:text-text-primary transition-colors">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <div>
                  <div className="text-xs text-muted uppercase tracking-widest mb-1 font-body">
                    Infra & IoT
                  </div>
                  <div className="text-sm font-medium text-text-primary font-body leading-snug">
                    FastAPI, AWS, GCP, WebSockets, ESP8266
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
