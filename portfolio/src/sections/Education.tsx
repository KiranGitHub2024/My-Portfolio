import { motion } from "framer-motion";
import { FaGraduationCap } from "react-icons/fa";

export default function Education() {
  return (
    <motion.section
      id="education"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-10 py-24 text-center"
    >
      <h2 className="text-4xl font-bold text-primary">
        Education
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>

      <div className="mt-12 max-w-4xl mx-auto">

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl 
                        hover:border-primary transition duration-300">

          {/* Degree */}
          <div className="flex items-center justify-center gap-3">
            <FaGraduationCap className="text-primary" size={22} />
            <h3 className="text-xl font-bold text-white">
              Master of Computer Applications (MCA)
            </h3>
          </div>

          {/* University */}
          <p className="text-gray-400 mt-3">
            Jain University, Bangalore
          </p>

          {/* Specialization */}
          <p className="text-gray-400 mt-1">
            Specialization in Data Science
          </p>

          {/* Timeline */}
            <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs">
            June 2021 — September 2023
            </span>
          {/* CGPA */}
          <p className="text-primary mt-3 font-semibold">
            CGPA: 8.73 / 10 {/* 👉 Update if needed */}
          </p>

        </div>

      </div>
    </motion.section>
  );
}