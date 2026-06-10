import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Diya Sharma | Portfolio",
  description:
    "Computer Science Engineer specialising in Data Analytics, AI, and Full Stack Development. VIT Bhopal, graduating 2026.",
  keywords: [
    "Diya Sharma",
    "Data Analyst",
    "Software Engineer",
    "Full Stack Developer",
    "AI",
    "Python",
    "React",
    "Next.js",
    "VIT Bhopal",
    "Portfolio",
  ],
  authors: [{ name: "Diya Sharma" }],
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Diya Sharma | Portfolio",
    description:
      "Computer Science Engineer specialising in Data Analytics, AI, and Full Stack Development.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body bg-ivory-50 text-stone-800 antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
