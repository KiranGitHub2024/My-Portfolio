import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaUserAstronaut, FaBriefcase, FaLayerGroup, FaProjectDiagram } from "react-icons/fa";

const stats = [
  { icon: <FaBriefcase size={16} />, value: "5+", label: "Years Experience" },
  { icon: <FaLayerGroup size={16} />, value: "3", label: "Roles Mastered" },
  { icon: <FaProjectDiagram size={16} />, value: "15+", label: "Projects Delivered" },
];

// Each line: plain text or text with gold-highlighted segments
type Segment = { text: string; gold?: boolean };
type Line = Segment[];

const introLine: Line = [
  { text: "Welcome — let's get to know about Ravi Kiran Kothapalli." },
];

const lines: Line[] = [
  [{ text: "AI-native Full Stack Developer, Prompt Engineer, and LLM Evaluator with" }],
  [{ text: "experience building intelligent applications using AI-assisted development" }],
  [{ text: "workflows, rapid prototyping, and prompt-driven engineering." }],
  [{ text: "" }],
  [
    { text: "Skilled in leveraging Generative AI tools such as " },
    { text: "ChatGPT, Gemini, Codex, and Ollama", gold: true },
    { text: " to" },
  ],
  [{ text: "accelerate software development, optimize workflows, and deliver scalable" }],
  [{ text: "end-to-end solutions." }],
  [{ text: "" }],
  [{ text: "Experienced in full-stack development, NLP systems, LLM evaluation, and" }],
  [
    { text: "AI-powered SaaS architecture using " },
    { text: "React, FastAPI, Python", gold: true },
    { text: "," },
  ],
  [{ text: "and modern cloud deployment platforms." }],
  [{ text: "" }],
  [
    { text: "Completed " },
    { text: "MCA – Data Science", gold: true },
    { text: " from Jain University, with a" },
  ],
  [{ text: "strong focus on applying AI-driven and data-centric approaches to solve" }],
  [{ text: "real-world business problems." }],
];

const allLines: Line[] = [introLine, [{ text: "" }], ...lines];

const TYPE_SPEED = 18;       // ms per character
const LINE_PAUSE = 120;      // ms pause between lines
const LOOP_PAUSE = 350000;     // ms pause before restarting the loop

export default function About() {
  const [displayedLines, setDisplayedLines] = useState<Line[]>([]);
  const [cycleKey, setCycleKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    const typeLine = (lineIndex: number, built: Line[]) => {
      if (cancelled) return;

      if (lineIndex >= allLines.length) {
        // finished — pause, then restart loop
        const t = setTimeout(() => {
          if (!cancelled) {
            setDisplayedLines([]);
            setCycleKey((k) => k + 1);
          }
        }, LOOP_PAUSE);
        timeouts.push(t);
        return;
      }

      const fullLine = allLines[lineIndex];
      const fullText = fullLine.map((s) => s.text).join("");

      if (fullText === "") {
        // blank spacer line — no typing needed
        const newBuilt = [...built, []];
        setDisplayedLines(newBuilt);
        const t = setTimeout(() => typeLine(lineIndex + 1, newBuilt), LINE_PAUSE);
        timeouts.push(t);
        return;
      }

      let charCount = 0;

      const typeChar = () => {
        if (cancelled) return;
        charCount++;

        // Build partial segments up to charCount characters
        let remaining = charCount;
        const partialSegs: Segment[] = [];
        for (const seg of fullLine) {
          if (remaining <= 0) break;
          if (seg.text.length <= remaining) {
            partialSegs.push(seg);
            remaining -= seg.text.length;
          } else {
            partialSegs.push({ text: seg.text.slice(0, remaining), gold: seg.gold });
            remaining = 0;
          }
        }

        const newBuilt = [...built, partialSegs];
        setDisplayedLines(newBuilt);

        if (charCount < fullText.length) {
          const t = setTimeout(typeChar, TYPE_SPEED);
          timeouts.push(t);
        } else {
          const t = setTimeout(() => typeLine(lineIndex + 1, newBuilt), LINE_PAUSE);
          timeouts.push(t);
        }
      };

      typeChar();
    };

    typeLine(0, []);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [cycleKey]);

  return (
    <motion.section
      id="about"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="px-10 py-24"
    >
      <h2 className="text-4xl font-bold text-primary text-center">About Me</h2>
      <div className="w-20 h-1 bg-primary mx-auto mt-4 rounded-full"></div>

      <div className="mt-12 max-w-4xl mx-auto">

        {/* Shimmer border wrapper */}
        <div className="relative rounded-xl p-[1.5px]"
          style={{
            background: "linear-gradient(120deg, #c9a227 0%, #ffffff10 40%, #c9a227 100%)",
            backgroundSize: "200% 200%",
            animation: "shimmer 4s linear infinite",
          }}
        >
          <style>{`
            @keyframes shimmer {
              0%   { background-position: 0% 50%; }
              50%  { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes blink-cursor {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
          `}</style>

          {/* Card */}
          <div className="bg-[#0f0f13] rounded-xl p-8 border-l-4 border-primary">

            {/* Two-column layout */}
            <div className="flex flex-col md:flex-row gap-8">

              {/* LEFT — Icon + Title */}
              <div className="flex flex-col items-center md:items-start gap-3 md:w-40 shrink-0">
                <div className="p-4 rounded-full bg-primary/10 border border-primary/30">
                  <FaUserAstronaut size={32} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-white text-center md:text-left">
                  Who am I?
                </h3>
              </div>

              {/* Divider */}
              <div className="hidden md:block w-[1px] bg-white/10 self-stretch"></div>

              {/* RIGHT — VS Code style terminal */}
              <div className="flex-1 min-w-0">
                <div className="rounded-lg overflow-hidden border border-white/10 bg-[#1e1e1e] shadow-lg">

                  {/* Title bar — traffic lights + tab */}
                  <div className="flex items-center justify-between bg-[#252526] px-4 py-2 border-b border-black/40">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                      <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                      <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                    </div>
                    <span className="text-[11px] text-gray-400 font-mono tracking-wide">
                      about-ravi.ts
                    </span>
                    <span className="w-12" />
                  </div>

                  {/* Tab bar */}
                  <div className="flex items-center bg-[#2d2d2d] border-b border-black/40">
                    <div className="flex items-center gap-2 px-4 py-1.5 bg-[#1e1e1e] border-r border-black/40 border-t-2 border-t-primary">
                      <span className="text-[11px] font-mono text-gray-300">about-ravi.ts</span>
                    </div>
                  </div>

                  {/* Code body */}
                  <div className="font-mono text-[12.5px] md:text-[13px] leading-[1.7] p-4 max-h-[340px] overflow-y-auto">
                    {displayedLines.map((line, i) => (
                      <div key={i} className="flex">
                        {/* Line number */}
                        <span className="w-7 text-right pr-3 text-gray-600 select-none shrink-0">
                          {i + 1}
                        </span>
                        {/* Line content */}
                        <span className="text-gray-300 whitespace-pre-wrap break-words">
                          {i === 0 && (
                            <span className="text-[#4ec9b0]">{"// "}</span>
                          )}
                          {line.map((seg, j) => (
                            <span
                              key={j}
                              className={seg.gold ? "text-primary font-semibold" : ""}
                            >
                              {seg.text}
                            </span>
                          ))}
                          {/* Blinking cursor on the last active line */}
                          {i === displayedLines.length - 1 && (
                            <span
                              className="inline-block w-[7px] h-[14px] bg-primary ml-0.5 align-middle"
                              style={{ animation: "blink-cursor 1s step-end infinite" }}
                            />
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[1px] bg-white/10 mt-8 mb-6"></div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.15 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center gap-1 p-4 rounded-lg bg-primary/5
                             border border-primary/10 hover:border-primary/40 hover:bg-primary/10
                             transition duration-300"
                >
                  <span className="text-primary">{stat.icon}</span>
                  <span className="text-2xl font-bold text-primary">{stat.value}</span>
                  <span className="text-xs text-gray-400 text-center">{stat.label}</span>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}