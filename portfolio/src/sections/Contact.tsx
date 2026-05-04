import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-10 py-24 text-center"
    >
      <h2 className="text-4xl font-bold text-primary">
        Contact
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>

      <p className="text-gray-400 mt-6">
        Feel free to reach out for collaborations or opportunities.
      </p>

      {/* CONTACT DETAILS */}
      <div className="mt-10 space-y-6">

        {/* Phone */}
        <div className="flex items-center justify-center gap-3 text-lg text-white">
          <FaPhoneAlt className="text-primary" />
          <span>+91-8096731283</span> {/* 👉 Replace with your number */}
        </div>

        {/* Email */}
        <div className="flex items-center justify-center gap-3 text-lg text-white">
          <FaEnvelope className="text-primary" />
          <span>rk.kothapalli95@gmail.com</span> {/* 👉 Replace with your email */}
        </div>

      </div>

      {/* SOCIAL ICONS */}
      <div className="flex justify-center gap-8 mt-10">

        {/* GitHub */}
        <a
          href="https://github.com/KiranGitHub2024"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub
            size={28}
            className="hover:text-primary transition cursor-pointer"
          />
        </a>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/ravi-kiran-kothapalli-462b34219/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin
            size={28}
            className="hover:text-primary transition cursor-pointer"
          />
        </a>

        {/* HackerRank */}
        <a
          href="https://www.hackerrank.com/profile/rk_kothapalli95"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SiHackerrank
            size={28}
            className="hover:text-primary transition cursor-pointer"
          />
        </a>

      </div>
    </motion.section>
  );
}