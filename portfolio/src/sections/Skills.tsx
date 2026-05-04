import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    "Python, .Net , C#",
    "Machine Learning, XGBoost, Random Forest",
    "Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn",
    " GenAI - ChatGPT, Codex, Gemini, Ollama ",
    "Power BI, Tableau",
    "Web Scraping (BeautifulSoup)",
    "HTML5 & CSS3, Bootstrap" ,
    "React, Angular",
    ".NET Framework, ASP.NET, ADO.NET, Django (REST API)",
    "SQL - Window Functions, Stored Procedures, Transactions",
    "jQuery",
  ];

  return (
    <motion.section id="skills"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-10 py-24"
    >
      <h2 className="text-4xl font-bold text-primary text-center">Skills</h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>

      <div className="grid md:grid-cols-3 gap-8 mt-12">
        {skills.map((skill, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-xl 
                       hover:scale-105 hover:border-primary transition duration-300"
          >
            <p className="text-gray-300">{skill}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}