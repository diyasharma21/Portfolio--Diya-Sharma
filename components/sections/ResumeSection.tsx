import { Download, BarChart3, Code } from "lucide-react";

const resumes = [
  {
    id: "analytics",
    label: "Data Analytics Resume",
    subtitle: "Data Analyst · Business Analyst · Analytics Intern",
    icon: BarChart3,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-500",
    hoverBorder: "hover:border-teal-200",
    btnHover: "hover:bg-teal-500",
    file: "/resumes/Diya_Sharma_Data_Analyst_Resume.pdf",
    filename: "Diya_Sharma_Data_Analyst_Resume.pdf",
  },
  {
    id: "sde",
    label: "Software Development Resume",
    subtitle: "SDE · Full Stack · Software Engineering",
    icon: Code,
    iconBg: "bg-sage-100",
    iconColor: "text-sage-600",
    hoverBorder: "hover:border-sage-200",
    btnHover: "hover:bg-sage-600",
    file: "/resumes/Diya_Sharma_Resume.pdf",
    filename: "Diya_Sharma_Resume.pdf",
  },
];

export default function ResumeSection() {
  return (
    <section id="resume" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Resume</p>
          <h2 className="section-heading">Download My Resume</h2>
          <p className="text-stone-400 mt-3 max-w-sm mx-auto text-sm leading-relaxed">
            Two tailored versions — analytics roles and software engineering roles.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
          {resumes.map((r) => {
            const Icon = r.icon;
            return (
              <div
                key={r.id}
                className={`card p-7 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${r.hoverBorder}`}
              >
                <div className={`p-3.5 ${r.iconBg} rounded-xl w-fit mb-5`}>
                  <Icon size={20} className={r.iconColor} />
                </div>
                <h3 className="font-body font-semibold text-stone-800 text-sm mb-1">
                  {r.label}
                </h3>
                <p className="text-xs text-stone-400 font-mono mb-6 leading-relaxed">
                  {r.subtitle}
                </p>
                <a
                  href={r.file}
                  download={r.filename}
                  className={`flex items-center gap-2 w-full px-5 py-3 text-sm font-medium bg-stone-800 text-ivory-50 rounded-xl ${r.btnHover} transition-colors justify-center`}
                >
                  <Download size={14} /> Download Resume
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
