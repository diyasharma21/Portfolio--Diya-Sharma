import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/lib/data";
import { ArrowLeft, Github, ExternalLink, Clock, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = projects.find((p) => p.id === params.id);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} | Diya Sharma`,
    description: project.summary,
  };
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  const project = projects.find((p) => p.id === params.id);
  if (!project) notFound();

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <div className={`${project.color} py-16`}>
        <div className="max-w-4xl mx-auto px-6">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-800 transition-colors mb-8"
          >
            <ArrowLeft size={15} /> Back to Projects
          </Link>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="font-mono text-xs text-stone-500 tracking-wider mb-2">{project.timeline}</p>
              <h1 className="font-display text-4xl md:text-5xl font-light text-stone-800 mb-2">
                {project.title}
              </h1>
              <p className="font-body text-lg text-stone-600 italic">{project.subtitle}</p>
            </div>

            {/* CTA buttons */}
            <div className="flex gap-3 flex-wrap">
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Github size={15} /> View on GitHub
              </a>
              {project.demo ? (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary"
                >
                  <ExternalLink size={15} /> Live Demo
                </a>
              ) : (
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-stone-200 text-stone-400 text-sm cursor-not-allowed">
                  <Clock size={15} /> Demo Coming Soon
                </span>
              )}
            </div>
          </div>

          {/* Stack */}
          <div className="flex flex-wrap gap-2 mt-6">
            {project.stack.map((s) => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 space-y-12">
        {/* Summary */}
        <section>
          <h2 className="font-display text-2xl font-light text-stone-800 mb-4">Overview</h2>
          <p className="text-stone-600 leading-relaxed text-lg">{project.summary}</p>
        </section>

        {/* Problem */}
        <section className="card p-8 shadow-sm">
          <h2 className="font-display text-2xl font-light text-stone-800 mb-4">Problem Statement</h2>
          <p className="text-stone-600 leading-relaxed">{project.problem}</p>
        </section>

        {/* Highlights */}
        <section>
          <h2 className="font-display text-2xl font-light text-stone-800 mb-6">Key Highlights</h2>
          <div className="space-y-4">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex gap-4 p-4 bg-white rounded-xl border border-stone-200">
                <CheckCircle2 size={18} className="text-sage-500 mt-0.5 shrink-0" />
                <p className="text-stone-700 leading-relaxed">{h}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section>
          <h2 className="font-display text-2xl font-light text-stone-800 mb-4">Architecture</h2>
          <p className="text-stone-600 leading-relaxed">{project.architecture}</p>
        </section>

        {/* 2-col: Challenges + Learnings */}
        <div className="grid md:grid-cols-2 gap-6">
          <section className="card p-6 shadow-sm">
            <h2 className="font-body font-semibold text-stone-800 mb-3">Challenges</h2>
            <p className="text-stone-500 text-sm leading-relaxed">{project.challenges}</p>
          </section>
          <section className="card p-6 shadow-sm">
            <h2 className="font-body font-semibold text-stone-800 mb-3">Learnings</h2>
            <p className="text-stone-500 text-sm leading-relaxed">{project.learnings}</p>
          </section>
        </div>

        {/* Bottom CTA */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 border-t border-stone-200">
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn-outline flex-1 justify-center">
            <Github size={15} /> View Source Code
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="btn-primary flex-1 justify-center">
              <ExternalLink size={15} /> Open Live Demo
            </a>
          )}
          <Link href="/#projects" className="btn-outline flex-1 justify-center">
            <ArrowLeft size={15} /> All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
