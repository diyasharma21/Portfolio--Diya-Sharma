import { certifications } from "@/lib/data";
import { Award, Cloud, Code, BarChart3, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  cloud: Cloud,
  code: Code,
  "bar-chart": BarChart3,
  award: Award,
};

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="section-label mb-4">Credentials</p>
          <h2 className="section-heading">Certifications & Achievements</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {certifications.map((cert) => {
            const Icon = iconMap[cert.icon] || Award;
            return (
              <div key={cert.title} className="card p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                <div className="p-3 bg-sage-100 rounded-xl w-fit mb-4">
                  <Icon size={18} className="text-sage-600" />
                </div>
                <p className="font-body font-semibold text-stone-800 text-sm leading-snug mb-2">
                  {cert.title}
                </p>
                <p className="font-mono text-xs text-stone-500 mb-3">{cert.issuer}</p>
                {cert.description && (
                  <p className="text-xs text-stone-500 leading-relaxed">{cert.description}</p>
                )}
                <div className="mt-3">
                  <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-mono border ${
                    cert.type === "badge"
                      ? "bg-teal-100 text-teal-500 border-teal-200"
                      : "bg-ivory-200 text-stone-600 border-stone-200"
                  }`}>
                    {cert.type === "badge" ? "Digital Badge" : "Certificate"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
