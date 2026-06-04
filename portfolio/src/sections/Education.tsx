import { motion } from "framer-motion";
import { FaGraduationCap, FaUniversity, FaCalendarAlt, FaStar } from "react-icons/fa";

export default function Education() {
  return (
    <motion.section
      id="education"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-10 py-24"
    >
      <h2 className="text-4xl font-bold text-primary text-center">
        Education
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
      <p className="text-center text-gray-500 text-sm mt-4 tracking-wide">
        Academic foundation behind the work
      </p>

      <div className="mt-12 max-w-4xl mx-auto">

        {/* Shimmer border wrapper */}
        <div
          className="relative rounded-xl p-[1.5px]"
          style={{
            background:
              "linear-gradient(120deg, #c9a227 0%, #ffffff10 40%, #c9a227 100%)",
            backgroundSize: "200% 200%",
            animation: "shimmer 4s linear infinite",
          }}
        >
          <style>{`
            @keyframes shimmer {
              0%   { background-position: 0% 50%;   }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%;   }
            }
          `}</style>

          {/* Card */}
          <div className="relative overflow-hidden bg-[#0f0f13] rounded-xl p-8
                          border-l-4 border-primary group">

            {/* Watermark graduation cap */}
            <div className="absolute -bottom-6 -right-6 opacity-5
                            group-hover:opacity-10 transition duration-500">
              <FaGraduationCap size={160} className="text-primary" />
            </div>

            {/* Two-column layout */}
            <div className="relative z-10 flex flex-col md:flex-row gap-8">

              {/* LEFT — Degree details */}
              <div className="flex-1">

                {/* Degree title row */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-primary/10 border border-primary/30">
                    <FaGraduationCap size={22} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white leading-snug">
                    Master of Computer Applications
                    <span className="text-primary"> (MCA)</span>
                  </h3>
                </div>

                {/* University */}
                <div className="flex items-center gap-2 mt-3">
                  <FaUniversity size={13} className="text-primary shrink-0" />
                  <p className="text-gray-300 font-medium text-sm">
                    Jain University, Bangalore
                  </p>
                </div>

                {/* Specialization badge */}
                <div className="mt-3">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full
                                   text-xs font-semibold bg-primary/10 text-primary
                                   border border-primary/20">
                    <FaStar size={9} />
                    Specialization in Data Science
                  </span>
                </div>

                {/* Timeline badge */}
                <div className="mt-3">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full
                                   text-xs font-medium bg-primary/10 text-primary
                                   border border-primary/20">
                    <FaCalendarAlt size={9} />
                    June 2021 — September 2023
                  </span>
                </div>

              </div>

              {/* Vertical divider */}
              <div className="hidden md:block w-[1px] bg-white/10 self-stretch" />

              {/* RIGHT — CGPA stat */}
              <div className="flex flex-col items-center justify-center
                              md:w-44 shrink-0 gap-2">
                <p className="text-xs text-gray-500 tracking-widest uppercase">
                  CGPA
                </p>
                <div className="flex items-end gap-1">
                  <span className="text-6xl font-black text-primary leading-none">
                    8.73
                  </span>
                  <span className="text-xl text-gray-500 font-semibold mb-1">
                    /10
                  </span>
                </div>
                <span className="flex items-center gap-1 px-3 py-1 rounded-full
                                 text-xs font-semibold bg-primary/10 text-primary
                                 border border-primary/20 mt-1">
                  <FaStar size={9} />
                  Distinction
                </span>
              </div>

            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}