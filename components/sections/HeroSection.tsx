"use client";

import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail, Phone } from "lucide-react";
import { personalInfo, projects } from "@/lib/data";

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-16 relative overflow-hidden">
      {/* Subtle radial wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 60% 50% at 15% 85%, rgba(175,200,171,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 85% 15%, rgba(140,186,182,0.15) 0%, transparent 60%)
          `,
        }}
      />

      <div className="max-w-6xl mx-auto px-6 py-20 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── Left ── */}
          <div className="space-y-7">
            <div className="flex items-center gap-3">
              <span className="w-6 h-px bg-sage-400" />
              <span className="section-label">Computer Science Engineer</span>
            </div>

            <div>
              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-stone-800 leading-[1.05] mb-3">
                {personalInfo.name}
              </h1>
              <p className="font-display text-xl md:text-2xl font-light text-sage-500 mb-5">
                {personalInfo.tagline}
              </p>
              <p className="text-base text-stone-500 leading-relaxed max-w-lg">
                {personalInfo.headline}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-2.5">
              <a href="#projects" className="btn-primary">View Projects</a>
              <a href="#resume" className="btn-outline">Download Resume</a>
              <a href="#contact" className="btn-outline">Get in Touch</a>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-4 flex-wrap">
              {[
                { icon: Github, label: "GitHub", href: personalInfo.github, external: true },
                { icon: Linkedin, label: "LinkedIn", href: personalInfo.linkedin, external: true },
                { icon: Mail, label: "Email", href: `mailto:${personalInfo.email}`, external: false },
                { icon: Phone, label: "Call", href: `tel:${personalInfo.phone.replace(/\D/g,"")}`, external: false },
              ].map((item, i, arr) => (
                <span key={item.label} className="flex items-center gap-4">
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-1.5 text-sm text-stone-400 hover:text-sage-600 transition-colors"
                  >
                    <item.icon size={14} />
                    <span className="font-mono">{item.label}</span>
                  </a>
                  {i < arr.length - 1 && <span className="w-px h-3.5 bg-stone-200" />}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right ── */}
          <div className="flex flex-col items-center lg:items-end gap-7">
            {/* Photo */}
            <div className="relative">
              <div className="w-60 h-60 md:w-68 md:h-68 lg:w-72 lg:h-72 rounded-3xl overflow-hidden shadow-xl"
                style={{ border: "1.5px solid var(--sage-200)" }}>
                <Image
                  src="/images/diya.jpg"
                  alt="Diya Sharma"
                  width={288} height={288}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl px-4 py-2.5 shadow-md"
                style={{ border: "1px solid var(--stone-200)" }}>
                <p className="font-mono text-xs text-stone-400 mb-0.5">Open to</p>
                <p className="text-sm font-semibold text-sage-600">Internships & Roles</p>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 w-full max-w-xs">
              {[
                { value: String(projects.length), label: "Projects" },
                { value: "8.09", label: "CGPA" },
                { value: "5+", label: "AWS Badges" },
              ].map((s) => (
                <div key={s.label} className="card p-3.5 text-center">
                  <p className="font-display text-2xl font-medium text-stone-800">{s.value}</p>
                  <p className="font-mono text-xs text-stone-400 mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-stone-300">
          <span className="font-mono text-xs tracking-widest">SCROLL</span>
          <ArrowDown size={13} className="animate-bounce" />
        </div>
      </div>
    </section>
  );
}
