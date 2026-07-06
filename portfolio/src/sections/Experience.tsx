import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaCalendarAlt, FaCheckCircle, FaBriefcase, FaCode, FaUsers } from "react-icons/fa";

type Experience = {
  company: string;
  initial: string;
  duration: string;
  role: string;
  bullets: string[];
  isCurrent: boolean;
};

const technicalExperiences: Experience[] = [
  {
    company: "Deccan AI Experts",
    initial: "D",
    duration: "November 2025 - Present",
    role: "LLM Evaluator & LLM Trainer (Freelance)",
    bullets: [
      "Designed and optimized high-quality prompts for diverse use cases, aligning outputs with project-specific guidelines and objectives.",
      "Evaluated LLM responses for the Action Extension project using structured rubrics to ensure accuracy, relevance, and consistency.",
      "Analyzed and refined model outputs to reduce hallucinations and improve response quality, contributing to iterative model enhancement.",
      "Adapted prompt engineering and evaluation strategies across multiple projects to maximize model performance and reliability.",
    ],
    isCurrent: true,
  },
  {
    company: "Outlier",
    initial: "O",
    duration: "Sep 2024 - October 2025",
    role: "Prompt Engineer & AI Trainer (Freelance)",
    bullets: [
      "Developed and fine-tuned prompts tailored to project requirements, improving task-specific LLM performance.",
      "Conducted systematic evaluation of LLM outputs, refining responses to meet quality standards and training objectives.",
      "Contributed to model improvement by providing structured feedback and adapting prompt strategies across varied domains.",
    ],
    isCurrent: false,
  },
  {
    company: "Fusion Forte Solutions",
    initial: "F",
    duration: "Jan 2020 - Aug 2024",
    role: "Data Analyst & Full Stack Developer",
    bullets: [
      "Built and maintained full-stack applications using modern frontend and backend technologies, ensuring scalable and efficient systems.",
      "Developed REST APIs and integrated frontend-backend workflows to support dynamic business applications.",
      "Performed data analysis, reporting, and visualization using Tableau and Power BI to generate actionable insights.",
      "Expanded role from full-stack development to data analytics, driving data-informed decision-making and transition into Data Science.",
    ],
    isCurrent: false,
  },
];

const nonTechnicalExperiences: Experience[] = [
  {
    company: "Brinx",
    initial: "B",
    duration: "May 2026 - Present",
    role: "Instructional Designer & Quality Assurance Manager (Contract)",
    bullets: [
      "Designed and developed learner-centric training courses by transforming complex technical and business concepts into engaging instructional content using standardized instructional design methodologies.",
      "Led Quality Assurance (QA) activities by reviewing instructional content, ensuring quality, consistency, compliance with standards, and providing feedback to improve deliverables before client submission.",
      "Mentored and guided Instructional Designers on design standards, template usage, documentation practices, and quality expectations while coordinating timely project delivery across multiple assignments.",
      "Managed end-to-end client communication by gathering requirements, implementing feedback, delivering final course content, and leveraging technical IT expertise to simplify complex topics.",
    ],
    isCurrent: true,
  },
];

function ExperienceCard({ exp }: { exp: Experience }) {
  return (
    <div>
      {exp.isCurrent ? (
        <div
          className="relative rounded-xl p-[1.5px]"
          style={{
            background: "linear-gradient(120deg, #c9a227 0%, #ffffff10 40%, #c9a227 100%)",
            backgroundSize: "200% 200%",
            animation: "shimmer 4s linear infinite",
          }}
        >
          <CardContent exp={exp} />
        </div>
      ) : (
        <CardContent exp={exp} />
      )}
    </div>
  );
}

function CardContent({ exp }: { exp: Experience }) {
  return (
    <div
      className={
        "rounded-xl p-7 transition duration-300 group " +
        (exp.isCurrent
          ? "bg-[#0f0f13] border-l-4 border-primary"
          : "bg-white/5 backdrop-blur-lg border border-white/10 hover:border-primary")
      }
    >
      {/* Top row */}
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20
                        flex items-center justify-center shrink-0
                        group-hover:bg-primary/20 transition duration-300">
          <span className="text-sm font-black text-primary">{exp.initial}</span>
        </div>
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

      {/* Role */}
      <div className="flex items-center gap-2 mb-4">
        <FaBriefcase size={12} className="text-primary shrink-0" />
        <span className="text-sm font-semibold text-primary">{exp.role}</span>
      </div>

      {/* Bullets */}
      <ul className="space-y-2.5">
        {exp.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <FaCheckCircle size={13} className="text-primary shrink-0 mt-0.5" />
            <span className="text-gray-400 text-sm leading-relaxed">{bullet}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState<"technical" | "nontechnical">("technical");

  const experiences =
    activeTab === "technical" ? technicalExperiences : nonTechnicalExperiences;

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

      <h2 className="text-4xl font-bold text-primary text-center">Experience</h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
      <p className="text-center text-gray-500 text-sm mt-4 tracking-wide">
        5+ years across AI, Data Science, Full Stack & Instructional Design
      </p>

      {/* Tab switcher */}
      <div className="flex justify-center gap-3 mt-8">
        <button
          onClick={() => setActiveTab("technical")}
          className={
            "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border transition duration-300 " +
            (activeTab === "technical"
              ? "bg-primary text-black border-primary"
              : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20")
          }
        >
          <FaCode size={13} />
          Technical Experience
        </button>
        <button
          onClick={() => setActiveTab("nontechnical")}
          className={
            "flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold border transition duration-300 " +
            (activeTab === "nontechnical"
              ? "bg-primary text-black border-primary"
              : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20")
          }
        >
          <FaUsers size={13} />
          Non-Technical Experience
        </button>
      </div>

      {/* Subtitle */}
      <p className="text-center text-gray-600 text-xs mt-3 tracking-widest uppercase">
        {activeTab === "technical"
          ? "AI · Prompt Engineering · Full Stack · Data Science"
          : "Instructional Design · Quality Assurance · Team Leadership"}
      </p>

      {/* Timeline */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="relative mt-14 max-w-4xl mx-auto"
        >
          {/* Vertical line */}
          <div className="absolute left-[19px] top-0 w-[2px] h-full bg-primary/20 rounded-full" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative pl-14 mb-12"
            >
              {/* Timeline dot */}
              <div className="absolute left-[11px] top-6">
                {exp.isCurrent ? (
                  <div className="relative flex items-center justify-center w-5 h-5">
                    <div
                      className="absolute w-5 h-5 rounded-full bg-primary/40"
                      style={{ animation: "ping-gold 1.5s ease-out infinite" }}
                    />
                    <div className="w-3.5 h-3.5 rounded-full bg-primary border-2 border-black relative z-10" />
                  </div>
                ) : (
                  <div className="w-3.5 h-3.5 rounded-full bg-primary/50 border-2 border-black" />
                )}
              </div>

              <ExperienceCard exp={exp} />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}