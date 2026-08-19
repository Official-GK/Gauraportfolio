import { motion } from "framer-motion";

const EXPLORATIONS = [
    {
        topic: "Advanced DSA & Algorithms",
        description: "Brute-forcing complex edge cases, dynamic programming, and optimizing tree structures for sub-millisecond execution.",
        status: "ACTIVE RESEARCH",
    },
    {
        topic: "Neural Networks & Deep Learning",
        description: "Decoupling ML inference from main threads and exploring predictive classification models for massive datasets.",
        status: "PROTOTYPING",
    },
    {
        topic: "Fintech Architecture & HFT",
        description: "Engineering strict ACID-compliant ledgers and WebSocket-driven execution layers to prevent automated margin wipeouts.",
        status: "SYSTEM DESIGN",
    },
    {
        topic: "Distributed Fault Tolerance",
        description: "Mapping out master-worker node topologies, heartbeat telemetry, and zero-data-loss recovery for background queues.",
        status: "WHITEBOARDING",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 },
    },
};

const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function CurrentlyExploring() {
    return (
        <section id="exploring" className="bg-[#050505] py-16 md:py-24 relative overflow-hidden">

            {/* Subtle background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full px-6 sm:px-12 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
                    className="flex flex-col md:flex-row md:items-end md:justify-between mb-16 md:mb-24"
                >
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-px bg-white/20" />
                            <span className="text-xs text-gray-400 uppercase tracking-[0.3em] font-sans">
                                Active Radar
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-display italic text-text-primary mb-3">
                            Currently <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Exploring.</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-400 max-w-md font-sans">
                            Technologies, architectures, and theoretical concepts I am researching outside of production hours.
                        </p>
                    </div>
                </motion.div>

                {/* The Typographic Index / Directory */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                    className="flex flex-col w-full border-t border-white/10"
                >
                    {EXPLORATIONS.map((entry, i) => (
                        <motion.div
                            key={i}
                            variants={rowVariants}
                            className="group flex flex-col lg:flex-row lg:items-center py-8 lg:py-10 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-500 px-4 lg:px-6 cursor-crosshair gap-6 lg:gap-0"
                        >
                            {/* Number Index */}
                            <div className="w-16 lg:w-24 shrink-0 text-lg md:text-xl font-mono text-gray-600 group-hover:text-blue-500 transition-colors duration-500">
                                0{i + 1}
                            </div>

                            {/* Title (Shifts right on hover) */}
                            <h3 className="w-full lg:w-[45%] text-3xl md:text-4xl lg:text-5xl font-display text-gray-300 group-hover:text-white group-hover:italic group-hover:translate-x-3 transition-all duration-500 pr-4">
                                {entry.topic}
                            </h3>

                            {/* Description */}
                            <p className="w-full lg:w-[35%] text-[13px] md:text-sm text-gray-500 font-sans leading-relaxed group-hover:text-gray-400 transition-colors duration-500 pr-4 lg:pr-8">
                                {entry.description}
                            </p>

                            {/* Status Tag */}
                            <div className="flex-1 flex justify-start lg:justify-end">
                                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 group-hover:border-blue-500/30 transition-colors duration-500">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-500" />
                                    </span>
                                    <span className="text-[9px] md:text-[10px] text-gray-400 group-hover:text-blue-300 font-mono tracking-widest uppercase transition-colors duration-500">
                                        {entry.status}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}