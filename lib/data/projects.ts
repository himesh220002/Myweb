export interface Project {
    id: number;
    title: string;
    description: string;
    image: string;
    tags: string[];
    slug: string;
    github: string;
    featured?: boolean;
    overview: string;
    features: string[];
    systemArchitecture: {
        frontend: string;
        backend: string;
        database?: string;
        devops?: string;
    };
    techStack: {
        frontend: string[];
        backend: string[];
        database?: string[];
        devops?: string[];
    };
    problemSolverAngle: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Yamaha Digital Showroom",
        description: "A premium showroom platform with real-time inventory management and immersive 3D tours.",
        image: "https://images.unsplash.com/photo-1547549082-6bc09f2049ae?q=80&w=1171",
        tags: ["Next.js", "Node.js", "MongoDB", "Tailwind"],
        slug: "yamaha-showroom",
        github: "https://github.com/Himesh220002/bikeShowroom",
        featured: true,
        overview: "A premium showroom platform with real-time inventory management and immersive 3D tours designed to scale multi-tenant dealership workflows.",
        features: [
            "Real-time inventory subtraction and updates",
            "Virtual showroom with 3D visualization",
            "CRM integration for customer LTV tracking",
            "Secure admin workflows with JWT + Passport"
        ],
        systemArchitecture: {
            frontend: "Next.js, React, Tailwind CSS, Framer Motion, Three.js, Recharts, Socket.io-client",
            backend: "Node.js, Express.js, MongoDB, JWT, Passport, Socket.io, Multer, Zod",
            devops: "TypeScript, GitHub Actions, Jest, Vercel"
        },
        techStack: {
            frontend: ["Next.js", "React", "Tailwind CSS", "Three.js", "Framer Motion", "Socket.io-client"],
            backend: ["Node.js", "Express.js", "MongoDB", "JWT", "Passport", "Socket.io"],
            devops: ["TypeScript", "GitHub Actions", "Jest", "Vercel"]
        },
        problemSolverAngle: [
            "Automated inventory management: prevents stock discrepancies",
            "CRM sync: tracks customer lifetime value automatically",
            "Real-time updates: instant synchronization across all connected clients",
            "Secure admin recovery: robust master password and recovery logic"
        ]
    },
    {
        id: 2,
        title: "Dr. Tooth Dental Clinic",
        description: "Full-stack dental clinic management platform bridging patients and modern care.",
        image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=1200",
        tags: ["Next.js", "Node.js", "MongoDB", "Socket.io"],
        slug: "dr-tooth",
        github: "https://github.com/Himesh220002/dentalProject",
        featured: true,
        overview: "A full-stack dental clinic management platform designed to modernize patient care and streamline clinic operations through real-time synchronization and transparent communication.",
        features: [
            "Smart patient booking with slot validation",
            "Real-time admin alerts via Socket.io",
            "Communication hub (WhatsApp, Mailgun, notifications)",
            "Analytics dashboard for revenue and performance"
        ],
        systemArchitecture: {
            frontend: "Next.js, React 19, Tailwind CSS, Framer Motion, Socket.io-client, Axios",
            backend: "Node.js, Express.js, Socket.io, Mailgun",
            database: "MongoDB Atlas + Mongoose"
        },
        techStack: {
            frontend: ["Next.js", "React 19", "Tailwind CSS", "Framer Motion", "Socket.io-client"],
            backend: ["Node.js", "Express.js", "Socket.io", "Mailgun"],
            database: ["MongoDB Atlas", "Mongoose"]
        },
        problemSolverAngle: [
            "Transparent booking: prevents double-booking with slot validation",
            "Proactive communication: integrated WhatsApp and email alerts",
            "Instant synchronization: real-time updates for clinic admins",
            "Trust-building: visual treatment catalog for patient transparency"
        ]
    },
    {
        id: 3,
        title: "EcoDrive Marketplace",
        description: "Multi-vendor marketplace for electric and hybrid vehicles.",
        image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=1200",
        tags: ["Next.js", "Prisma", "Stripe", "Clerk"],
        slug: "ecodrive",
        github: "https://github.com/Himesh220002/car-marketplace-web-app",
        featured: true,
        overview: "A multi-vendor marketplace for electric and hybrid vehicles designed to provide a future-proof funnel for EV commerce.",
        features: [
            "Vendor onboarding and smart filtering",
            "Secure payments via Stripe integration",
            "Authentication with Clerk",
            "Profile and listing management"
        ],
        systemArchitecture: {
            frontend: "Next.js, React, Tailwind CSS, TypeScript, Vite",
            backend: "Node.js, Express, Clerk auth, Stripe payments",
            database: "Prisma ORM, Drizzle, PostgreSQL",
            devops: "Vercel deployment, ESLint, Vitest"
        },
        techStack: {
            frontend: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
            backend: ["Node.js", "Express", "Stripe", "Clerk"],
            database: ["PostgreSQL", "Prisma", "Drizzle"]
        },
        problemSolverAngle: [
            "EV Commerce funnel: future-proof specialized marketplace",
            "Secure transactions: multi-vendor support with Stripe integration",
            "Scalable filtering: smart search and attribute management",
            "Robust authentication: secure identity management via Clerk"
        ]
    },
    {
        id: 4,
        title: "MyWeb Portfolio",
        description: "Personal portfolio and knowledge hub showcasing projects and skills.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
        tags: ["Next.js", "TypeScript", "Supabase", "GitHub Actions"],
        slug: "myweb-portfolio",
        github: "https://github.com/Himesh220002/Myweb",
        featured: false,
        overview: "A high-performance portfolio and knowledge hub showcasing elite project delivery and modern UI visualization.",
        features: [
            "Project showcase with GitHub integration",
            "Skill mapping with technical depth focus",
            "CI/CD pipelines with GitHub Actions",
            "Theme-aware premium styling"
        ],
        systemArchitecture: {
            frontend: "Next.js, React, Tailwind CSS, TypeScript",
            backend: "Supabase (auth + DB), Prisma",
            devops: "GitHub Actions, Jest, Vercel"
        },
        techStack: {
            frontend: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
            backend: ["Supabase", "Prisma"],
            devops: ["GitHub Actions", "Vercel", "Jest"]
        },
        problemSolverAngle: [
            "Transparent skill mapping: shows both tech depth and business impact",
            "Automated deployments: continuous delivery via GitHub Actions",
            "Modern UI: premium visual language with high-performance animations"
        ]
    },
    {
        id: 5,
        title: "AI Chat-Bot",
        description: "Full-stack AI chatbot with real-time chat and GPT integration.",
        image: "https://plus.unsplash.com/premium_photo-1677094310919-d0361465d3be?q=80&w=1632",
        tags: ["React", "OpenAI", "GraphQL", "Nhost"],
        slug: "ai-chatbot",
        github: "https://github.com/Himesh220002/Chat-Bot",
        featured: false,
        overview: "A full-stack AI chatbot platform featuring real-time communication and GPT integration for intelligent automated responses.",
        features: [
            "AI-generated responses via OpenAI API",
            "Real-time chat with GraphQL subscriptions",
            "Secure auth with Nhost integration",
            "Automatic chat title generation"
        ],
        systemArchitecture: {
            frontend: "React, Tailwind CSS, Apollo Client",
            backend: "Render serverless functions, OpenAI API",
            database: "Nhost (Postgres + Auth)",
            devops: "Netlify (frontend), Render (backend)"
        },
        techStack: {
            frontend: ["React", "Tailwind CSS", "Apollo Client"],
            backend: ["OpenAI API", "Node.js"],
            database: ["PostgreSQL", "Hasura"],
            devops: ["Nhost", "Netlify", "Render"]
        },
        problemSolverAngle: [
            "Conversational AI: intelligent real-time problem solving",
            "Secure sessions: managed identity and persistence via Nhost",
            "Real-time sync: GraphQL subscriptions for zero-latency chat"
        ]
    },
    {
        id: 6,
        title: "dBank Decentralized Banking",
        description: "Decentralized banking & investment platform built on Internet Computer (IC).",
        image: "https://plus.unsplash.com/premium_photo-1764687821121-4bc8fceac197?q=80&w=1632",
        tags: ["React", "Motoko", "Internet Computer", "Web3"],
        slug: "dbank",
        github: "https://github.com/Himesh220002/dBank",
        featured: false,
        overview: "A decentralized banking and investment platform built on the Internet Computer (IC), featuring a multi-asset marketplace and interactive portfolio management.",
        features: [
            "Decentralized wallet for tokens",
            "Multi-asset marketplace (crypto, forex, commodities)",
            "Interactive portfolio with Recharts",
            "Goal management with auto-compounding"
        ],
        systemArchitecture: {
            frontend: "React, Vite, TypeScript, Tailwind CSS",
            backend: "Motoko (IC native language)",
            devops: "Internet Computer DFX, Recharts, Lucide"
        },
        techStack: {
            frontend: ["React", "Vite", "TypeScript", "Tailwind CSS"],
            backend: ["Motoko"],
            devops: ["Internet Computer SDK", "DFX"]
        },
        problemSolverAngle: [
            "Secure DeFi: decentralized identity and transaction security",
            "Multi-asset investment: unified platform for diverse assets",
            "Real-time tracking: goal-driven financial planning with auto-compounding"
        ]
    }
];
