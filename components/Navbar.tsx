"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  { label: "Certifications", href: "/#certifications" },
  { label: "Resume", href: "/#resume" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      // Hero section is ~100vh; switch name after ~80% of viewport height
      setPastHero(y > window.innerHeight * 0.6);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-ivory-50/96 backdrop-blur-sm border-b border-stone-200/80 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo — transitions between "Portfolio" and "Diya Sharma" */}
        <div className="relative h-7 overflow-hidden w-40">
          {/* "Portfolio" — visible in hero */}
          <span
            className={`absolute inset-0 flex items-center font-mono text-sm tracking-[0.15em] uppercase text-stone-500 transition-all duration-500 ${
              pastHero ? "opacity-0 -translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
            }`}
          >
            Portfolio
          </span>
          {/* "Diya Sharma" — visible after scroll */}
          <button
            onClick={scrollToTop}
            className={`absolute inset-0 flex items-center font-display text-xl font-medium text-stone-800 hover:text-sage-600 transition-all duration-500 cursor-pointer ${
              pastHero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            }`}
            aria-label="Back to top"
          >
            Diya Sharma
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="px-4 py-2 text-sm text-stone-600 hover:text-sage-600 rounded-lg hover:bg-sage-100/80 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="mailto:diyaasharma2103@gmail.com"
            className="ml-4 px-5 py-2 text-sm font-medium bg-stone-800 text-ivory-50 rounded-xl hover:bg-sage-600 transition-colors duration-200"
          >
            Hire Me
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-sage-100 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-ivory-50/98 border-b border-stone-200 px-6 pb-6 backdrop-blur-sm">
          <nav className="flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="px-4 py-3 text-sm text-stone-600 hover:text-sage-600 rounded-lg hover:bg-sage-100 transition-all"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:diyaasharma2103@gmail.com"
              className="mt-2 px-5 py-3 text-sm font-medium bg-stone-800 text-ivory-50 rounded-xl text-center hover:bg-sage-600 transition-colors"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
