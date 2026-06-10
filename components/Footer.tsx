import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 py-14 mt-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Identity */}
          <div>
            <p className="font-display text-2xl text-ivory-100 mb-1.5">Diya Sharma</p>
            <p className="text-xs text-stone-500 tracking-wide">
              Computer Science Engineer &nbsp;·&nbsp; Data Analytics &nbsp;·&nbsp; AI &nbsp;·&nbsp; Full Stack Development
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/diyasharma21"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-ivory-100 transition-colors"
            >
              <Github size={15} /> GitHub
            </a>
            <span className="w-px h-4 bg-stone-700" />
            <a
              href="https://www.linkedin.com/in/diya-sharma-1681b8262"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-ivory-100 transition-colors"
            >
              <Linkedin size={15} /> LinkedIn
            </a>
            <span className="w-px h-4 bg-stone-700" />
            <a
              href="mailto:diyaasharma2103@gmail.com"
              className="flex items-center gap-2 text-sm text-stone-500 hover:text-ivory-100 transition-colors"
            >
              <Mail size={15} /> Email
            </a>
          </div>

          {/* Availability */}
          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-stone-700 text-xs text-stone-400">
            <span className="w-1.5 h-1.5 rounded-full bg-sage-400 animate-pulse" />
            Open to internships &amp; fresher opportunities
          </div>
        </div>

        <div className="border-t border-stone-800 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-stone-700">
          <p>© 2026 Diya Sharma. All rights reserved.</p>
          <p>Built with Next.js · Deployed on Vercel</p>
        </div>
      </div>
    </footer>
  );
}
