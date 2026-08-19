import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function OrbitalExperience() {
    const containerRef = useRef<HTMLDivElement>(null);

    // Track scroll progress to draw the laser trajectory line
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const trajectoryHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section ref={containerRef} className="bg-[#050505] py-24 md:py-32 relative overflow-hidden">

            {/* Subtle Space Tactical Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: "radial-gradient(circle at center, #ffffff 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)"
                }}
            />

            {/* Header - Sci-Fi HUD Style */}
            <div className="w-full px-6 sm:px-12 relative z-10 mb-20 md:mb-32">
                <div className="text-left">
                    <div className="flex items-center justify-start gap-3 mb-4">
                        <span className="w-8 h-[1px] bg-blue-500/50" />
                        <span className="text-[10px] text-blue-400/80 uppercase tracking-[0.4em] font-body">
                            Career Trajectory // Sector 1
                        </span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-body font-light text-text-primary mt-2 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                        Professional <span className="font-display italic text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">Orbit.</span>
                    </h2>
                </div>
            </div>

            <div className="max-w-[1100px] mx-auto px-6 relative min-h-[1000px]">

                {/* --- MOBILE: Left-Aligned Trajectory Laser --- */}
                <div className="absolute left-[30px] top-0 bottom-10 w-[1px] border-l border-dashed border-white/10 md:hidden z-0" />
                <motion.div
                    style={{ height: trajectoryHeight }}
                    className="absolute left-[30px] top-0 w-[2px] bg-gradient-to-b from-cyan-500/0 via-blue-400 to-cyan-500/0 md:hidden z-0 shadow-[0_0_20px_rgba(96,165,250,1)]"
                />

                {/* --- DESKTOP: Center Spine Trajectory Laser --- */}
                <div className="absolute left-1/2 top-0 bottom-10 w-[1px] border-l border-dashed border-white/10 -translate-x-1/2 hidden md:block z-0" />
                <motion.div
                    style={{ height: trajectoryHeight }}
                    className="absolute left-1/2 top-0 w-[2px] bg-gradient-to-b from-cyan-500/0 via-blue-400 to-cyan-500/0 -translate-x-1/2 hidden md:block z-0 shadow-[0_0_20px_rgba(96,165,250,1)]"
                />

                {/* --- NODE 1: The Genesis (Top Center) --- */}
                <div className="relative z-10 flex justify-center">
                    <HudNode
                        title="Fullstack Developer Intern"
                        company="Hari Om Thallasic"
                        date="Jun 2025 — Aug 2025"
                        align="center"
                    />
                </div>

                {/* --- THE BINARY ORBIT (Parallel Roles) --- */}
                {/* On mobile, gap-12 stacks them neatly. On desktop, they sit parallel. */}
                <div className="relative w-full flex flex-col md:flex-row justify-between items-center mt-16 md:mt-40 mb-16 md:mb-40 gap-12 md:gap-0">

                    {/* Orbital Trajectory SVG Lines (Hidden on Mobile) */}
                    <svg className="absolute inset-0 w-full h-[300px] pointer-events-none hidden md:block -top-16" style={{ zIndex: 0 }}>
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M 550 0 C 550 150, 250 150, 250 300"
                            fill="transparent"
                            stroke="url(#trajectory-gradient)"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />
                        <motion.path
                            initial={{ pathLength: 0, opacity: 0 }}
                            whileInView={{ pathLength: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            d="M 550 0 C 550 150, 850 150, 850 300"
                            fill="transparent"
                            stroke="url(#trajectory-gradient)"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />
                        <defs>
                            <linearGradient id="trajectory-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgba(255,255,255,0.1)" />
                                <stop offset="100%" stopColor="rgba(96,165,250,0.5)" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Binary Star 1: 8 Bits */}
                    <div className="w-full md:w-[45%] flex md:justify-end md:pr-16 z-10">
                        <HudNode
                            title="Software Developer Intern"
                            company="8 Bits"
                            date="Sep 2025 — Dec 2025"
                            align="right"
                            isParallel="Binary System"
                        />
                    </div>

                    {/* Binary Star 2: NEO */}
                    <div className="w-full md:w-[45%] flex md:justify-start md:pl-16 z-10">
                        <HudNode
                            title="Software Developer Intern"
                            company="NEO (Client Company)"
                            date="Sep 2025 — Dec 2025"
                            align="left"
                            isParallel="Binary System"
                        />
                    </div>
                </div>

                {/* --- NODE 3: The Singularity (Current Role) --- */}
                <div className="relative z-10 flex justify-center mt-16 md:mt-20">
                    {/* Merging Orbital Lines (Hidden on Mobile) */}
                    <svg className="absolute -top-40 inset-x-0 w-full h-[200px] pointer-events-none hidden md:block" style={{ zIndex: 0 }}>
                        <path
                            d="M 250 0 C 250 150, 550 50, 550 200"
                            fill="transparent"
                            stroke="rgba(96,165,250,0.3)"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />
                        <path
                            d="M 850 0 C 850 150, 550 50, 550 200"
                            fill="transparent"
                            stroke="rgba(96,165,250,0.3)"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                        />
                    </svg>

                    <HudNode
                        title="Senior Developer"
                        company="8 Bits"
                        date="Jan 2026 — Present"
                        align="center"
                        isCurrent={true}
                    />
                </div>

            </div>
        </section>
    );
}

// Sub-component: Premium Sci-Fi Telemetry Chassis
function HudNode({ title, company, date, align, isParallel, isCurrent }: any) {
    const sysCode = `SYS.ID // ${company.substring(0, 4).toUpperCase()}_${new Date().getFullYear()}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            // On mobile: text is left-aligned and has pl-10 to leave room for the line.
            // On desktop: respects your custom align prop.
            className={`relative w-full md:w-[460px] group pl-10 md:pl-0 text-left 
            ${align === "center" ? "md:mx-auto md:text-center" : align === "right" ? "md:ml-auto md:text-right" : "md:mr-auto"}`}
        >

            {/* --- MOBILE STAR NODE --- */}
            <div className="absolute top-1/2 -translate-y-1/2 left-0 flex md:hidden items-center justify-center z-20">
                {isCurrent && (
                    <>
                        <span className="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-ping" />
                        <span className="absolute w-8 h-8 border border-blue-400/50 rounded-full animate-[spin_3s_linear_infinite]" />
                    </>
                )}
                <div className={`w-3 h-3 rounded-full z-10 transition-all duration-500
                    ${isCurrent ? 'bg-blue-400 shadow-[0_0_15px_#60A5FA]' : 'bg-white shadow-[0_0_10px_white]'}`}
                />
            </div>

            {/* --- DESKTOP STAR NODE --- */}
            <div className={`absolute top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center z-20
                ${align === "center" ? "left-1/2 -translate-x-1/2 -top-[52px]" : align === "right" ? "-right-[74px]" : "-left-[74px]"}`}
            >
                {isCurrent && (
                    <>
                        <span className="absolute w-12 h-12 bg-blue-500/20 rounded-full animate-ping" />
                        <span className="absolute w-8 h-8 border border-blue-400/50 rounded-full animate-[spin_3s_linear_infinite]" />
                    </>
                )}
                <div className={`w-3 h-3 rounded-full z-10 transition-all duration-500 group-hover:scale-150 
                    ${isCurrent ? 'bg-blue-400 shadow-[0_0_15px_#60A5FA]' : 'bg-white shadow-[0_0_10px_white]'}`}
                />
            </div>

            {/* --- THE TELEMETRY CHASSIS --- */}
            <div className="relative p-[1px] rounded-2xl bg-gradient-to-b from-white/15 via-white/5 to-transparent overflow-hidden">
                <div className="relative p-6 md:p-10 bg-[#080808] rounded-2xl h-full w-full overflow-hidden">

                    {isCurrent && (
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent shadow-[0_0_15px_rgba(96,165,250,0.8)]" />
                    )}

                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(96,165,250,0.08),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="absolute inset-0 h-full w-full bg-gradient-to-b from-transparent via-blue-400/5 to-transparent -translate-y-[100%] group-hover:animate-[scan_2s_ease-in-out_infinite] pointer-events-none" />

                    <div className="absolute top-3 left-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none text-blue-100">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8V4h4" /></svg>
                    </div>
                    <div className="absolute top-3 right-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none text-blue-100">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 8V4h-4" /></svg>
                    </div>
                    <div className="absolute bottom-3 left-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none text-blue-100">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16v4h4" /></svg>
                    </div>
                    <div className="absolute bottom-3 right-3 opacity-30 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none text-blue-100">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 16v4h-4" /></svg>
                    </div>

                    {/* --- CARD CONTENT --- */}
                    <div className={`relative z-10 flex flex-col h-full items-start ${align === "center" ? "md:items-center" : align === "right" ? "md:items-end" : "md:items-start"}`}>

                        {/* Top row: Date & Telemetry Code. On mobile: standard row. On desktop: respects align prop */}
                        <div className={`flex w-full justify-between items-center mb-6 flex-row ${align === "right" ? "md:flex-row-reverse" : ""}`}>
                            <div className="flex flex-wrap items-center gap-3">
                                {isParallel && (
                                    <span className="px-2 py-0.5 border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[9px] uppercase tracking-[0.2em] rounded-sm flex items-center gap-1">
                                        <span className="w-1 h-1 bg-cyan-400 rounded-full animate-pulse" />
                                        {isParallel}
                                    </span>
                                )}
                                <span className={`text-xs font-mono tracking-widest ${isCurrent ? 'text-blue-400' : 'text-muted'}`}>
                                    [{date}]
                                </span>
                            </div>
                            <span className="hidden sm:block text-[10px] text-white/20 font-mono tracking-[0.2em]">
                                {sysCode}
                            </span>
                        </div>

                        <h3 className="text-2xl md:text-3xl lg:text-4xl font-display italic text-text-primary mb-2 drop-shadow-md">
                            {title}
                        </h3>

                        <div className="flex items-center gap-3 mt-1">
                            <span className="text-xs md:text-sm font-body text-gray-400 uppercase tracking-[0.2em]">
                                {company}
                            </span>
                            {isCurrent && (
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                                </span>
                            )}
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    );
}