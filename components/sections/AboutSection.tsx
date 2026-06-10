import { personalInfo } from "@/lib/data";
import { GraduationCap, Calendar } from "lucide-react";

const snapshot = [
  { label: "Computer Science Engineer", sub: "Vellore Institute of Technology, 2026" },
  { label: "Data Analytics + BI", sub: "KPI dashboards · churn models · ML pipelines" },
  { label: "Full Stack Development", sub: "React · Next.js · Node.js · PostgreSQL" },
  { label: "AI / LLM Integration", sub: "Gemini API · Generative AI · Prompt Engineering" },
  { label: "Cloud Fundamentals", sub: "AWS EC2 · S3 · IAM · CloudWatch" },
];

const exploring = [
  "Advanced Data Analytics & BI",
  "Full Stack Engineering",
  "AI & LLM Integrations",
  "Data Structures & Algorithms",
];

export default function AboutSection() {
  const { education } = personalInfo;

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="section-label mb-4">About Me</p>
            <h2 className="section-heading mb-8">
              Building things that<br />
              <em className="text-sage-500 not-italic">actually matter.</em>
            </h2>
            <div className="space-y-4 text-stone-600 leading-relaxed">
              <p>
                I'm a Computer Science undergraduate at Vellore Institute of Technology, graduating in 2026,
                with hands-on experience across two complementary tracks:{" "}
                <strong className="text-stone-800 font-medium">Data Analytics & Business Intelligence</strong>{" "}
                and{" "}
                <strong className="text-stone-800 font-medium">Full Stack & AI-Integrated Development</strong>.
              </p>
              <p>
                On the analytics side, I build dashboards and ML pipelines that translate raw datasets into
                decisions — KPI tracking, churn modelling, revenue simulation. On the engineering side, I
                build production-ready web platforms with React, Next.js, and AI APIs.
              </p>
              <p>
                What ties both together is a bias toward clean systems, honest data, and outcomes that can
                be measured. I'm looking for roles where I can contribute to both analysis and product.
              </p>
            </div>

            {/* Currently Exploring */}
            <div className="mt-8 p-5 rounded-2xl border border-stone-100 bg-ivory-50">
              <p className="section-label mb-3">Currently Exploring</p>
              <div className="flex flex-wrap gap-2">
                {exploring.map((item) => (
                  <span key={item} className="px-3 py-1.5 text-xs font-mono bg-white border border-stone-200 text-stone-600 rounded-lg">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-5">
            {/* Education card */}
            <div className="card p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-sage-100 rounded-xl shrink-0">
                  <GraduationCap size={18} className="text-sage-600" />
                </div>
                <div className="flex-1">
                  <p className="section-label mb-2">Education</p>
                  <h3 className="font-body font-semibold text-stone-800 mb-0.5">{education.degree}</h3>
                  <p className="text-stone-500 text-sm mb-3">{education.university}</p>
                  <div className="flex flex-wrap gap-3">
                    <span className="flex items-center gap-1.5 text-xs text-stone-400">
                      <Calendar size={12} /> {education.duration}
                    </span>
                    <span className="font-mono text-xs text-stone-400 bg-ivory-100 px-2 py-0.5 rounded border border-stone-200">
                      CGPA {education.cgpa}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Snapshot */}
            <div className="card p-6 shadow-sm">
              <p className="section-label mb-4">Quick Snapshot</p>
              <div className="space-y-2">
                {snapshot.map((item) => (
                  <div key={item.label} className="flex gap-3 py-2 px-3 rounded-xl hover:bg-ivory-100 transition-colors">
                    <div className="w-1 h-1 rounded-full bg-sage-400 mt-2 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-stone-800">{item.label}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
