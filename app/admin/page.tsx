"use client";

import { useState, useEffect } from "react";
import {
  Github, Plus, Trash2, GripVertical, Loader2, CheckCircle,
  AlertCircle, Lock, Eye, EyeOff, ArrowLeft, RefreshCw, X,
  ExternalLink, ChevronDown, ChevronUp,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type Category = "analytics" | "fullstack" | "both";

interface ProjectDraft {
  id: string;
  title: string;
  subtitle: string;
  category: Category;
  timeline: string;
  stack: string[];
  summary: string;
  problem: string;
  highlights: string[];
  architecture: string;
  challenges: string;
  learnings: string;
  github: string;
  demo: string | null;
  demoLabel?: string;
  color: string;
  accent: string;
}

const COLORS = [
  { color: "bg-sage-100", accent: "#6B8E6A" },
  { color: "bg-teal-100", accent: "#3D7D7A" },
  { color: "bg-ivory-200", accent: "#8FA98B" },
];

const ACCENT_POOL = ["#6B8E6A", "#3D7D7A", "#8FA98B", "#4E6E4D", "#5E9B97"];

// ─── Auth Screen ─────────────────────────────────────────────────────────────
function AuthScreen({ onAuth }: { onAuth: () => void }) {
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);

  const attempt = () => {
    if (password === (process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "diya2026admin")) {
      sessionStorage.setItem("portfolio_admin", "1");
      onAuth();
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="card p-8 shadow-sm">
          <div className="p-4 bg-stone-800 rounded-2xl w-fit mb-6">
            <Lock size={20} className="text-ivory-50" />
          </div>
          <h1 className="font-display text-2xl font-light text-stone-800 mb-1">Admin Access</h1>
          <p className="text-xs text-stone-400 font-mono mb-6">Portfolio Project Manager</p>

          <div className="space-y-4">
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && attempt()}
                placeholder="Enter admin password"
                className={`w-full px-4 py-3 pr-10 rounded-xl border text-sm bg-ivory-50 text-stone-800 placeholder-stone-400 focus:outline-none transition-colors ${
                  error ? "border-red-300 focus:border-red-400" : "border-stone-200 focus:border-sage-400"
                }`}
              />
              <button
                type="button"
                onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                {show ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            {error && (
              <p className="text-xs text-red-500 font-mono flex items-center gap-1.5">
                <AlertCircle size={12} /> Incorrect password
              </p>
            )}
            <button onClick={attempt} className="btn-primary w-full justify-center py-3">
              Unlock Panel
            </button>
          </div>
        </div>
        <p className="text-center text-xs text-stone-400 mt-4">
          This page is not linked from the public portfolio.
        </p>
      </div>
    </div>
  );
}

// ─── Project Editor Modal ─────────────────────────────────────────────────────
function ProjectEditor({
  draft,
  onSave,
  onClose,
}: {
  draft: ProjectDraft;
  onSave: (p: ProjectDraft) => void;
  onClose: () => void;
}) {
  const [p, setP] = useState<ProjectDraft>(draft);
  const [stackInput, setStackInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");

  const field = (key: keyof ProjectDraft) => ({
    value: p[key] as string,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setP({ ...p, [key]: e.target.value }),
  });

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 pt-16">
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mb-16"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="font-body font-semibold text-stone-800">Edit Project Details</h2>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-stone-100 text-stone-400">
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          {/* Core fields */}
          {[
            { label: "Title", key: "title" as const },
            { label: "Subtitle", key: "subtitle" as const },
            { label: "Timeline", key: "timeline" as const },
            { label: "GitHub URL", key: "github" as const },
            { label: "Live Demo URL (or leave blank)", key: "demo" as const },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="section-label block mb-1.5">{label}</label>
              <input
                {...field(key)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-ivory-50 text-sm focus:outline-none focus:border-sage-400 transition-colors"
              />
            </div>
          ))}

          {/* Category */}
          <div>
            <label className="section-label block mb-1.5">Category</label>
            <select
              value={p.category}
              onChange={(e) => setP({ ...p, category: e.target.value as Category })}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-ivory-50 text-sm focus:outline-none focus:border-sage-400"
            >
              <option value="analytics">Data & Analytics</option>
              <option value="fullstack">Full Stack</option>
              <option value="both">Both</option>
            </select>
          </div>

          {/* Summary */}
          <div>
            <label className="section-label block mb-1.5">Summary</label>
            <textarea {...field("summary")} rows={3}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-ivory-50 text-sm focus:outline-none focus:border-sage-400 resize-none" />
          </div>

          {/* Problem */}
          <div>
            <label className="section-label block mb-1.5">Problem Statement</label>
            <textarea {...field("problem")} rows={2}
              className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-ivory-50 text-sm focus:outline-none focus:border-sage-400 resize-none" />
          </div>

          {/* Tech stack */}
          <div>
            <label className="section-label block mb-1.5">Tech Stack</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {p.stack.map((s) => (
                <span key={s} className="tag flex items-center gap-1">
                  {s}
                  <button onClick={() => setP({ ...p, stack: p.stack.filter((x) => x !== s) })}>
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={stackInput}
                onChange={(e) => setStackInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && stackInput.trim()) {
                    setP({ ...p, stack: [...p.stack, stackInput.trim()] });
                    setStackInput("");
                  }
                }}
                placeholder="Type tech and press Enter"
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 bg-ivory-50 text-sm focus:outline-none focus:border-sage-400"
              />
            </div>
          </div>

          {/* Highlights */}
          <div>
            <label className="section-label block mb-1.5">Key Highlights</label>
            <div className="space-y-2 mb-2">
              {p.highlights.map((h, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <span className="text-sage-400 mt-2 text-xs">•</span>
                  <input
                    value={h}
                    onChange={(e) => {
                      const hl = [...p.highlights];
                      hl[i] = e.target.value;
                      setP({ ...p, highlights: hl });
                    }}
                    className="flex-1 px-3 py-2 rounded-xl border border-stone-200 bg-ivory-50 text-sm focus:outline-none focus:border-sage-400"
                  />
                  <button onClick={() => setP({ ...p, highlights: p.highlights.filter((_, j) => j !== i) })}
                    className="mt-2 text-stone-400 hover:text-red-400 transition-colors">
                    <X size={13} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                value={highlightInput}
                onChange={(e) => setHighlightInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && highlightInput.trim()) {
                    setP({ ...p, highlights: [...p.highlights, highlightInput.trim()] });
                    setHighlightInput("");
                  }
                }}
                placeholder="Add a highlight and press Enter"
                className="flex-1 px-3 py-2 rounded-xl border border-stone-200 bg-ivory-50 text-sm focus:outline-none focus:border-sage-400"
              />
            </div>
          </div>

          {/* Architecture / Challenges / Learnings */}
          {[
            { label: "Architecture", key: "architecture" as const },
            { label: "Challenges", key: "challenges" as const },
            { label: "Learnings", key: "learnings" as const },
          ].map(({ label, key }) => (
            <div key={key}>
              <label className="section-label block mb-1.5">{label}</label>
              <textarea {...field(key)} rows={2}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-ivory-50 text-sm focus:outline-none focus:border-sage-400 resize-none" />
            </div>
          ))}

          {/* Color picker */}
          <div>
            <label className="section-label block mb-2">Card Color</label>
            <div className="flex gap-3">
              {COLORS.map((c) => (
                <button
                  key={c.color}
                  onClick={() => setP({ ...p, color: c.color, accent: c.accent })}
                  className={`w-10 h-10 rounded-xl border-2 transition-all ${c.color} ${
                    p.color === c.color ? "border-stone-600 scale-110" : "border-stone-200"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 px-6 py-4 border-t border-stone-100">
          <button onClick={onClose} className="btn-outline flex-1 justify-center">Cancel</button>
          <button onClick={() => onSave(p)} className="btn-primary flex-1 justify-center">
            Save Project
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Admin Panel ─────────────────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [projects, setProjects] = useState<ProjectDraft[]>([]);
  const [githubUrl, setGithubUrl] = useState("");
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [editingProject, setEditingProject] = useState<ProjectDraft | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  // Auth check
  useEffect(() => {
    if (sessionStorage.getItem("portfolio_admin") === "1") setAuthed(true);
  }, []);

  // Load current projects from API
  useEffect(() => {
    if (!authed) return;
    fetch("/api/admin/projects")
      .then((r) => r.json())
      .then((d) => setProjects(d.projects || []))
      .catch(() => {});
  }, [authed]);

  // ── Fetch from GitHub ──
  const fetchFromGitHub = async () => {
    if (!githubUrl.trim()) return;
    setFetching(true);
    setFetchError("");

    try {
      const res = await fetch("/api/admin/fetch-github", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: githubUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Fetch failed");

      const colorIdx = projects.length % COLORS.length;
      const draft: ProjectDraft = {
        id: data.id,
        title: data.title,
        subtitle: data.subtitle,
        category: data.category,
        timeline: data.timeline,
        stack: data.stack,
        summary: data.summary,
        problem: data.problem,
        highlights: data.highlights,
        architecture: data.architecture,
        challenges: data.challenges,
        learnings: data.learnings,
        github: data.github,
        demo: data.demo,
        color: COLORS[colorIdx].color,
        accent: COLORS[colorIdx].accent,
      };

      setEditingProject(draft);
      setGithubUrl("");
    } catch (e: unknown) {
      setFetchError(e instanceof Error ? e.message : "Failed to fetch repo");
    } finally {
      setFetching(false);
    }
  };

  // ── Save a project (new or edit) ──
  const saveProject = (p: ProjectDraft) => {
    const exists = projects.find((x) => x.id === p.id);
    const updated = exists
      ? projects.map((x) => (x.id === p.id ? p : x))
      : [...projects, p];
    setProjects(updated);
    setEditingProject(null);
  };

  // ── Delete project ──
  const deleteProject = (id: string) => {
    if (!confirm("Remove this project from the portfolio?")) return;
    setProjects(projects.filter((p) => p.id !== id));
  };

  // ── Drag reorder ──
  const moveUp = (i: number) => {
    if (i === 0) return;
    const arr = [...projects];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    setProjects(arr);
  };
  const moveDown = (i: number) => {
    if (i === projects.length - 1) return;
    const arr = [...projects];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    setProjects(arr);
  };

  // ── Save to data.ts ──
  const publishChanges = async () => {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/save-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projects }),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      alert("Save failed. Check console.");
    } finally {
      setSaving(false);
    }
  };

  if (!authed) return <AuthScreen onAuth={() => setAuthed(true)} />;

  return (
    <div className="min-h-screen bg-ivory-50 pt-20 pb-24">
      {editingProject && (
        <ProjectEditor
          draft={editingProject}
          onSave={saveProject}
          onClose={() => setEditingProject(null)}
        />
      )}

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <a href="/" className="inline-flex items-center gap-1.5 text-xs text-stone-400 hover:text-stone-600 transition-colors mb-3">
              <ArrowLeft size={13} /> Back to portfolio
            </a>
            <h1 className="font-display text-3xl font-light text-stone-800">Project Manager</h1>
            <p className="text-xs text-stone-400 font-mono mt-1">Admin · Hidden from public</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-stone-500">
              {projects.length} project{projects.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={publishChanges}
              disabled={saving}
              className="btn-primary gap-2"
            >
              {saving ? (
                <><Loader2 size={14} className="animate-spin" /> Saving…</>
              ) : saved ? (
                <><CheckCircle size={14} /> Saved!</>
              ) : (
                "Publish Changes"
              )}
            </button>
          </div>
        </div>

        {/* GitHub Import */}
        <div className="card p-6 shadow-sm mb-8">
          <p className="section-label mb-4">Add Project from GitHub</p>
          <p className="text-sm text-stone-500 mb-4 leading-relaxed">
            Paste a GitHub repo URL. Claude AI will fetch the README, extract the tech stack, 
            and generate a professional recruiter-friendly project summary automatically.
          </p>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Github size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchFromGitHub()}
                placeholder="https://github.com/diyasharma21/my-new-project"
                className="w-full pl-9 pr-4 py-3 rounded-xl border border-stone-200 bg-ivory-50 text-sm focus:outline-none focus:border-sage-400 transition-colors"
              />
            </div>
            <button
              onClick={fetchFromGitHub}
              disabled={fetching || !githubUrl.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {fetching ? (
                <><Loader2 size={14} className="animate-spin" /> Fetching…</>
              ) : (
                <><Plus size={14} /> Auto-Fill</>
              )}
            </button>
          </div>
          {fetchError && (
            <p className="mt-3 text-xs text-red-500 font-mono flex items-center gap-1.5">
              <AlertCircle size={12} /> {fetchError}
            </p>
          )}
          <p className="mt-3 text-xs text-stone-400 font-mono">
            Works with public GitHub repos · AI fills in all fields · You review & edit before saving
          </p>
        </div>

        {/* Projects List */}
        <div className="space-y-3">
          <p className="section-label mb-2">Current Projects ({projects.length})</p>

          {projects.length === 0 && (
            <div className="card p-12 text-center shadow-sm">
              <p className="text-stone-400 text-sm">No projects yet. Add one above.</p>
            </div>
          )}

          {projects.map((project, i) => (
            <div key={project.id} className={`card shadow-sm overflow-hidden ${project.color}`}>
              <div className="flex items-center gap-3 px-5 py-4">
                {/* Order controls */}
                <div className="flex flex-col gap-0.5 shrink-0">
                  <button onClick={() => moveUp(i)} disabled={i === 0}
                    className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30 transition-colors">
                    <ChevronUp size={14} />
                  </button>
                  <button onClick={() => moveDown(i)} disabled={i === projects.length - 1}
                    className="p-1 text-stone-400 hover:text-stone-700 disabled:opacity-30 transition-colors">
                    <ChevronDown size={14} />
                  </button>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-body font-semibold text-stone-800">{project.title}</p>
                    <span className="px-2 py-0.5 rounded-full text-xs font-mono border border-stone-200 bg-white/60 text-stone-500">
                      {project.category}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5 truncate">{project.subtitle}</p>
                </div>

                {/* Stack preview */}
                <div className="hidden md:flex gap-1.5 flex-wrap max-w-xs">
                  {project.stack.slice(0, 3).map((s) => (
                    <span key={s} className="tag text-xs">{s}</span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="tag text-xs">+{project.stack.length - 3}</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer"
                      className="p-2 rounded-lg hover:bg-white/60 text-stone-400 hover:text-stone-700 transition-colors">
                      <ExternalLink size={14} />
                    </a>
                  )}
                  <button
                    onClick={() => setExpanded(expanded === project.id ? null : project.id)}
                    className="p-2 rounded-lg hover:bg-white/60 text-stone-400 hover:text-stone-700 transition-colors"
                    title="Expand"
                  >
                    <GripVertical size={14} />
                  </button>
                  <button
                    onClick={() => setEditingProject(project)}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium bg-white/80 text-stone-700 hover:bg-white transition-colors border border-stone-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Expanded preview */}
              {expanded === project.id && (
                <div className="px-5 pb-5 pt-0 border-t border-stone-200/50 bg-white/40 text-sm text-stone-600 space-y-2">
                  <p className="text-xs font-mono text-stone-400 pt-3">Summary</p>
                  <p className="leading-relaxed">{project.summary}</p>
                  <p className="text-xs font-mono text-stone-400 pt-2">Highlights</p>
                  <ul className="space-y-1">
                    {project.highlights.map((h, j) => (
                      <li key={j} className="flex gap-2"><span className="text-sage-400 shrink-0">•</span>{h}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Publish reminder */}
        {projects.length > 0 && (
          <div className="mt-8 p-4 rounded-2xl border border-sage-200 bg-sage-50 flex items-start gap-3">
            <RefreshCw size={15} className="text-sage-500 mt-0.5 shrink-0" />
            <div className="text-xs text-stone-600 leading-relaxed">
              <strong className="text-stone-800">Click "Publish Changes"</strong> to write updates to{" "}
              <code className="font-mono bg-white px-1.5 py-0.5 rounded border border-stone-200">lib/data.ts</code> and 
              rebuild the portfolio. Changes go live on the next Vercel deployment.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
