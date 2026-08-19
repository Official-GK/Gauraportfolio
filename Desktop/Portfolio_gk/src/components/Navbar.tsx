import { useState, useEffect } from "react";

interface NavbarProps {
  activeSection: string;
}

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Resume", href: "#stats" },
];

export default function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [hoveredGradient, setHoveredGradient] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <div
        className={`inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2 transition-shadow duration-300 ${scrolled ? "shadow-md shadow-black/10" : ""
          }`}
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("#hero")}
          onMouseEnter={() => setHoveredGradient(true)}
          onMouseLeave={() => setHoveredGradient(false)}
          className="relative w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 shrink-0"
        >
          {/* Gradient border ring */}
          <span
            className="absolute inset-0 rounded-full"
            style={{
              background: hoveredGradient
                ? "linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)"
                : "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
              transition: "background 0.3s ease",
            }}
          />
          {/* Inner circle */}
          <span className="relative w-[31px] h-[31px] rounded-full bg-bg flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary leading-none">
              GK
            </span>
          </span>
        </button>

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Nav links */}
        {NAV_LINKS.map((link) => {
          const isActive =
            activeSection === link.href.replace("#", "");
          return (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-200 font-body ${isActive
                  ? "text-text-primary bg-stroke/50"
                  : "text-muted hover:text-text-primary hover:bg-stroke/50"
                }`}
            >
              {link.label}
            </button>
          );
        })}

        {/* Divider */}
        <span className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        {/* Say hi button - FIXED DOUBLE PADDING */}
        <a
          href="mailto:hello@gauravkulkarni.com"
          className="relative group text-xs sm:text-sm rounded-full font-body text-text-primary transition-all duration-200 flex items-center"
        >
          {/* Hover gradient border */}
          <span className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
            style={{
              inset: "-2px",
              background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
            }}
          />
          <span className="relative z-10 flex items-center gap-1 bg-surface rounded-full px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md">
            Say hi <span className="text-base leading-none">↗</span>
          </span>
        </a>
      </div>
    </nav>
  );
}