import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaDownload, FaFilePdf } from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";
import { trackEvent } from "../analytics";
import profile from "../assets/profile.png";

export default function Hero() {
  const roles = ["LLM Evaluator & AI Trainer","Prompt Engineer ", "Data Scientist", "AI Engineer", "Full Stack Developer & Data Analyst"];
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  const [showResume, setShowResume] = useState(false);

  useEffect(() => {
    const currentRole = roles[index];

    if (charIndex < currentRole.length) {
      const timeout = setTimeout(() => {
        setText((prev) => prev + currentRole[charIndex]);
        setCharIndex(charIndex + 1);
      }, 80);

      return () => clearTimeout(timeout);
    } else {
      const timeout = setTimeout(() => {
        setText("");
        setCharIndex(0);
        setIndex((prev) => (prev + 1) % roles.length);
      }, 1200);

      return () => clearTimeout(timeout);
    }
  }, [charIndex, index]);

  // 🔥 Track Download Click
  const handleDownload = () => {
    trackEvent("Resume", "Download Click");

    const link = document.createElement("a");
    link.href = "/resume.pdf";
    link.download = "Ravi_Kiran_Resume.pdf";
    link.click();
  };

  return (
    <>
      <section
        id="home"
        className="pt-24 min-h-screen flex items-center justify-center px-6 relative overflow-hidden"
      >
        {/* Glow */}
        <div className="absolute w-[700px] h-[700px] bg-primary opacity-10 blur-3xl rounded-full top-10 left-1/2 -translate-x-1/2"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-7xl w-full">

          {/* LEFT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-6xl font-bold text-white"
            >
              Ravi Kiran <br />
              <span className="text-primary">Kothapalli</span>
            </motion.h1>

            {/* Typing */}
            <p className="mt-6 text-xl text-gray-300 h-8">
              {text}
              <span className="text-primary">|</span>
            </p>

            <p className="mt-6 text-gray-400 max-w-lg">
              Turning data into intelligent systems and building AI-powered solutions.
            </p>

            {/* 🔥 BUTTONS */}
            <div className="flex flex-wrap gap-4 mt-8">

              {/* View Resume */}
              <button
                onClick={() => setShowResume(true)}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-black rounded-full hover:scale-105 transition"
              >
                <FaFilePdf />
                View Resume
              </button>

              {/* Download Resume */}
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-6 py-3 border border-gray-600 rounded-full hover:border-primary hover:text-primary transition"
              >
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  <FaDownload />
                </motion.span>
                Download Resume
              </button>
            </div>

            {/* Social Icons */}
            <div className="flex gap-6 mt-8">
                {/* GitHub */}
              <a
                href="https://github.com/KiranGitHub2024"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Social", "GitHub Click")}
              >
                <FaGithub size={26} className="hover:text-primary transition" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ravi-kiran-kothapalli-462b34219/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Social", "LinkedIn Click")}
              >
                <FaLinkedin size={26} className="hover:text-primary transition" />
              </a>

              {/* HackerRank */}
              <a
                href="https://www.hackerrank.com/profile/rk_kothapalli95"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("Social", "HackerRank Click")}
              >
                <SiHackerrank size={26} className="hover:text-primary transition" />
              </a>
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex justify-center"
          >
            <img
              src={profile}
              alt="profile"
              className="w-[320px] md:w-[420px] rounded-full"
            />
          </motion.div>

        </div>
      </section>

      {/* 🔥 RESUME MODAL */}
      <AnimatePresence>
        {showResume && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowResume(false)}
          >
            <motion.div
              className="bg-gray-900 w-[90%] h-[90%] rounded-xl overflow-hidden"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src="/resume.pdf"
                className="w-full h-full"
              ></iframe>

              <button
                onClick={() => setShowResume(false)}
                className="absolute top-4 right-4 px-4 py-2 bg-primary text-black rounded-full"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}