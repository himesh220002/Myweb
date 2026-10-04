export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    images?: string[]; // Added for carousel
    tags: string[];
    slug: string;
    github?: string;
    demoUrl?: string; // Added for live demo link
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
        // image: "/projects/bmirun/images/bmisc1.png",
        images: [
            "/projects/bmirun/images/bmisc1.png",
            "/projects/bmirun/images/bmisc2.png",
            "/projects/bmirun/images/bmisc3.png",
            "/projects/bmirun/images/bmisc4.png",
            "/projects/bmirun/images/bmisc5.png",
            "/projects/bmirun/images/bmisc6.png",
            "/projects/bmirun/images/bmisc7.png",
        ],
        demoUrl: "https://eccentric-earth.pages.dev/",
        github: "https://github.com/himesh220002/bmifitbody",
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
        images: [
            "/projects/smart-connector/images/smartconnectorsc1.png",
            "/projects/smart-connector/images/smartconnectorsc2.png",
            "/projects/smart-connector/images/smartconnectorsc3.png",
            "/projects/smart-connector/images/smartconnectorsc4.png",
            "/projects/smart-connector/images/smartconnectorsc5.png",

        ],
        demoUrl: "",
        github: "https://github.com/himesh220002/Network-Chrome-Extension-app",
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
        // image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        image: "https://cdn-icons-png.flaticon.com/256/7479/7479119.png",
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
        title: "TaskFlow PM (Work Management)",
        description: "Advanced Task & Resource Management Suite with an Enterprise Dashboard for strategic and executive management.",
        // image: "/projects/workmanagement/images/workmanagementsc1.png",
        image: "https://www.highgear.com/wp-content/uploads/2023/03/objective-work-management-system.jpg    ",
        images: [
            "/projects/workmanagement/images/workmanagementsc1.png",
            "/projects/workmanagement/images/workmanagementsc2.png",
            "/projects/workmanagement/images/workmanagementsc3.png",
            "/projects/workmanagement/images/workmanagementsc4.png",
            "/projects/workmanagement/images/workmanagementsc5.png",
            "/projects/workmanagement/images/workmanagementsc6.png",
            "/projects/workmanagement/images/workmanagementsc7.png",
            "/projects/workmanagement/images/workmanagementsc8.png",
            "/projects/workmanagement/images/workmanagementsc9.png",
            "/projects/workmanagement/images/workmanagementsc10.png",
            "/projects/workmanagement/images/workmanagementsc11.png",
            "/projects/workmanagement/images/workmanagementsc12.png",
            "/projects/workmanagement/images/workmanagementsc13.png",
            "/projects/workmanagement/images/workmanagementsc14.png",
            "/projects/workmanagement/images/workmanagementsc15.png",
            "/projects/workmanagement/images/workmanagementsc16.png",
            "/projects/workmanagement/images/workmanagementsc17.png"
        ],
        demoUrl: "https://work-management-teal.vercel.app/",
        github: "https://github.com/himesh220002/WorkManagement",
        tags: ["React", "Next.js", "Tailwind CSS"],
        slug: "workmanagement",
        category: "Enterprise / Management",
        lastUpdated: "Recently",
        featured: true,
        overview: "A comprehensive project management and resource allocation platform tailored for enterprise-level operational efficiency.",
        features: ["Strategic & Executive Dashboard", "Finance & Revenue Tracking", "Sales Pipeline Conversion", "Engineering Velocity"],
        elaborations: [
            "Engineered a full-scale enterprise dashboard consolidating finance, sales, HR, and operations KPIs.",
            "Implemented real-time resource allocation and tactical to-do lists for cross-functional teams."
        ]
    },
    {
        id: 5,
        title: "SarkarLink",
        description: "A trusted portal for Sarkari Result, Sarkari Exam, and Sarkari Naukri. Provides real-time updates on government jobs.",
        image: "/projects/sarkarlink/images/sarkarlinklogo.png",
        images: [
            "/projects/sarkarlink/images/sarkarlinklogo.png",
            "/projects/sarkarlink/images/sarkarlinksc1.png",
            "/projects/sarkarlink/images/sarkarlinksc2.png",
            "/projects/sarkarlink/images/sarkarlinksc3.png",
            "/projects/sarkarlink/images/sarkarlinksc4.png",
            "/projects/sarkarlink/images/sarkarlinksc5.png",
            "/projects/sarkarlink/images/sarkarlinksc6.png",
            "/projects/sarkarlink/images/sarkarlinksc7.png",
            "/projects/sarkarlink/images/sarkarlinksc8.png",
            "/projects/sarkarlink/images/sarkarlinksc9.png",
            "/projects/sarkarlink/images/sarkarlinksc10.png",
            "/projects/sarkarlink/images/sarkarlinksc11.png",
            "/projects/sarkarlink/images/sarkarlinksc12.png",
            "/projects/sarkarlink/images/sarkarlinksc13.png",
            "/projects/sarkarlink/images/sarkarlinksc14.png",

        ],
        demoUrl: "https://govt-job-portal-scraper.vercel.app/",
        tags: ["Next.js", "React", "Tailwind CSS"],
        slug: "sarkarlink",
        category: "Web Portal / Jobs",
        lastUpdated: "Recently",
        featured: true,
        overview: "India's trusted Sarkari job portal offering real-time updates on the latest government jobs, results, and admit cards.",
        features: ["Real-time Job Updates", "Syllabus & Admit Card Downloads", "Live Search & Filtering"],
        elaborations: [
            "Developed an automated data aggregation pipeline to fetch and list the latest government job postings and exam results.",
            "Designed a highly responsive and performant user interface utilizing Next.js and Tailwind CSS."
        ]
    },
    {
        id: 6,
        title: "MovieRecommendation",
        description: "Python-based movie recommendation engine using collaborative filtering and content-based methods.",
        // image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1200",
        image: "/projects/movierecommendation/images/movierecommendationsc5.png",
        images: [
            "/projects/movierecommendation/images/movierecommendationsc1.png",
            "/projects/movierecommendation/images/movierecommendationsc2.png",
            "/projects/movierecommendation/images/movierecommendationsc3.png",
            "/projects/movierecommendation/images/movierecommendationsc4.png",
            "/projects/movierecommendation/images/movierecommendationsc5.png",
            "/projects/movierecommendation/images/movierecommendationsc6.png",

        ],
        demoUrl: "https://moviewatch-cypher.streamlit.app/",
        github: "https://github.com/himesh220002/MovieRecomendation",
        tags: ["Python", "NumPy", "Pandas"],
        slug: "movierecommendation",
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
        id: 7,
        title: "ImageTraining",
        description: "Image classification project with HTML dashboard, powered by ML backend.",
        image: "/projects/imagetraining/images/imagetraining1.png",
        images: [
            "/projects/imagetraining/images/imagetraining1.png",
            "/projects/imagetraining/images/imagetraining2.png",
            "/projects/imagetraining/images/imagetraining3.png",
            "/projects/imagetraining/images/imagetraining4.png",
            "/projects/imagetraining/images/imagetraining5.png",
            "/projects/imagetraining/images/imagetraining6.png",
            "/projects/imagetraining/images/imagetraining7.png",
            "/projects/imagetraining/images/imagetraining8.png",
            "/projects/imagetraining/images/imagetraining9.png",
            "/projects/imagetraining/images/imagetraining10.png",
            "/projects/imagetraining/images/imagetraining11.png",
            "/projects/imagetraining/images/imagetraining12.png",
            "/projects/imagetraining/images/imagetraining13.png",
            "/projects/imagetraining/images/imagetraining14.png",
            "/projects/imagetraining/images/imagetraining15.png",
            "/projects/imagetraining/images/imagetraining16.png",
            "/projects/imagetraining/images/imagetraining17.png",
        ],
        github: "https://github.com/himesh220002/ImageClassifier",
        tags: ["Python", "PyTorch", "Streamlit", "HTML"],
        slug: "imagetraining",
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
        id: 8,
        title: "StudentIntelligence",
        description: "Python project analyzing student performance and intelligence metrics.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1200",
        images: [
            "/projects/studentintelligence/images/studentintelligencesc3.png",
            "/projects/studentintelligence/images/studentintelligencesc1.png",
            "/projects/studentintelligence/images/studentintelligencesc2.png",
            "/projects/studentintelligence/images/studentintelligencesc4.png",
            "/projects/studentintelligence/images/studentintelligencesc5.png"
        ],
        demoUrl: "https://studentintelligence-cypher.streamlit.app/",
        github: "https://github.com/himesh220002/StudentIntelligence",
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
        id: 9,
        title: "DataCleanup",
        description: "Data cleanup and preprocessing pipeline for analysis-ready datasets.",
        image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=1200",
        images: ["/projects/datacleanup/images/datacleanup1.png",
            "/projects/datacleanup/images/datacleanup2.png",
            "/projects/datacleanup/images/datacleanup3.png",
            "/projects/datacleanup/images/datacleanup4.png",
            "/projects/datacleanup/images/datacleanup5.png",
            "/projects/datacleanup/images/datacleanup6.png",
            "/projects/datacleanup/images/datacleanup7.png",
            "/projects/datacleanup/images/datacleanup8.png",
            "/projects/datacleanup/images/datacleanup9.png",
        ],
        demoUrl: "https://datacleanup-cypher.streamlit.app/",
        github: "https://github.com/himesh220002/DataCleanup",
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
        id: 10,
        title: "codeForge",
        description: "TypeScript project showcasing modular code architecture and utilities.",
        image: "/projects/codeforge/images/codeforgesc.png",
        images: [
            "/projects/codeforge/images/codeforgesc1.png",
            "/projects/codeforge/images/codeforgesc2.png",
            "/projects/codeforge/images/codeforgesc3.png",
            "/projects/codeforge/images/codeforgesc4.png",
            "/projects/codeforge/images/codeforgesc5.png",
            "/projects/codeforge/images/codeforgesc6.png",
            "/projects/codeforge/images/codeforgesc7.png",
            "/projects/codeforge/images/codeforgesc8.png",
            "/projects/codeforge/images/codeforgesc9.png",
            "/projects/codeforge/images/codeforgesc10.png",
            "/projects/codeforge/images/codeforgesc11.png",
            "/projects/codeforge/images/codeforgesc12.png",
        ],
        demoUrl: "https://www.cyphertech.online/codeforge",
        github: "https://github.com/himesh220002/codeForge",
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
        id: 11,
        title: "TradingSkillSite",
        description: "Full-featured training website for online trading skills, course management, analytics, and student engagement.",
        image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "https://www.cyphertech.online/digitskill",
        github: "https://github.com/himesh220002/Trading-skill-training",
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
        id: 12,
        title: "bikeShowroom",
        description: "TypeScript-based bike showroom web app with product listings and management.",
        image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "https://www.cyphertech.online/yamahabikes",
        github: "https://github.com/himesh220002/bikeShowroom",
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
        id: 13,
        title: "Myweb",
        description: "Personal website hosted at https://cyphertech.online showcasing portfolio and services.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "https://www.cyphertech.online",
        github: "https://github.com/himesh220002/myweb",
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
        id: 14,
        title: "myCVs",
        description: "Private repository for CVs and resumes.",
        image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "",
        github: "https://github.com/himesh220002/myCVs",
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
        id: 15,
        title: "dentalProject",
        description: "Next.js dental clinic management website with appointment booking and patient records.",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
        images: [
            "/projects/dentalProject/images/dentalsc1.png",
            "/projects/dentalProject/images/dentalsc2.png",
            "/projects/dentalProject/images/dentalsc3.png",
            "/projects/dentalProject/images/dentalsc4.png",
            "/projects/dentalProject/images/dentalsc5.png",
            "/projects/dentalProject/images/dentalsc6.png",
            "/projects/dentalProject/images/dentalsc7.png",
            "/projects/dentalProject/images/dentalsc8.png",
            "/projects/dentalProject/images/dentalsc9.png",
            "/projects/dentalProject/images/dentalsc10.png",
            "/projects/dentalProject/images/dentalsc11.png",
            "/projects/dentalProject/images/dentalsc12.png",
            "/projects/dentalProject/images/dentalsc13.png",
            "/projects/dentalProject/images/dentalsc14.png",
            "/projects/dentalProject/images/dentalsc15.png",
            "/projects/dentalProject/images/dentalsc16.png",
            "/projects/dentalProject/images/dentalsc17.png",
            "/projects/dentalProject/images/dentalsc18.png",
            "/projects/dentalProject/images/dentalsc19.png",
            "/projects/dentalProject/images/dentalsc20.png",
            "/projects/dentalProject/images/dentalsc21.png"
        ],
        demoUrl: "https://dental-project-zeta.vercel.app/",
        github: "https://github.com/himesh220002/dentalProject",
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
        id: 16,
        title: "Trading-skill-training",
        description: "HTML-based trading skill training site with course details and batch management.",
        image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "",
        github: "",
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
        id: 17,
        title: "notebuilder",
        description: "TypeScript project for building and managing notes.",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "https://notebuilder.vercel.app/",
        github: "https://github.com/himesh220002/notebuilder",
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
        id: 18,
        title: "PyLearn",
        description: "Python learning platform built with TypeScript frontend.",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "https://py-learn-henna.vercel.app/",
        github: "https://github.com/himesh220002/PyLearn",
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
        id: 19,
        title: "car-marketplace-web-app",
        description: "TypeScript-based car marketplace web app with listings and search.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "",
        github: "",
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
        id: 20,
        title: "dBank",
        description: "Decentralized banking and investment platform with asset marketplace, portfolio tracking, and secure PIN protection.",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "",
        github: "",
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
        id: 21,
        title: "TechNitro",
        description: "TypeScript project showcasing advanced web utilities.",
        image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "",
        github: "",
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
        id: 22,
        title: "MyAPI",
        description: "TypeScript API project for backend services.",
        image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "",
        github: "",
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
        id: 23,
        title: "tech-deal",
        description: "JavaScript project for tech deals and offers.",
        image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "",
        github: "",
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
        id: 24,
        title: "My-Notes",
        description: "HTML-based notes application.",
        image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "https://himesh220002.github.io/My-Notes/index.html",
        github: "https://github.com/himesh220002/My-Notes",
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
        id: 25,
        title: "Chat-Bot",
        description: "Full-stack real-time chatbot with React, TailwindCSS, GraphQL, Nhost, Apollo Client, and WebSocket support.",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "https://chat-bot-cypher.netlify.app/",
        github: "https://github.com/himesh220002/Chat-Bot",
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
        id: 26,
        title: "javaRev",
        description: "Java fundamentals revision project with HTML-based notes and examples.",
        image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=1200",
        images: [],
        demoUrl: "",
        github: "https://github.com/himesh220002/javaRev",
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
    {
        id: 27,
        title: "Enricher AI",
        description: "Autonomous B2B web intelligence and entity resolution system engineered to eliminate expensive third-party data broker subscriptions. Features 7 dedicated research workspaces, zero-vendor-cost Playwright stealth scraping, BullMQ concurrency throttling, frontier AI model orchestration (Gemini, Claude, GPT-4o, DeepSeek), and 0% overwrite CRM safe-sync.",
        image: "/projects/enricher/images/domainesearch.png",
        images: [
            "/projects/enricher/images/domainesearch.png",
            "/projects/enricher/images/webinfoharvest.png",
            "/projects/enricher/images/opportunityhub.png",
            "/projects/enricher/images/dataconsolidandpkg.png",
            "/projects/enricher/images/globalresourcecollection.png",
            "/projects/enricher/images/resourcerearrang.png"
        ],
        demoUrl: "http://localhost:3001",
        github: "https://github.com/himesh220002/enricher",
        tags: ["Next.js 16", "React 19", "Playwright Stealth", "BullMQ", "Redis", "MongoDB", "BYOK AI", "Tailwind CSS v4"],
        slug: "enricher",
        category: "Machine Learning / B2B Intelligence",
        lastUpdated: "Just now",
        featured: true,
        overview: "An autonomous B2B web intelligence and entity resolution platform engineered to eliminate expensive third-party data broker subscriptions (ZoomInfo, Apollo, Outscraper). Features 7 dedicated research workspaces covering company intelligence, multi-keyword Google Maps scraping, product sourcing, deep web crawling, and post generation, backed by a resilient BullMQ queue and safe-sync CRM pipelines.",
        features: [
            "Zero-Cost Stealth Engine: Headless Playwright evasion with fingerprint rotation and strict Schema.org JSON-LD extraction.",
            "BullMQ & Redis Architecture: Controlled concurrency throttling, memory stability guards, and exponential backoff retries.",
            "BYOK Frontier AI Hub: Direct API integration for Gemini, Claude 3.5, GPT-4o, DeepSeek V3/R1, Grok 2, and Qwen for instant buyer intent & ICP scoring.",
            "Google Maps Multi-Keyword Scraper: Bulk keyword discovery with coordinate resolution, phone validation, and contact sanitization.",
            "CRM Safe-Sync Connectors: HubSpot & Salesforce bidirectional sync with field-level shielding and 0% overwrite protection.",
            "Entity Resolution & Merge Engine: Multi-entity record deduplication, contact merging, tech stack consolidation, and CSV/JSON export."
        ],
        elaborations: [
            "Engineered a distributed, zero-cost web scraping pipeline utilizing Playwright Extra with stealth evasion, strictly parsing Schema.org JSON-LD and visible text nodes to eliminate regex false positives on CSS/bundle scripts.",
            "Built an asynchronous queue manager powered by BullMQ and Redis with rate-limiting backpressure, isolating long-running extraction jobs to prevent server thread starvation and memory leaks.",
            "Architected a pluggable BYOK (Bring-Your-Own-Key) AI agent layer integrating 2026 frontier LLMs to autonomously classify ICP fit, score intent signals, and generate hyper-personalized outbound icebreakers.",
            "Constructed an enterprise CRM safe-sync adapter featuring field-level diffing algorithms to ensure stale enriched data never overwrites established CRM contact records."
        ]
    },
    {
        id: 28,
        title: "NodeDir (networkgraph)",
        description: "High-performance interactive relational node directory and multi-dimensional graph visualizer powered by a custom 60 FPS D3-Force Canvas physics engine, in-browser PGlite SQL, client-side ZIP/CSV processing, and edge network reconnaissance.",
        image: "/projects/networkgraph/images/networkgraphsc1.jpg",
        images: [
            "/projects/networkgraph/images/networkgraphsc1.jpg",
        ],
        demoUrl: "https://nodedir.com",
        github: "https://github.com/himesh220002/networkgraphv",
        tags: ["React 19", "D3-Force", "HTML5 Canvas", "PGlite", "Kysely", "TanStack Router", "Tailwind CSS v4", "JSZip"],
        slug: "networkgraph",
        category: "Data Tools / Graph Visualization",
        lastUpdated: "Recently",
        featured: true,
        overview: "A multi-dimensional graph exploration suite that renders complex relational systems into intuitive spatial territories. Built on a custom D3-force Canvas simulation executing at 60 FPS, NodeDir enables instant visualization across GitHub developer ecosystems, cosmic astrophysics instruments, internet DNS infrastructure trees, and LinkedIn career histories.",
        features: [
            "60 FPS Force Simulation: Custom D3-Force physics engine calculating charge repulsion, collision detection, and spring link dynamics on HTML5 Canvas.",
            "4 Distinct Exploration Modes: Cosmic Helios Observatory, Developer Work Graph, Deep URL & DNS Probe, and Personal Career Profiler.",
            "Sub-Millisecond Node Indexing: In-memory search and tag filtering enabling instant keyboard navigation across thousands of nodes without lag.",
            "Privacy-First Client Processing: Local Web Worker decompression and CSV parsing via JSZip, ensuring user datasets never leave the browser.",
            "Embedded PGlite Engine: Client-side relational database running PostgreSQL directly in WebAssembly for zero-latency relational queries.",
            "Multi-Format Export: High-resolution canvas PNG snapshots, SVG exports, and structured JSON/CSV topology downloads."
        ],
        elaborations: [
            "Designed an HTML5 Canvas rendering pipeline bypassing React DOM reconciler bottlenecks to simulate and interact with thousands of interconnected nodes at 60 FPS.",
            "Implemented custom force algorithms balancing many-body repulsion, link constraints, centering biases, and velocity decay with alpha cooling controls.",
            "Integrated PGlite (PostgreSQL compiled to WebAssembly) and Kysely to run complex relational SQL queries completely client-side in the browser.",
            "Engineered client-side archive ingestion parsing raw exported LinkedIn ZIPs and GitHub repositories directly into typed graph schemas via Web Workers."
        ]
    },
    {
        id: 29,
        title: "Floorplanner 2D/3D",
        description: "Browser-based architectural design suite combining a 2D Konva CAD canvas with real-time Three.js 3D isometric rendering, dynamic wall-breaking, auto-fill packing algorithms, real-time carpet area calculation, and Gemini AI floorplan generation.",
        image: "/projects/floorplanner/images/floorplannersc1.jpg",
        images: [
            "/projects/floorplanner/images/floorplannersc1.jpg"
        ],
        demoUrl: "https://floorplanner-teal.vercel.app/",
        github: "https://github.com/himesh220002/Floorplaner",
        tags: ["Next.js 16", "React 19", "Konva", "React-Konva", "Three.js", "@react-three/fiber", "Zustand", "jsPDF", "Gemini AI"],
        slug: "floorplanner",
        category: "Web Development / CAD & 3D",
        lastUpdated: "Recently",
        featured: true,
        overview: "A professional browser-based architectural planning tool bridging high-precision 2D floorplan creation with real-time 3D walkthroughs. Architects and interior planners can construct walls, position doors, windows, and pillars, calculate carpet areas dynamically in imperial/metric units, generate optimal room layouts via packing algorithms, and walk through designs in textured 3D.",
        features: [
            "Dual 2D/3D Engine: Seamless live transition between 2D Konva vector canvas and 3D WebGL meshes via Three.js / React Three Fiber.",
            "Parametric Structural Tools: Dynamic wall constructor, wall breaker, pillar placement, multi-type gates, windows, and staircases.",
            "Auto-Fill Room Packing: Dagre-inspired proportional packing algorithm that arranges rooms automatically within custom carpet boundaries.",
            "Real-time Carpet Area Calculation: Sub-pixel measurement conversion (px → sq ft → sq m) with customizable wall and pillar thickness.",
            "AI Spec Generator: Integrated Gemini BYOK assistant translating architectural constraints into validated floorplan JSON schemas.",
            "Professional Blueprint Export: High-resolution 2x retina PNG snapshots, full JSON schema portability, and landscape architectural blueprint PDFs."
        ],
        elaborations: [
            "Constructed a high-precision 2D CAD canvas using Konva and React-Konva, supporting sub-pixel snapping, neighbor-edge collision, and dynamic coordinate transformations.",
            "Developed a 3D procedural extrusion pipeline with Three.js that converts 2D room polygons into volumetric 3D meshes with real-time shadow casting and PBR materials.",
            "Architected a centralized Zustand state machine coordinating 2D coordinate updates, unit conversions (ft/m), and undo/redo stacks with zero synchronization lag.",
            "Implemented an AI layout synthesis bridge utilizing Google Gemini to convert natural language architectural briefs into structured JSON room topologies."
        ]
    },
    {
        id: 30,
        title: "Toolip",
        description: "Universal Swiss-Army developer and productivity suite featuring 30+ browser-native micro-applications across PDF engineering, code conversion, multimedia manipulation, math/finance calculators, and real-time collaborative shared rooms with Socket.io and MongoDB.",
        image: "/projects/toolip/images/toolip1.png",
        images: [
            "/projects/toolip/images/toolip1.png",
            "/projects/toolip/images/toolipsc2.png"
        ],
        demoUrl: "https://toolip-three.vercel.app/",
        github: "https://github.com/himesh220002/Toolip",
        tags: ["Next.js 16", "React 18", "Express.js", "Socket.io", "MongoDB", "pdf-lib", "Mermaid.js", "Tailwind CSS"],
        slug: "toolip",
        category: "Web Development / Developer Tools",
        lastUpdated: "Recently",
        featured: true,
        overview: "A comprehensive, high-utility web suite containing 30+ browser-native micro-applications designed to solve everyday engineering, file processing, and productivity bottlenecks. Toolip integrates client-side WebAssembly document processing with a persistent Node.js/Socket.io backend for real-time multiplayer collaboration.",
        features: [
            "Document & PDF Studio: PDF Merger/Splitter, Image-to-PDF, Note-to-PDF, HTML-to-PDF, and dynamic Resume & Invoice formatters.",
            "Code & Data Suite: JSON Validator, Markdown-to-HTML converter, SVG Code Editor, Table ↔ CSV ↔ JSON converter, and Mermaid Mind Map editor.",
            "Multimedia Utilities: Passport Photo Maker & Editor, Photo Size Reducer, QR Code Generator, Text-to-Speech, and Speech-to-Text.",
            "Real-time Collaborative Rooms: Live multi-user synchronization powered by Socket.io, JWT authentication, and MongoDB Atlas room logging.",
            "Finance & Math Engines: Loan EMI calculators, portion-based bill splitters, percentage & CGPA calculators, and expense tracking.",
            "Client-Side Security: Sensitive documents processed directly in-browser using pdf-lib without uploading sensitive files to external servers."
        ],
        elaborations: [
            "Architected a modular Next.js application housing 30+ discrete utilities with shared UI primitives and isolated memory footprints.",
            "Implemented real-time room synchronization using Express and Socket.io, managing shared state broadcasts and persistent room audit trails in MongoDB.",
            "Utilized client-side pdf-lib and Web APIs to perform intensive document modifications locally, eliminating server compute costs and guaranteeing file privacy.",
            "Engineered interactive data transformation pipelines enabling seamless bidirectional translation across Table, CSV, JSON, and Mermaid syntax."
        ]
    },
    {
        id: 31,
        title: "IGVictory",
        description: "Serverless tactical gaming media platform and live telemetry relay hub featuring direct AWS S3 presigned video ingestion (bypassing 4.5MB serverless limits), CloudFront CDN edge delivery, Twitch embeds, tournament intel, and Discord ops alerts.",
        image: "/projects/igvictory/images/igvictorysc1.jpg",
        images: [
            "/projects/igvictory/images/igvictorysc1.jpg",
            "/projects/igvictory/images/igvictorysc2.jpg",

        ],
        demoUrl: "https://stream.cyphertech.online",
        github: "https://github.com/himesh220002/awsec2",
        tags: ["AWS Lambda", "Amazon S3", "CloudFront", "Express 5", "MongoDB Atlas", "Twitch API", "Discord Webhooks", "Tailwind CSS"],
        slug: "igvictory",
        category: "Web Portal / Gaming & Streaming",
        lastUpdated: "Recently",
        featured: true,
        overview: "A serverless gaming media distribution hub built to deliver high-bitrate video clips, live Twitch stream relays, esports telemetry, and community interaction. Built to overcome traditional cloud compute bottlenecks, IGVictory leverages AWS S3 presigned direct uploads, CloudFront edge caching with byte-range requests, and automated Discord operational webhooks.",
        features: [
            "Serverless Video Ingest: Bypasses the 4.5MB serverless payload limit via client-side multipart direct uploads to Amazon S3 using presigned URLs.",
            "Global Edge Video Streaming: Amazon CloudFront CDN distribution with HTTP byte-range request support for smooth high-definition playback.",
            "Twitch & Esports Integration: Live stream search, automated clip embeds, VOD archives, and tournament bracket telemetry.",
            "Admin Operations Suite: Protected video management portal with PIN authorization, real-time upload progress meters, and placement controls.",
            "Serverless Event-Driven Notifications: Instant push dispatch to private Discord ops channels for blog comments and incoming contact signals.",
            "Extreme SEO & Performance: Structured Schema.org JSON-LD, PWA web manifest, immutable 1-year asset caching, and sub-second load times."
        ],
        elaborations: [
            "Engineered an event-driven serverless ingestion pipeline solving the 4.5MB serverless upload barrier by issuing short-lived AWS S3 presigned URLs for client-side direct multipart streaming.",
            "Configured CloudFront CDN caching distributions supporting HTTP byte-range requests for lag-free video seeking and global edge latency under 30ms.",
            "Replaced resource-heavy persistent WebSocket connections with an optimized HTTP-pull and unawaited Discord webhook alert pattern, cutting idle infrastructure costs to zero.",
            "Implemented automated media compression workflows with Python image optimizers and Brotli/Gzip compression with 1-year immutable caching."
        ]
    }
];
