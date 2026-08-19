import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DOMAINS = [
  {
    title: "CORE LANGUAGES",
    skills: ["C++", "Python", "JavaScript", "TypeScript", "SQL"],
  },
  {
    title: "INFRASTRUCTURE",
    skills: [
      "FastAPI",
      "Flask",
      "REST APIs",
      "AWS",
      "Google Cloud",
      "WebSockets",
      "Microservices",
    ],
  },
  {
    title: "FRONTEND / UI",
    skills: [
      "React.js",
      "MERN Stack",
      "Tailwind CSS",
      "Vite",
      "Streamlit",
      "GSAP",
    ],
  },
  {
    title: "EDGE / IOT",
    skills: [
      "ESP8266",
      "Microcontrollers",
      "Telemetry",
      "Sensor Integration",
      "Relay Modules",
    ],
  },
];

export default function Capabilities() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);

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

      // Animate header
      tl.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Stagger in columns
      tl.fromTo(
        colRefs.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="capabilities"
      ref={sectionRef}
      className="bg-bg border-t border-stroke/50"
    >
      <div className="max-w-[1200px] mx-auto py-24 px-6 md:px-16">
        {/* Section Header */}
        <div ref={headerRef} className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
              SYSTEM CAPABILITIES
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-body font-light text-text-primary leading-tight">
            Architecting with <br className="hidden sm:block" />
            <span className="font-display italic text-accent">precision.</span>
          </h2>
          <p className="text-muted mt-4 max-w-md font-body leading-relaxed">
            A comprehensive stack for building distributed backends, fintech
            engines, and IoT pipelines.
          </p>
        </div>

        {/* The Capabilities Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {DOMAINS.map((domain, colIndex) => (
            <div
              key={colIndex}
              ref={(el) => {
                colRefs.current[colIndex] = el;
              }}
              className="group flex flex-col"
            >
              <h3 className="text-sm text-text-primary uppercase tracking-widest mb-6 font-body">
                {domain.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {domain.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-4 py-2 border border-stroke rounded-full text-sm text-muted bg-surface/30 
                               transition-all duration-300 cursor-default font-body
                               group-hover:border-[#4E85BF]/50 group-hover:shadow-[0_0_10px_rgba(78,133,191,0.1)]
                               hover:!bg-white hover:!text-black hover:!border-transparent"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
