import { useState, useRef, useEffect } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface CommandRecord {
    id: string;
    type: "input" | "output" | "error" | "system";
    content: React.ReactNode;
}

// --- VIRTUAL FILE SYSTEM ---
const FILE_SYSTEM: Record<string, string> = {
    "trading_system_analysis.md": `# TRADING SYSTEM ANALYSIS: High-Frequency Execution

CONTEXT: Algorithmic trading execution layers face massive latency and risk constraints.

CHALLENGE: Standard REST APIs introduce millisecond delays, and unmonitored order modifications can cause catastrophic margin wipeouts.

ARCHITECTURE: Bypassed traditional endpoints by implementing a persistent WebSocket layer for real-time market data. Engineered defensive clamps on Stop-Loss Limit (SL-LMT) orders.

OUTCOME: Sub-millisecond execution routing with robust negative test-case handling, ensuring system stability even during high market volatility.`,

    "ai_flow_design.md": `# AI FLOW DESIGN: Retail Data Pipelines

CONTEXT: Processing massive retail datasets for predictive customer segmentation.

CHALLENGE: Running heavy Scikit-Learn models directly on the main thread caused severe dashboard bottlenecking and poor UX.

ARCHITECTURE: Decoupled the ML inference engine from the Streamlit UI. Raw data is ingested, cleansed via Pandas, and pushed to background workers. The UI only polls for completed insights.

OUTCOME: Achieved instant UI rendering while complex AI clustering processes concurrently in the background.`,

    "distributed_architecture.md": `# DISTRIBUTED ARCHITECTURE: Fault-Tolerant Scheduling

CONTEXT: Designing a distributed task scheduler for asynchronous job orchestration.

CHALLENGE: Single points of failure. If a worker node crashes mid-execution, the payload is lost forever.

ARCHITECTURE: Master-worker node topology using Redis. Implemented a 5-second heartbeat telemetry check. If a worker drops, the master automatically pulls active jobs from that node and pushes them to a Standby pool.

OUTCOME: Zero data loss during simulated 10k concurrent job spikes. Absolute fault tolerance.`,

    "fintech_ledger_scaling.md": `# FINTECH LEDGER SCALING: Core Infrastructure

CONTEXT: Building a double-entry financial ledger capable of multi-currency balances.

CHALLENGE: Handling massive concurrent transactions without race conditions or debit/credit mismatches.

ARCHITECTURE: Implemented strict ACID-compliant PostgreSQL transactions. Utilized distributed locking to serialize high-contention account updates, ensuring absolute mathematical parity.

OUTCOME: Immutable, audit-traced ledger engine that scales horizontally without compromising data integrity.`
};

export default function SkunkworksTerminal() {
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);

    const [input, setInput] = useState("");
    const [history, setHistory] = useState<CommandRecord[]>([
        { id: "boot-1", type: "system", content: "Last login: Sun Aug 16 20:55:36 on ttys001" },
        { id: "boot-2", type: "system", content: "gaurav-macbook-pro:~ access_granted$" },
        { id: "boot-3", type: "system", content: "Type 'help' to see available commands." },
    ]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    const y = useTransform(scrollYProgress, [0, 1], [15, -15]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleTerminalClick = () => {
        inputRef.current?.focus();
    };

    const triggerDownload = (filename: string, content: string) => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    // --- TAB AUTOCOMPLETE LOGIC ---
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Tab") {
            e.preventDefault();

            const args = input.split(" ");
            if (args.length === 2 && (args[0] === "cat" || args[0] === "download")) {
                const command = args[0];
                const partialFile = args[1].toLowerCase();

                const files = Object.keys(FILE_SYSTEM);
                const match = files.find(file => file.toLowerCase().startsWith(partialFile));

                if (match) {
                    setInput(`${command} ${match}`);
                }
            }
        }
    };

    const handleCommand = (e: FormEvent) => {
        e.preventDefault();
        const rawInput = input.trim();
        const lowerInput = rawInput.toLowerCase();

        if (!lowerInput) return;

        setHistory(prev => [...prev, { id: Date.now().toString(), type: "input", content: rawInput }]);
        setInput("");

        setTimeout(() => {
            let response: React.ReactNode = "";
            let resType: "output" | "error" | "system" = "output";

            const args = lowerInput.split(" ");
            const command = args[0];
            const targetFile = args[1];

            if (command === "help") {
                response = (
                    <div className="whitespace-pre-wrap">
                        {`GNU bash, version 5.1.16(1)-release (aarch64-apple-darwin21.1.0)
These shell commands are defined internally.

ls          List directory contents
cat [file]  Concatenate and print files (Hint: use TAB to autocomplete)
download    Download a file to your local machine (e.g., 'download ai_flow_design.md')
clear       Clear the terminal screen`}
                    </div>
                );
            }
            else if (command === "ls") {
                response = (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        {Object.keys(FILE_SYSTEM).map(file => (
                            <span key={file} className="text-blue-400">{file}</span>
                        ))}
                    </div>
                );
            }
            else if (command === "cat") {
                if (!targetFile) {
                    response = "cat: missing operand";
                    resType = "error";
                } else if (FILE_SYSTEM[targetFile]) {
                    response = (
                        <div className="whitespace-pre-wrap text-gray-300">
                            {FILE_SYSTEM[targetFile]}
                        </div>
                    );
                } else {
                    response = `cat: ${targetFile}: No such file or directory`;
                    resType = "error";
                }
            }
            else if (command === "download") {
                if (!targetFile) {
                    response = "download: missing operand. Usage: download [filename]";
                    resType = "error";
                } else if (FILE_SYSTEM[targetFile]) {
                    triggerDownload(targetFile, FILE_SYSTEM[targetFile]);
                    response = `initiating download for '${targetFile}'... done.`;
                    resType = "system";
                } else {
                    response = `download: ${targetFile}: No such file or directory`;
                    resType = "error";
                }
            }
            else if (command === "clear") {
                setHistory([]);
                return;
            }
            else {
                response = `bash: ${command}: command not found`;
                resType = "error";
            }

            setHistory(prev => [...prev, { id: Date.now().toString() + "-res", type: resType, content: response }]);
        }, 100);
    };

    return (
        <section ref={containerRef} className="bg-[#050505] py-12 md:py-20 relative overflow-hidden font-mono text-[13px] md:text-[14px]">

            <div className="w-full px-6 sm:px-12 relative z-10">

                {/* Consistently Aligned Header */}
                <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 md:mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="w-8 h-px bg-white/20" />
                            <span className="text-xs text-gray-400 uppercase tracking-[0.3em] font-sans">
                                System Access
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl lg:text-6xl font-display italic text-text-primary mb-4">
                            Architecture <span className="text-gray-500">Logs.</span>
                        </h2>
                        <p className="text-sm md:text-base text-gray-400 max-w-md font-sans">
                            Access the raw architectural case studies. Use standard bash commands to explore or download the markdown files directly to your machine.
                        </p>
                    </div>
                </div>

                {/* --- WIDER TERMINAL UI --- */}
                <motion.div
                    style={{ y }}
                    className="w-full h-[500px] md:h-[600px] flex flex-col rounded-lg bg-[#1C1C1E] border border-[#333] shadow-2xl overflow-hidden"
                >
                    {/* Authentic macOS Title Bar */}
                    <div className="bg-[#2D2D2D] border-b border-[#111] px-4 h-10 flex items-center shrink-0 relative">
                        <div className="flex gap-2 absolute left-4">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]" />
                        </div>
                        <div className="w-full text-center text-[#999] text-xs font-sans font-medium tracking-wide flex justify-center items-center gap-2">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 14H4v-4h11v4zm0-5H4V9h11v4zm5 5h-4V9h4v9z" /></svg>
                            gaurav — -zsh — 100x32
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div
                        ref={scrollRef}
                        onClick={handleTerminalClick}
                        className="flex-1 p-4 md:p-6 overflow-y-auto cursor-text scroll-smooth text-[#F2F2F2]"
                    >
                        {history.map((record) => (
                            <div key={record.id} className="mb-1 leading-relaxed">
                                {record.type === "input" && (
                                    <div className="flex items-start gap-2">
                                        <span className="text-emerald-400 shrink-0">gaurav@portfolio:~/case_studies$</span>
                                        <span className="break-all">{record.content}</span>
                                    </div>
                                )}
                                {record.type === "system" && (
                                    <div className="text-gray-400">{record.content}</div>
                                )}
                                {record.type === "output" && (
                                    <div className="mt-1 mb-3">{record.content}</div>
                                )}
                                {record.type === "error" && (
                                    <div className="text-red-400 mt-1 mb-2">{record.content}</div>
                                )}
                            </div>
                        ))}

                        <form onSubmit={handleCommand} className="flex items-center gap-2 mt-1">
                            <span className="text-emerald-400 shrink-0 whitespace-nowrap">gaurav@portfolio:~/case_studies$</span>
                            <div className="flex-1 relative flex items-center">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    className="w-full bg-transparent border-none outline-none text-[#F2F2F2] caret-transparent"
                                    autoComplete="off"
                                    spellCheck="false"
                                />
                                <span
                                    className="absolute left-0 pointer-events-none w-2 h-4 bg-gray-400"
                                    style={{
                                        transform: `translateX(${input.length}ch)`,
                                        animation: 'blink 1s step-end infinite'
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>

            <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
        </section>
    );
}