import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Soundtrack", href: "#soundtrack" },
    { label: "Moments", href: "#moments" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-[#121110]/95 backdrop-blur-md border-b border-[#F0E6DA]/[0.08] py-3.5 shadow-xl shadow-black/50"
          : "bg-transparent py-5"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Brand / Logo */}
        <a
          href="#home"
          className="group flex items-center gap-3 text-[#F6F3EE] hover:text-white transition"
          aria-label="Priyanshu Rawat - Home"
        >
          <div className="w-10 h-10 rounded-xl bg-[#1C1917] border border-[#C49B66]/35 flex items-center justify-center font-bold text-sm tracking-wider text-[#D4A373] group-hover:border-[#C49B66] group-hover:bg-[#231F1C] transition-all">
            PR
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-[#F6F3EE] group-hover:text-white transition">
              Priyanshu Rawat
            </span>
            <span className="text-[11px] font-mono text-[#A09689] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2E6F52] animate-pulse"></span>
              Open to work...
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[#1A1715]/90 border border-[#F0E6DA]/[0.08] px-3 py-1.5 rounded-full shadow-inner">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium text-[#DDD4C8] hover:text-[#F6F3EE] px-3.5 py-1.5 rounded-full hover:bg-white/[0.05] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/priyanshurawat15-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-[#F0E6DA]/[0.08] bg-[#1A1715]/80 flex items-center justify-center text-[#DDD4C8] hover:text-[#F6F3EE] hover:border-[#C49B66]/40 transition"
            aria-label="GitHub Profile"
          >
            <Github size={16} />
          </a>
          <a
            href="https://linkedin.com/in/priyanshurawat15/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-9 h-9 rounded-lg border border-[#F0E6DA]/[0.08] bg-[#1A1715]/80 flex items-center justify-center text-[#DDD4C8] hover:text-[#F6F3EE] hover:border-[#C49B66]/40 transition"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-lg bg-[#2E6F52] hover:bg-[#388563] text-[#F6F3EE] transition shadow-sm"
          >
            Get In Touch
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden w-10 h-10 rounded-lg border border-[#F0E6DA]/[0.08] bg-[#1A1715] flex items-center justify-center text-[#DDD4C8] hover:text-[#F6F3EE] transition focus:outline-none focus:ring-2 focus:ring-[#2E6F52]"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-72 bg-[#161412] border-l border-[#F0E6DA]/[0.08] z-50 p-6 flex flex-col justify-between transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-[#F0E6DA]/[0.08]">
            <span className="font-semibold text-sm text-[#F6F3EE]">Navigation</span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-[#A09689] hover:text-[#F6F3EE] transition"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex flex-col gap-1 mt-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-[#DDD4C8] hover:text-[#F6F3EE] hover:bg-white/[0.05] px-3.5 py-2.5 rounded-lg transition"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-[#F0E6DA]/[0.08] flex flex-col gap-4">
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="w-full inline-flex items-center justify-center gap-1.5 text-xs font-semibold py-2.5 rounded-lg bg-[#2E6F52] hover:bg-[#388563] text-[#F6F3EE] transition"
          >
            Get In Touch
            <ArrowUpRight size={14} />
          </a>

          <div className="flex items-center justify-center gap-4 text-[#A09689]">
            <a
              href="https://github.com/priyanshurawat15-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F6F3EE] transition"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/priyanshurawat15/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#F6F3EE] transition"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="mailto:priyanshurwt28@gmail.com"
              className="hover:text-[#F6F3EE] transition"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}