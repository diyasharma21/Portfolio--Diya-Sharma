"use client";

import { useState, useRef } from "react";
import { Mail, Phone, Github, Linkedin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { personalInfo } from "@/lib/data";

type ToastState = { type: "success" | "error"; message: string } | null;

export default function ContactSection() {
  const [toast, setToast] = useState<ToastState>(null);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const showToast = (type: "success" | "error", message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    try {
      const res = await fetch("https://formsubmit.co/ajax/diyaasharma2103@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (res.ok) {
        showToast("success", "Message sent successfully.");
        formRef.current?.reset();
      } else {
        showToast("error", "Something went wrong. Please try again.");
      }
    } catch {
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactLinks = [
    {
      icon: Mail,
      label: "Email",
      display: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      external: false,
    },
    {
      icon: Phone,
      label: "Phone",
      display: personalInfo.phone,
      href: `tel:${personalInfo.phone.replace(/\D/g, "")}`,
      external: false,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      display: "linkedin.com/in/diya-sharma",
      href: personalInfo.linkedin,
      external: true,
    },
    {
      icon: Github,
      label: "GitHub",
      display: "github.com/diyasharma21",
      href: personalInfo.github,
      external: true,
    },
  ];

  return (
    <section id="contact" className="py-24">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-lg border text-sm font-body transition-all duration-300 ${
            toast.type === "success"
              ? "bg-white border-sage-200 text-stone-700"
              : "bg-white border-red-200 text-stone-700"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle size={15} className="text-sage-500 shrink-0" />
          ) : (
            <AlertCircle size={15} className="text-red-400 shrink-0" />
          )}
          {toast.message}
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <p className="section-label mb-4">Contact</p>
            <h2 className="section-heading mb-5">
              Let's work<br />
              <em className="text-sage-500 not-italic">together.</em>
            </h2>
            <p className="text-stone-500 leading-relaxed mb-8 max-w-sm text-sm">
              I'm actively looking for Data Analyst, Business Analyst, SDE, and Full Stack
              internship and fresher roles. I'd love to connect.
            </p>

            <div className="space-y-2.5">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 card shadow-sm hover:shadow-md hover:border-sage-200 transition-all group"
                >
                  <div className="p-2.5 bg-sage-100 rounded-xl group-hover:bg-sage-200 transition-colors shrink-0">
                    <item.icon size={15} className="text-sage-600" />
                  </div>
                  <div>
                    <p className="font-mono text-xs text-stone-400">{item.label}</p>
                    <p className="text-sm font-medium text-stone-700 group-hover:text-sage-600 transition-colors">
                      {item.display}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div className="card p-7 shadow-sm">
            <h3 className="font-body font-semibold text-stone-800 mb-1 text-sm">Send a message</h3>
            <p className="text-xs text-stone-400 mb-6">I typically respond within 24 hours.</p>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="_subject" value="New message from Portfolio" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" className="hidden" aria-hidden="true" />

              <div>
                <label className="block font-mono text-xs text-stone-400 mb-1.5 uppercase tracking-wider">Name</label>
                <input
                  type="text" name="name" required placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-ivory-50 text-stone-800 placeholder-stone-300 text-sm focus:outline-none focus:border-sage-300 transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-stone-400 mb-1.5 uppercase tracking-wider">Email</label>
                <input
                  type="email" name="email" required placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-ivory-50 text-stone-800 placeholder-stone-300 text-sm focus:outline-none focus:border-sage-300 transition-colors"
                />
              </div>
              <div>
                <label className="block font-mono text-xs text-stone-400 mb-1.5 uppercase tracking-wider">Message</label>
                <textarea
                  name="message" rows={4} required placeholder="Hi Diya, I'd like to connect about..."
                  className="w-full px-4 py-2.5 rounded-xl border border-stone-200 bg-ivory-50 text-stone-800 placeholder-stone-300 text-sm focus:outline-none focus:border-sage-300 transition-colors resize-none"
                />
              </div>
              <button
                type="submit" disabled={loading}
                className="w-full btn-primary justify-center py-3 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? <><Loader2 size={14} className="animate-spin" /> Sending…</> : <><Send size={14} /> Send Message</>}
              </button>
            </form>
            <p className="mt-4 text-xs text-stone-400 text-center">
              Or email at{" "}
              <a href={`mailto:${personalInfo.email}`} className="text-sage-500 hover:underline">
                {personalInfo.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
