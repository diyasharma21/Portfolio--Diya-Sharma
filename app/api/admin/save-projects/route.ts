import { NextRequest, NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const { projects } = await req.json();
    if (!Array.isArray(projects)) {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const dataPath = path.join(process.cwd(), "lib", "data.ts");
    const currentContent = await readFile(dataPath, "utf-8");

    // Serialize projects to TypeScript source
    const projectsTs = JSON.stringify(projects, null, 2)
      // Convert JSON null → TypeScript null (already fine)
      // Make it look like TS object literal
      .replace(/"([a-zA-Z_][a-zA-Z0-9_]*)"\s*:/g, "$1:");

    // Replace the projects array in data.ts
    // Match from `export const projects` to the closing `];`
    const startMarker = "export const projects:";
    const startIdx = currentContent.indexOf(startMarker);
    if (startIdx === -1) {
      return NextResponse.json({ error: "Could not locate projects array in data.ts" }, { status: 500 });
    }

    // Find the matching `];` — count brackets
    let depth = 0;
    let endIdx = -1;
    let inArray = false;
    for (let i = startIdx; i < currentContent.length; i++) {
      const ch = currentContent[i];
      if (ch === "[") { depth++; inArray = true; }
      if (ch === "]") {
        depth--;
        if (inArray && depth === 0) { endIdx = i; break; }
      }
    }

    if (endIdx === -1) {
      return NextResponse.json({ error: "Could not parse projects array boundaries" }, { status: 500 });
    }

    const before = currentContent.slice(0, startIdx);
    const after = currentContent.slice(endIdx + 1);

    const newProjectsBlock = `export const projects: Project[] = ${projectsTs}`;
    const newContent = before + newProjectsBlock + after;

    await writeFile(dataPath, newContent, "utf-8");

    return NextResponse.json({ ok: true, count: projects.length });
  } catch (error) {
    console.error("Save projects error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Save failed" },
      { status: 500 }
    );
  }
}
