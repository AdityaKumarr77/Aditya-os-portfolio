// ============================================================================
// ADITYA.OS — CENTRAL CONTENT CONFIGURATION
// Edit this file to update anything on the site. No component code required.
// ============================================================================

export const personalInfo = {
  name: "Aditya Kumar Jha",
  shortName: "Aditya",
  initials: "AJ",
  identity: [
    "Computer Science & Engineering Student",
    "Full Stack Developer",
    "Data Analyst",
    "AI/ML Enthusiast",
    "Problem Solver",
  ],
  tagline: "Developer · Data · AI · Builder",
  intro:
    "I'm Aditya Kumar Jha, a Computer Science & Engineering student who enjoys building digital products, solving problems, exploring AI, working with data, and turning ideas into useful experiences. I actively take on hackathons, internships, and independent projects to build scalable, real-world technology.",
  bio: "I'm a B.Tech Computer Science Engineering student with a deep interest in turning complex problems into clean, working software. My focus spans Data Analytics, AI/ML, and full-stack Web Development — I like understanding a problem fully before I touch the keyboard, and I care about writing code that's still readable six months later. Outside of coursework, I compete in hackathons, work through competitive programming problems, and take on internships that put theory into production.",
  status: "AVAILABLE FOR OPPORTUNITIES",
  location: "Ranchi, Jharkhand, India",
  photoPath: "/images/profile.webp", // Drop your photo here — 1:1 or 4:5 aspect ratio recommended
  resumeUrl: "/Aditya Resume.pdf",
};

export const stats = [
  { value: "10+", label: "Projects Built" },
  { value: "4", label: "Hackathons" },
  { value: "4", label: "Internships" },
  { value: "24", label: "Certificates" },
];

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/adityakumarjha999",
  github: "https://github.com/technical-aditya-rathore",
  unstop: "https://unstop.com/u/technadi29148",
  leetcode: "https://leetcode.com/u/technical-aditya-rathore/",
  instagram: "https://www.instagram.com/devilbuoy757/",
  email: "adityakumarjha232@gmail.com",
  phone: "+91 9142341476",
};

export const contactInfo = {
  address: "Ranchi, Jharkhand, India",
  phone: "+91 9142341476",
  email: "adityakumarjha232@gmail.com",
};

export type SkillCategory = "Language" | "Web" | "Data" | "AI/ML" | "Tools";

export interface Skill {
  name: string;
  category: SkillCategory;
  level: "Learning" | "Working knowledge" | "Proficient";
  note: string;
}

export interface SkillGroup {
  title: string;
  category: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { title: "Programming Languages", category: "01", skills: ["C", "C++", "Java", "Python", "JavaScript", "TypeScript", "PHP"] },
  { title: "Frontend", category: "02", skills: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS", "Bootstrap"] },
  { title: "Backend", category: "03", skills: ["Node.js", "Express", "Django", "FastAPI", "Laravel"] },
  { title: "Databases", category: "04", skills: ["MySQL", "PostgreSQL", "MongoDB", "SQLite"] },
  { title: "Cloud & Deployment", category: "05", skills: ["AWS", "GCP", "Vercel", "Netlify", "Docker"] },
  { title: "Data Science & AI", category: "06", skills: ["Python", "TensorFlow", "Data Analytics"] },
  { title: "Tools", category: "07", skills: ["Git", "GitHub", "GitHub Actions", "Docker"] },
  { title: "Design", category: "08", skills: ["Figma","Notion"] },
];

export const skills: Skill[] = [
  { name: "Python", category: "Language", level: "Proficient", note: "Primary language for data work, scripting and problem solving." },
  { name: "C", category: "Language", level: "Proficient", note: "Core coursework and DSA foundations." },
  { name: "Java", category: "Language", level: "Working knowledge", note: "OOP-heavy coursework and problem solving." },
  { name: "JavaScript", category: "Web", level: "Working knowledge", note: "Interactive frontends and Node.js backends." },
  { name: "HTML", category: "Web", level: "Proficient", note: "Semantic, accessible markup." },
  { name: "CSS", category: "Web", level: "Working knowledge", note: "Layout, responsive design, animation." },
  { name: "React", category: "Web", level: "Working knowledge", note: "Component-driven interfaces, hooks, state." },
  { name: "Node.js", category: "Web", level: "Working knowledge", note: "REST APIs and backend services." },
  { name: "SQL", category: "Data", level: "Working knowledge", note: "Querying and structuring relational data." },
  { name: "Power BI", category: "Data", level: "Working knowledge", note: "Dashboards and data visualization." },
  { name: "Data Analytics", category: "Data", level: "Working knowledge", note: "Cleaning, exploring and interpreting datasets." },
  { name: "AI / ML", category: "AI/ML", level: "Learning", note: "Applied machine learning concepts and tooling." },
  { name: "Git", category: "Tools", level: "Proficient", note: "Version control across every project." },
  { name: "GitHub", category: "Tools", level: "Proficient", note: "Collaboration, CI and project hosting." },
];

export interface Deployment {
  name: string;
  description: string;
  stack: string[];
  status: "LIVE" | "DEPLOYED" | "OFFLINE";
  liveUrl?: string;
  githubUrl?: string;
}

export const deployments: Deployment[] = [
  {
    name: "TechPulse Daily",
    description: "A modern technology news platform with a dark, editorial UI and live external data integrations.",
    stack: ["React", "JavaScript", "CSS", "API"],
    status: "DEPLOYED",
    githubUrl: "https://github.com/technical-aditya-rathore/TechPulse-Daily",
  },
  {
    name: "Project AstroScope",
    description: "A console-based astrology application built on structured logical models.",
    stack: ["Python", "Console"],
    status: "DEPLOYED",
    githubUrl: "https://github.com/technical-aditya-rathore/Project-AstroScope-Console-Based-Astrology-App",
  },
  {
    name: "Scientific Calculator",
    description: "A precision calculator handling advanced mathematical operations.",
    stack: ["Java"],
    status: "DEPLOYED",
    githubUrl: "https://github.com/technical-aditya-rathore/Scientific-Calculator",
  },
];

export interface Project {
  number: string;
  name: string;
  description: string;
  problem: string;
  approach: string;
  stack: string[];
  features: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    number: "01",
    name: "TechPulse Daily",
    description: "A modern technology news platform built for fast scanning and a clean reading experience.",
    problem: "Tech news is scattered across sources with inconsistent, ad-heavy layouts that slow readers down.",
    approach: "Built a single, dark-themed reading surface in React that pulls in external content through API integrations, prioritizing speed and readability over clutter.",
    stack: ["React", "JavaScript", "CSS", "REST API"],
    features: ["Dark, distraction-free reading UI", "External API-driven content", "Responsive across devices"],
    githubUrl: "https://github.com/technical-aditya-rathore/TechPulse-Daily",
  },
  {
    number: "02",
    name: "Project AstroScope",
    description: "A console-based astrology application built using structured logical models.",
    problem: "Wanted to explore rule-based logical systems without the overhead of a UI layer.",
    approach: "Modeled astrological logic as a set of deterministic rules and exposed it through a clean console interface in Python.",
    stack: ["Python"],
    features: ["Rule-based logic engine", "Console-driven interaction", "Modular, extensible design"],
    githubUrl: "https://github.com/technical-aditya-rathore/Project-AstroScope-Console-Based-Astrology-App",
  },
  {
    number: "03",
    name: "Scientific Calculator",
    description: "A precision calculator supporting advanced mathematical operations.",
    problem: "Standard calculator apps often skip depth — scientific functions, precision handling, and edge cases.",
    approach: "Implemented a Java-based calculator with a focus on accurate handling of advanced operations and clean input parsing.",
    stack: ["Java"],
    features: ["Advanced mathematical operations", "Precision-focused computation", "Clean, testable logic layer"],
    githubUrl: "https://github.com/technical-aditya-rathore/Scientific-Calculator",
  },
  {
    number: "04",
    name: "CODXO Internship Project",
    description: "A development project completed as part of the CODXO software development internship.",
    problem: "The internship required delivering a working software project to a defined brief within a fixed timeframe.",
    approach: "Worked from the internship brief through planning, implementation and review, using version control to iterate on the project as requirements were clarified.",
    stack: ["JavaScript"],
    features: ["Built against an internship brief", "Version-controlled development workflow"],
    githubUrl: "https://github.com/technical-aditya-rathore/CODXO-project",
  },
];

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  image: string;
  credentialUrl?: string;
}

export const certificates: Certificate[] = [
  { title: "Microsoft Learn Student Ambassador Guide Workshop", issuer: "Buildon IND", date: "5 Jan 2026", image: "/certs/participation/buildon-ms-learn-ambassador.jpeg" },
  { title: "PromptWars Virtual", issuer: "Google for Developers · H2S", date: "11 Aug 2026", image: "/certs/participation/promptwars-virtual.jpeg" },
  { title: "AINCAT 2026", issuer: "Naukri Campus", date: "1 Jun 2026", image: "/certs/participation/aincat-2026.jpeg" },
  { title: "Summer Analytics 2026", issuer: "IIT Guwahati", date: "2026", image: "/certs/participation/summer-analytics-iit-guwahati-2026.jpeg" },
  { title: "Yuva AI for All", issuer: "Nasscom FutureSkills Prime", date: "16 Feb 2026", image: "/certs/participation/yuva-ai-for-all.jpeg" },
  { title: "From Curiosity to Career: Mapping Your AI Journey", issuer: "Saras AI Institute", date: "27 Jun 2025", image: "/certs/participation/curiosity-to-career-saras-ai.jpeg" },
  { title: "60 Days POTD Challenge", issuer: "GeeksforGeeks", date: "19 Jun", image: "/certs/participation/gfg-60-days-potd.jpeg" },
  { title: "From Fresher to Full Stack Pro", issuer: "Sudha Software Solutions", date: "25 May 2025", image: "/certs/participation/sudha-full-stack-workshop.jpeg" },
  { title: "Master Frontend Development Workshop", issuer: "Engiverse", date: "23 Feb 2024", image: "/certs/participation/engiverse-frontend-workshop.jpeg" },
  { title: "Presentation Skills", issuer: "TCS iON", date: "6 Jun 2025", image: "/certs/participation/tcs-presentation-skills.jpeg" },
  { title: "AI Fluency: Framework & Foundations", issuer: "Anthropic", date: "15 May 2026", image: "/certs/certifications/anthropic-ai-fluency.jpeg" },
  { title: "Gemini Certified Educator", issuer: "Google for Education", date: "14 Dec 2025", image: "/certs/certifications/google-gemini-certified-educator.jpeg" },
  { title: "Claude Code in Action", issuer: "Anthropic", date: "18 Mar 2026", image: "/certs/certifications/anthropic-claude-code.jpeg" },
  { title: "Introduction to Quantum Computing", issuer: "The Open University", date: "21 Jun 2025", image: "/certs/certifications/openlearn-quantum-computing.jpeg" },
  { title: "ADCA Course", issuer: "Best Computer Technology", date: "9 Oct 2023", image: "/certs/certifications/best-computer-adca.jpeg" },
  { title: "Foundations of Stock Trading", issuer: "Physics Wallah", date: "19 Apr 2025", image: "/certs/certifications/physics-wallah-stock-trading.jpeg" },
  { title: "Describe Security and Compliance Concepts", issuer: "Microsoft", date: "5 Apr 2025", image: "/certs/certifications/microsoft-security-compliance.jpeg" },
  { title: "30 Days DSA Bootcamp", issuer: "Unstop", date: "8 Aug 2025", image: "/certs/certifications/unstop-dsa-bootcamp.jpeg" },
  { title: "Advanced Software Engineering Job Simulation", issuer: "Walmart Global Tech · Forge", date: "17 Sep 2024", image: "/certs/certifications/walmart-software-engineering.jpeg" },
  { title: "Data Analytics Job Simulation", issuer: "Deloitte · Forge", date: "13 Feb 2025", image: "/certs/certifications/deloitte-data-analytics.jpeg" },
  { title: "Data Science & Analytics", issuer: "HP LIFE", date: "6 Sep 2024", image: "/certs/certifications/hp-data-science-analytics.jpeg" },
  { title: "Power BI Job Simulation", issuer: "PwC · Forge", date: "26 Aug 2024", image: "/certs/certifications/pwc-power-bi.jpeg" },
  { title: "Freedom with AI Masterclass", issuer: "Freedom with AI", date: "7 Sep 2024", image: "/certs/certifications/freedom-with-ai-masterclass.jpeg" },
  { title: "Software Engineering Job Simulation", issuer: "JPMorgan Chase & Co. · Forge", date: "29 Aug 2024", image: "/certs/certifications/jpmorgan-software-engineering.jpeg" },
];

export interface AmbassadorRole {
  role: string;
  organization: string;
  contribution: string;
  status: "ACTIVE" | "COMPLETED";
  image: string;
}

export const ambassadorRoles: AmbassadorRole[] = [
  {
    role: "Campus Ambassador",
    organization: "MyGov",
    contribution: "Technology awareness, community outreach and national participation.",
    status: "COMPLETED",
    image: "/certs/ambassadors/My gov campus ambassador.jpeg",
  },
  {
    role: "Google Student Ambassador",
    organization: "Google Gemini · PING Network",
    contribution: "Student community engagement, technical learning and peer collaboration.",
    status: "COMPLETED",
    image: "/certs/ambassadors/Google student ambassador.jpeg",
  },
  {
    role: "Campus Mantri",
    organization: "GeeksforGeeks",
    contribution: "Representing the platform, organizing campus activities and connecting students with learning resources.",
    status: "ACTIVE",
    image: "/certs/ambassadors/Geeksforgeeks campus mantri Ambassador.jpeg",
  },
];

export interface Hackathon {
  name: string;
  organization: string;
  year: string;
  project?: string;
  achievement?: string;
  stack: string[];
  image: string;
}

export const hackathons: Hackathon[] = [
  {
    name: "Bharatiya Antariksh Hackathon",
    organization: "ISRO",
    year: "2025",
    project: "Space and technology innovation submission.",
    achievement: "Certificate of acknowledgement for successful idea submission.",
    stack: [],
    image: "/hackathons/ISRO hackathon.jpeg",
  },
  {
    name: "ByteVerse 7.0",
    organization: "NIT Patna",
    year: "2025",
    project: "SoloNucleusX",
    achievement: "Certificate of participation in the ByteVerse 7.0 hackathon.",
    stack: [],
    image: "/hackathons/NIT patna hackathon.jpeg",
  },
  {
    name: "National Space Hackathon",
    organization: "IIT Delhi",
    year: "2025",
    project: "Team Creating Specific",
    achievement: "Certificate of participation in a national space hackathon.",
    stack: [],
    image: "/hackathons/IIT delhi hackathon.jpeg",
  },
  {
    name: "Ranchi Hacks '26",
    organization: "Google Developer Groups Ranchi",
    year: "2026",
    project: "Screening round participant.",
    achievement: "Made it to the screening round of Ranchi Hacks '26.",
    stack: [],
    image: "/hackathons/Ranchi hacks hackathon.jpeg",
  },
];

export interface Internship {
  organization: string;
  role: string;
  duration: string;
  work: string[];
  stack: string[];
  image: string;
  certificateUrl?: string;
}

export const internships: Internship[] = [
  {
    organization: "SolFinder Research",
    role: "Full Stack Developer Intern",
    duration: "1 Jul - 31 Jul 2026",
    work: [
      "Successfully completed a summer internship program in full-stack development.",
      "Gained practical experience contributing to software development work in a professional environment.",
    ],
    stack: ["Full Stack Development"],
    image: "/internships/SolFinder Research FullStack Developer.jpeg",
  },
  {
    organization: "RV Web",
    role: "Web Development Intern",
    duration: "13 Jun - 2 Aug 2025",
    work: [
      "Focused on frontend development and responsive UI design.",
      "Built interactive web components using modern frameworks and best practices.",
      "Gained hands-on experience creating user-centric interfaces optimized across devices.",
    ],
    stack: ["HTML", "CSS", "JavaScript", "React"],
    image: "/internships/Rv web webdevelopment internship.jpeg",
  },
  {
    organization: "InternPe",
    role: "Full Stack Development Intern",
    duration: "14 Jul - 10 Aug 2025",
    work: [
      "Comprehensive exposure to full-stack development workflows.",
      "Worked on real-world project requirements, database design, and API integration.",
      "Collaborated with senior developers to deliver production-ready solutions within deadlines.",
    ],
    stack: ["JavaScript", "Node.js", "SQL"],
    image: "/internships/Internpe python programming intern.jpeg",
  },
  {
    organization: "CODXO",
    role: "Software Development Intern",
    duration: "1 Aug - 30 Aug 2024",
    work: [
      "Specialized internship with an emphasis on practical implementation.",
      "Completed multiple projects addressing real business challenges.",
      "Strengthened code quality, version control, testing, and agile development practices.",
    ],
    stack: ["JavaScript"],
    image: "/internships/Codxo c programming intern.jpeg",
  },
];

export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Deployments", href: "#deployments" },
  { label: "Projects", href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Roles", href: "#roles" },
  { label: "Hackathons", href: "#hackathons" },
  { label: "Internships", href: "#internships" },
  { label: "Contact", href: "#contact" },
];
