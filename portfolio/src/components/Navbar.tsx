import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FaBars, FaTimes, FaChevronUp } from "react-icons/fa";

export default function Navbar() {
  const links = [
    { name: "Home",           id: "home"           },
    { name: "About",          id: "about"          },
    { name: "Skills",         id: "skills"         },
    { name: "Experience",     id: "experience"     },
    { name: "Projects",       id: "projects"       },
    { name: "Certifications", id: "certifications" },
    { name: "Education",      id: "education"      },
    { name: "Contact",        id: "contact"        },
  ];

  const [active, setActive]     = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { root: null, rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach((s) => { if (s) observer.observe(s); });

    const handleScroll = () => {
      const scrollY     = window.scrollY;
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      setProgress((scrollY / totalHeight) * 100);
      setScrolled(scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      sections.forEach((s) => { if (s) observer.unobserve(s); });
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Desktop — scroll immediately
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  // Mobile — close menu first, then scroll after animation finishes
  const scrollToSectionMobile = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 350);
  };

  return (
    <>
      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] bg-black z-[60]">
        <div
          className="h-full bg-primary transition-all duration-200"
          style={{
            width: `${progress}%`,
            boxShadow: "0 0 8px rgba(201,162,39,0.7), 0 0 16px rgba(201,162,39,0.3)",
          }}
        />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={
          "fixed top-0 left-0 w-full z-50 border-b border-white/10 transition-all duration-300 " +
          (scrolled
            ? "bg-black/60 backdrop-blur-2xl"
            : "bg-black/30 backdrop-blur-lg")
        }
      >
        <div
          className={
            "max-w-7xl mx-auto px-6 flex justify-between items-center transition-all duration-300 " +
            (scrolled ? "py-3" : "py-4")
          }
        >
          {/* Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => scrollToSection("home")}
          >
            {/* RK monogram */}
            <div
              className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/30
                         flex items-center justify-center shrink-0
                         group-hover:bg-primary group-hover:border-primary
                         transition duration-300"
            >
              <span className="text-xs font-black text-primary group-hover:text-black transition duration-300">
                RK
              </span>
            </div>

            {/* Name */}
            <h1 className="text-lg font-bold text-primary group-hover:brightness-125 transition duration-300">
              Ravi Kiran Kothapalli
            </h1>

            {/* Scroll-to-top chevron */}
            <AnimatePresence>
              {scrolled && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="text-primary/50 group-hover:text-primary transition duration-300"
                >
                  <FaChevronUp size={11} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Vertical divider */}
          <div className="hidden md:block w-[1px] h-5 bg-white/10 mx-2" />

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 relative">
            {links.map((link) => {
              const isActive = active === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className={
                    "relative px-3 py-1.5 rounded-full text-sm transition duration-200 " +
                    (isActive
                      ? "text-primary bg-primary/10"
                      : "text-gray-400 hover:text-primary hover:bg-primary/5")
                  }
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-primary rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile toggle */}
          <div className="md:hidden text-white text-2xl cursor-pointer">
            {menuOpen ? (
              <FaTimes onClick={() => setMenuOpen(false)} />
            ) : (
              <FaBars onClick={() => setMenuOpen(true)} />
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-black/95 backdrop-blur-2xl border-t border-white/10 overflow-hidden"
            >
              <div className="flex flex-col py-4 px-4 gap-1">
                {links.map((link, i) => {
                  const isActive = active === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                      onClick={() => scrollToSectionMobile(link.id)}
                      className={
                        "relative flex items-center gap-3 px-4 py-3 rounded-xl text-left " +
                        "transition duration-200 " +
                        (isActive
                          ? "bg-primary/10 text-primary border border-primary/20"
                          : "text-gray-400 hover:bg-white/5 hover:text-primary border border-transparent")
                      }
                    >
                      {isActive && (
                        <div className="absolute left-0 top-2 bottom-2 w-[3px] bg-primary rounded-full" />
                      )}
                      <span className="text-sm font-medium pl-1">{link.name}</span>
                      {isActive && (
                        <span className="ml-auto text-xs text-primary/60">●</span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}