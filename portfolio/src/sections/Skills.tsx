import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import {
  FaBrain, FaCode, FaDatabase, FaChartBar, FaRobot, FaLayerGroup,
  FaChalkboardTeacher, FaClipboardCheck, FaUsers, FaLightbulb,
} from "react-icons/fa";

// ─── Types ────────────────────────────────────────────────────────────────────
type SkillCategory = {
  icon: React.ElementType;
  title: string;
  skills: string[];
};

type SkillTag = {
  skill: string;
  category: string;
  // position as % of container width/height
  x: number;
  y: number;
  // float animation params
  floatDuration: number;
  floatDelay: number;
  floatAmount: number;
  // visual weight
  size: "sm" | "md" | "lg";
};

// ─── Technical Categories (unchanged flip cards) ───────────────────────────
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

// ─── Non-Technical Categories ─────────────────────────────────────────────
const nonTechnicalCategories: SkillCategory[] = [
  {
    icon: FaChalkboardTeacher,
    title: "Instructional Design",
    skills: [
      "Instructional Design", "LXD", "Course Development",
      "Curriculum Design", "Storyboarding", "Content Structuring",
      "Adult Learning Principles", "Learning Objectives Mapping",
      "Training Material Development", "Template Standardization",
      "Client Requirement Analysis",
    ],
  },
  {
    icon: FaClipboardCheck,
    title: "QA & Operations",
    skills: [
      "Quality Assurance", "Quality Review & Auditing",
      "Content Validation", "Process Improvement",
      "Documentation Standards", "Error Identification",
      "Compliance Verification", "Delivery Management",
      "Review Workflows", "Continuous Improvement",
    ],
  },
  {
    icon: FaUsers,
    title: "Team Leadership",
    skills: [
      "Team Leadership", "Mentoring & Coaching",
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

// ─── Deterministic tag layout ─────────────────────────────────────────────
// We divide the canvas into 4 quadrants, one per category.
// Within each quadrant we lay tags out in a staggered grid
// with slight organic offsets — guarantees zero overlap.
const QUADRANTS = [
  { xStart: 2,  yStart: 5,  xEnd: 48, yEnd: 48 }, // top-left
  { xStart: 52, yStart: 5,  xEnd: 98, yEnd: 48 }, // top-right
  { xStart: 2,  yStart: 55, xEnd: 48, yEnd: 95 }, // bottom-left
  { xStart: 52, yStart: 55, xEnd: 98, yEnd: 95 }, // bottom-right
];

// Organic offsets per slot — hand-tuned for natural look
const OFFSETS = [
  [0,0],[3,-2],[-2,3],[4,1],[-3,-1],[2,4],
  [-1,2],[3,-3],[0,2],[-2,-2],[4,3],[1,-1],
];

function buildTags(categories: SkillCategory[]): SkillTag[] {
  const tags: SkillTag[] = [];
  const sizes: Array<"sm" | "md" | "lg"> = ["md","lg","sm","md","sm","lg","md","sm","lg","md","sm","md"];

  categories.forEach((cat, catIdx) => {
    const q = QUADRANTS[catIdx];
    const cols = 3;
    const xStep = (q.xEnd - q.xStart) / cols;
    const yStep = (q.yEnd - q.yStart) / Math.ceil(cat.skills.length / cols);

    cat.skills.forEach((skill, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const offset = OFFSETS[i % OFFSETS.length];

      tags.push({
        skill,
        category: cat.title,
        x: q.xStart + col * xStep + xStep * 0.1 + offset[0],
        y: q.yStart + row * yStep + yStep * 0.15 + offset[1],
        floatDuration: 3 + (i * 0.37 + catIdx * 0.6) % 2.5,
        floatDelay: -(i * 0.5 + catIdx * 1.2) % 4,
        floatAmount: 3 + (i % 4),
        size: sizes[i % sizes.length],
      });
    });
  });

  return tags;
}

const allTags = buildTags(nonTechnicalCategories);

const sizeClasses = {
  sm: "text-[10px] px-2 py-0.5",
  md: "text-xs px-3 py-1",
  lg: "text-sm px-3 py-1 font-semibold",
};

// ─── Flip Card (Technical) ─────────────────────────────────────────────────
function FlipCard({ category, index }: { category: SkillCategory; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="h-64"
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center
                     justify-center gap-5 border border-primary/30 cursor-pointer"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg,#1a1608 0%,#0f0f13 60%,#1a1205 100%)",
          }}
          onClick={() => setFlipped(true)}
        >
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background:
                "linear-gradient(120deg,transparent 30%,rgba(201,162,39,0.15) 50%,transparent 70%)",
              backgroundSize: "200% 200%",
              animation: `shimmer ${3 + index * 0.4}s linear infinite`,
            }}
          />
          <div
            className="absolute inset-0 rounded-xl opacity-10 pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(circle,#c9a227 1px,transparent 1px)",
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

        {/* Back */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col
                     bg-white/5 backdrop-blur-lg border border-primary overflow-hidden"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <div
            className="flex items-center gap-2 px-4 pt-4 pb-2
                       border-b border-white/10 cursor-pointer shrink-0"
            onClick={() => setFlipped(false)}
          >
            <span className="text-primary"><Icon size={15} /></span>
            <h3 className="text-xs font-bold text-white truncate flex-1">
              {category.title}
            </h3>
            <span className="text-xs text-primary/50 shrink-0">← back</span>
          </div>
          <div
            className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-3 pr-2"
            style={{ scrollbarWidth: "thin", scrollbarColor: "#c9a227 transparent" }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            onTouchStart={(e) => e.stopPropagation()}
          >
            <div className="flex flex-wrap gap-1.5">
              {category.skills.map((skill, j) => (
                <span
                  key={j}
                  className="px-2 py-0.5 text-xs rounded-full bg-primary/10
                             text-primary border border-primary/20 select-none"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div
            className="px-4 py-2 border-t border-white/10 cursor-pointer shrink-0"
            onClick={() => setFlipped(false)}
          >
            <span className="text-xs text-primary/40 tracking-widest uppercase">
              Tap to flip back
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Tag Cloud ────────────────────────────────────────────────────────────
function SkillCloud() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill]       = useState<string | null>(null);

  return (
    <div className="mt-10 max-w-6xl mx-auto">
      {/* Category legend */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {nonTechnicalCategories.map((cat) => {
          const Icon = cat.icon;
          const isActive = hoveredCategory === cat.title;
          return (
            <button
              key={cat.title}
              onMouseEnter={() => setHoveredCategory(cat.title)}
              onMouseLeave={() => setHoveredCategory(null)}
              className={
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition duration-300 " +
                (isActive
                  ? "bg-primary text-black border-primary"
                  : "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20")
              }
            >
              <Icon size={11} />
              {cat.title}
            </button>
          );
        })}
      </div>

      {/* Cloud canvas */}
      <div
        className="relative w-full rounded-xl border border-white/10 bg-white/5
                   backdrop-blur-lg overflow-hidden"
        style={{ paddingBottom: "75%" }}
      >
        {/* Quadrant watermark labels */}
        {nonTechnicalCategories.map((cat, i) => {
          const q = QUADRANTS[i];
          const Icon = cat.icon;
          return (
            <div
              key={cat.title}
              className="absolute flex flex-col items-center gap-1 pointer-events-none"
              style={{
                left: `${(q.xStart + q.xEnd) / 2}%`,
                top:  `${(q.yStart + q.yEnd) / 2}%`,
                transform: "translate(-50%, -50%)",
                opacity: hoveredCategory === cat.title ? 0.12 : 0.04,
                transition: "opacity 0.3s",
              }}
            >
              <Icon size={48} className="text-primary" />
              <span className="text-primary text-xs font-bold tracking-widest uppercase whitespace-nowrap">
                {cat.title}
              </span>
            </div>
          );
        })}

        {/* Quadrant dividers */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Vertical center line */}
          <div
            className="absolute top-[5%] bottom-[5%] w-[1px] bg-white/5"
            style={{ left: "50%" }}
          />
          {/* Horizontal center line */}
          <div
            className="absolute left-[2%] right-[2%] h-[1px] bg-white/5"
            style={{ top: "51.5%" }}
          />
        </div>

        {/* Floating tags */}
        {allTags.map((tag, i) => {
          const isDimmed =
            hoveredCategory !== null && hoveredCategory !== tag.category;
          const isHighlighted =
            hoveredCategory === tag.category || hoveredSkill === tag.skill;

          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${tag.x}%`, top: `${tag.y}%` }}
              animate={{
                y: [0, -tag.floatAmount, 0, tag.floatAmount * 0.6, 0],
              }}
              transition={{
                duration: tag.floatDuration,
                delay: tag.floatDelay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.span
                className={
                  "inline-block rounded-full border cursor-default select-none " +
                  "transition-all duration-300 whitespace-nowrap " +
                  sizeClasses[tag.size] +
                  (isHighlighted
                    ? " bg-primary text-black border-primary shadow-lg"
                    : isDimmed
                    ? " bg-white/3 text-gray-600 border-white/5"
                    : " bg-primary/10 text-primary border-primary/25 hover:bg-primary hover:text-black")
                }
                style={
                  isHighlighted
                    ? { boxShadow: "0 0 12px rgba(201,162,39,0.5)" }
                    : {}
                }
                onMouseEnter={() => {
                  setHoveredCategory(tag.category);
                  setHoveredSkill(tag.skill);
                }}
                onMouseLeave={() => {
                  setHoveredCategory(null);
                  setHoveredSkill(null);
                }}
              >
                {tag.skill}
              </motion.span>
            </motion.div>
          );
        })}

        {/* Tooltip */}
        <AnimatePresence>
          {hoveredSkill && (
            <motion.div
              key={hoveredSkill}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-3 left-1/2 -translate-x-1/2
                         px-3 py-1.5 rounded-full bg-primary text-black
                         text-xs font-bold pointer-events-none z-10 whitespace-nowrap"
              style={{ boxShadow: "0 0 16px rgba(201,162,39,0.4)" }}
            >
              {hoveredSkill} · {hoveredCategory}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-center text-gray-600 text-xs mt-4 tracking-wide">
        Hover any skill to highlight its category · {allTags.length} skills across {nonTechnicalCategories.length} domains
      </p>
    </div>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────
export default function Skills() {
  const [activeTab, setActiveTab] = useState<"technical" | "nontechnical">(
    "technical"
  );

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
        {activeTab === "technical"
          ? "Tap any card to explore skills"
          : "Hover any skill to highlight its category"}
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

      {/* Tab subtitle */}
      <p className="text-center text-gray-600 text-xs mt-3 tracking-widest uppercase">
        {activeTab === "technical"
          ? "6 categories · AI, ML, Dev, Data & More"
          : "4 categories · Design, QA, Leadership & More"}
      </p>

      {/* Content */}
      <AnimatePresence mode="wait">
        {activeTab === "technical" ? (
          <motion.div
            key="technical"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto"
          >
            {technicalCategories.map((category, i) => (
              <FlipCard key={category.title} category={category} index={i} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="nontechnical"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
          >
            <SkillCloud />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}