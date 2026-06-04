import { motion } from "framer-motion";
import { FaAward, FaCheckCircle, FaExternalLinkAlt } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";

type Certification = {
  title: string;
  provider: string;
  issued: string;
  link: string;
  icon: React.ReactNode;
  brandColor: string;
  brandGlow: string;
};

const certifications: Certification[] = [
  {
    title: "Exploratory Data Analysis for Machine Learning",
    provider: "IBM (Coursera)",
    issued: "January 24, 2024",
    link: "https://coursera.org/verify/AMD45H2VFNTH",
    icon: <span className="text-blue-400 font-black text-lg tracking-tighter">IBM</span>,    brandColor: "text-blue-400",
    brandGlow: "rgba(59,130,246,0.08)",
  },
  {
    title: "Google Data Analytics Professional Certificate",
    provider: "Google (Coursera)",
    issued: "April 24, 2026",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/FJ9BPNO17Q6U",
    icon: <SiGoogle size={28} />,
    brandColor: "text-red-400",
    brandGlow: "rgba(234,67,53,0.08)",
  },
];

export default function Certifications() {
  return (
    <motion.section
      id="certifications"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-10 py-24"
    >
      <h2 className="text-4xl font-bold text-primary text-center">
        Certifications
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
      <p className="text-center text-gray-500 text-sm mt-4 tracking-wide">
        Verified credentials from industry leaders
      </p>

      <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-5xl mx-auto">
        {certifications.map((cert, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-xl border border-white/10
                       bg-white/5 backdrop-blur-lg p-6
                       hover:border-primary transition duration-300 group"
            style={{
              background:
                "linear-gradient(135deg, " +
                cert.brandGlow +
                " 0%, rgba(255,255,255,0.03) 100%)",
            }}
          >
            {/* Watermark medal */}
            <div className="absolute -bottom-4 -right-4 opacity-5 group-hover:opacity-10 transition duration-500">
              <FaAward size={120} className="text-primary" />
            </div>

            {/* Top row — provider icon + verified badge */}
            <div className="flex items-center justify-between mb-5">
              <div
                className={
                  "flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 " +
                  cert.brandColor
                }
              >
                {cert.icon}
                <span className="text-xs font-semibold text-gray-300">
                  {cert.provider}
                </span>
              </div>

              <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                <FaCheckCircle size={10} />
                Verified
              </span>
            </div>

            {/* Certificate title */}
            <h3 className="text-lg font-bold text-white leading-snug group-hover:text-primary transition duration-300">
              {cert.title}
            </h3>

            {/* Issued date */}
            <p className="text-xs text-gray-500 mt-2 tracking-wide">
              Issued · {cert.issued}
            </p>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/10 my-4" />

            {/* View certificate button */}
            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold
                         bg-primary/10 text-primary border border-primary/20
                         hover:bg-primary hover:text-black transition duration-300"
            >
              <FaExternalLinkAlt size={11} />
              View Certificate
            </a>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}