"use client";

import { useState } from "react";
import Link from "next/link";
import { Github, ExternalLink, ArrowRight, Clock } from "lucide-react";
import { projects } from "@/lib/data";

const filters = [
  { label: "All Projects", value: "all" },
  { label: "Data & Analytics", value: "analytics" },
  { label: "Full Stack", value: "fullstack" },
];

export default function ProjectsSection() {
  const [active, setActive] = useState("all");

  const filtered = projects.filter(
    (p) => active === "all" || p.category === active || p.category === "both"
  );

  return (
    <section id="projects" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label mb-4">Projects</p>
            <h2 className="section-heading">Things I've built</h2>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setActive(f.value)}
                className={`px-4 py-2 rounded-xl text-sm font-body transition-all duration-200 ${
                  active === f.value
                    ? "bg-stone-800 text-ivory-50"
                    : "bg-ivory-100 text-stone-600 hover:bg-sage-100 hover:text-sage-600 border border-stone-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="card shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Color banner */}
              <div className={`${project.color} rounded-t-2xl px-6 pt-6 pb-4`}>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="font-mono text-xs text-stone-500 mb-1 tracking-wider">
                      {project.timeline}
                    </p>
                    <h3 className="font-body font-semibold text-stone-800 text-lg leading-tight">
                      {project.title}
                    </h3>
                  </div>
                  <span
                    className="w-3 h-3 rounded-full mt-1 shrink-0"
                    style={{ background: project.accent }}
                  />
                </div>
                <p className="text-xs text-stone-600 mt-1 italic">{project.subtitle}</p>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <p className="text-sm text-stone-600 leading-relaxed mb-4 flex-1">
                  {project.summary}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex items-center gap-1.5 text-sm font-medium text-stone-700 hover:text-sage-600 transition-colors"
                  >
                    Details <ArrowRight size={14} />
                  </Link>

                  <div className="ml-auto flex gap-2">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-stone-100 text-stone-500 hover:text-stone-800 transition-colors"
                      aria-label="GitHub"
                    >
                      <Github size={15} />
                    </a>

                    {project.demo ? (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg hover:bg-sage-100 text-stone-500 hover:text-sage-600 transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink size={15} />
                      </a>
                    ) : (
                      <span
                        className="p-2 rounded-lg text-stone-300 cursor-not-allowed"
                        title={project.demoLabel}
                      >
                        <Clock size={15} />
                      </span>
                    )}
                  </div>
                </div>

                {!project.demo && project.demoLabel && (
                  <p className="mt-2 text-xs text-stone-400 font-mono text-right">
                    Demo {project.demoLabel}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
