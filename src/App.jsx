import { useState, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";

// Local assets
import photo1 from "./assets/photos/photo1.jpg";
import photo2 from "./assets/photos/photo2.jpg";
import photo3 from "./assets/photos/photo3.jpg";
import photo4 from "./assets/photos/photo4.jpg";
import photo5 from "./assets/photos/photo5.jpg";
import photo6 from "./assets/photos/photo6.jpg";

import song1 from "./assets/songs/song1.png";
import song2 from "./assets/songs/song2.png";
import song3 from "./assets/songs/song3.png";
import song4 from "./assets/songs/song4.png";
import song5 from "./assets/songs/song5.png";
import song6 from "./assets/songs/song6.png";

import portfolio from "./assets/projects/portfolio.png";
import vehicleqr from "./assets/projects/vehicleqr.png";
import slotfinder from "./assets/projects/slotfinder.png";

// Email service
import emailjs from "emailjs-com";

// Icons
import {
  FaLinkedin,
  FaGithub,
  FaTwitter,
  FaInstagram,
  FaDiscord,
  FaHtml5,
  FaCss3Alt,
  FaJsSquare,
  FaReact,
  FaGitAlt,
  FaJava,
  FaSpotify,
} from "react-icons/fa";
import { SiC, SiCplusplus, SiPython, SiTailwindcss, SiVite } from "react-icons/si";
import {
  ArrowUpRight,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
  Code2,
  Sparkles,
  Terminal,
  Layers,
  GraduationCap,
  Copy,
  Check,
  Send,
  X,
  Play,
  Disc3,
  Calendar,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

export default function App() {
  // Contact form state
  const [formStatus, setFormStatus] = useState("idle"); // 'idle' | 'loading' | 'success' | 'error'
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef(null);

  // Email copy state
  const [copied, setCopied] = useState(false);

  // Curated tracks state
  const songs = [
    {
      title: "Finding Her",
      artist: "Kushagra",
      image: song1,
      link: "https://open.spotify.com/track/5ThyDv6aRVU8AH4vXQNldF",
      year: "2023",
      tag: "Indie / Acoustic",
    },
    {
      title: "Arz Kiya Hai",
      artist: "Anuv Jain",
      image: song2,
      link: "https://open.spotify.com/track/1bMkimTb47umgNP6xCi4A1",
      year: "2024",
      tag: "Singer-Songwriter",
    },
    {
      title: "For A Reason",
      artist: "Karan Ahuja",
      image: song3,
      link: "https://open.spotify.com/track/0cYohCh24y1aMjJmcS9RBl",
      year: "2023",
      tag: "Atmospheric",
    },
    {
      title: "Dooron Dooron",
      artist: "Paresh Pahuja",
      image: song4,
      link: "https://open.spotify.com/track/0q5e5KtUOhYQujmhLP0pKd",
      year: "2023",
      tag: "Acoustic Pop",
    },
    {
      title: "Faqeeran",
      artist: "Rashmeet Kaur",
      image: song5,
      link: "https://open.spotify.com/track/7DlNgLpxX3gPh3tzqrY7tL",
      year: "2024",
      tag: "Folk / Ambient",
    },
    {
      title: "Sahiba",
      artist: "Aditya Rakhira",
      image: song6,
      link: "https://open.spotify.com/track/0eLtIxPRNJfsmehITZ1qaJ",
      year: "2024",
      tag: "Indie Melodic",
    },
  ];
  const [activeSong, setActiveSong] = useState(0);

  // Gallery photos
  const moments = [
    { src: photo1, caption: "Portrait — Priyanshu Rawat", location: "Uttarakhand, India", tag: "Profile" },
    { src: photo2, caption: "Campus Days & Coding Sessions", location: "Graphic Era Hill University", tag: "Campus Life" },
    { src: photo3, caption: "Foothills of the Himalayas", location: "Uttarakhand, India", tag: "Nature & Focus" },
    { src: photo4, caption: "Student Moments & Community", location: "Dehradun", tag: "Moments" },
    { src: photo5, caption: "College Event & Collaboration", location: "Campus", tag: "Community" },
    { src: photo6, caption: "Casual Engineering Mindset", location: "Uttarakhand", tag: "Personal" },
  ];
  const [activePhoto, setActivePhoto] = useState(null);

  // Copy email handler
  const copyEmail = () => {
    navigator.clipboard.writeText("priyanshurwt28@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Contact form submission via EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus("loading");

    emailjs
      .sendForm(
        "service_9rbl0as",
        "template_903rym9",
        e.target,
        "YEv44TDZJ3ekcZ1la"
      )
      .then(
        () => {
          setFormStatus("success");
          setStatusMessage("Thank you! Your message has been sent successfully. I'll get back to you shortly.");
          if (formRef.current) formRef.current.reset();
        },
        () => {
          setFormStatus("error");
          setStatusMessage(
            "Couldn't send directly through the form. Please reach out to me directly at priyanshurwt28@gmail.com."
          );
        }
      );
  };

  const skillsData = {
    languages: [
      { name: "C", icon: <SiC className="text-sky-400" />, level: "Core Foundations" },
      { name: "C++", icon: <SiCplusplus className="text-blue-400" />, level: "DSA & Problem Solving" },
      { name: "Java", icon: <FaJava className="text-amber-500" />, level: "OOP & Concepts" },
      { name: "Python", icon: <SiPython className="text-yellow-400" />, level: "Scripting & Logic" },
      { name: "JavaScript", icon: <FaJsSquare className="text-yellow-400" />, level: "ES6+, Modern Web" },
    ],
    frontend: [
      { name: "React.js", icon: <FaReact className="text-cyan-400" />, level: "Component Architecture" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" />, level: "Utility-First UI" },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, level: "Semantic Markup" },
      { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" />, level: "Responsive Layouts & Flexbox" },
    ],
    workflow: [
      { name: "Git & GitHub", icon: <FaGitAlt className="text-orange-500" />, level: "Version Control" },
      { name: "Vite", icon: <SiVite className="text-purple-400" />, level: "Build Tooling & HMR" },
      { name: "UI/UX Design", icon: <Layers className="text-indigo-400" size={18} />, level: "Clean Prototyping" },
      { name: "Responsive Design", icon: <Code2 className="text-emerald-400" size={18} />, level: "Cross-Device Fluidity" },
    ],
  };

  const projects = [
    {
      id: "01",
      title: "Smart Vehicle QR System",
      category: "Emergency Assistance & IoT Concept",
      summary:
        "A contactless QR-based platform enabling bystanders and emergency responders to reach vehicle owners instantly during critical situations, parking obstructions, or security events—all while keeping personal phone numbers private.",
      image: vehicleqr,
      tags: ["React", "JavaScript", "Tailwind CSS", "QR Engine", "Safety Tech"],
      githubUrl: "https://github.com/priyanshurawat15-dev/QR-Portfolio",
      liveUrl: "https://github.com/priyanshurawat15-dev/QR-Portfolio",
      highlights: [
        "Instant emergency routing via dynamic QR scanning",
        "Privacy-preserving owner notification flow",
        "Mobile-first responsive design for field use",
      ],
    },
    {
      id: "02",
      title: "Free Slot Finder Portal",
      category: "Campus Academic Utility",
      summary:
        "An academic scheduling tool engineered to assist university students in quickly discovering unoccupied lecture rooms and verifying faculty availability in real time during free timetable intervals.",
      image: slotfinder,
      tags: ["React", "State Management", "Academic Portal", "Modern CSS", "Vite"],
      githubUrl: "https://github.com/priyanshurawat15-dev",
      liveUrl: "https://github.com/priyanshurawat15-dev",
      highlights: [
        "Real-time room occupancy and slot filtering",
        "Streamlined timetable navigation for students",
        "Clean, intuitive search with zero learning curve",
      ],
    },
    {
      id: "03",
      title: "Personal Portfolio & Digital Showcase",
      category: "Frontend Engineering & Design",
      summary:
        "A thoughtfully designed developer portfolio featuring case studies, curated audio playlist integrations, an interactive visual diary, and direct contact pipelines.",
      image: portfolio,
      tags: ["React 19", "Vite", "Tailwind CSS", "Framer Motion", "EmailJS"],
      githubUrl: "https://github.com/priyanshurawat15-dev/QR-Portfolio",
      liveUrl: "https://priyanshu-rawat.vercel.app",
      highlights: [
        "Art-directed typography and editorial dark theme",
        "Interactive Spotify playlist player & moments lightbox",
        "Production-grade form validation and EmailJS handler",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0B0F17] text-slate-100 font-sans selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navbar />

      <main className="relative z-10">
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section
          id="home"
          className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 lg:px-12 bg-dots overflow-hidden"
        >
          {/* Subtle gradient glow - restrained, not overwhelming */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-tr from-indigo-600/10 via-purple-600/10 to-transparent blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-white/[0.08] text-xs font-mono text-slate-300 mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>B.Tech CSE Undergrad</span>
                <span className="text-slate-600">•</span>
                <span className="text-indigo-300">Uttarakhand, India</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] mb-6">
                Building practical software with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-200 to-purple-300">
                  clean craft & modern UI.
                </span>
              </h1>

              {/* Subtitle / Bio Pitch */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
                I’m <strong className="font-semibold text-white">Priyanshu Rawat</strong>, a Computer Science student and frontend developer.
                I build responsive web applications, explore modern React architectures, and solve real-world problems through functional, intuitive interfaces.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md shadow-indigo-600/20 hover:shadow-indigo-600/35 hover:-translate-y-0.5"
                >
                  Explore Selected Work
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="#about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-white/[0.08] text-slate-200 hover:text-white font-medium text-sm transition-all hover:-translate-y-0.5"
                >
                  About My Journey
                </a>
              </div>

              {/* Social Channels Strip */}
              <div className="flex items-center gap-3 pt-6 border-t border-white/[0.08] w-full">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider mr-2">
                  Connect:
                </span>
                <a
                  href="https://github.com/priyanshurawat15-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900/70 border border-white/[0.08] text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/priyanshurawat15/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900/70 border border-white/[0.08] text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://instagram.com/priyanshurawat_15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900/70 border border-white/[0.08] text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition"
                  aria-label="Instagram Profile"
                  title="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900/70 border border-white/[0.08] text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition"
                  aria-label="Twitter Profile"
                  title="Twitter"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-slate-900/70 border border-white/[0.08] text-slate-300 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/10 transition"
                  aria-label="Discord"
                  title="Discord"
                >
                  <FaDiscord size={18} />
                </a>
              </div>
            </div>

            {/* Right Card / Identity Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-sm">
                {/* Architectural profile card */}
                <div className="surface-card rounded-2xl p-4 bg-slate-900/90 border border-white/[0.08] shadow-2xl relative z-10">
                  {/* Photo container */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-950 mb-4 border border-white/[0.05]">
                    <img
                      src={photo1}
                      alt="Priyanshu Rawat portrait"
                      className="w-full h-full object-cover object-top filter contrast-[1.03] transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Location Badge on Photo */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono bg-slate-900/90 backdrop-blur-md px-3 py-2 rounded-lg border border-white/[0.1]">
                      <span className="flex items-center gap-1.5 text-slate-200">
                        <MapPin size={13} className="text-indigo-400" />
                        Uttarakhand, IN
                      </span>
                      <span className="text-emerald-400 font-medium">B.Tech 2026</span>
                    </div>
                  </div>

                  {/* Quick dossier strip below photo */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/[0.02]">
                      <span className="text-slate-400 font-mono">Specialization</span>
                      <span className="font-medium text-slate-200">Frontend & Web Apps</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/[0.02]">
                      <span className="text-slate-400 font-mono">Primary Stack</span>
                      <span className="font-medium text-slate-200">React, JavaScript, Tailwind</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/[0.02]">
                      <span className="text-slate-400 font-mono">Status</span>
                      <span className="font-medium text-emerald-300 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        Available for Work
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative border highlight accent */}
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-xl opacity-50 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ABOUT SECTION
            ========================================================================= */}
        <section id="about" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06] bg-[#0A0E17]">
          <div className="max-w-7xl mx-auto">
            {/* Section Tag & Heading */}
            <div className="flex flex-col mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
                // 01. BACKGROUND & PHILOSOPHY
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Turning curiosity into functional code.
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Photo & Identity side card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="surface-card rounded-2xl p-4 bg-slate-900/80 border border-white/[0.08]">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-slate-950">
                    <img
                      src={photo6}
                      alt="Priyanshu Rawat"
                      className="w-full h-full object-cover filter contrast-[1.02] hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="space-y-3 px-1">
                    <h3 className="font-display text-xl font-bold text-white">Priyanshu Rawat</h3>
                    <p className="text-xs text-slate-400 font-mono">
                      Computer Science & Engineering Student
                    </p>
                    <div className="pt-3 border-t border-white/[0.06] flex flex-col gap-2 text-xs text-slate-300">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-indigo-400 shrink-0" />
                        <span>Uttarakhand, India</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap size={14} className="text-indigo-400 shrink-0" />
                        <span>B.Tech in Computer Science & Engineering</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-indigo-400 shrink-0" />
                        <span className="truncate">priyanshurwt28@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick highlights pill grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.06]">
                    <div className="text-2xl font-bold text-indigo-300 font-display">03+</div>
                    <div className="text-xs text-slate-400 mt-1">Completed Practical Projects</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.06]">
                    <div className="text-2xl font-bold text-indigo-300 font-display">2026</div>
                    <div className="text-xs text-slate-400 mt-1">Graduation Cohort</div>
                  </div>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="lg:col-span-7 space-y-6 text-slate-300 leading-relaxed text-base">
                <p className="text-lg text-slate-200 font-medium leading-relaxed">
                  I believe software engineering is most rewarding when it bridges everyday human friction with simple, robust digital solutions.
                </p>

                <p>
                  As an engineering student based in Uttarakhand, I spend my days writing code, experimenting with modern frontend stacks, and building tools that address real problems—whether that’s organizing student schedules or building instant QR emergency notification flows.
                </p>

                <p>
                  I am still actively learning and expanding my horizons every day. Rather than claiming decades of mastery, I pride myself on genuine curiosity, persistence when troubleshooting edge cases, and a strong work ethic. Every project I design and deploy makes me a more versatile engineer.
                </p>

                {/* Three Focus Pillars */}
                <div className="pt-6 grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-indigo-500/30 transition">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                      <Code2 size={18} />
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1.5">Frontend Engineering</h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      Designing responsive, accessible web interfaces in React and Tailwind CSS with clean state architectures.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-indigo-500/30 transition">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
                      <Terminal size={18} />
                    </div>
                    <h4 className="font-semibold text-white text-sm mb-1.5">Core Computing Foundations</h4>
                    <p className="text-xs text-slate-400 leading-normal">
                      Solid understanding of data structures, algorithms, and computational logic in C, C++, and Python.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            SELECTED PROJECTS SECTION
            ========================================================================= */}
        <section id="projects" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06] bg-[#0B0F17]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 block">
                  // 02. SELECTED WORK & CASE STUDIES
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Crafted for practical utility.
                </h2>
              </div>
              <p className="text-sm text-slate-400 max-w-md">
                Each project reflects real problem identification, interface design, and clean frontend implementation.
              </p>
            </div>

            {/* Projects Stack */}
            <div className="space-y-16">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className="surface-card rounded-2xl p-6 sm:p-8 lg:p-10 bg-slate-900/60 border border-white/[0.08] hover:border-indigo-500/40 transition-all duration-300"
                >
                  <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    {/* Visual Mockup Column */}
                    <div
                      className={`lg:col-span-7 ${
                        index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                      }`}
                    >
                      <div className="relative rounded-xl overflow-hidden border border-white/[0.08] bg-slate-950 group">
                        {/* Browser Window Chrome Top */}
                        <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/60"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/60"></span>
                          </div>
                          <span className="font-mono text-[11px] text-slate-400">
                            {project.title.toLowerCase().replace(/\s+/g, "-")}.app
                          </span>
                          <span className="w-4"></span>
                        </div>

                        {/* Image Preview */}
                        <div className="aspect-[16/10] overflow-hidden bg-slate-900">
                          <img
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`lg:col-span-5 flex flex-col justify-between ${
                        index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                      }`}
                    >
                      <div>
                        {/* Index & Category */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-mono font-bold text-indigo-400">
                            {project.id}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                          {project.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-6">
                          {project.summary}
                        </p>

                        {/* Feature Highlights */}
                        <ul className="space-y-2 mb-6 text-xs sm:text-sm text-slate-300">
                          {project.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-indigo-400 mt-1">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        {/* Tech Tag Pills */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md text-xs font-mono bg-white/[0.04] border border-white/[0.06] text-slate-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/[0.06]">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-slate-900 border border-white/[0.08] text-slate-200 hover:text-white hover:border-slate-600 transition"
                        >
                          <FaGithub size={14} />
                          Repository
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition"
                        >
                          <ExternalLink size={14} />
                          View Project
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            TECHNICAL SKILLS SECTION
            ========================================================================= */}
        <section id="skills" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06] bg-[#0A0E17]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
                // 03. TECHNICAL CAPABILITIES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Tools, technologies & workflows.
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Technologies and programming languages I use to build robust software and user-centered web applications.
              </p>
            </div>

            {/* Structured Engineering Pillars */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Category 1: Languages */}
              <div className="surface-card rounded-2xl p-6 bg-slate-900/70 border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-white/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                      <Terminal size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-white">Programming Languages</h3>
                      <p className="text-[11px] font-mono text-slate-400">Core logic & algorithms</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {skillsData.languages.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category 2: Frontend Ecosystem */}
              <div className="surface-card rounded-2xl p-6 bg-slate-900/70 border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-white/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                      <Code2 size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-white">Frontend Ecosystem</h3>
                      <p className="text-[11px] font-mono text-slate-400">Web UI & interactivity</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {skillsData.frontend.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category 3: Workflow & Practices */}
              <div className="surface-card rounded-2xl p-6 bg-slate-900/70 border border-white/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-white/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                      <Layers size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-white">Tooling & Engineering</h3>
                      <p className="text-[11px] font-mono text-slate-400">Workflow & developer tools</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {skillsData.workflow.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                        </div>
                        <span className="text-xs font-mono text-slate-400">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            CURATED SOUNDTRACK SECTION
            ========================================================================= */}
        <section id="soundtrack" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06] bg-[#0B0F17]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 block">
                  // 04. CODING ROTATION & SOUNDTRACK
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Tracks on heavy rotation.
                </h2>
              </div>
              <p className="text-sm text-slate-400 max-w-md">
                Music fuels my focus during long late-night coding sessions. Here is the curated tracklist I keep coming back to.
              </p>
            </div>

            {/* Interactive Player Layout */}
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Featured / Active Track Display Card */}
              <div className="lg:col-span-5">
                <div className="surface-card rounded-2xl p-6 sm:p-8 bg-slate-900/80 border border-white/[0.08] relative overflow-hidden">
                  {/* Subtle record album backdrop */}
                  <div className="relative aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-2xl mb-6 border border-white/[0.1] group">
                    <img
                      src={songs[activeSong].image}
                      alt={songs[activeSong].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    {/* Floating Equalizer on cover */}
                    <div className="absolute bottom-4 left-4 flex items-end gap-1 h-6">
                      <span className="w-1 bg-emerald-400 rounded-full bar-1"></span>
                      <span className="w-1 bg-emerald-400 rounded-full bar-2"></span>
                      <span className="w-1 bg-emerald-400 rounded-full bar-3"></span>
                      <span className="w-1 bg-emerald-400 rounded-full bar-4"></span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 border border-white/[0.1]">
                        {songs[activeSong].tag}
                      </span>
                    </div>
                  </div>

                  {/* Song Metadata */}
                  <div className="text-center space-y-1 mb-6">
                    <h3 className="font-display text-2xl font-bold text-white">
                      {songs[activeSong].title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {songs[activeSong].artist}
                    </p>
                  </div>

                  {/* Open Spotify Action */}
                  <a
                    href={songs[activeSong].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20"
                  >
                    <FaSpotify size={18} />
                    Listen on Spotify
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Playlist Selection Column */}
              <div className="lg:col-span-7">
                <div className="surface-card rounded-2xl p-4 sm:p-6 bg-slate-900/50 border border-white/[0.08] divide-y divide-white/[0.06]">
                  <div className="px-3 pb-3 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>TRACKLIST // 06 SONGS</span>
                    <span>SELECT TO PREVIEW</span>
                  </div>

                  <div className="pt-2 space-y-2">
                    {songs.map((song, index) => {
                      const isActive = index === activeSong;
                      return (
                        <div
                          key={song.title}
                          onClick={() => setActiveSong(index)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                              e.preventDefault();
                              setActiveSong(index);
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between transition cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 ${
                            isActive
                              ? "bg-indigo-600/15 border border-indigo-500/30 text-white"
                              : "hover:bg-white/[0.04] text-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-xs w-5 text-slate-400">
                              {isActive ? (
                                <Disc3 size={16} className="text-indigo-400 animate-spin" />
                              ) : (
                                `0${index + 1}`
                              )}
                            </span>
                            <img
                              src={song.image}
                              alt={song.title}
                              className="w-11 h-11 rounded-lg object-cover border border-white/[0.08]"
                            />
                            <div>
                              <div className="text-sm font-semibold text-white">
                                {song.title}
                              </div>
                              <div className="text-xs text-slate-400">
                                {song.artist}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
                              {song.year}
                            </span>
                            <a
                              href={song.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition"
                              title="Open on Spotify"
                              aria-label={`Open ${song.title} on Spotify`}
                            >
                              <FaSpotify size={16} />
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            MOMENTS / GALLERY SECTION
            ========================================================================= */}
        <section id="moments" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06] bg-[#0A0E17]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2 block">
                  // 05. BEHIND THE CODE
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                  Moments & journeys in Uttarakhand.
                </h2>
              </div>
              <p className="text-sm text-slate-400 max-w-md">
                Snapshots from university life, Himalayan explorations, and personal memories outside the terminal.
              </p>
            </div>

            {/* Editorial Photography Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {moments.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setActivePhoto(item)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActivePhoto(item);
                    }
                  }}
                  role="button"
                  tabIndex={0}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900 border border-white/[0.08] cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-xs font-mono text-indigo-300 mb-1">{item.tag}</span>
                    <span className="text-sm font-semibold text-white leading-tight mb-1">
                      {item.caption}
                    </span>
                    <span className="text-[11px] font-mono text-slate-300 flex items-center gap-1">
                      <MapPin size={11} className="text-indigo-400" />
                      {item.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            CONTACT SECTION
            ========================================================================= */}
        <section id="contact" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-white/[0.06] bg-[#0B0F17]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 mb-2">
                // 06. COMMUNICATION & INQUIRIES
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
                Let’s build something together.
              </h2>
              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Open for summer 2026 frontend internships, collaborative software projects, or open-source discussions.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left Column: Direct Contact Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="surface-card rounded-2xl p-6 sm:p-8 bg-slate-900/70 border border-white/[0.08]">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Direct Contact Channels
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Feel free to send a message directly or connect across professional networks.
                  </p>

                  <div className="space-y-4 text-sm">
                    {/* Email Card with Copy button */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                          <Mail size={16} />
                        </div>
                        <div>
                          <div className="text-[11px] font-mono text-slate-400">Email Address</div>
                          <a
                            href="mailto:priyanshurwt28@gmail.com"
                            className="font-medium text-slate-200 hover:text-white transition"
                          >
                            priyanshurwt28@gmail.com
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={copyEmail}
                        className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition"
                        title="Copy Email"
                        aria-label="Copy Email"
                      >
                        {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>
                    </div>

                    {/* Phone Card */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <Phone size={16} />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-slate-400">Phone Number</div>
                        <a
                          href="tel:+919634511431"
                          className="font-medium text-slate-200 hover:text-white transition"
                        >
                          +91 9634511431
                        </a>
                      </div>
                    </div>

                    {/* Location Card */}
                    <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-slate-400">Location</div>
                        <div className="font-medium text-slate-200">Uttarakhand, India</div>
                      </div>
                    </div>
                  </div>

                  {/* Response Guarantee Pill */}
                  <div className="mt-6 pt-6 border-t border-white/[0.06] flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Typical response time: Within 24 hours</span>
                  </div>
                </div>

                {/* Social Network Links Strip */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://linkedin.com/in/priyanshurawat15/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-indigo-500/30 flex items-center gap-3 text-slate-300 hover:text-white transition"
                  >
                    <FaLinkedin size={18} className="text-indigo-400" />
                    <div className="text-xs">
                      <div className="font-semibold text-white">LinkedIn</div>
                      <div className="text-slate-400 font-mono text-[10px]">priyanshurawat15</div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/priyanshurawat15-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.06] hover:border-indigo-500/30 flex items-center gap-3 text-slate-300 hover:text-white transition"
                  >
                    <FaGithub size={18} className="text-indigo-400" />
                    <div className="text-xs">
                      <div className="font-semibold text-white">GitHub</div>
                      <div className="text-slate-400 font-mono text-[10px]">priyanshurawat15-dev</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="surface-card rounded-2xl p-6 sm:p-8 bg-slate-900/70 border border-white/[0.08]">
                  <h3 className="font-display text-xl font-bold text-white mb-2">
                    Send a Message
                  </h3>
                  <p className="text-xs text-slate-400 mb-6">
                    Fill out the form below and I will respond to your provided email address.
                  </p>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">
                          Your Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="e.g. Alex Sharma"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/[0.08] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">
                          Your Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="alex@domain.com"
                          className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/[0.08] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Tell me about your project, team opportunity, or inquiry..."
                        className="w-full px-4 py-3 rounded-xl bg-slate-950/80 border border-white/[0.08] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
                      ></textarea>
                    </div>

                    {/* Feedback Messages */}
                    {formStatus === "success" && (
                      <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5">
                        <CheckCircle2 size={16} className="shrink-0" />
                        <span>{statusMessage}</span>
                      </div>
                    )}

                    {formStatus === "error" && (
                      <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5">
                        <AlertCircle size={16} className="shrink-0" />
                        <span>{statusMessage}</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formStatus === "loading"}
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all shadow-md shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formStatus === "loading" ? (
                        <>
                          <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <Send size={15} />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =========================================================================
          LIGHTBOX MODAL FOR MOMENTS
          ========================================================================= */}
      <AnimatePresence>
        {activePhoto && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <Motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full surface-card rounded-2xl overflow-hidden bg-slate-900 border border-white/[0.1] shadow-2xl"
            >
              <div className="relative aspect-[4/3] bg-black">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.caption}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/80 text-white hover:bg-slate-800 border border-white/[0.1] transition"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 sm:p-6 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <h4 className="font-semibold text-white">{activePhoto.caption}</h4>
                  <p className="text-slate-400 font-mono text-xs flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-indigo-400" />
                    {activePhoto.location}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-white/[0.05] border border-white/[0.08] text-xs font-mono text-slate-300">
                  {activePhoto.tag}
                </span>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          FOOTER
          ========================================================================= */}
      <footer className="py-12 px-6 sm:px-8 lg:px-12 border-t border-white/[0.08] bg-[#070A10] text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center font-bold text-xs text-indigo-300">
              PR
            </div>
            <div>
              <span className="font-semibold text-slate-200">Priyanshu Rawat</span>
              <span className="mx-2 text-slate-600">•</span>
              <span>Computer Science Undergrad</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300">
            <a href="#home" className="hover:text-white transition">Home</a>
            <a href="#about" className="hover:text-white transition">About</a>
            <a href="#projects" className="hover:text-white transition">Projects</a>
            <a href="#skills" className="hover:text-white transition">Skills</a>
            <a href="#soundtrack" className="hover:text-white transition">Soundtrack</a>
            <a href="#moments" className="hover:text-white transition">Moments</a>
            <a href="#contact" className="hover:text-white transition">Contact</a>
          </div>

          <div className="font-mono text-[11px] text-slate-400">
            © {new Date().getFullYear()} Priyanshu Rawat • Uttarakhand, India
          </div>
        </div>
      </footer>
    </div>
  );
}