import { motion } from "framer-motion";
import { FaCalendarAlt, FaCheckCircle, FaBriefcase } from "react-icons/fa";

type Experience = {
  company: string;
  initial: string;
  duration: string;
  role: string;
  desc: string;
  bullets: string[];
  isCurrent: boolean;
};

const experiences: Experience[] = [
  {
    company: "Deccan AI Experts",
    initial: "D",
    duration: "November 2025 - Present",
    role: "AI Engineer / LLM Evaluator",
    desc: "Working on LLM evaluation, prompt engineering, and improving AI response quality across multiple projects.",
    bullets: [
      "Evaluating and optimizing LLM outputs across multiple AI product pipelines",
      "Designing prompt strategies to improve model instruction-following and response accuracy",
      "Improving AI response quality through structured evaluation frameworks and feedback loops",
    ],
    isCurrent: true,
  },
  {
    company: "Outlier",
    initial: "O",
    duration: "Sep 2024 - October 2025",
    role: "Prompt Engineer & AI Trainer",
    desc: "Evaluated AI model outputs, improved prompt strategies, and ensured high-quality responses through structured testing.",
    bullets: [
      "Evaluated AI model outputs across diverse tasks to identify failure patterns and quality gaps",
      "Developed and refined prompt strategies that improved response consistency and relevance",
      "Conducted structured testing pipelines to ensure high-quality AI outputs at scale",
    ],
    isCurrent: false,
  },
  {
    company: "Fusion Forte Solutions",
    initial: "F",
    duration: "Jan 2020 - Aug 2024",
    role: "Full Stack Developer & Data Analyst",
    desc: "Developed enterprise applications using .NET, Angular, and SQL. Built ERP systems, APIs, and scalable web applications.",
    bullets: [
      "Built enterprise-grade ERP systems and REST APIs using .NET, Angular, and SQL Server",
      "Developed scalable full-stack web applications serving multi-department business operations",
      "Performed EDA and data analysis to surface actionable business insights from operational data",
    ],
    isCurrent: false,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-10 py-24">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0% 50%;   }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%;   }
        }
        @keyframes ping-gold {
          0%   { transform: scale(1);   opacity: 0.8; }
          70%  { transform: scale(2.2); opacity: 0;   }
          100% { transform: scale(2.2); opacity: 0;   }
        }
      `}</style>

      {/* Section heading */}
      <h2 className="text-4xl font-bold text-primary text-center">
        Experience
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
      <p className="text-center text-gray-500 text-sm mt-4 tracking-wide">
        5+ years across AI, Data Science &amp; Full Stack Development
      </p>

      <div className="relative mt-16 max-w-4xl mx-auto">

        {/* Vertical timeline line — centered on dots */}
        <div className="absolute left-[19px] top-0 w-[2px] h-full bg-primary/20 rounded-full" />

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-14 mb-12"
          >
            {/* Timeline dot */}
            <div className="absolute left-[11px] top-6">
              {exp.isCurrent ? (
                // Pulsing gold dot for current role
                <div className="relative flex items-center justify-center w-5 h-5">
                  <div
                    className="absolute w-5 h-5 rounded-full bg-primary/40"
                    style={{ animation: "ping-gold 1.5s ease-out infinite" }}
                  />
                  <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-black relative z-10" />
                </div>
              ) : (
                // Static dot for past roles
                <div className="w-3.5 h-3.5 rounded-full bg-primary/50 border-2 border-black" />
              )}
            </div>

            {/* Card — shimmer border for current, plain for past */}
            {exp.isCurrent ? (
              <div
                className="relative rounded-xl p-[1.5px]"
                style={{
                  background:
                    "linear-gradient(120deg, #c9a227 0%, #ffffff10 40%, #c9a227 100%)",
                  backgroundSize: "200% 200%",
                  animation: "shimmer 4s linear infinite",
                }}
              >
                <CardContent exp={exp} />
              </div>
            ) : (
              <CardContent exp={exp} />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function CardContent({ exp }: { exp: Experience }) {
  return (
    <div
      className={
        "bg-[#0f0f13] rounded-xl p-7 transition duration-300 group " +
        (exp.isCurrent
          ? "border-l-4 border-primary"
          : "bg-white/5 border border-white/10 hover:border-primary backdrop-blur-lg")
      }
    >
      {/* Top row — monogram + company + current badge */}
      <div className="flex items-start gap-4">
        {/* Company monogram */}
        <div
          className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20
                     flex items-center justify-center shrink-0
                     group-hover:bg-primary/20 transition duration-300"
        >
          <span className="text-sm font-black text-primary">
            {exp.initial}
          </span>
        </div>

        {/* Company info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-xl font-bold text-white group-hover:text-primary transition duration-300">
              {exp.company}
            </h3>
            {exp.isCurrent && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full
                               text-xs font-semibold bg-primary text-black">
                <span className="w-1.5 h-1.5 rounded-full bg-black" />
                Current
              </span>
            )}
          </div>

          {/* Duration pill */}
          <div className="mt-1.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full
                             text-xs bg-primary/10 text-primary border border-primary/20">
              <FaCalendarAlt size={9} />
              {exp.duration}
            </span>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-white/10 my-4" />

      {/* Role badge */}
      <div className="flex items-center gap-2 mb-4">
        <FaBriefcase size={12} className="text-primary shrink-0" />
        <span className="text-sm font-semibold text-primary">
          {exp.role}
        </span>
      </div>

      {/* Bullet points */}
      <ul className="space-y-2.5">
        {exp.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <FaCheckCircle
              size={13}
              className="text-primary shrink-0 mt-0.5"
            />
            <span className="text-gray-400 text-sm leading-relaxed">
              {bullet}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}