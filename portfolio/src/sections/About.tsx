import { motion } from "framer-motion";
import { FaUserAstronaut, FaBriefcase, FaLayerGroup, FaProjectDiagram } from "react-icons/fa";

const stats = [
  { icon: <FaBriefcase size={16} />, value: "5+", label: "Years Experience" },
  { icon: <FaLayerGroup size={16} />, value: "3", label: "Roles Mastered" },
  { icon: <FaProjectDiagram size={16} />, value: "15+", label: "Projects Delivered" },
];

export default function About() {
  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-10 py-24"
    >
      <h2 className="text-4xl font-bold text-primary text-center">About Me</h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>

      <div className="mt-12 max-w-4xl mx-auto">

        {/* Shimmer border wrapper */}
        <div className="relative rounded-xl p-[1.5px]"
          style={{
            background: "linear-gradient(120deg, #c9a227 0%, #ffffff10 40%, #c9a227 100%)",
            backgroundSize: "200% 200%",
            animation: "shimmer 4s linear infinite",
          }}
        >
          <style>{`
            @keyframes shimmer {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
          `}</style>

          {/* Card */}
          <div className="bg-[#0f0f13] rounded-xl p-8 border-l-4 border-primary">

            {/* Two-column layout */}
            <div className="flex flex-col md:flex-row gap-8">

              {/* LEFT — Icon + Title */}
              <div className="flex flex-col items-center md:items-start gap-3 md:w-40 shrink-0">
                <div className="p-4 rounded-full bg-primary/10 border border-primary/30">
                  <FaUserAstronaut size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white text-center md:text-left">
                  Who am I?
                </h3>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] bg-white/10 self-stretch"></div>

              {/* RIGHT — Text */}
              <div className="flex-1">
                <p className="text-gray-400 leading-relaxed">
                  AI-native Full Stack Developer, Prompt Engineer, and LLM Evaluator with
                  experience building intelligent applications using AI-assisted development
                  workflows, rapid prototyping, and prompt-driven engineering. Skilled in
                  leveraging Generative AI tools such as{" "}
                  <span className="text-primary font-medium">
                    ChatGPT, Gemini, Codex, and Ollama
                  </span>{" "}
                  to accelerate software development, optimize workflows, and deliver scalable
                  end-to-end solutions. Experienced in full-stack development, NLP systems, LLM
                  evaluation, and AI-powered SaaS architecture using{" "}
                  <span className="text-primary font-medium">React, FastAPI, Python,</span> and
                  modern cloud deployment platforms. Completed{" "}
                  <span className="text-primary font-medium">MCA – Data Science</span> from Jain
                  University, with a strong focus on applying AI-driven and data-centric
                  approaches to solve real-world business problems.
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/10 mt-8 mb-6"></div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-1 p-4 rounded-lg bg-primary/5
                             border border-primary/10 hover:border-primary/40 hover:bg-primary/10
                             transition duration-300"
                >
                  <span className="text-primary">{stat.icon}</span>
                  <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  <span className="text-xs text-gray-400 text-center">{stat.label}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}