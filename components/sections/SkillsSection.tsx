import { skills } from "@/lib/data";

const categoryColors: Record<string, string> = {
  "Programming Languages": "bg-stone-100 text-stone-700 border-stone-200",
  "Frontend": "bg-teal-100 text-teal-500 border-teal-200",
  "Backend & Database": "bg-sage-100 text-sage-600 border-sage-200",
  "Data Analytics": "bg-ivory-200 text-stone-700 border-stone-200",
  "Data Visualization": "bg-teal-100 text-teal-500 border-teal-200",
  "AI / ML": "bg-sage-100 text-sage-600 border-sage-200",
  "Cloud & DevOps": "bg-stone-100 text-stone-700 border-stone-200",
  "Core CS": "bg-ivory-200 text-stone-700 border-stone-200",
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Technical Skills</p>
          <h2 className="section-heading">
            Technical Expertise
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="card p-5 shadow-sm hover:shadow-md transition-shadow">
              <p className="font-mono text-xs text-stone-500 tracking-wider uppercase mb-4">
                {category}
              </p>
              <div className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill}
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-mono border ${
                      categoryColors[category] || "bg-ivory-100 text-stone-600 border-stone-200"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
