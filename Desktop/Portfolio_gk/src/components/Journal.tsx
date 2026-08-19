import { motion } from "framer-motion";

const ENTRIES = [
  {
    title: "Scaling Microservices for Climate Data Pipelines",
    image: "/images/project_climate_risk.png",
    readTime: "6 min read",
    date: "Jul 2026",
  },
  {
    title: "How IoT Edge Computing Changed Our Retail Stack",
    image: "/images/project_tata_retail.png",
    readTime: "8 min read",
    date: "Jun 2026",
  },
  {
    title: "Designing a Real-Time Reward Sync Engine",
    image: "/images/project_rewardsync.png",
    readTime: "5 min read",
    date: "May 2026",
  },
  {
    title: "Building Embedded GUIs with Python & Qt",
    image: "/images/project_kambala_gui.png",
    readTime: "7 min read",
    date: "Apr 2026",
  },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Journal() {
  return (
    <section id="journal" className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 md:mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body">
                Journal
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-body font-light text-text-primary mb-3">
              Recent{" "}
              <span className="font-display italic">thoughts</span>
            </h2>
            <p className="text-sm md:text-base text-muted max-w-md font-body">
              Writings on engineering, architecture, and the craft of building
              software.
            </p>
          </div>

          <a
            href="#"
            className="hidden md:inline-flex group relative items-center gap-2 rounded-full text-sm px-6 py-3 font-body font-medium text-text-primary border border-stroke hover:border-transparent transition-all duration-300 mt-6 md:mt-0"
          >
            <span
              className="absolute rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"
              style={{
                inset: "-2px",
                background:
                  "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
              }}
            />
            View all
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
        </motion.div>

        {/* Journal entries */}
        <div className="flex flex-col gap-4">
          {ENTRIES.map((entry, i) => (
            <motion.a
              key={i}
              href="#"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border border-stroke">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title */}
              <span className="flex-1 text-sm md:text-base text-text-primary font-body group-hover:text-white transition-colors line-clamp-1">
                {entry.title}
              </span>

              {/* Meta */}
              <div className="flex items-center gap-4 text-xs text-muted font-body shrink-0">
                <span>{entry.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-stroke" />
                <span>{entry.date}</span>
              </div>

              {/* Arrow */}
              <svg
                className="w-5 h-5 text-muted group-hover:text-text-primary transition-all group-hover:translate-x-1 shrink-0 hidden sm:block"
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
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
