import { motion } from "framer-motion";

type Certification = {
  title: string;
  provider: string;
  link: string;
};

const certifications: Certification[] = [
  {
    title: "Exploratory Data Analysis for Machine Learning",
    provider: "IBM (Coursera)",
    link: "https://coursera.org/verify/AMD45H2VFNTH",
  },
  {
    title: "Google Data Analytics Professional Certificate",
    provider: "Google (Coursera)",
    link: "https://www.coursera.org/account/accomplishments/professional-cert/FJ9BPNO17Q6U",
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

      <div className="grid md:grid-cols-2 gap-10 mt-12 max-w-5xl mx-auto">
        {certifications.map((cert, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl 
                       hover:scale-105 hover:border-primary transition duration-300"
          >
            <h3 className="text-xl font-bold text-white">
              {cert.title}
            </h3>

            <p className="text-gray-400 mt-2">
              {cert.provider}
            </p>

            <a
              href={cert.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-primary hover:underline"
            >
              View Certificate →
            </a>
          </div>
        ))}
      </div>
    </motion.section>
  );
}