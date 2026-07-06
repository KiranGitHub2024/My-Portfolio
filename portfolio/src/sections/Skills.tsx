import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import {
  FaBrain, FaCode, FaDatabase, FaChartBar, FaRobot, FaLayerGroup,
  FaChalkboardTeacher, FaClipboardCheck, FaUsers, FaLightbulb,
} from "react-icons/fa";

type SkillCategory = {
  icon: React.ElementType;
  title: string;
  skills: string[];
};

const technicalCategories: SkillCategory[] = [
  {
    icon: FaRobot,
    title: "AI & Generative AI",
    skills: [
      "ChatGPT", "Gemini", "Codex", "Ollama", "Grok",
      "Prompt Engineering", "LLM Evaluation",
      "AI-Assisted Development", "Context Engineering",
      "MCP / Agentic Workflows",
    ],
  },
  {
    icon: FaBrain,
    title: "Machine Learning & Data Science",
    skills: [
      "Machine Learning", "Classification", "Regression",
      "K-Means Clustering", "Random Forest", "XGBoost",
      "Time Series Analysis", "Predictive Analysis",
      "Scikit-learn", "Pandas", "NumPy",
      "Matplotlib", "Seaborn", "EDA",
    ],
  },
  {
    icon: FaCode,
    title: "Programming Languages",
    skills: ["Python", "C#", ".NET", "JavaScript", "jQuery"],
  },
  {
    icon: FaLayerGroup,
    title: "Frontend & Backend Frameworks",
    skills: [
      "React", "Vite", "Angular", "Tailwind CSS",
      "HTML5 & CSS3", "Bootstrap",
      "ASP.NET", "ADO.NET", "Django REST API", "FastAPI",
    ],
  },
  {
    icon: FaDatabase,
    title: "Databases & Data Engineering",
    skills: [
      "SQL", "MS-SQL", "Window Functions",
      "Stored Procedures", "Transactions",
      "Web Scraping (BeautifulSoup)",
    ],
  },
  {
    icon: FaChartBar,
    title: "Data Visualization & BI Tools",
    skills: ["Power BI", "Tableau", "Matplotlib", "Seaborn", "MS-Excel"],
  },
];

const nonTechnicalCategories: SkillCategory[] = [
  {
    icon: FaChalkboardTeacher,
    title: "Instructional Design & LXD",
    skills: [
      "Instructional Design", "Learning Experience Design (LXD)",
      "Course Development", "Curriculum Design",
      "Storyboarding", "Content Structuring",
      "Adult Learning Principles", "Learning Objectives Mapping",
      "Training Material Development", "Template Standardization",
      "Client Requirement Analysis",
    ],
  },
  {
    icon: FaClipboardCheck,
    title: "Quality Assurance & Operations",
    skills: [
      "Quality Assurance (QA)", "Quality Review & Auditing",
      "Content Validation", "Process Improvement",
      "Documentation Standards", "Error Identification & Resolution",
      "Compliance Verification", "Delivery Management",
      "Review Workflows", "Continuous Improvement",
    ],
  },
  {
    icon: FaUsers,
    title: "Team Leadership & Stakeholder Management",
    skills: [
      "Team Leadership", "Team Mentoring & Coaching",
      "Knowledge Transfer", "Client Communication",
      "Stakeholder Management", "Cross-functional Collaboration",
      "Project Coordination", "Task Prioritization",
      "Time Management", "Performance Feedback",
      "Conflict Resolution",
    ],
  },
  {
    icon: FaLightbulb,
    title: "Professional Skills",
    skills: [
      "Analytical Thinking", "Attention to Detail",
      "Problem Solving", "Critical Thinking",
      "Decision Making", "Adaptability",
      "Organizational Skills", "Communication Skills",
      "Presentation Skills", "Documentation",
      "Process Management",
    ],
  },
];

function FlipCard({ category, index }: { category: SkillCategory; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-64 cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-5 border border-primary/30"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #1a1608 0%, #0f0f13 60%, #1a1205 100%)",
          }}
        >
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: "linear-gradient(120deg, transparent 30%, rgba(201,162,39,0.15) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
              animation: `shimmer ${3 + index * 0.4}s linear infinite`,
            }}
          />
          <div
            className="absolute inset-0 rounded-xl opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle, #c9a227 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
          />
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="p-4 rounded-full bg-primary/10 border border-primary/30 text-primary">
              <Icon size={32} />
            </div>
            <h3 className="text-lg font-bold text-white text-center px-4">
              {category.title}
            </h3>
            <span className="text-xs text-primary/60 tracking-widest uppercase">
              Tap to reveal
            </span>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-xl p-5 flex flex-col gap-3 bg-white/5 backdrop-blur-lg border border-primary"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex items-center gap-2 border-b border-white/10 pb-2">
            <span className="text-primary"><Icon size={16} /></span>
            <h3 className="text-xs font-bold text-white">{category.title}</h3>
          </div>
          <div className="flex flex-wrap gap-1.5 overflow-y-auto">
            {category.skills.map((skill, j) => (
              <span
                key={j}
                className="px-2 py-0.5 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {skill}
              </span>
            ))}
          </div>
          <span className="text-xs text-primary/40 tracking-widest uppercase mt-auto">
            Tap to flip back
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState<"technical" | "nontechnical">("technical");

  const categories =
    activeTab === "technical" ? technicalCategories : nonTechnicalCategories;

  return (
    <motion.section
      id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-10 py-24"
    >
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
      `}</style>

      <h2 className="text-4xl font-bold text-primary text-center">Skills</h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full" />
      <p className="text-center text-gray-500 text-sm mt-4 tracking-wide">
        Tap any card to explore skills
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
          Technical Skills
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
          Non-Technical Skills
        </button>
      </div>

      {/* Subtitle for active tab */}
      <p className="text-center text-gray-600 text-xs mt-3 tracking-widest uppercase">
        {activeTab === "technical"
          ? "6 categories · AI, ML, Dev, Data & More"
          : "4 categories · Design, QA, Leadership & More"}
      </p>

      {/* Cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto"
        >
          {categories.map((category, i) => (
            <FlipCard key={category.title} category={category} index={i} />
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.section>
  );
}