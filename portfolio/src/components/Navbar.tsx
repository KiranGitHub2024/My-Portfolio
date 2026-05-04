import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Navbar() {
  const links = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Skills", id: "skills" },
    { name: "Experience", id: "experience" },
    { name: "Projects", id: "projects" },
    { name: "Certifications", id: "certifications" },
    { name: "Education", id: "education" },
    { name: "Contact", id: "contact" },
  ];

  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    // 🔥 Intersection Observer (core fix)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: "-40% 0px -40% 0px", // center focus
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    // 🔥 Scroll progress bar
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setProgress((scrollY / totalHeight) * 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      {/* 🔥 Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-black z-[60]">
        <div
          className="h-full bg-primary transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* 🔥 Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-50 
                   bg-black/30 backdrop-blur-lg border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <h1
            className="text-xl font-bold text-primary cursor-pointer"
            onClick={() => scrollToSection("home")}
          >
            Ravi Kiran Kothapalli
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 relative">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`relative transition ${
                  active === link.id
                    ? "text-primary"
                    : "text-gray-300 hover:text-primary"
                }`}
              >
                {link.name}

                {active === link.id && (
                  <motion.span
                    layoutId="underline"
                    className="absolute left-0 -bottom-1 w-full h-[2px] bg-primary rounded"
                  />
                )}
              </button>
            ))}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden text-white text-2xl cursor-pointer">
            {menuOpen ? (
              <FaTimes onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-black/90 backdrop-blur-lg border-t border-white/10"
          >
            <div className="flex flex-col items-center gap-6 py-6">
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={`text-lg ${
                    active === link.id
                      ? "text-primary"
                      : "text-gray-300"
                  }`}
                >
                  {link.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </motion.nav>
    </>
  );
}