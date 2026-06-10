export const personalInfo = {
  name: "Diya Sharma",
  title: "Computer Science Engineer",
  tagline: "Data Analytics · AI · Full Stack Development",
  headline: "Turning data into decisions, and ideas into products.",
  bio: "I'm a Computer Science undergraduate at Vellore Institute of Technology, graduating 2026 with a strong foundation in data analytics and full-stack development. I build end-to-end systems — from ML-powered dashboards that surface business insights to AI-integrated web platforms that solve real problems. I care deeply about clean architecture, honest data, and products people actually want to use.",
  email: "diyaasharma2103@gmail.com",
  phone: "+91-6264959153",
  github: "https://github.com/diyasharma21",
  linkedin: "https://www.linkedin.com/in/diya-sharma-1681b8262",
  location: "Bhopal, India",
  education: {
    university: "Vellore Institute of Technology",
    location: "Bhopal, India",
    degree: "B.Tech in Computer Science and Engineering",
    duration: "Oct 2022 – Oct 2026",
    cgpa: "8.09",
  },
};

export const skills = {
  "Programming Languages": ["Python", "Java", "JavaScript", "SQL", "HTML", "CSS"],
  "Frontend": ["React.js", "Next.js", "Tailwind CSS"],
  "Backend & Database": ["Node.js", "MySQL", "PostgreSQL", "REST APIs"],
  "Data Analytics": ["Pandas", "NumPy", "EDA", "KPI Analysis", "Data Cleaning", "Predictive Analytics"],
  "Data Visualization": ["Power BI", "Tableau", "Plotly", "Streamlit"],
  "AI / ML": ["Generative AI", "LLM API Integration", "Prompt Engineering", "Scikit-Learn"],
  "Cloud & DevOps": ["AWS EC2", "AWS S3", "AWS IAM", "CloudWatch", "Git", "GitHub"],
  "Core CS": ["Data Structures & Algorithms", "OOP", "DBMS", "Operating Systems", "Computer Networks"],
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  category: "analytics" | "fullstack" | "both";
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
};

export const projects: Project[] = [
  {
    id: "spotify-pulse",
    title: "Spotify Pulse Analytics",
    subtitle: "AI-Powered Music Intelligence Dashboard",
    category: "analytics",
    timeline: "June 2026",
    stack: ["Python", "SQL", "Pandas", "Scikit-Learn", "Streamlit", "Plotly"],
    summary:
      "An ML-powered analytics platform that predicts song popularity and surfaces music trends across 10,000+ tracks via interactive executive-grade KPI dashboards.",
    problem:
      "Music labels and artists struggle to identify hit potential early. Raw streaming data is voluminous and hard to interpret without specialized tooling.",
    highlights: [
      "ML pipeline with Scikit-Learn predicting song popularity at 87% accuracy across 10,000+ track records",
      "Interactive KPI dashboards with real-time filtering by artist, genre, and tempo — reducing data exploration time by 65%",
      "Predictive analytics outputs delivered as executive-grade BI visualizations with CSV export for downstream business reporting",
    ],
    architecture:
      "Streamlit single-page app with a Scikit-Learn prediction layer, SQL-backed data store, and Plotly chart components for real-time filtering and visualization.",
    challenges:
      "Balancing model accuracy against interpretability for non-technical stakeholders, and designing a dashboard layout that communicates both raw metrics and predicted outcomes clearly.",
    learnings:
      "End-to-end ML pipeline integration with a live dashboard, translating model outputs into stakeholder-friendly business narratives.",
    github: "https://github.com/diyasharma21/spotify-pulse-analytics",
    demo: "https://spotify-pulse-analytics.streamlit.app/",
    color: "bg-sage-100",
    accent: "#6B8E6A",
  },
  {
    id: "apex-dashboard",
    title: "Apex Revenue Assurance Dashboard",
    subtitle: "Telecom Customer Churn & Revenue Intelligence",
    category: "analytics",
    timeline: "May 2026",
    stack: ["Python", "SQL", "Streamlit", "Plotly", "Pandas", "NumPy"],
    summary:
      "A premium telecom analytics dashboard analyzing churn patterns and revenue leakage across 50,000+ customer records, with a revenue recovery simulation module for strategic decision-making.",
    problem:
      "Telecom operators lose significant recurring revenue to churn that goes undetected until the customer has already churned. The challenge is identifying at-risk segments early and quantifying recovery potential.",
    highlights: [
      "Analyzed churn patterns across 5 risk segments, identifying retention opportunities to recover up to 23% of at-risk revenue",
      "Dynamic KPI dashboards visualizing churn trends, lifetime value, and segment risk scores across 50,000+ customer records",
      "Revenue recovery simulation module enabling stakeholders to model retention scenarios for high-value decision support",
    ],
    architecture:
      "Multi-page Streamlit app with Pandas-driven data pipeline, NumPy-powered risk scoring, and Plotly for interactive segment drill-down and scenario simulation.",
    challenges:
      "Designing the segment risk scoring model to be both statistically robust and interpretable enough for a non-technical business audience.",
    learnings:
      "Revenue leakage modeling, stakeholder-focused dashboard design, and building simulation tools that drive real business action rather than just reporting.",
    github: "https://github.com/diyasharma21/apex-customer-churn-dashboard",
    demo: "https://apex-customer-churn-dashboard.streamlit.app/",
    color: "bg-teal-100",
    accent: "#3D7D7A",
  },
  {
    id: "culinara",
    title: "Culinara",
    subtitle: "AI-Powered Recipe & Pantry Platform",
    category: "fullstack",
    timeline: "Jan 2026 – Mar 2026",
    stack: ["Next.js", "React", "Strapi", "Google Gemini API", "Vercel"],
    summary:
      "A full-stack AI recipe platform where users photograph their pantry and receive step-by-step recipes instantly — with pantry management, PDF downloads, and 92% ingredient detection accuracy.",
    problem:
      "People waste food because they don't know what to cook with what they have. Traditional recipe apps require you to already know the ingredient names.",
    highlights: [
      "Image-based ingredient detection via Google Gemini AI with 92% accuracy in user tests across camera, upload, and drag-and-drop inputs",
      "Full-stack platform with Next.js + Strapi backend, cutting recipe discovery time by 60% vs browsing",
      "Secure auth and API fallback handling on Vercel with page load times under 1.5s across all tiers",
    ],
    architecture:
      "Next.js App Router frontend with Strapi CMS backend. Google Gemini Vision API processes ingredient images; results feed a recipe generation prompt pipeline.",
    challenges:
      "Handling fallback gracefully when the Gemini API is rate-limited, and building an ingredient detection UX that works reliably on low-quality phone photos.",
    learnings:
      "Multimodal AI integration, headless CMS architecture with Strapi, and production-grade error handling for third-party API dependencies.",
    github: "https://github.com/diyasharma21/Culinara",
    demo: "https://culinara-app.vercel.app/",
    color: "bg-ivory-200",
    accent: "#8FA98B",
  },
  {
    id: "merai",
    title: "MerAI",
    subtitle: "AI Career & Learning Mentor Platform",
    category: "fullstack",
    timeline: "Aug 2025 – Oct 2025",
    stack: ["Next.js", "React", "PostgreSQL", "Google Gemini AI", "Vercel"],
    summary:
      "A full-stack AI mentoring platform delivering adaptive mock interviews and personalised skill assessments — cutting learner prep time by 45% in a 15-user pilot.",
    problem:
      "Most career prep tools are static and one-size-fits-all. Learners need adaptive feedback that adjusts to their specific skill gaps and target roles.",
    highlights: [
      "Adaptive mock interviews and skill assessments powered by Google Gemini AI, cutting learner prep time by 45% in a 15-user pilot",
      "PostgreSQL backend with role-based dashboards and progress tracking, sustaining query response times under 200ms under concurrent load",
      "Lighthouse score above 92 with edge-optimized routing and zero critical failures across production sessions",
    ],
    architecture:
      "Next.js App Router with PostgreSQL for user state and progress. Gemini AI handles interview question generation and answer evaluation in a structured prompt pipeline.",
    challenges:
      "Designing adaptive interview logic that feels dynamic rather than templated, and managing PostgreSQL query performance under concurrent load during the pilot.",
    learnings:
      "Conversational AI system design, database performance optimization, and the nuances of building AI-driven personalization that genuinely adapts to the user.",
    github: "https://github.com/diyasharma21/MerAI",
    demo: "https://merai-jet.vercel.app/",
    color: "bg-sage-100",
    accent: "#4E6E4D",
  },
  {
    id: "quickcart",
    title: "QuickCart",
    subtitle: "Full-Stack E-Commerce Web Application",
    category: "fullstack",
    timeline: "Oct 2025 – Mar 2026",
    stack: ["React", "Tailwind CSS", "Firebase", "JavaScript"],
    summary:
      "A responsive e-commerce platform with real-time cart sync, Firebase authentication, and a scalable component architecture — verified across 5 screen sizes with a 25% usability improvement in user testing.",
    problem:
      "Building a production-quality e-commerce experience requires real-time data consistency, secure auth, and a UI that holds up across devices without a backend team.",
    highlights: [
      "Responsive UI verified across 5 screen sizes, boosting usability scores by 25% in testing with 10 users",
      "Firebase authentication, real-time product management, and cart sync — trimming data fetch latency by 20% over REST-based approaches",
      "Reusable component architecture with real-time state management for maintainable, scalable frontend code",
    ],
    architecture:
      "React SPA with Tailwind CSS for styling, Firebase Firestore for real-time data, and Firebase Auth for user management. Cart state managed via React Context.",
    challenges:
      "Keeping cart state consistent across tabs and sessions, and designing a component library that remains genuinely reusable rather than just parametric.",
    learnings:
      "Firebase real-time architecture, advanced React state management patterns, and the discipline of building a component system before building features.",
    github: "https://github.com/diyasharma21/QuickCart",
    demo: "https://quick-cart-mind-mate.vercel.app/",
    color: "bg-teal-100",
    accent: "#5E9B97",
  },
  {
    id: "powerpulse",
    title: "PowerPulse",
    subtitle: "Smart Electricity Consumption Tracker",
    category: "both",
    timeline: "Dec 2024 – Mar 2025",
    stack: ["React.js", "Java Servlets", "MySQL", "REST APIs"],
    summary:
      "A full-stack electricity analytics platform tracking real-time consumption trends across pilot households — cutting manual billing effort by 50% and reducing overuse incidents by 40% during testing.",
    problem:
      "Households lack real-time visibility into electricity consumption patterns, making it impossible to act on usage anomalies before they show up on a bill.",
    highlights: [
      "Analytics dashboard tracking daily, weekly, and monthly consumption trends across 10 pilot households, cutting manual billing effort by 50%",
      "Java Servlet backend with MySQL indexing and connection pooling, lowering query latency by 35% and maintaining 99% uptime throughout testing",
      "Automated KPI monitoring for peak-hour thresholds and usage alerts, driving a 40% reduction in overuse incidents during testing",
    ],
    architecture:
      "React frontend consuming a Java Servlet REST API backed by MySQL. Indexing and connection pooling applied at the database layer for consistent low-latency responses.",
    challenges:
      "Designing the alert system to be sensitive enough to catch real anomalies without generating noise that users would learn to ignore.",
    learnings:
      "Java backend architecture, SQL performance optimization, and the product discipline of building alerting systems that drive behavior change rather than just report data.",
    github: "https://github.com/diyasharma21/powerpulse-project",
    demo: null,
    demoLabel: "Coming Soon",
    color: "bg-ivory-200",
    accent: "#8FA98B",
  },
];

export const certifications = [
  {
    title: "AWS Solutions Architect Training Program",
    issuer: "Ethnus",
    type: "certification",
    icon: "cloud",
  },
  {
    title: "MERN Full Stack Development",
    issuer: "Ethnus",
    type: "certification",
    icon: "code",
  },
  {
    title: "Data Visualization Tools",
    issuer: "AlmaBetter",
    type: "certification",
    icon: "bar-chart",
  },
  {
    title: "AWS Educate — 5+ Digital Badges",
    issuer: "Amazon Web Services",
    description:
      "Verified hands-on proficiency across Cloud Foundations, Compute, Storage, Networking, and Career Pathways.",
    type: "badge",
    icon: "award",
  },
];
