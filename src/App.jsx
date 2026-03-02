import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────
const DATA = {
  name: "APOORV VERMA",
  role: "CS Student & Developer",
  college: "BENNETT UNIVERSITY · 2nd Year",
  bio: "Hey! I'm a 2nd-year CS student who loves building things. I enjoy solving problems, learning new tech, and turning ideas into real projects. Currently exploring AI/ML dev, low-level programming, and open to internships.",
  email: "vapoorv2@gmail.com",
  github: "github.com/Apoorv-c",
  linkedin: "www.linkedin.com/in/apoorv-verma-7a150131b",
  leetcode: "leetcode.com/u/apoorv_c/",

  stack: [
    { cat: "Languages",  items: ["C++", "Python", "JavaScript", "Java"] },
    { cat: "Frontend",   items: ["React", "HTML5", "CSS3"] },
    { cat: "Backend",    items: ["Python", "FastAPI", "REST APIs"] },
    { cat: "Database",   items: ["MySQL", "Firebase"] },
    { cat: "Tools",      items: ["Git", "GitHub", "VS Code", "Postman", "Linux", "Figma"] },
  ],

  projects: [
    {
      id: "01",
      title: "Rupee Rush",
      desc: "A simple money managing gui built using Python's Tkinter. It allows users to track expenses, set budgets, and visualize spending patterns with charts. Data is stored locally in JSON format.",
      tags: ["Python", "Tkinter", "JSON"],
      live: "#",
      repo: "#",
    },
    {
      id: "02",
      title: "StudySync",
      desc: "A collaborative study tool for college students — create rooms, share notes, and track progress together. Includes Pomodoro timer and resource sharing.",
      tags: ["React", "Firebase", "Tailwind"],
      live: "#",
      repo: "#",
    },
    {
      id: "03",
      title: "CP Tracker",
      desc: "Competitive programming progress tracker that pulls data from Codeforces and LeetCode APIs. Visualizes streaks, ratings, and problem-solving heatmaps.",
      tags: ["Python", "Flask", "Chart.js", "API"],
      live: "#",
      repo: "#",
    },
    {
      id: "04",
      title: "Mini OS Shell",
      desc: "A basic Unix-like shell implemented in C++ supporting piping, redirection, and background processes. Built as a systems programming project.",
      tags: ["C++", "Linux", "Systems"],
      live: null,
      repo: "#",
    },
  ],

  experience: [
    {
      role: "Junior Core",
      org: "GeeksforGeeks College Chapter",
      period: "Sep 2024 – Aug 2025",
    },
    {
      role: "Open Source Contributor",
      org: "Girls Script Summer of Code",
      period: "Jul 2025 – Nov 2025",
    },
    {
      role: "Senior Lead",
      org: "IEEE BU Student Chapter",
      period: "Nov 2025 – Present",
    },
  ],

  achievements: [
    "2nd Runner up - Research Hackathon 2025, BU"
  ],
};

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const links = ["about","stack","projects","experience","contact"];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#050508]/90 backdrop-blur border-b border-[#1a1a2e]" : ""}`}>
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-[#00ff9d] text-sm tracking-widest uppercase">&lt;APOORV/&gt;</span>
        {/* desktop */}
        <ul className="hidden md:flex gap-8">
          {links.map(l => (
            <li key={l}>
              <a href={`#${l}`} className="font-mono text-xs text-slate-400 hover:text-[#00ff9d] tracking-widest uppercase transition-colors">
                {l}
              </a>
            </li>
          ))}
        </ul>
        {/* mobile toggle */}
        <button onClick={() => setMenuOpen(o => !o)} className="md:hidden text-slate-400 hover:text-[#00ff9d]">
          <div className="space-y-1.5">
            <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}/>
            <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? "opacity-0" : ""}`}/>
            <span className={`block w-5 h-0.5 bg-current transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}/>
          </div>
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#050508]/95 backdrop-blur border-b border-[#1a1a2e] px-6 pb-4">
          {links.map(l => (
            <a key={l} href={`#${l}`} onClick={() => setMenuOpen(false)} className="block font-mono text-xs text-slate-400 hover:text-[#00ff9d] tracking-widest uppercase py-2 transition-colors">
              {l}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function Hero() {
  const [typed, setTyped] = useState("");
  const roles = ["CS Student.", "Developer.", "Problem Solver.", "Builder."];
  const [ri, setRi] = useState(0);
  useEffect(() => {
    const word = roles[ri];
    let i = 0;
    setTyped("");
    const t = setInterval(() => {
      setTyped(word.slice(0, ++i));
      if (i === word.length) {
        clearInterval(t);
        setTimeout(() => setRi(r => (r + 1) % roles.length), 1800);
      }
    }, 80);
    return () => clearInterval(t);
  }, [ri]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
      {/* grid bg */}
      <div className="absolute inset-0"
        style={{
          backgroundImage: "linear-gradient(rgba(0,255,157,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,157,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />
      {/* glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(0,255,157,0.05) 0%, transparent 70%)" }}
      />

      <div className="relative text-center max-w-3xl">
        <div className="font-mono text-[#00ff9d] text-xs tracking-[0.3em] uppercase mb-6 opacity-0 animate-[fadeUp_0.6s_0.2s_forwards]">
          // hello world
        </div>
        <h1 className="text-5xl md:text-7xl font-black mb-4 opacity-0 animate-[fadeUp_0.6s_0.4s_forwards]"
          style={{ fontFamily: "'Courier New', monospace", letterSpacing: "-0.02em" }}>
          {DATA.name.split(" ")[0]}{" "}
          <span className="text-[#00ff9d]">{DATA.name.split(" ").slice(1).join(" ")}</span>
        </h1>
        <div className="text-xl md:text-2xl font-mono text-slate-300 mb-6 h-8 opacity-0 animate-[fadeUp_0.6s_0.5s_forwards]">
          <span className="text-slate-500">$ </span>
          {typed}
          <span className="animate-pulse text-[#00ff9d]">█</span>
        </div>
        <p className="text-slate-400 max-w-xl mx-auto leading-relaxed mb-10 opacity-0 animate-[fadeUp_0.6s_0.7s_forwards]">
          {DATA.college}
        </p>
        <div className="flex gap-4 justify-center flex-wrap opacity-0 animate-[fadeUp_0.6s_0.9s_forwards]">
          <a href="#projects" className="px-6 py-3 bg-[#00ff9d] text-black font-mono text-sm font-bold tracking-wider hover:bg-[#00cc7a] transition-colors">
            VIEW PROJECTS →
          </a>
          <a href="#contact" className="px-6 py-3 border border-[#00ff9d]/40 text-[#00ff9d] font-mono text-sm tracking-wider hover:bg-[#00ff9d]/5 transition-colors">
            GET IN TOUCH
          </a>
        </div>
        {/* scroll hint */}
        <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[10px] tracking-widest text-slate-500">SCROLL</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00ff9d] to-transparent animate-pulse"/>
        </div>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}

function SectionHeader({ num, title }) {
  return (
    <div className="flex items-center gap-4 mb-12">
      <span className="font-mono text-[#00ff9d] text-xs tracking-widest">{num}</span>
      <h2 className="font-mono text-2xl md:text-3xl font-bold text-white">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-[#00ff9d]/20 to-transparent"/>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="py-24 px-6 max-w-6xl mx-auto">
      <Reveal><SectionHeader num="01." title="about_me()" /></Reveal>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal delay={0.1}>
          <div className="space-y-4 text-slate-300 leading-relaxed">
            <p>{DATA.bio}</p>
            <p className="text-slate-500 text-sm font-mono">
              When I'm not coding, I'm grinding LeetCode, watching tech talks, or contributing to open source projects.
            </p>
            <a href="#" className="inline-block mt-4 font-mono text-xs text-[#00ff9d] border border-[#00ff9d]/30 px-4 py-2 hover:bg-[#00ff9d]/5 transition-colors">
              &gt; download_resume.pdf
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="grid grid-cols-2 gap-3">
            {[
              { val: "2nd", label: "Year of Study" },
              { val: "4+", label: "Projects Built" },
              { val: "20+", label: "LeetCode Solved" },
              { val: "∞", label: "Coffee Consumed" },
            ].map(s => (
              <div key={s.label} className="border border-[#1a1a2e] bg-[#0a0a12] p-5 group hover:border-[#00ff9d]/30 transition-colors">
                <div className="font-mono text-3xl font-black text-[#00ff9d] mb-1">{s.val}</div>
                <div className="font-mono text-xs text-slate-500 uppercase tracking-wider">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="stack" className="py-24 px-6 max-w-6xl mx-auto">
      <Reveal><SectionHeader num="02." title="tech_stack()" /></Reveal>
      <div className="space-y-6">
        {DATA.stack.map((cat, i) => (
          <Reveal key={cat.cat} delay={i * 0.07}>
            <div className="flex flex-col sm:flex-row gap-4 sm:items-start border border-[#1a1a2e] bg-[#0a0a12] p-5 hover:border-[#00ff9d]/20 transition-colors group">
              <span className="font-mono text-xs text-[#00ff9d] tracking-widest uppercase min-w-[110px] pt-0.5">{cat.cat}</span>
              <div className="flex flex-wrap gap-2">
                {cat.items.map(item => (
                  <span key={item} className="font-mono text-xs px-3 py-1.5 bg-[#050508] border border-[#2a2a3e] text-slate-300 hover:border-[#00ff9d]/40 hover:text-[#00ff9d] transition-all cursor-default">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <Reveal><SectionHeader num="03." title="my_projects()" /></Reveal>
      <div className="grid md:grid-cols-2 gap-5">
        {DATA.projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.08}>
            <div className="border border-[#1a1a2e] bg-[#0a0a12] p-6 flex flex-col h-full group hover:border-[#00ff9d]/30 transition-all duration-300 hover:-translate-y-1">
              <div className="flex justify-between items-start mb-4">
                <span className="font-mono text-[#00ff9d]/40 text-xs tracking-widest">{p.id}</span>
                <div className="flex gap-3">
                  {p.live && (
                    <a href={p.live} className="font-mono text-[10px] text-slate-500 hover:text-[#00ff9d] tracking-widest uppercase transition-colors">
                      DEMO ↗
                    </a>
                  )}
                  <a href={p.repo} className="font-mono text-[10px] text-slate-500 hover:text-[#00ff9d] tracking-widest uppercase transition-colors">
                    CODE ↗
                  </a>
                </div>
              </div>
              <h3 className="font-mono text-lg font-bold text-white mb-3 group-hover:text-[#00ff9d] transition-colors">
                {p.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-2">
                {p.tags.map(t => (
                  <span key={t} className="font-mono text-[10px] px-2 py-1 bg-[#00ff9d]/5 border border-[#00ff9d]/15 text-[#00ff9d] tracking-wider">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.3}>
        <div className="mt-6 text-center">
          <a href={`https://${DATA.github}`} className="font-mono text-xs text-slate-500 hover:text-[#00ff9d] tracking-widest uppercase transition-colors">
            &gt; see all projects on GitHub →
          </a>
        </div>
      </Reveal>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-24 px-6 max-w-6xl mx-auto">
      <Reveal><SectionHeader num="04." title="experience()" /></Reveal>
      <div className="grid md:grid-cols-2 gap-12">

        {/* Work/Clubs */}
        <div>
          <Reveal>
            <h3 className="font-mono text-xs text-[#00ff9d] tracking-widest uppercase mb-6">Work & Activities</h3>
          </Reveal>
          <div className="relative pl-5 border-l border-[#1a1a2e] space-y-8">
            {DATA.experience.map((e, i) => (
              <Reveal key={e.role} delay={i * 0.1}>
                <div className="relative">
                  <div className="absolute -left-[1.35rem] top-1.5 w-2.5 h-2.5 rounded-full bg-[#00ff9d] shadow-[0_0_10px_#00ff9d]"/>
                  <div className="font-mono text-[10px] text-[#00ff9d] tracking-widest mb-1">{e.period}</div>
                  <div className="font-mono font-bold text-white mb-0.5">{e.role}</div>
                  <div className="font-mono text-xs text-slate-500 mb-2">{e.org}</div>
                  <p className="text-sm text-slate-400 leading-relaxed">{e.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <Reveal>
            <h3 className="font-mono text-xs text-[#00ff9d] tracking-widest uppercase mb-6">Achievements</h3>
          </Reveal>
          <div className="space-y-3">
            {DATA.achievements.map((a, i) => (
              <Reveal key={a} delay={i * 0.08}>
                <div className="border border-[#1a1a2e] bg-[#0a0a12] px-4 py-3 font-mono text-sm text-slate-300 hover:border-[#00ff9d]/30 hover:text-white transition-all">
                  {a}
                </div>
              </Reveal>
            ))}
          </div>

          {/* Education mini card */}
          <Reveal delay={0.3}>
            <div className="mt-6 border border-[#00ff9d]/20 bg-[#00ff9d]/[0.02] p-5">
              <div className="font-mono text-[10px] text-[#00ff9d] tracking-widest uppercase mb-2">Education</div>
              <div className="font-mono font-bold text-white text-sm">B.Tech — Computer Science</div>
              <div className="font-mono text-xs text-slate-500 mt-1">Bennett University · 2024 – 2028</div>
              <div className="font-mono text-xs text-slate-500">CGPA: 8.3 / 10</div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
}

function Contact() {
  const links = [
    { label: "Email", val: DATA.email,    href: `mailto:${DATA.email}`,           icon: "✉" },
    { label: "GitHub", val: DATA.github,  href: `https://${DATA.github}`,          icon: "⌥" },
    { label: "LinkedIn", val: DATA.linkedin, href: `https://${DATA.linkedin}`,     icon: "in" },
    { label: "LeetCode", val: DATA.leetcode, href: `https://${DATA.leetcode}`,     icon: "{}"},
  ];

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <Reveal><SectionHeader num="05." title="contact_me()" /></Reveal>
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <Reveal delay={0.1}>
          <div>
            <h3 className="font-mono text-3xl font-black text-white mb-4">
              Let's <span className="text-[#00ff9d]">connect.</span>
            </h3>
            <p className="text-slate-400 leading-relaxed mb-2">
              I'm actively looking for internship opportunities and interesting college projects to collaborate on.
            </p>
            <p className="font-mono text-xs text-slate-600">Whether it's a collab, internship, or just a chat about tech — I'm always up for it.</p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="space-y-3">
            {links.map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                className="flex items-center gap-4 border border-[#1a1a2e] bg-[#0a0a12] px-5 py-4 group hover:border-[#00ff9d]/40 hover:bg-[#00ff9d]/[0.03] transition-all">
                <span className="font-mono text-[#00ff9d]/60 text-xs w-5 text-center group-hover:text-[#00ff9d] transition-colors">{l.icon}</span>
                <div className="flex-1">
                  <div className="font-mono text-[10px] text-slate-600 uppercase tracking-wider">{l.label}</div>
                  <div className="font-mono text-sm text-slate-300 group-hover:text-white transition-colors">{l.val}</div>
                </div>
                <span className="font-mono text-slate-600 group-hover:text-[#00ff9d] transition-all group-hover:translate-x-1">→</span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-[#1a1a2e] py-6 px-6 text-center">
      <p className="font-mono text-xs text-slate-600 tracking-widest">
        &lt;built with React + Tailwind by {DATA.name} /&gt;
      </p>
    </footer>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  return (
    <div style={{ background: "#050508", color: "#e2e8f0", minHeight: "100vh", fontFamily: "sans-serif" }}>
      <Nav />
      <Hero />
      <About />
      <Stack />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}