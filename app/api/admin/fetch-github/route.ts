import { NextRequest, NextResponse } from "next/server";

// Parse GitHub URL → owner/repo
function parseGitHubUrl(url: string): { owner: string; repo: string } | null {
  try {
    const u = new URL(url.trim());
    if (!u.hostname.includes("github.com")) return null;
    const parts = u.pathname.replace(/^\//, "").replace(/\/$/, "").split("/");
    if (parts.length < 2) return null;
    return { owner: parts[0], repo: parts[1] };
  } catch {
    return null;
  }
}

// Fetch README from GitHub API
async function fetchReadme(owner: string, repo: string): Promise<string> {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/readme`, {
    headers: { Accept: "application/vnd.github.raw+json" },
    next: { revalidate: 0 },
  });
  if (!res.ok) return "";
  return res.text();
}

// Fetch repo info
async function fetchRepoInfo(owner: string, repo: string) {
  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) return null;
  return res.json();
}

// Call Anthropic to summarize into portfolio format
async function aiSummarize(repoInfo: Record<string, unknown>, readme: string, githubUrl: string) {
  const prompt = `You are a portfolio content writer helping a Computer Science fresher (Diya Sharma, graduating 2026, VIT Bhopal) build a professional portfolio.

I will give you a GitHub repository's details. Your job is to extract and format the project into a structured JSON object suitable for a portfolio website project card.

Repository URL: ${githubUrl}
Repository name: ${repoInfo.name}
Repository description: ${repoInfo.description || "Not provided"}
Primary language: ${repoInfo.language || "Not specified"}
Topics/tags: ${(repoInfo.topics as string[] || []).join(", ") || "None"}
Stars: ${repoInfo.stargazers_count}
Homepage/Demo URL: ${repoInfo.homepage || ""}

README content (truncated to 3000 chars):
${readme.slice(0, 3000)}

Based on the above, create a JSON object with these exact keys. Be concise, recruiter-friendly, and professional. Do NOT exaggerate or invent metrics.

{
  "title": "Clean project name (2-5 words)",
  "subtitle": "One-line description of what it does (max 10 words)",
  "category": "analytics" | "fullstack" | "both",
  "timeline": "Month Year or Month Year – Month Year",
  "stack": ["list", "of", "technologies", "used"],
  "summary": "2-3 sentence professional summary. What it does, why it matters, key capability.",
  "problem": "1-2 sentences: what problem does this solve?",
  "highlights": ["Achievement 1 with specific detail", "Achievement 2 with specific detail", "Achievement 3 with specific detail"],
  "architecture": "1-2 sentences describing the technical architecture.",
  "challenges": "1 sentence on the main technical challenge.",
  "learnings": "1 sentence on key learning from building this.",
  "demo": "live demo URL or null if not available"
}

Return ONLY the JSON object, no markdown fences, no preamble.`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.ANTHROPIC_API_KEY || "",
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1000,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) throw new Error("AI summarization failed");
  const data = await response.json();
  const text = data.content?.[0]?.text || "{}";

  // Strip any accidental markdown fences
  const clean = text.replace(/```json|```/g, "").trim();
  return JSON.parse(clean);
}

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) return NextResponse.json({ error: "GitHub URL required" }, { status: 400 });

    const parsed = parseGitHubUrl(url);
    if (!parsed) return NextResponse.json({ error: "Invalid GitHub URL" }, { status: 400 });

    const { owner, repo } = parsed;

    // Fetch in parallel
    const [repoInfo, readme] = await Promise.all([
      fetchRepoInfo(owner, repo),
      fetchReadme(owner, repo),
    ]);

    if (!repoInfo) {
      return NextResponse.json({ error: "Repository not found or is private" }, { status: 404 });
    }

    // AI summarize
    const aiData = await aiSummarize(repoInfo, readme, url);

    // Build the final project object
    const id = repo
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const project = {
      id,
      title: aiData.title || repoInfo.name,
      subtitle: aiData.subtitle || repoInfo.description || "",
      category: aiData.category || "fullstack",
      timeline: aiData.timeline || new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      stack: Array.isArray(aiData.stack) ? aiData.stack : [],
      summary: aiData.summary || "",
      problem: aiData.problem || "",
      highlights: Array.isArray(aiData.highlights) ? aiData.highlights : [],
      architecture: aiData.architecture || "",
      challenges: aiData.challenges || "",
      learnings: aiData.learnings || "",
      github: url,
      demo: aiData.demo || repoInfo.homepage || null,
    };

    return NextResponse.json(project);
  } catch (error) {
    console.error("GitHub fetch error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch repository" },
      { status: 500 }
    );
  }
}
