import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaBrain, FaLaptopCode, FaChartLine, FaGithub } from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

type Project = {
  title: string;
  desc: string;
  tech: string[];
  github?: string;
};

type Category = {
  title: string;
  icon: any;
  projects: Project[];
};

const categories: Category[] = [
  {
    title: "LLM Evaluation Projects",
    icon: <SiOpenai size={28} />,
    projects: [
      { title: "Action Extensions", desc: "LLM evaluation and response optimization project.", tech: ["LLMs", "Prompt Engineering"] },
      { title: "Project Matrix", desc: "Framework for evaluating LLM outputs.", tech: ["Evaluation", "Data Analysis"] },
      { title: "Bluebird", desc: "Improved response quality using structured evaluation pipelines.", tech: ["LLMs", "Quality Analysis"] },
      { title: "OTS Prompts", desc: "Optimized prompt strategies for consistent LLM performance.", tech: ["Prompt Engineering"] },
    ],
  },

  {
    title: "AI & Generative AI Projects",
    icon: <FaBrain size={28} />,
    projects: [
      {
        title: "AI Powered Talent Scouting Agent",
        desc: "AI system that analyzes candidates, scores profiles and generates engagement strategies.",
        tech: ["Python", "LLMs", "NLP"],
        github: "https://github.com/KiranGitHub2024/AI-Powered-Talent-Scouting-Engagement-Agent",
      },
      {
        title: "My Portfolio (ChatGPT Driven)",
        desc: "Built completely using advanced prompt engineering.",
        tech: ["React", "Tailwind", "Prompt Engineering"],
      },
    ],
  },

  {
    title: "Data Science Projects",
    icon: <FaChartLine size={28} />,
    projects: [
      {
        title: "Customer Churn Analysis",
        desc: "Predicting customer churn using ML models.",
        tech: ["Python", "Pandas", "Scikit-learn"],
        github: "https://github.com/KiranGitHub2024/KiranRepo",
      },
      {
        title: "Prediction of Loan Defaults",
        desc: "Built models to predict loan default risk.",
        tech: ["Machine Learning", "Logistic Regression"],
        github: "https://github.com/KiranGitHub2024/KiranRepo",
      },
      {
        title: "Social Media Tourism",
        desc: "Analyzed tourism trends using social media data.",
        tech: ["EDA", "Visualization"],
        github: "https://github.com/KiranGitHub2024/KiranRepo",
      },
      {
        title: "Customer Segmentation & Targeted Advertising",
        desc: "Segmented customers using clustering techniques.",
        tech: ["K-Means", "Clustering"],
        github: "https://github.com/KiranGitHub2024/KiranRepo",
      },
      {
        title: "Sales Forecasting & Demand Prediction",
        desc: "Time series forecasting for business insights.",
        tech: ["Time Series", "Forecasting"],
        github: "https://github.com/KiranGitHub2024/KiranRepo",
      },
    ],
  },

  {
    title: "Full Stack Development Projects",
    icon: <FaLaptopCode size={28} />,
    projects: [
      {
        title: "EGERP (Accounting System)",
        desc: "ERP system with accounting, inventory and reporting.",
        tech: [".NET", "Angular", "SQL"],
      },
      {
        title: "Email Campaign Manager",
        desc: "Email automation and campaign tracking system.",
        tech: ["ASP.NET", "jQuery"],
      },
      {
        title: "Contact Manager",
        desc: "CRUD-based contact system with REST APIs.",
        tech: ["Django", "REST API"],
      },
      {
        title: "Grocery Cart System",
        desc: "E-commerce platform for retailers and customers.",
        tech: ["ASP.NET", "SQL"],
      },
    ],
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="px-10 py-24">
      <h2 className="text-4xl font-bold text-primary text-center">
        Projects
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>

      {/* CATEGORY CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mt-16">
        {categories.map((category, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            onClick={() =>
              setActiveCategory(activeCategory === index ? null : index)
            }
            className={`cursor-pointer p-6 rounded-xl border text-center transition
              ${
                activeCategory === index
                  ? "bg-primary text-black border-primary"
                  : "bg-white/5 border-white/10 hover:border-primary"
              }`}
          >
            <div className="mb-3 flex justify-center">{category.icon}</div>
            <h3 className="text-sm font-semibold">{category.title}</h3>
          </motion.div>
        ))}
      </div>

      {/* PROJECT LIST */}
      <AnimatePresence>
        {activeCategory !== null && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16"
          >
            <div className="grid md:grid-cols-2 gap-8">
              {categories[activeCategory].projects.map((project, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedProject(project)}
                  className="cursor-pointer bg-white/5 border border-white/10 p-6 rounded-xl hover:border-primary transition"
                >
                  <h4 className="text-lg font-bold text-white">
                    {project.title}
                  </h4>
                  <p className="text-gray-400 mt-2">{project.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-gray-900 p-8 rounded-xl max-w-lg w-full border border-primary"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-primary">
                {selectedProject.title}
              </h3>

              <p className="text-gray-300 mt-4">
                {selectedProject.desc}
              </p>

              {/* TECH STACK */}
              <div className="mt-6">
                <h4 className="text-white font-semibold">Tech Stack:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedProject.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-primary text-black rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* GITHUB BUTTON (CONDITIONAL) */}
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 mt-6 px-4 py-2 bg-primary text-black rounded-full hover:scale-105 transition"
                >
                  <FaGithub />
                  View on GitHub
                </a>
              )}

              <button
                onClick={() => setSelectedProject(null)}
                className="mt-6 px-4 py-2 border border-gray-600 rounded-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}