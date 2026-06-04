import { motion } from "framer-motion";
import {
  FaEnvelope, FaGithub, FaLinkedin,
  FaPhoneAlt, FaPaperPlane,
} from "react-icons/fa";
import { SiHackerrank } from "react-icons/si";
import { trackEvent } from "../analytics";

const contactDetails = [
  {
    icon: <FaEnvelope size={18} />,
    label: "Email",
    value: "rk.kothapalli95@gmail.com",
    href: "mailto:rk.kothapalli95@gmail.com",
  },
  {
    icon: <FaPhoneAlt size={18} />,
    label: "Phone",
    value: "Available on LinkedIn",
    href: "https://www.linkedin.com/in/ravi-kiran-kothapalli-462b34219/",
  },
];

const socialLinks = [
  {
    icon: <FaGithub size={24} />,
    label: "GitHub",
    sublabel: "KiranGitHub2024",
    href: "https://github.com/KiranGitHub2024",
    event: "GitHub Click",
  },
  {
    icon: <FaLinkedin size={24} />,
    label: "LinkedIn",
    sublabel: "ravi-kiran-kothapalli",
    href: "https://www.linkedin.com/in/ravi-kiran-kothapalli-462b34219/",
    event: "LinkedIn Click",
  },
  {
    icon: <SiHackerrank size={24} />,
    label: "HackerRank",
    sublabel: "rk_kothapalli95",
    href: "https://www.hackerrank.com/profile/rk_kothapalli95",
    event: "HackerRank Click",
  },
];

export default function Contact() {
  return (
    <motion.section
      id="contact"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-10 py-24"
    >
      {/* Section heading */}
      <h2 className="text-4xl font-bold text-primary text-center">
        Contact
      </h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>
      <p className="text-center text-gray-500 text-sm mt-4 tracking-wide">
        Let's build something great together
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

          {/* Main card */}
          <div className="bg-[#0f0f13] rounded-xl p-8 border-l-4 border-primary">

            {/* Availability badge + tagline */}
            <div className="flex flex-col items-center text-center gap-4 mb-8">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                               text-xs font-semibold bg-primary/10 text-primary
                               border border-primary/20">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Open to Opportunities
              </span>

              <h3 className="text-2xl font-bold text-white">
                Have a project in mind or an opportunity to discuss?
              </h3>
              <p className="text-gray-400 max-w-lg text-sm leading-relaxed">
                I'm actively looking for exciting roles in AI, Data Science, and
                Full Stack Development. Whether it's a collaboration, a job opportunity,
                or just a hello — my inbox is always open.
              </p>
            </div>

            {/* Contact detail cards */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {contactDetails.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-4 p-4 rounded-xl
                             bg-white/5 border border-white/10
                             hover:border-primary hover:bg-primary/5
                             transition duration-300 group"
                >
                  <div className="p-3 rounded-full bg-primary/10 border border-primary/20
                                  text-primary group-hover:bg-primary group-hover:text-black
                                  transition duration-300">
                    {item.icon}
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-gray-500 tracking-wide uppercase">
                      {item.label}
                    </p>
                    <p className="text-white text-sm font-medium group-hover:text-primary
                                  transition duration-300">
                      {item.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="flex justify-center mb-8">
              <motion.a
                href="mailto:rk.kothapalli95@gmail.com"
                onClick={() => trackEvent("Contact", "Email CTA Click")}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-3 rounded-full
                           bg-primary text-black font-bold text-sm
                           hover:brightness-110 transition duration-300 shadow-lg"
                style={{ boxShadow: "0 0 24px rgba(201,162,39,0.25)" }}
              >
                <FaPaperPlane size={14} />
                Send me an Email
              </motion.a>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/10 mb-8" />

            {/* Social cards */}
            <p className="text-center text-xs text-gray-500 tracking-widest uppercase mb-5">
              Find me on
            </p>
            <div className="grid grid-cols-3 gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent("Social", social.event)}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl
                             bg-white/5 border border-white/10
                             hover:border-primary hover:bg-primary/5
                             transition duration-300 group"
                >
                  <div className="p-3 rounded-full bg-primary/10 border border-primary/20
                                  text-primary group-hover:bg-primary group-hover:text-black
                                  transition duration-300">
                    {social.icon}
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm font-semibold group-hover:text-primary
                                  transition duration-300">
                      {social.label}
                    </p>
                    <p className="text-gray-500 text-xs mt-0.5 truncate max-w-[80px] sm:max-w-[100px] md:max-w-[150px]">
                      {social.sublabel}
                    </p>
                  </div>
                  <span className="text-xs text-gray-600 group-hover:text-primary
                                   transition duration-300">
                    Visit →
                  </span>
                </motion.a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}