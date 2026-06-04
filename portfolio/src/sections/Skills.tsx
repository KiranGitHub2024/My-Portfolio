import { motion } from "framer-motion";
import React, { useState } from "react";
import {
  FaBrain, FaCode, FaDatabase,
  FaChartBar, FaRobot, FaLayerGroup,
} from "react-icons/fa";

type SkillCategory = {
  icon: React.ElementType;   // store the component, not the JSX
  title: string;
  skills: string[];
};

const skillCategories: SkillCategory[] = [
  { icon: FaRobot,     title: "AI & Generative AI",                skills: ["ChatGPT", "Gemini", "Codex", "Ollama", "Prompt Engineering", "LLM Evaluation", "NLP", "AI-Assisted Development"] },
  { icon: FaBrain,     title: "Machine Learning & Data Science",   skills: ["Machine Learning", "XGBoost", "Random Forest", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn", "EDA"] },
  { icon: FaCode,      title: "Programming Languages",             skills: ["Python", "C#", ".NET", "JavaScript", "jQuery", "Java"] },
  { icon: FaLayerGroup,title: "Frontend & Backend Frameworks",     skills: ["React", "Vite", "Angular", "Tailwind CSS", "HTML5 & CSS3", "Bootstrap", "ASP.NET", "ADO.NET", "Django REST API", "FastAPI"] },
  { icon: FaDatabase,  title: "Databases & Data Engineering",      skills: ["SQL", "Window Functions", "Stored Procedures", "Transactions", "Web Scraping (BeautifulSoup)"] },
  { icon: FaChartBar,  title: "Data Visualization & BI Tools",     skills: ["Power BI", "Tableau", "Matplotlib", "Seaborn"] },
];

function FlipCard({ category, index }: { category: SkillCategory; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      viewport={{ once: true }}
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

        {/* ===== FRONT FACE ===== */}
        <div
          className="absolute inset-0 rounded-xl flex flex-col items-center justify-center gap-5 border border-primary/30"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #1a1608 0%, #0f0f13 60%, #1a1205 100%)",
          }}
        >
          {/* Shimmer overlay */}
          <div
            className="absolute inset-0 rounded-xl pointer-events-none"
            style={{
              background: "linear-gradient(120deg, transparent 30%, rgba(201,162,39,0.15) 50%, transparent 70%)",
              backgroundSize: "200% 200%",
              animation: `shimmer ${3 + index * 0.5}s linear infinite`,
            }}
          />

          {/* Dot pattern */}
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

        {/* ===== BACK FACE ===== */}
        <div
          className="absolute inset-0 rounded-xl p-6 flex flex-col gap-4 bg-white/5 backdrop-blur-lg border border-primary"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Back header */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="text-primary"><Icon size={18} /></span>
            <h3 className="text-sm font-bold text-white">{category.title}</h3>
          </div>

          {/* Skill tags */}
          <div className="flex flex-wrap gap-2 overflow-y-auto">
            {category.skills.map((skill, j) => (
              <span
                key={j}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
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
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>

      <p className="text-center text-gray-500 text-sm mt-4 tracking-wide">
        Tap any card to explore skills
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 max-w-6xl mx-auto">
        {skillCategories.map((category, i) => (
          <FlipCard key={i} category={category} index={i} />
        ))}
      </div>
    </motion.section>
  );
}