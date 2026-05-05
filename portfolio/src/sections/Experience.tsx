import { motion } from "framer-motion";

const experiences = [
  {
    company: "Deccan AI Experts",
    duration: "November 2025 - Present",
    role: "AI Engineer / LLM Evaluator",
    desc: "Working on LLM evaluation, prompt engineering, and improving AI response quality across multiple projects.",
  },
  {
    company: "Outlier",
    duration: "Sep 2024 - October 2025",
    role: "Prompt Engineer & AI Trainer",
    desc: "Evaluated AI model outputs, improved prompt strategies, and ensured high-quality responses through structured testing.",
  },
  {
    company: "Fusion Forte Solutions",
    duration: "Jan 2020 - Aug 2024",
    role: "Full Stack Developer & Data Analyst",
    desc: "Developed enterprise applications using .NET, Angular, and SQL. Built ERP systems, APIs, and scalable web applications. Expert at performing EDA (Exploratory Data Analysis)",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="px-10 py-24">
      <h2 className="text-4xl font-bold text-primary text-center">
        Experience
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>

      <div className="relative mt-16 max-w-4xl mx-auto">

        {/* Vertical Line */}
        <div className="absolute left-4 top-0 w-[2px] h-full bg-primary/30"></div>

        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="relative pl-12 mb-12"
          >
            {/* Dot */}
            <div className="absolute left-2 top-2 w-4 h-4 bg-primary rounded-full border-4 border-black"></div>

            {/* Card */}
            <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl 
                            hover:border-primary transition duration-300">

              <h3 className="text-xl font-bold text-white">
                {exp.company}
              </h3>

              <p className="text-primary text-sm mt-1">
                {exp.duration}
              </p>

              <p className="text-gray-300 mt-2 font-medium">
                {exp.role}
              </p>

              <p className="text-gray-400 mt-3">
                {exp.desc}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}