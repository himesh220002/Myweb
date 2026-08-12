export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    slug: string;
    github?: string;
    featured?: boolean;
    overview: string;
    features: string[];
    elaborations?: string[];
    category: string;
    lastUpdated: string;
}

export const projects: Project[] = [
    {
        id: 1,
        title: "bmirun",
        description: "BMI calculator and fitness tracker with calorie planner, gym training tips, and professional body improvement guidance.",
        image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=1200",
        tags: ["Astro.js", "JavaScript", "HTML5", "CSS3"],
        slug: "bmirun",
        category: "Web Development / Fitness",
        lastUpdated: "11 minutes ago",
        overview: "A comprehensive fitness tracking utility focused on providing tailored calorie planning and professional body improvement guidance.",
        features: ["BMI Calculation", "Calorie Planning", "Gym Training Tips", "Fitness Tracking"],
        elaborations: [
            "Engineered advanced solutions to deliver: BMI calculator and fitness tracker with calorie planner, gym training tips, and professional body improvement guidance.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 2,
        title: "Smart Connector",
        description: "An intelligent Chrome Extension built with React, Vite, and Tailwind CSS that acts as an automated Networking AI CRM. The Smart Connector automatically scrapes, aligns, and scores professional profiles across the web based on your own Career Profile and custom Target Personas.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
        tags: ["React 18", "TypeScript", "Vite", "Tailwind CSS", "Manifest V3", "Fuse.js"],
        slug: "smart-connector",
        category: "Chrome Extension / AI",
        lastUpdated: "Recently",
        featured: true,
        overview: "An automated Networking AI CRM functioning as a Chrome Extension, capable of profiling, matching, and scoring leads directly from web pages.",
        features: [
            "Intelligent Target Radar: Define multiple target personas and auto-score every lead you visit.",
            "Multi-Profile Extraction: Automatically parses emails, phone numbers, and links from any webpage.",
            "Full Context Fuzzy Matching: Powered by Fuse.js for scraping and matching nested skills.",
            "ATS Matcher: Compares Job Descriptions against saved profiles, highlighting missing skills.",
            "Smart CRM UI: View, sort, edit, and manually add leads directly from the sleek popup.",
            "One-Click Export: Export entire lead lists to cleanly formatted CSVs with match scores."
        ],
        elaborations: [
            "Engineered a dynamic background service worker (Manifest V3) to orchestrate state and silently scrape full DOM context across varied professional networking sites.",
            "Implemented a highly-optimized fuzzy matching engine with Fuse.js that normalizes nested skills and scoring weights in real-time.",
            "Designed a seamless React-driven popup CRM interface providing instant ATS matching feedback, multi-persona radar switching, and clean CSV exports for mass lead generation."
        ]
    },

    {
        id: 3,
        title: "CSVgenerator",
        description: "Python utility to generate and manipulate CSV files for data workflows.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        tags: ["Python", "Pandas"],
        slug: "csvgenerator",
        category: "Data Tools",
        lastUpdated: "Jun 24",
        overview: "A specialized data engineering tool built in Python to programmatically generate, clean, and manipulate complex CSV datasets.",
        features: ["Data Generation", "CSV Manipulation", "Pandas Integration"],
        elaborations: [
            "Engineered advanced solutions to deliver: Python utility to generate and manipulate CSV files for data workflows.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 4,
        title: "MovieRecomendation",
        description: "Python-based movie recommendation engine using collaborative filtering and content-based methods.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1200",
        tags: ["Python", "NumPy", "Pandas"],
        slug: "movierecomendation",
        category: "Machine Learning",
        lastUpdated: "Jun 23",
        overview: "An intelligent recommendation system utilizing both collaborative filtering and content-based algorithms to suggest personalized movies.",
        features: ["Collaborative Filtering", "Content-Based Methods", "Data Processing Engine"],
        elaborations: [
            "Engineered advanced solutions to deliver: Python-based movie recommendation engine using collaborative filtering and content-based methods.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 5,
        title: "ImageClassifier",
        description: "Image classification project with HTML dashboard, powered by ML backend.",
        image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=1200",
        tags: ["Python", "PyTorch", "Streamlit", "HTML"],
        slug: "imageclassifier",
        category: "Machine Learning / Computer Vision",
        lastUpdated: "Jun 23",
        overview: "A machine learning dashboard capable of classifying images in real-time, utilizing PyTorch models and a Streamlit interface.",
        features: ["Real-time Image Classification", "PyTorch Backend", "Interactive Dashboard"],
        elaborations: [
            "Engineered advanced solutions to deliver: Image classification project with HTML dashboard, powered by ML backend.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 6,
        title: "StudentIntelligence",
        description: "Python project analyzing student performance and intelligence metrics.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
        tags: ["Python", "Matplotlib", "Pandas"],
        slug: "studentintelligence",
        category: "Data Analysis / Education",
        lastUpdated: "Jun 21",
        overview: "An educational data analysis tool that visualizes student performance and cognitive metrics using Pandas and Matplotlib.",
        features: ["Performance Analytics", "Metric Visualization", "Data Processing"],
        elaborations: [
            "Engineered advanced solutions to deliver: Python project analyzing student performance and intelligence metrics.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 7,
        title: "DataCleanup",
        description: "Data cleanup and preprocessing pipeline for analysis-ready datasets.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200",
        tags: ["Python", "NumPy", "Pandas"],
        slug: "datacleanup",
        category: "Data Engineering",
        lastUpdated: "Jun 21",
        overview: "An automated data preprocessing pipeline designed to sanitize, format, and prepare raw datasets for robust downstream analysis.",
        features: ["Automated Preprocessing", "Data Sanitization", "Pipeline Generation"],
        elaborations: [
            "Engineered advanced solutions to deliver: Data cleanup and preprocessing pipeline for analysis-ready datasets.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 8,
        title: "codeForge",
        description: "TypeScript project showcasing modular code architecture and utilities.",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200",
        tags: ["TypeScript", "Node.js"],
        slug: "codeforge",
        category: "Web Development / Utilities",
        lastUpdated: "Jun 18",
        overview: "A demonstration of advanced, highly-modular code architecture principles using TypeScript and Node.js for scalable backend utilities.",
        features: ["Modular Architecture", "Type-safe Utilities", "Scalable Design"],
        elaborations: [
            "Designed an advanced data ingestion and vectorization pipeline using NVIDIA NIM (llama-nemotron-embed) and ChromaDB Cloud Cluster for RAG-based semantic retrieval.",
            "Implemented high-performance vector search and augmentation workflows utilizing nvidia/llama-nemotron-rerank-1b-v2 for precise match scaling and meta/llama-3.3-70b-instruct for custom strategy generation.",
            "Built a dynamic React UI for instant partial streaming of generated contextual reports, seamlessly parsing large CSV datasets to extract text features."
        ]
    },
    {
        id: 9,
        title: "TradingSkillSite",
        description: "Full-featured training website for online trading skills, course management, analytics, and student engagement.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
        tags: ["TypeScript", "React", "Next.js", "Chart.js"],
        slug: "tradingskillsite",
        category: "Web Development / FinTech",
        lastUpdated: "Jun 17",
        featured: true,
        overview: "A premium FinTech educational platform focused on trading skills, featuring interactive charts, course progress tracking, and student analytics.",
        features: ["Course Management", "Trading Analytics", "Interactive Charts", "Student Dashboards"],
        elaborations: [
            "Engineered advanced solutions to deliver: Full-featured training website for online trading skills, course management, analytics, and student engagement.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 10,
        title: "bikeShowroom",
        description: "TypeScript-based bike showroom web app with product listings and management.",
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200",
        tags: ["TypeScript", "React"],
        slug: "bikeshowroom",
        category: "Web Development / E-commerce",
        lastUpdated: "Jun 17",
        overview: "A dynamic e-commerce frontend displaying interactive motorcycle listings, detailed product specifications, and management panels.",
        features: ["Product Listings", "Inventory Management", "Interactive UI"],
        elaborations: [
            "Engineered advanced solutions to deliver: TypeScript-based bike showroom web app with product listings and management.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 11,
        title: "Myweb",
        description: "Personal website hosted at https://cyphertech.online showcasing portfolio and services.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
        tags: ["TypeScript", "React", "Next.js"],
        slug: "myweb",
        category: "Personal Website",
        lastUpdated: "Jun 17",
        featured: true,
        overview: "A high-performance personal portfolio and knowledge hub showcasing elite software engineering capabilities and stunning design.",
        features: ["Performance Optimized", "Dynamic Portfolio", "Service Listings"],
        elaborations: [
            "Engineered advanced solutions to deliver: Personal website hosted at https://cyphertech.online showcasing portfolio and services.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 12,
        title: "myCVs",
        description: "Private repository for CVs and resumes.",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200",
        tags: ["HTML"],
        slug: "mycvs",
        category: "Personal / Documentation",
        lastUpdated: "May 24",
        overview: "A collection of digital resumes and CVs meticulously crafted using raw HTML for perfect semantic structure.",
        features: ["Semantic HTML", "Clean Layout", "Print-ready Design"],
        elaborations: [
            "Engineered advanced solutions to deliver: Private repository for CVs and resumes.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 13,
        title: "dentalProject",
        description: "Next.js dental clinic management website with appointment booking and patient records.",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
        tags: ["TypeScript", "Next.js"],
        slug: "dentalproject",
        category: "Web Development / Healthcare",
        lastUpdated: "May 19",
        overview: "An all-in-one dental practice management platform connecting clinics and patients with digital booking and custom charting.",
        features: ["Appointment Booking", "Patient Records", "Next.js Architecture"],
        elaborations: [
            "Engineered advanced solutions to deliver: Next.js dental clinic management website with appointment booking and patient records.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 14,
        title: "Trading-skill-training",
        description: "HTML-based trading skill training site with course details and batch management.",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200",
        tags: ["HTML", "CSS", "JavaScript"],
        slug: "trading-skill-training",
        category: "Web Development / FinTech",
        lastUpdated: "May 7",
        overview: "A lightweight vanilla web application for trading skill training, featuring course catalogs and batch management operations.",
        features: ["Course Details", "Batch Management", "Vanilla JS Implementation"],
        elaborations: [
            "Engineered advanced solutions to deliver: HTML-based trading skill training site with course details and batch management.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 15,
        title: "notebuilder",
        description: "TypeScript project for building and managing notes.",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200",
        tags: ["TypeScript", "React"],
        slug: "notebuilder",
        category: "Web Development / Productivity",
        lastUpdated: "Feb 16",
        overview: "A productivity tool allowing users to build, organize, and manage complex hierarchical notes using a React frontend.",
        features: ["Hierarchical Note Management", "React Interactivity", "Type-safe Operations"],
        elaborations: [
            "Engineered advanced solutions to deliver: TypeScript project for building and managing notes.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 16,
        title: "PyLearn",
        description: "Python learning platform built with TypeScript frontend.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
        tags: ["TypeScript", "React", "Python"],
        slug: "pylearn",
        category: "Learning / Platform",
        lastUpdated: "Feb 14",
        overview: "An interactive educational platform designed to teach Python, featuring a seamless TypeScript frontend bridging to a Python execution backend.",
        features: ["Interactive Learning", "TypeScript Frontend", "Python Backend Integration"],
        elaborations: [
            "Engineered advanced solutions to deliver: Python learning platform built with TypeScript frontend.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 17,
        title: "car-marketplace-web-app",
        description: "TypeScript-based car marketplace web app with listings and search.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200",
        tags: ["TypeScript", "React"],
        slug: "car-marketplace",
        category: "Web Development / Marketplace",
        lastUpdated: "Jan 27",
        overview: "A two-sided automotive marketplace featuring dynamic vehicle search, granular filtering, and highly-performant React components.",
        features: ["Vehicle Search", "Dynamic Filtering", "Marketplace Infrastructure"],
        elaborations: [
            "Engineered advanced solutions to deliver: TypeScript-based car marketplace web app with listings and search.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 18,
        title: "dBank",
        description: "Decentralized banking and investment platform with asset marketplace, portfolio tracking, and secure PIN protection.",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1200",
        tags: ["JavaScript", "Internet Computer SDK"],
        slug: "dbank",
        category: "Blockchain / FinTech",
        lastUpdated: "Dec 31, 2025",
        overview: "A Web3 decentralized finance (DeFi) banking terminal allowing users to supply assets, track portfolios, and perform secure transactions on the Internet Computer.",
        features: ["Asset Marketplace", "Portfolio Tracking", "Secure PIN Protection", "Internet Computer SDK"],
        elaborations: [
            "Engineered advanced solutions to deliver: Decentralized banking and investment platform with asset marketplace, portfolio tracking, and secure PIN protection.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 19,
        title: "TechNitro",
        description: "TypeScript project showcasing advanced web utilities.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
        tags: ["TypeScript"],
        slug: "technitro",
        category: "Web Development",
        lastUpdated: "Dec 29, 2025",
        overview: "A showcase of advanced TypeScript utilities and micro-libraries designed for high-performance web applications.",
        features: ["Advanced Utilities", "TypeScript Mastery", "Performance Focused"],
        elaborations: [
            "Engineered advanced solutions to deliver: TypeScript project showcasing advanced web utilities.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 20,
        title: "MyAPI",
        description: "TypeScript API project for backend services.",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1200",
        tags: ["TypeScript", "Node.js", "Express.js"],
        slug: "myapi",
        category: "Backend / API",
        lastUpdated: "Dec 29, 2025",
        overview: "A robust, scalable backend API architecture built with Node.js and Express, heavily typed with TypeScript for reliable server operations.",
        features: ["RESTful API", "Type-safe Controllers", "Scalable Routing"],
        elaborations: [
            "Engineered advanced solutions to deliver: TypeScript API project for backend services.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 21,
        title: "tech-deal",
        description: "JavaScript project for tech deals and offers.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
        tags: ["JavaScript", "React"],
        slug: "tech-deal",
        category: "Web Development / E-commerce",
        lastUpdated: "Sep 18, 2025",
        overview: "A React-based e-commerce aggregator that dynamically fetches and displays the latest tech deals, offers, and discounts.",
        features: ["Deal Aggregation", "React Components", "Dynamic Fetching"],
        elaborations: [
            "Engineered advanced solutions to deliver: JavaScript project for tech deals and offers.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 22,
        title: "My-Notes",
        description: "HTML-based notes application.",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200",
        tags: ["HTML", "CSS"],
        slug: "my-notes",
        category: "Personal / Productivity",
        lastUpdated: "Sep 16, 2025",
        overview: "A minimal, beautifully styled vanilla HTML/CSS notes application focused on absolute simplicity and fast load times.",
        features: ["Vanilla HTML/CSS", "Minimalist Design", "Fast Performance"],
        elaborations: [
            "Engineered advanced solutions to deliver: HTML-based notes application.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 23,
        title: "Chat-Bot",
        description: "Full-stack real-time chatbot with React, TailwindCSS, GraphQL, Nhost, Apollo Client, and WebSocket support.",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200",
        tags: ["React", "TailwindCSS", "GraphQL", "Apollo Client", "WebSocket", "Netlify"],
        slug: "chat-bot",
        category: "Web Development / AI",
        lastUpdated: "Recent",
        featured: true,
        overview: "A scalable, real-time AI assistant integration platform built with GraphQL subscriptions to handle live sync across chat sessions seamlessly.",
        features: ["Real-time WebSocket Chat", "GraphQL Subscriptions", "Authentication Integration", "Apollo Client"],
        elaborations: [
            "Engineered advanced solutions to deliver: Full-stack real-time chatbot with React, TailwindCSS, GraphQL, Nhost, Apollo Client, and WebSocket support.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },
    {
        id: 24,
        title: "javaRev",
        description: "Java fundamentals revision project with HTML-based notes and examples.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
        tags: ["Java", "HTML"],
        slug: "javarev",
        category: "Learning / Java",
        lastUpdated: "2 weeks ago",
        overview: "A revision toolkit designed to reinforce Java fundamentals through structured HTML notes and practical code examples.",
        features: ["Fundamental Java Notes", "Code Examples", "HTML Documentation"],
        elaborations: [
            "Engineered advanced solutions to deliver: Java fundamentals revision project with HTML-based notes and examples.",
            "Optimized core logic and utilized modern tooling to streamline execution.",
            "Focused heavily on maintainability and structural integrity of the codebase."
        ]
    },

];
