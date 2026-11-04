import { useState, useRef } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import HowItWorks from "./components/HowItWorks";

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
  Terminal,
  Lightbulb,
  Layers,
  GraduationCap,
  Copy,
  Check,
  Send,
  X,
  Disc3,
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
      tag: "Indie acoustic",
    },
    {
      title: "Arz Kiya Hai",
      artist: "Anuv Jain",
      image: song2,
      link: "https://open.spotify.com/track/1bMkimTb47umgNP6xCi4A1",
      year: "2024",
      tag: "Singer-songwriter",
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
      tag: "Acoustic pop",
    },
    {
      title: "Faqeeran",
      artist: "Rashmeet Kaur",
      image: song5,
      link: "https://open.spotify.com/track/7DlNgLpxX3gPh3tzqrY7tL",
      year: "2024",
      tag: "Folk",
    },
    {
      title: "Sahiba",
      artist: "Aditya Rakhira",
      image: song6,
      link: "https://open.spotify.com/track/0eLtIxPRNJfsmehITZ1qaJ",
      year: "2024",
      tag: "Indie",
    },
  ];
  const [activeSong, setActiveSong] = useState(0);

  // Gallery photos
  const moments = [
    { src: photo1, caption: "Portrait", location: "Uttarakhand, India", tag: "Profile" },
    { src: photo2, caption: "Campus study and coding sessions", location: "Graphic Era Hill University", tag: "Campus" },
    { src: photo3, caption: "Foothills of the Himalayas", location: "Uttarakhand, India", tag: "Nature" },
    { src: photo4, caption: "With friends and classmates", location: "Dehradun", tag: "Life" },
    { src: photo5, caption: "Campus events and college days", location: "Campus", tag: "College" },
    { src: photo6, caption: "Everyday moments", location: "Uttarakhand", tag: "Personal" },
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
          setStatusMessage("Thank you! Your message has been sent. I'll get back to you shortly.");
          if (formRef.current) formRef.current.reset();
        },
        () => {
          setFormStatus("error");
          setStatusMessage(
            "Couldn't send directly through the form. Please email me directly at priyanshurwt28@gmail.com."
          );
        }
      );
  };

  const skillsData = {
    languages: [
      { name: "C", icon: <SiC className="text-sky-400" />, level: "Foundations & memory" },
      { name: "C++", icon: <SiCplusplus className="text-blue-400" />, level: "Data structures & algorithms" },
      { name: "Java", icon: <FaJava className="text-amber-500" />, level: "Object-oriented programming" },
      { name: "Python", icon: <SiPython className="text-yellow-400" />, level: "Scripting & logic" },
      { name: "JavaScript", icon: <FaJsSquare className="text-yellow-400" />, level: "Modern ES6+ & web logic" },
    ],
    frontend: [
      { name: "React.js", icon: <FaReact className="text-cyan-400" />, level: "Components, hooks & state" },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal-400" />, level: "Responsive utility styling" },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500" />, level: "Semantic markup & accessibility" },
      { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" />, level: "Flexbox, Grid & animations" },
    ],
    workflow: [
      { name: "Git & GitHub", icon: <FaGitAlt className="text-orange-500" />, level: "Version control & collaboration" },
      { name: "Vite", icon: <SiVite className="text-purple-400" />, level: "Fast development & build tooling" },
      { name: "UI & Layout", icon: <Layers className="text-[#D4A373]" size={18} />, level: "Hierarchy, spacing & usability" },
      { name: "Responsive Design", icon: <Code2 className="text-[#388563]" size={18} />, level: "Cross-device layouts" },
    ],
  };

  const projects = [
    {
      id: "01",
      title: "Smart Vehicle QR System",
      category: "Emergency & Safety Utility",
      summary:
        "A web application that generates unique QR stickers for vehicle dashboards. If a parked car is blocking someone or in an emergency, anyone can scan the QR code to contact the owner right away—without exposing anyone’s personal phone number.",
      image: vehicleqr,
      tags: ["React", "JavaScript", "Tailwind CSS", "QR Logic", "Privacy"],
      githubUrl: "https://github.com/priyanshurawat15-dev/QR-Portfolio",
      liveUrl: "https://github.com/priyanshurawat15-dev/QR-Portfolio",
      highlights: [
        "Generates a unique QR code for each vehicle.",
        "Allows people to send messages or alerts to vehicle owners.",
        "Keeps the owner's personal phone number private.",
        "Works on mobile devices for quick and easy access."
      ],
      steps: [
        {
          title: "Scan QR",
          description: "Scan the vehicle's QR code."
        },
        {
          title: "Choose Action",
          description: "Report, contact or get help."
        },
        {
          title: "Owner Notified",
          description: "The owner receives an alert."
        }
      ],

    },

    {
      id: "02",
      title: "Free Slot Finder",
      category: "Campus Timetable Tool",
      summary:
        "The idea for this project came from a problem we noticed in our college. Finding available classrooms, checking teacher schedules and arranging venues for college events often involved asking different people and getting approvals manually.",
      intro:
        "We started building Free Slot Finder to make these tasks easier and bring them together in one place.",
      image: slotfinder,
      tags: ["React", "JavaScript", "Tailwind CSS", "Vite"],
      githubUrl: "https://github.com/priyanshurawat15-dev/QuickSlot-Smart-Free-Slot-Finder",
      liveUrl: "https://quickslotfinder.vercel.app/",

      highlights: [
        "Helps teachers find available classrooms and labs for extra classes, practicals and other sessions.",
        "Allows students to check teacher availability and find when they are free.",
        "Helps college clubs request venues for meetings, workshops and events.",
        "Makes it easier for the administration to manage room bookings, venue requests and approvals."
      ],
    },
    {
      id: "03",
      title: "Personal Portfolio",
      category: "Portfolio Website",
      summary:
        "I built this portfolio to have one place where I can share my work, introduce myself, and show what I've been learning as a developer. It brings together my projects, skills, and a few personal interests.",

      intro:
        "The website also includes:",
      image: portfolio,
      tags: ["React", "Vite", "Tailwind CSS", "EmailJS"],
      githubUrl: "https://github.com/priyanshurawat15-dev/QR-Portfolio",
      liveUrl: "https://priyanshu-rawat.vercel.app",
      highlights: [
        "A section to showcase my projects and the tools used to build them.",
        "Little bit about myself & an interactive music playlist.",
        "A photo gallery or glimps of me",
        "A contact form so visitors can reach me directly.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#121110] text-[#EDE8E1] font-sans selection:bg-[#2E6F52]/40 selection:text-[#F6F3EE]">
      <Navbar />

      <main className="relative z-10">
        {/* =========================================================================
            HERO SECTION
            ========================================================================= */}
        <section
          id="home"
          className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-6 sm:px-8 lg:px-12 bg-dots overflow-hidden"
        >
          {/* Subtle warm ambient depth */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#C49B66]/[0.03] blur-3xl pointer-events-none rounded-full" />

          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1A1715] border border-[#F0E6DA]/[0.08] text-xs font-mono text-[#DDD4C8] mb-6">
                <span className="w-2 h-2 rounded-full bg-[#2E6F52] animate-pulse"></span>
                <span>Computer Science Student</span>
                <span className="text-[#8C8276]">•</span>
                <span className="text-[#C49B66]">Uttarakhand, India</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#F6F3EE] leading-[1.12] mb-6">
                Hi, I'm Priyanshu Rawat.{" "}
                <span className="block text-[#D4A373] mt-1 font-semibold">
                  Love to work on solving real-world problem's project.
                </span>
              </h1>

              {/* Subtitle / Bio Pitch */}
              <p className="text-base sm:text-lg text-[#DDD4C8] max-w-2xl leading-relaxed mb-8">
                I'm a Computer Science student at Graphic Era Hill University in Uttarakhand. I enjoy exploring ideas, learn & build new things, and figuring out real-world problems.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
                <a
                  href="#projects"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2E6F52] hover:bg-[#388563] text-[#F6F3EE] font-medium text-sm transition-all shadow-md shadow-[#2E6F52]/20 hover:-translate-y-0.5"
                >
                  View Projects
                  <ArrowUpRight size={16} />
                </a>
                <a
                  href="#about"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#1C1917] hover:bg-[#24201C] border border-[#F0E6DA]/[0.1] text-[#DDD4C8] hover:text-[#F6F3EE] font-medium text-sm transition-all hover:-translate-y-0.5"
                >
                  About Me
                </a>
              </div>

              {/* Social Channels Strip */}
              <div className="flex items-center gap-3 pt-6 border-t border-[#F0E6DA]/[0.08] w-full">
                <span className="text-xs font-mono text-[#A09689] uppercase tracking-wider mr-2">
                  Connect:
                </span>
                <a
                  href="https://github.com/priyanshurawat15-dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#1A1715] border border-[#F0E6DA]/[0.08] text-[#DDD4C8] hover:text-[#F6F3EE] hover:border-[#C49B66]/40 hover:bg-[#231F1C] transition"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <FaGithub size={18} />
                </a>
                <a
                  href="https://linkedin.com/in/priyanshurawat15/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#1A1715] border border-[#F0E6DA]/[0.08] text-[#DDD4C8] hover:text-[#F6F3EE] hover:border-[#C49B66]/40 hover:bg-[#231F1C] transition"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <FaLinkedin size={18} />
                </a>
                <a
                  href="https://instagram.com/priyanshurawat_15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#1A1715] border border-[#F0E6DA]/[0.08] text-[#DDD4C8] hover:text-[#F6F3EE] hover:border-[#C49B66]/40 hover:bg-[#231F1C] transition"
                  aria-label="Instagram Profile"
                  title="Instagram"
                >
                  <FaInstagram size={18} />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#1A1715] border border-[#F0E6DA]/[0.08] text-[#DDD4C8] hover:text-[#F6F3EE] hover:border-[#C49B66]/40 hover:bg-[#231F1C] transition"
                  aria-label="Twitter Profile"
                  title="Twitter"
                >
                  <FaTwitter size={18} />
                </a>
                <a
                  href="https://discord.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-lg bg-[#1A1715] border border-[#F0E6DA]/[0.08] text-[#DDD4C8] hover:text-[#F6F3EE] hover:border-[#C49B66]/40 hover:bg-[#231F1C] transition"
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
                {/* Profile card */}
                <div className="surface-card rounded-2xl p-4 bg-[#1A1715] border border-[#F0E6DA]/[0.08] shadow-2xl relative z-10">
                  {/* Photo container */}
                  <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-[#121110] mb-4 border border-[#F0E6DA]/[0.06]">
                    <img
                      src={photo1}
                      alt="Priyanshu Rawat portrait"
                      className="w-full h-full object-cover object-top filter contrast-[1.02] transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/80 via-transparent to-transparent pointer-events-none" />

                    {/* Location Badge on Photo */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs font-mono bg-[#161412]/90 backdrop-blur-md px-3 py-2 rounded-lg border border-[#F0E6DA]/[0.1]">
                      <span className="flex items-center gap-1.5 text-[#F6F3EE]">
                        <MapPin size={13} className="text-[#C49B66]" />
                        Uttarakhand, IN
                      </span>
                      <span className="text-[#2E6F52] font-medium">B.Tech 2028</span>
                    </div>
                  </div>

                  {/* Quick info strip below photo */}
                  <div className="space-y-2 text-xs">
                    <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#141210]">
                      <span className="text-[#A09689] font-mono">Focus</span>
                      <span className="font-medium text-[#EDE8E1]">Frontend & Web Apps</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#141210]">
                      <span className="text-[#A09689] font-mono">Core Stack</span>
                      <span className="font-medium text-[#EDE8E1]">React, JavaScript, Tailwind</span>
                    </div>
                    <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-[#141210]">
                      <span className="text-[#A09689] font-mono">Status</span>
                      <span className="font-medium text-[#388563] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F52]"></span>
                        Open to work...
                      </span>
                    </div>
                  </div>
                </div>

                {/* Subtle warm backing glow */}
                <div className="absolute -inset-1 rounded-2xl bg-[#C49B66]/[0.08] blur-xl opacity-60 -z-10" />
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            ABOUT SECTION
            ========================================================================= */}
        <section id="about" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-[#F0E6DA]/[0.08] bg-[#171513]">
          <div className="max-w-7xl mx-auto">
            {/* Section Tag & Heading */}
            <div className="flex flex-col mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C49B66] mb-2 font-medium">
                About me
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F3EE]">
                A bit about who I am & what I do.
              </h2>
            </div>

            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Photo & Identity side card */}
              <div className="lg:col-span-5 space-y-6">
                <div className="surface-card rounded-2xl p-4 bg-[#1A1715] border border-[#F0E6DA]/[0.08]">
                  <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 bg-[#121110]">
                    <img
                      src={photo6}
                      alt="Priyanshu Rawat"
                      className="w-full h-full object-cover filter contrast-[1.02] hover:scale-105 transition-all duration-500"
                    />
                  </div>
                  <div className="space-y-3 px-1">
                    <h3 className="font-display text-xl font-bold text-[#F6F3EE]">Priyanshu Rawat</h3>
                    <p className="text-xs text-[#A09689] font-mono">
                      Computer Science & Engineering Student
                    </p>
                    <div className="pt-3 border-t border-[#F0E6DA]/[0.06] flex flex-col gap-2 text-xs text-[#DDD4C8]">
                      <div className="flex items-center gap-2">
                        <MapPin size={14} className="text-[#C49B66] shrink-0" />
                        <span>Uttarakhand, India</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap size={14} className="text-[#C49B66] shrink-0" />
                        <span>B.Tech in Computer Science & Engineering</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail size={14} className="text-[#C49B66] shrink-0" />
                        <span className="truncate">priyanshurwt28@gmail.com</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick stats pill grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-[#1A1715] border border-[#F0E6DA]/[0.06]">
                    <div className="text-2xl font-bold text-[#C49B66] font-display">03+</div>
                    <div className="text-xs text-[#A09689] mt-1">Practical Projects Built</div>
                  </div>
                  <div className="p-4 rounded-xl bg-[#1A1715] border border-[#F0E6DA]/[0.06]">
                    <div className="text-2xl font-bold text-[#C49B66] font-display">2028</div>
                    <div className="text-xs text-[#A09689] mt-1">Graduation Cohort</div>
                  </div>
                </div>
              </div>

              {/* Narrative Content */}
              <div className="lg:col-span-7 space-y-6 text-[#DDD4C8] leading-relaxed text-base">
                <p className="text-lg text-[#F6F3EE] font-medium leading-relaxed">
                  I'm Priyanshu, from Srinagar Garhwal, Uttarakhand, currently pursuing Computer Science and Engineering at Graphic Era Hill University, Dehradun.
                </p>

                <p>
                  I started learning web development because I was curious about how websites and web apps work. Over time, I started enjoying the process of building things that people can actually use.
                </p>

                <p>
                  I like working on problems I see around me, especially in college or everyday life. For example, I built a Smart Vehicle QR system that helps people contact vehicle owners during parking issues without sharing their personal phone numbers. I'm also working on Slot Finder (IN PROGRESS ), a project that helps students find free classrooms and check teacher availability between classes.
                </p>

                <p>
                  Apart from projects, I'm also working on improving my programming skills and learning more about computer science. In my free time, I enjoy listening to music, exploring the hills around Uttarakhand, and spending time outdoors.
                </p>

                {/* Two Focus Pillars */}
                <div className="pt-6 grid sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-xl bg-[#1A1715] border border-[#F0E6DA]/[0.06] hover:border-[#C49B66]/30 transition">
                    <div className="w-8 h-8 rounded-lg bg-[#2E6F52]/15 text-[#388563] flex items-center justify-center mb-3">
                      <Code2 size={18} />
                    </div>
                    <h4 className="font-semibold text-[#F6F3EE] text-sm mb-1.5">Problem Solving</h4>
                    <p className="text-xs text-[#A09689] leading-normal">
                      Working on ideas that solve everyday problems and make things easier for people.
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-[#1A1715] border border-[#F0E6DA]/[0.06] hover:border-[#C49B66]/30 transition">
                    <div className="w-8 h-8 rounded-lg bg-[#C49B66]/15 text-[#D4A373] flex items-center justify-center mb-3">
                      <Terminal size={18} />
                    </div>
                    <h4 className="font-semibold text-[#F6F3EE] text-sm mb-1.5">Core Computing</h4>
                    <p className="text-xs text-[#A09689] leading-normal">
                      Data structures, algorithms, and object-oriented programming in C++.
                    </p>
                  </div>


                  <div className="p-5 rounded-xl bg-[#1A1715] border border-[#F0E6DA]/[0.06] hover:border-[#C49B66]/30 transition">
                    <div className="w-8 h-8 rounded-lg bg-[#C49B66]/15 text-[#D4A373] flex items-center justify-center mb-3">
                      <Lightbulb size={18} />
                    </div>
                    <h4 className="font-semibold text-[#F6F3EE] text-sm mb-1.5">Learning & Building</h4>
                    <p className="text-xs text-[#A09689] leading-normal">
                      Learning new concepts, exploring technology, and turning ideas into working projects.
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
        <section id="projects" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-[#F0E6DA]/[0.08] bg-[#121110]">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C49B66] mb-2 block font-medium">
                  Projects
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F3EE]">
                  Selected work
                </h2>
              </div>
              <p className="text-sm text-[#A09689] max-w-md">
                Projects I’ve built to solve everyday problems and experiment with modern web tools.
              </p>
            </div>

            {/* Projects Stack */}
            <div className="space-y-16">
              {projects.map((project, index) => (
                <article
                  key={project.id}
                  className="surface-card rounded-2xl p-5 sm:p-6 lg:p-7 bg-[#1A1715] border border-[#F0E6DA]/[0.08] hover:border-[#C49B66]/35 transition-all duration-300"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
                    {/* Visual Mockup Column */}
                    <div
                      className={`lg:col-span-7 ${index % 2 === 1 ? "lg:order-2" : "lg:order-1"
                        }`}
                    >
                      <div className="relative rounded-xl overflow-hidden border border-[#F0E6DA]/[0.08] bg-[#121110] group">
                        {/* Browser Window Chrome Top */}
                        <div className="px-4 py-2.5 bg-[#141210] border-b border-[#F0E6DA]/[0.06] flex items-center justify-between text-xs text-[#A09689]">
                          <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/50"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></span>
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></span>
                          </div>
                          <span className="font-mono text-[11px] text-[#A09689]">
                            {project.title.toLowerCase().replace(/\s+/g, "-")}.app
                          </span>
                          <span className="w-4"></span>
                        </div>

                        {/* Image Preview */}
                        <div className="aspect-[4/3] sm:aspect-[3/2] overflow-hidden bg-[#141210]">
                          <img
                            src={project.image}
                            alt={`${project.title} screenshot`}
                            className="w-full h-full object-contain transition-transform duration-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Column */}
                    <div
                      className={`lg:col-span-5 flex flex-col justify-between ${index % 2 === 1 ? "lg:order-1" : "lg:order-2"
                        }`}
                    >
                      <div>
                        {/* Index & Category */}
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-mono font-bold text-[#C49B66]">
                            {project.id}
                          </span>
                          <span className="text-[#8C8276]">•</span>
                          <span className="text-xs font-mono text-[#A09689] uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>

                        {/* Project Title */}
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-[#F6F3EE] mb-3">
                          {project.title}
                        </h3>

                        {/* Summary */}
                        <p className="text-xs sm:text-sm text-[#DDD4C8] leading-relaxed mb-4">
                          {project.summary}
                        </p>

                        {/* Intro */}
                        {project.intro && (
                          <p className="text-xs sm:text-sm text-[#DDD4C8] leading-relaxed mb-4">
                            {project.intro}
                          </p>
                        )}

                        {/* Feature Highlights */}
                        <ul className="space-y-1.5 mb-4 text-xs text-[#DDD4C8]">
                          {project.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#2E6F52] mt-1 font-bold">•</span>
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>



                        {/* How It Works */}
                        {project.steps?.length > 0 && (
                          <div className="mb-6">
                            <HowItWorks steps={project.steps} />
                          </div>
                        )}



                        {/* Tech Tag Pills */}
                        <div className="flex flex-wrap gap-2 mb-8">
                          {project.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2.5 py-1 rounded-md text-xs font-mono bg-[#141210] border border-[#F0E6DA]/[0.06] text-[#DDD4C8]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="flex items-center gap-4 pt-4 border-t border-[#F0E6DA]/[0.06]">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-[#161412] border border-[#F0E6DA]/[0.08] text-[#DDD4C8] hover:text-[#F6F3EE] hover:border-[#C49B66]/40 transition"
                        >
                          <FaGithub size={14} />
                          GitHub
                        </a>
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-lg bg-[#2E6F52] hover:bg-[#388563] text-[#F6F3EE] transition shadow-sm"
                        >
                          <ExternalLink size={14} />
                          Live Project
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
        <section id="skills" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-[#F0E6DA]/[0.08] bg-[#171513]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C49B66] mb-2 font-medium">
                Technical skills
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F3EE]">
                Tools & technologies
              </h2>
              <p className="text-sm text-[#A09689] mt-2 max-w-xl">
                The programming languages, frameworks, and tools I use for coursework and personal projects.
              </p>
            </div>

            {/* Structured Engineering Pillars */}
            <div className="grid md:grid-cols-3 gap-8">
              {/* Category 1: Languages */}
              <div className="surface-card rounded-2xl p-6 bg-[#1A1715] border border-[#F0E6DA]/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#F0E6DA]/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-[#C49B66]/15 text-[#D4A373] flex items-center justify-center">
                      <Terminal size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-[#F6F3EE]">Programming Languages</h3>
                      <p className="text-[11px] font-mono text-[#A09689]">Core logic & algorithms</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {skillsData.languages.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#141210] border border-[#F0E6DA]/[0.04] hover:bg-[#1C1917] transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="text-sm font-medium text-[#EDE8E1]">{skill.name}</span>
                        </div>
                        <span className="text-xs font-mono text-[#A09689]">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category 2: Frontend Ecosystem */}
              <div className="surface-card rounded-2xl p-6 bg-[#1A1715] border border-[#F0E6DA]/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#F0E6DA]/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-[#2E6F52]/15 text-[#388563] flex items-center justify-center">
                      <Code2 size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-[#F6F3EE]">Frontend Ecosystem</h3>
                      <p className="text-[11px] font-mono text-[#A09689]">Web UI & interactivity</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {skillsData.frontend.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#141210] border border-[#F0E6DA]/[0.04] hover:bg-[#1C1917] transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="text-sm font-medium text-[#EDE8E1]">{skill.name}</span>
                        </div>
                        <span className="text-xs font-mono text-[#A09689]">{skill.level}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Category 3: Workflow & Practices */}
              <div className="surface-card rounded-2xl p-6 bg-[#1A1715] border border-[#F0E6DA]/[0.08] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#F0E6DA]/[0.06]">
                    <div className="w-8 h-8 rounded-lg bg-[#F0E6DA]/10 text-[#DDD4C8] flex items-center justify-center">
                      <Layers size={16} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm text-[#F6F3EE]">Tools & Practices</h3>
                      <p className="text-[11px] font-mono text-[#A09689]">Workflow & developer setup</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {skillsData.workflow.map((skill) => (
                      <div
                        key={skill.name}
                        className="flex items-center justify-between p-3 rounded-xl bg-[#141210] border border-[#F0E6DA]/[0.04] hover:bg-[#1C1917] transition"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{skill.icon}</span>
                          <span className="text-sm font-medium text-[#EDE8E1]">{skill.name}</span>
                        </div>
                        <span className="text-xs font-mono text-[#A09689]">{skill.level}</span>
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
        <section id="soundtrack" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-[#F0E6DA]/[0.08] bg-[#121110]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C49B66] mb-2 block font-medium">
                  Soundtrack
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F3EE]">
                  Music I code to
                </h2>
              </div>
              <p className="text-sm text-[#A09689] max-w-md">
                A few favorite tracks that keep me focused during study and late-night coding sessions.
              </p>
            </div>

            {/* Interactive Player Layout */}
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              {/* Featured / Active Track Display Card */}
              <div className="lg:col-span-5">
                <div className="surface-card rounded-2xl p-6 sm:p-8 bg-[#1A1715] border border-[#F0E6DA]/[0.08] relative overflow-hidden">
                  {/* Record album backdrop */}
                  <div className="relative aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-2xl mb-6 border border-[#F0E6DA]/[0.1] group">
                    <img
                      src={songs[activeSong].image}
                      alt={songs[activeSong].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/80 via-transparent to-transparent" />

                    {/* Floating Equalizer on cover */}
                    <div className="absolute bottom-4 left-4 flex items-end gap-1 h-6">
                      <span className="w-1 bg-[#2E6F52] rounded-full bar-1"></span>
                      <span className="w-1 bg-[#2E6F52] rounded-full bar-2"></span>
                      <span className="w-1 bg-[#2E6F52] rounded-full bar-3"></span>
                      <span className="w-1 bg-[#2E6F52] rounded-full bar-4"></span>
                    </div>

                    <div className="absolute bottom-4 right-4">
                      <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-[#141210]/90 backdrop-blur-md text-[#DDD4C8] border border-[#F0E6DA]/[0.1]">
                        {songs[activeSong].tag}
                      </span>
                    </div>
                  </div>

                  {/* Song Metadata */}
                  <div className="text-center space-y-1 mb-6">
                    <h3 className="font-display text-2xl font-bold text-[#F6F3EE]">
                      {songs[activeSong].title}
                    </h3>
                    <p className="text-[#A09689] text-sm">
                      {songs[activeSong].artist}
                    </p>
                  </div>

                  {/* Open Spotify Action */}
                  <a
                    href={songs[activeSong].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#2E6F52] hover:bg-[#388563] text-[#F6F3EE] font-medium text-xs sm:text-sm transition-all shadow-md shadow-[#2E6F52]/20"
                  >
                    <FaSpotify size={18} />
                    Listen on Spotify
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>

              {/* Playlist Selection Column */}
              <div className="lg:col-span-7">
                <div className="surface-card rounded-2xl p-4 sm:p-6 bg-[#161412] border border-[#F0E6DA]/[0.08] divide-y divide-[#F0E6DA]/[0.06]">
                  <div className="px-3 pb-3 flex items-center justify-between text-xs font-mono text-[#A09689]">
                    <span>TRACKLIST // 06 SONGS</span>
                    <span>CLICK TO PREVIEW</span>
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
                          className={`w-full text-left p-3.5 rounded-xl flex items-center justify-between transition cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#C49B66] ${isActive
                            ? "bg-[#221E1B] border border-[#C49B66]/35 text-[#F6F3EE]"
                            : "hover:bg-[#1A1715] text-[#DDD4C8]"
                            }`}
                        >
                          <div className="flex items-center gap-4">
                            <span className="font-mono text-xs w-5 text-[#C49B66]">
                              {isActive ? (
                                <Disc3 size={16} className="text-[#C49B66] animate-spin" />
                              ) : (
                                `0${index + 1}`
                              )}
                            </span>
                            <img
                              src={song.image}
                              alt={song.title}
                              className="w-11 h-11 rounded-lg object-cover border border-[#F0E6DA]/[0.08]"
                            />
                            <div>
                              <div className="text-sm font-semibold text-[#F6F3EE]">
                                {song.title}
                              </div>
                              <div className="text-xs text-[#A09689]">
                                {song.artist}
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="hidden sm:block absolute top-4 -right-3 text-gray-500">
                              {song.year}
                            </span>
                            <a
                              href={song.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-lg text-[#A09689] hover:text-[#2E6F52] hover:bg-[#2E6F52]/10 transition"
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
        <section id="moments" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-[#F0E6DA]/[0.08] bg-[#171513]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#C49B66] mb-2 block font-medium">
                  Moments
                </span>
                <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F3EE]">
                  Life beyond the screen
                </h2>
              </div>
              <p className="text-sm text-[#A09689] max-w-md">
                Snapshots from college life, travels across Uttarakhand, and time with friends.
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
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#1A1715] border border-[#F0E6DA]/[0.08] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#C49B66]"
                >
                  <img
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 filter contrast-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/95 via-[#121110]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <span className="text-xs font-mono text-[#C49B66] mb-1">{item.tag}</span>
                    <span className="text-sm font-semibold text-[#F6F3EE] leading-tight mb-1">
                      {item.caption}
                    </span>
                    <span className="text-[11px] font-mono text-[#DDD4C8] flex items-center gap-1">
                      <MapPin size={11} className="text-[#C49B66]" />
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
        <section id="contact" className="py-24 px-6 sm:px-8 lg:px-12 border-t border-[#F0E6DA]/[0.08] bg-[#121110]">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col mb-16">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C49B66] mb-2 font-medium">
                Contact
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#F6F3EE]">
                Let’s get in touch
              </h2>
              <p className="text-sm text-[#A09689] mt-2 max-w-xl">
                I’m open for frontend internships, collaborative projects, or general tech conversations. Feel free to reach out.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
              {/* Left Column: Direct Contact Info */}
              <div className="lg:col-span-5 space-y-6">
                <div className="surface-card rounded-2xl p-6 sm:p-8 bg-[#1A1715] border border-[#F0E6DA]/[0.08]">
                  <h3 className="font-display text-xl font-bold text-[#F6F3EE] mb-2">
                    Direct Contact
                  </h3>
                  <p className="text-xs text-[#A09689] mb-6">
                    Feel free to email me directly or connect across professional platforms.
                  </p>

                  <div className="space-y-4 text-sm">
                    {/* Email Card with Copy button */}
                    <div className="p-3.5 rounded-xl bg-[#141210] border border-[#F0E6DA]/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#C49B66]/15 text-[#D4A373] flex items-center justify-center">
                          <Mail size={16} />
                        </div>
                        <div>
                          <div className="text-[11px] font-mono text-[#A09689]">Email Address</div>
                          <a
                            href="mailto:priyanshurwt28@gmail.com"
                            className="font-medium text-[#EDE8E1] hover:text-white transition"
                          >
                            priyanshurwt28@gmail.com
                          </a>
                        </div>
                      </div>
                      <button
                        onClick={copyEmail}
                        className="p-2 rounded-lg text-[#A09689] hover:text-[#F6F3EE] hover:bg-white/[0.06] transition"
                        title="Copy Email"
                        aria-label="Copy Email"
                      >
                        {copied ? <Check size={16} className="text-[#388563]" /> : <Copy size={16} />}
                      </button>
                    </div>

                    {/* Phone Card */}
                    <div className="p-3.5 rounded-xl bg-[#141210] border border-[#F0E6DA]/[0.06] flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#C49B66]/15 text-[#D4A373] flex items-center justify-center">
                        <Phone size={16} />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-[#A09689]">Phone Number</div>
                        <a
                          href="tel:+919634511431"
                          className="font-medium text-[#EDE8E1] hover:text-white transition"
                        >
                          +91 9634511431
                        </a>
                      </div>
                    </div>

                    {/* Location Card */}
                    <div className="p-3.5 rounded-xl bg-[#141210] border border-[#F0E6DA]/[0.06] flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#C49B66]/15 text-[#D4A373] flex items-center justify-center">
                        <MapPin size={16} />
                      </div>
                      <div>
                        <div className="text-[11px] font-mono text-[#A09689]">Location</div>
                        <div className="font-medium text-[#EDE8E1]">Uttarakhand, India</div>
                      </div>
                    </div>
                  </div>

                  {/* Response note */}
                  <div className="mt-6 pt-6 border-t border-[#F0E6DA]/[0.06] flex items-center gap-2 text-xs font-mono text-[#A09689]">
                    <span className="w-2 h-2 rounded-full bg-[#2E6F52]"></span>
                    <span>Typically replies within 24 hours</span>
                  </div>
                </div>

                {/* Social Network Links */}
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href="https://linkedin.com/in/priyanshurawat15/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-[#1A1715] border border-[#F0E6DA]/[0.06] hover:border-[#C49B66]/30 flex items-center gap-3 text-[#DDD4C8] hover:text-[#F6F3EE] transition"
                  >
                    <FaLinkedin size={18} className="text-[#C49B66]" />
                    <div className="text-xs">
                      <div className="font-semibold text-[#F6F3EE]">LinkedIn</div>
                      <div className="text-[#A09689] font-mono text-[10px]">priyanshurawat15</div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/priyanshurawat15-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 rounded-xl bg-[#1A1715] border border-[#F0E6DA]/[0.06] hover:border-[#C49B66]/30 flex items-center gap-3 text-[#DDD4C8] hover:text-[#F6F3EE] transition"
                  >
                    <FaGithub size={18} className="text-[#C49B66]" />
                    <div className="text-xs">
                      <div className="font-semibold text-[#F6F3EE]">GitHub</div>
                      <div className="text-[#A09689] font-mono text-[10px]">priyanshurawat15-dev</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* Right Column: Contact Form */}
              <div className="lg:col-span-7">
                <div className="surface-card rounded-2xl p-6 sm:p-8 bg-[#1A1715] border border-[#F0E6DA]/[0.08]">
                  <h3 className="font-display text-xl font-bold text-[#F6F3EE] mb-2">
                    Send a message
                  </h3>
                  <p className="text-xs text-[#A09689] mb-6">
                    Fill out the form below and I will reply to your email address.
                  </p>

                  <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-xs font-mono text-[#DDD4C8] mb-1.5">
                          Your Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          placeholder="Your name"
                          className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-[#F0E6DA]/[0.08] text-sm text-[#F6F3EE] placeholder-[#8C8276] focus:outline-none focus:border-[#C49B66] focus:ring-1 focus:ring-[#C49B66] transition"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-xs font-mono text-[#DDD4C8] mb-1.5">
                          Your Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          required
                          placeholder="name@example.com"
                          className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-[#F0E6DA]/[0.08] text-sm text-[#F6F3EE] placeholder-[#8C8276] focus:outline-none focus:border-[#C49B66] focus:ring-1 focus:ring-[#C49B66] transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-mono text-[#DDD4C8] mb-1.5">
                        Your Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        placeholder="Tell me about your project, team opportunity, or question..."
                        className="w-full px-4 py-3 rounded-xl bg-[#141210] border border-[#F0E6DA]/[0.08] text-sm text-[#F6F3EE] placeholder-[#8C8276] focus:outline-none focus:border-[#C49B66] focus:ring-1 focus:ring-[#C49B66] transition"
                      ></textarea>
                    </div>

                    {/* Feedback Messages */}
                    {formStatus === "success" && (
                      <div className="p-4 rounded-xl bg-[#2E6F52]/15 border border-[#2E6F52]/40 text-[#388563] text-xs flex items-center gap-2.5">
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
                      className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#2E6F52] hover:bg-[#388563] text-[#F6F3EE] font-medium text-sm transition-all shadow-md shadow-[#2E6F52]/20 disabled:opacity-50 disabled:cursor-not-allowed"
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
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md"
            onClick={() => setActivePhoto(null)}
          >
            <Motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-3xl w-full surface-card rounded-2xl overflow-hidden bg-[#1A1715] border border-[#F0E6DA]/[0.1] shadow-2xl"
            >
              <div className="relative aspect-[4/3] bg-black">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.caption}
                  className="w-full h-full object-contain"
                />
                <button
                  onClick={() => setActivePhoto(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-[#141210]/80 text-[#DDD4C8] hover:text-[#F6F3EE] hover:bg-[#141210] border border-[#F0E6DA]/[0.1] transition"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-4 sm:p-6 flex items-center justify-between text-xs sm:text-sm">
                <div>
                  <h4 className="font-semibold text-[#F6F3EE]">{activePhoto.caption}</h4>
                  <p className="text-[#A09689] font-mono text-xs flex items-center gap-1 mt-0.5">
                    <MapPin size={12} className="text-[#C49B66]" />
                    {activePhoto.location}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-md bg-[#141210] border border-[#F0E6DA]/[0.08] text-xs font-mono text-[#DDD4C8]">
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
      <footer className="py-12 px-6 sm:px-8 lg:px-12 border-t border-[#F0E6DA]/[0.08] bg-[#0E0D0C] text-[#A09689] text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#1C1917] border border-[#C49B66]/30 flex items-center justify-center font-bold text-xs text-[#D4A373]">
              PR
            </div>
            <div>
              <span className="font-semibold text-[#F6F3EE]">Priyanshu Rawat</span>
              <span className="mx-2 text-[#8C8276]">•</span>
              <span className="text-[#DDD4C8]">Computer Science Student</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[#DDD4C8]">
            <a href="#home" className="hover:text-[#F6F3EE] transition">Home</a>
            <a href="#about" className="hover:text-[#F6F3EE] transition">About</a>
            <a href="#projects" className="hover:text-[#F6F3EE] transition">Projects</a>
            <a href="#skills" className="hover:text-[#F6F3EE] transition">Skills</a>
            <a href="#soundtrack" className="hover:text-[#F6F3EE] transition">Soundtrack</a>
            <a href="#moments" className="hover:text-[#F6F3EE] transition">Moments</a>
            <a href="#contact" className="hover:text-[#F6F3EE] transition">Contact</a>
          </div>

          <div className="font-mono text-[11px] text-[#A09689]">
            © {new Date().getFullYear()} Priyanshu Rawat • Uttarakhand, India
          </div>
        </div>
      </footer>
    </div>
  );
}
