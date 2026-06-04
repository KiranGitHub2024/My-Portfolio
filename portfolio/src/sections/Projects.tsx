import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import React from "react";
import {
  FaBrain, FaLaptopCode, FaChartLine,
  FaGithub, FaExternalLinkAlt, FaStar,
  FaGlobe, FaLock, FaArrowRight,
} from "react-icons/fa";
import { SiOpenai } from "react-icons/si";

type Project = {
  title: string;
  desc: string;
  tech: string[];
  github?: string;
  websiteLink?: string;
  featured?: boolean;
  isOwnProduct?: boolean;
  status: "live" | "github" | "private";
};

type Category = {
  title: string;
  icon: React.ElementType;
  projects: Project[];
};

const categories: Category[] = [
  {
    title: "LLM Evaluation Projects",
    icon: SiOpenai,
    projects: [
      {
        title: "Action Extensions",
        desc: "Evaluated and optimized LLM outputs for action-based tasks, improving response accuracy and instruction-following across multi-step workflows.",
        tech: ["LLMs", "Prompt Engineering"],
        status: "private",
      },
      {
        title: "Project Matrix",
        desc: "Built a structured framework for systematically evaluating LLM outputs across dimensions like coherence, factuality, and task completion.",
        tech: ["Evaluation", "Data Analysis"],
        status: "private",
      },
      {
        title: "Bluebird",
        desc: "Designed and applied structured evaluation pipelines to improve LLM response quality, reducing hallucinations and improving relevance scores.",
        tech: ["LLMs", "Quality Analysis"],
        status: "private",
      },
      {
        title: "OTS Prompts",
        desc: "Developed and refined off-the-shelf prompt strategies to ensure consistent, high-quality LLM performance across varied use cases and domains.",
        tech: ["Prompt Engineering"],
        status: "private",
      },
    ],
  },
  {
    title: "AI & Generative AI Projects",
    icon: FaBrain,
    projects: [
      {
        title: "CareerLens AI",
        desc: "My own product — CareerLens AI is a live AI-powered Resume Analysis and ATS Optimization platform. It helps candidates and recruiters automate resume evaluation using Generative AI and NLP, offering smart scoring, keyword matching, and actionable improvement suggestions.",
        tech: ["React", "Vite", "Tailwind CSS", "Python", "GenAI", "Gemini API"],
        websiteLink: "https://www.careerlens.co.in",
        featured: true,
        isOwnProduct: true,
        status: "live",
      },
      {
        title: "AI Powered Talent Scouting Agent",
        desc: "An intelligent AI agent that analyzes candidate profiles, scores them against job requirements, and auto-generates personalized engagement strategies for recruiters.",
        tech: ["Python", "LLMs", "NLP"],
        github: "https://github.com/KiranGitHub2024/AI-Powered-Talent-Scouting-Engagement-Agent",
        featured: true,
        status: "github",
      },
      {
        title: "My Portfolio (ChatGPT Driven)",
        desc: "This very portfolio — designed and built end-to-end using advanced prompt engineering with ChatGPT, showcasing AI-assisted development as a core workflow.",
        tech: ["React", "Tailwind", "Prompt Engineering"],
        status: "live",
      },
    ],
  },
  {
    title: "Data Science Projects",
    icon: FaChartLine,
    projects: [
      {
        title: "Customer Churn Analysis",
        desc: "Predicted customer churn using ML classification models including Random Forest and XGBoost, enabling proactive retention strategies for businesses.",
        tech: ["Python", "Pandas", "Scikit-learn"],
        github: "https://github.com/KiranGitHub2024/KiranRepo",
        status: "github",
      },
      {
        title: "Prediction of Loan Defaults",
        desc: "Built logistic regression and ensemble models to predict loan default risk, helping financial institutions make data-driven lending decisions.",
        tech: ["Machine Learning", "Logistic Regression"],
        github: "https://github.com/KiranGitHub2024/KiranRepo",
        status: "github",
      },
      {
        title: "Social Media Tourism",
        desc: "Analyzed tourism trends and traveler sentiment using social media data, uncovering actionable insights through EDA and data visualization.",
        tech: ["EDA", "Visualization"],
        github: "https://github.com/KiranGitHub2024/KiranRepo",
        status: "github",
      },
      {
        title: "Customer Segmentation & Targeted Advertising",
        desc: "Applied K-Means clustering to segment customers by behavior and demographics, enabling targeted marketing campaigns with measurably higher conversion.",
        tech: ["K-Means", "Clustering"],
        github: "https://github.com/KiranGitHub2024/KiranRepo",
        status: "github",
      },
      {
        title: "Sales Forecasting & Demand Prediction",
        desc: "Built time series forecasting models to predict future sales and demand patterns, providing actionable business intelligence for inventory planning.",
        tech: ["Time Series", "Forecasting"],
        github: "https://github.com/KiranGitHub2024/KiranRepo",
        status: "github",
      },
    ],
  },
  {
    title: "Full Stack Development Projects",
    icon: FaLaptopCode,
    projects: [
      {
        title: "EGERP (Accounting System)",
        desc: "Enterprise-grade ERP system covering accounting, inventory management, and financial reporting — built for multi-department business operations.",
        tech: [".NET", "Angular", "SQL"],
        status: "private",
      },
      {
        title: "Email Campaign Manager",
        desc: "End-to-end email automation and campaign tracking platform with scheduling, open-rate analytics, and subscriber management features.",
        tech: ["ASP.NET", "jQuery"],
        status: "private",
      },
      {
        title: "Contact Manager",
        desc: "Full-featured CRUD contact management system with RESTful APIs, search, tagging, and role-based access control.",
        tech: ["Django", "REST API"],
        status: "private",
      },
      {
        title: "Grocery Cart System",
        desc: "E-commerce platform for grocery retailers with product listings, cart management, order processing, and customer-facing storefront.",
        tech: ["ASP.NET", "SQL"],
        status: "private",
      },
    ],
  },
];

const totalProjects = categories.reduce((sum, c) => sum + c.projects.length, 0);

const statusConfig = {
  live:    { label: "Live",    color: "bg-green-500/10 text-green-400 border-green-500/30" },
  github:  { label: "GitHub",  color: "bg-blue-500/10 text-blue-400 border-blue-500/30"   },
  private: { label: "Private", color: "bg-gray-500/10 text-gray-400 border-gray-500/30"   },
};

function StatusBadge({ status }: { status: "live" | "github" | "private" }) {
  const cfg = statusConfig[status];
  return (
    <span className={"flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border " + cfg.color}>
      {status === "live"    && <FaGlobe size={9} />}
      {status === "github"  && <FaGithub size={9} />}
      {status === "private" && <FaLock size={9} />}
      {cfg.label}
    </span>
  );
}

function ProjectModal({
  project,
  categoryIcon,
  onClose,
}: {
  project: Project;
  categoryIcon: React.ElementType;
  onClose: () => void;
}) {
  const Icon = categoryIcon;
  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 px-4"
      style={{ backgroundColor: "rgba(0,0,0,0.8)" }}
      onClick={onClose}
    >
      <div
        className={
          "relative overflow-hidden bg-[#0f0f13] p-8 rounded-xl w-full max-w-lg border " +
          (project.featured ? "border-primary" : "border-white/20")
        }
        style={project.featured ? { boxShadow: "0 0 40px rgba(201,162,39,0.15)" } : {}}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal watermark */}
        <div className="absolute -bottom-6 -right-6 opacity-5 pointer-events-none">
          <Icon size={160} className="text-primary" />
        </div>

        <div className="relative z-10">
          {/* Badges */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.isOwnProduct && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary text-black">
                <FaGlobe size={10} /> Own Product
              </span>
            )}
            {project.featured && !project.isOwnProduct && (
              <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30">
                <FaStar size={10} /> Featured
              </span>
            )}
            <StatusBadge status={project.status} />
          </div>

          <h3 className="text-2xl font-bold text-primary">{project.title}</h3>
          {project.isOwnProduct && (
            <p className="text-sm text-primary/70 mt-1">🌐 careerlens.co.in</p>
          )}

          <p className="text-gray-300 mt-4 leading-relaxed text-sm">{project.desc}</p>

          <div className="w-full h-[1px] bg-white/10 my-5" />

          <h4 className="text-white font-semibold text-sm mb-2">Tech Stack</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span key={i} className="px-3 py-1 bg-primary text-black rounded-full text-xs font-medium">
                {tech}
              </span>
            ))}
          </div>

          <div className="w-full h-[1px] bg-white/10 my-5" />

          <div className="flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-full text-sm font-semibold hover:scale-105 transition"
              >
                <FaGithub /> View on GitHub
              </a>
            )}
            {project.websiteLink && (
              <a
                href={project.websiteLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary text-black rounded-full text-sm font-semibold hover:scale-105 transition"
              >
                <FaExternalLinkAlt /> Visit careerlens.co.in
              </a>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 text-gray-400 hover:border-primary hover:text-primary rounded-full text-sm transition"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCategoryIcon, setSelectedCategoryIcon] =
    useState<React.ElementType>(() => FaBrain);

  const handleSelectProject = (
    project: Project,
    icon: React.ElementType,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedCategoryIcon(() => icon);
    setSelectedProject(project);
  };

  return (
    <section id="projects" className="px-10 py-24">
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 0% 50%;   }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%;   }
        }
      `}</style>

      <h2 className="text-4xl font-bold text-primary text-center">Projects</h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
      <p className="text-center text-gray-500 text-sm mt-4 tracking-wide">
        {totalProjects} projects across {categories.length} categories — click a category to explore
      </p>

      {/* CATEGORY TABS */}
      <div className="grid md:grid-cols-4 gap-6 mt-12">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isActive = activeCategory === index;
          return (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02, y: -4 }}
              onClick={() => setActiveCategory(isActive ? null : index)}
              className={
                "relative cursor-pointer rounded-xl border text-center " +
                "transition duration-300 overflow-hidden group " +
                (isActive
                  ? "bg-primary text-black border-primary"
                  : "bg-white/5 border-white/10 hover:border-primary text-white")
              }
              style={
                isActive
                  ? { boxShadow: "0 0 28px rgba(201,162,39,0.35)" }
                  : {}
              }
            >
              {/* Gold top border accent */}
              <div
                className={
                  "absolute top-0 left-0 w-full h-[3px] transition duration-300 " +
                  (isActive
                    ? "bg-black/20"
                    : "bg-primary/40 group-hover:bg-primary")
                }
              />

              {/* Inner gradient for depth */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isActive
                    ? "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, transparent 100%)"
                    : "linear-gradient(180deg, rgba(201,162,39,0.04) 0%, transparent 100%)",
                }}
              />

              {/* Large watermark icon */}
              <div
                className={
                  "absolute -bottom-2 -right-2 transition duration-300 " +
                  (isActive
                    ? "opacity-10"
                    : "opacity-[0.07] group-hover:opacity-[0.12]")
                }
              >
                <Icon size={90} />
              </div>

              {/* Content */}
              <div className="relative z-10 p-6">
                {/* Icon in gold circle */}
                <div className="flex justify-center mb-4">
                  <div
                    className={
                      "p-3 rounded-full border transition duration-300 " +
                      (isActive
                        ? "bg-black/20 border-black/20"
                        : "bg-primary/10 border-primary/20 group-hover:bg-primary/20")
                    }
                  >
                    <Icon size={22} />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold leading-snug">
                  {category.title}
                </h3>

                {/* Badge */}
                <div className="mt-3 flex justify-center">
                  <span
                    className={
                      "px-3 py-1 rounded-full text-xs font-semibold " +
                      (isActive
                        ? "bg-black/20 text-black"
                        : "bg-primary/10 text-primary border border-primary/20")
                    }
                  >
                    {category.projects.length} projects
                  </span>
                </div>
              </div>

              {/* Active bottom indicator */}
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 w-full h-[3px] bg-black/20"
                />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* PROJECT CARDS */}
      <AnimatePresence mode="wait">
        {activeCategory !== null && (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="mt-12"
          >
            {/* CareerLens hero card */}
            {categories[activeCategory].projects
              .filter((p) => p.isOwnProduct)
              .map((project, i) => {
                const Icon = categories[activeCategory].icon;
                return (
                  <div
                    key={"hero-" + i}
                    className="relative rounded-xl p-[1.5px] mb-6"
                    style={{
                      background: "linear-gradient(120deg, #c9a227 0%, #ffffff10 40%, #c9a227 100%)",
                      backgroundSize: "200% 200%",
                      animation: "shimmer 4s linear infinite",
                    }}
                  >
                    <div className="relative overflow-hidden bg-[#0f0f13] rounded-xl p-8 border-l-4 border-primary group">
                      <div className="absolute -bottom-6 -right-6 opacity-5 group-hover:opacity-10 transition duration-500 pointer-events-none">
                        <FaBrain size={180} className="text-primary" />
                      </div>
                      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-4">
                            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary text-black">
                              <FaGlobe size={10} /> Own Product
                            </span>
                            <span className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30">
                              <FaStar size={10} /> Featured
                            </span>
                            <StatusBadge status={project.status} />
                          </div>
                          <h3 className="text-2xl font-black text-primary">{project.title}</h3>
                          <p className="text-xs text-primary/70 mt-1 mb-3">🌐 careerlens.co.in</p>
                          <p className="text-gray-300 text-sm leading-relaxed max-w-2xl">{project.desc}</p>
                          <div className="flex flex-wrap gap-2 mt-4">
                            {project.tech.map((tech, j) => (
                              <span key={j} className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col gap-3 shrink-0">
                          {project.websiteLink && (
                            <a
                              href={project.websiteLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 px-5 py-2.5 bg-primary text-black rounded-full text-sm font-bold hover:brightness-110 hover:scale-105 transition duration-300"
                              style={{ boxShadow: "0 0 20px rgba(201,162,39,0.3)" }}
                            >
                              <FaExternalLinkAlt size={12} /> Visit careerlens.co.in
                            </a>
                          )}
                          <button
                            onClick={(e) => handleSelectProject(project, Icon, e)}
                            className="flex items-center gap-2 px-5 py-2.5 border border-primary/30 text-primary rounded-full text-sm font-semibold hover:border-primary hover:bg-primary/10 transition duration-300"
                          >
                            <FaArrowRight size={12} /> View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

            {/* Regular project cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {categories[activeCategory].projects
                .filter((p) => !p.isOwnProduct)
                .map((project, i) => {
                  const Icon = categories[activeCategory].icon;
                  const cardNumber = String(i + 1).padStart(2, "0");
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: i * 0.08 }}
                      onClick={(e) => handleSelectProject(project, Icon, e)}
                      className={
                        "cursor-pointer relative overflow-hidden p-8 rounded-xl border " +
                        "transition duration-300 group flex flex-col min-h-[280px] " +
                        (project.featured
                          ? "bg-primary/5 border-primary/40 hover:border-primary"
                          : "bg-white/5 border-white/10 hover:border-primary")
                      }
                    >
                      {/* Faded number watermark */}
                      <div className="absolute top-4 right-5 text-6xl font-black text-primary/5 group-hover:text-primary/10 transition duration-500 pointer-events-none select-none leading-none">
                        {cardNumber}
                      </div>

                      {/* Card watermark icon */}
                      <div className="absolute -bottom-4 -right-4 opacity-0 group-hover:opacity-5 transition duration-500 pointer-events-none">
                        <Icon size={110} className="text-primary" />
                      </div>

                      {/* Hover shimmer */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none rounded-xl"
                        style={{
                          background: "linear-gradient(135deg, rgba(201,162,39,0.04) 0%, transparent 60%)",
                        }}
                      />

                      <div className="relative z-10 flex flex-col flex-1">
                        {/* Badges */}
                        <div className="flex items-center gap-2 mb-4 flex-wrap">
                          {project.featured && (
                            <span className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-primary/20 text-primary border border-primary/30">
                              <FaStar size={10} /> Featured
                            </span>
                          )}
                          <StatusBadge status={project.status} />
                        </div>

                        {/* Title */}
                        <h4 className={
                          "text-xl font-bold group-hover:text-primary transition duration-200 mb-3 " +
                          (project.featured ? "text-primary" : "text-white")
                        }>
                          {project.title}
                        </h4>

                        {/* Description — full, no clamp */}
                        <p className="text-gray-400 text-sm leading-relaxed">
                          {project.desc}
                        </p>

                        {/* Divider */}
                        <div className="w-full h-[1px] bg-white/10 my-5" />

                        {/* Tech Tags */}
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((tech, j) => (
                            <span
                              key={j}
                              className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        {/* View Details pill — pinned to bottom */}
                        <div className="mt-auto pt-5">
                          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 group-hover:bg-primary group-hover:text-black transition duration-300">
                            View Details <FaArrowRight size={10} />
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          categoryIcon={selectedCategoryIcon}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}