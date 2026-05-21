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
        title: "Gridlock Marketplace",
        description: "Two-sided marketplace with seller onboarding, escrow payments, dispute resolution, and review system.",
        image: "https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&q=80&w=1200",
        tags: ["E-Commerce", "Next.js", "Stripe Connect", "AWS S3", "PostgreSQL"],
        slug: "gridlock-marketplace",
        github: "https://github.com/Himesh220002/gridlock-marketplace",
        featured: false,
        overview: "A highly robust, two-sided decentralized marketplace designed to orchestrate vendor onboarding, escrowed transaction flows, buyer protection features, and verification controls.",
        features: [
            "Interactive merchant onboarding flows leveraging Stripe Connect Custom",
            "Secure multi-day escrow fund locks with automatic buyer-seller release timers",
            "Comprehensive customer dispute resolution ticket pipeline and admin panel",
            "Distributed media assets upload system storing images securely on AWS S3"
        ],
        systemArchitecture: {
            frontend: "Next.js, Tailwind CSS, Radix UI, TanStack Query, Framer Motion",
            backend: "Node.js, Stripe API, AWS S3 Client SDK",
            database: "PostgreSQL with complex transactional locking",
            devops: "AWS ECS, Vercel, Route53, Sentry monitoring"
        },
        techStack: {
            frontend: ["Next.js", "Tailwind CSS", "Radix UI", "TanStack Query"],
            backend: ["Node.js", "Stripe Connect", "AWS S3 SDK"],
            database: ["PostgreSQL"],
            devops: ["AWS ECS", "Vercel", "Sentry"]
        },
        problemSolverAngle: [
            "Transaction Volume: scaled transactions to over $1.2M GMV in the first year of deployment",
            "Escrow safety: automated ledger validation guarantees zero funds escape lock without absolute buyer approval or admin override",
            "Media Storage: pre-signed edge URLs completely bypass main servers, preventing high-bandwidth network cost during multi-image listings upload"
        ]
    },
    {
        id: 2,
        title: "BrightLeaf Store",
        description: "Full e-commerce platform with Stripe payments, inventory management, and automated email flows.",
        image: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&q=80&w=1200",
        tags: ["E-Commerce", "Next.js", "Stripe", "PostgreSQL", "Vercel"],
        slug: "brightleaf-store",
        github: "https://github.com/Himesh220002/brightleaf-store",
        featured: false,
        overview: "A high-conversion multi-tier e-commerce ecosystem featuring complex subscription checkout flows, automated logistics management, and real-time inventory synchronization.",
        features: [
            "Seamless multi-product catalog with instant elastic filtering",
            "Secure subscription checkout and coupon system via Stripe Connect",
            "Real-time inventory adjustment logic with database locks to prevent double-buys",
            "Transactional customer notification flows via Resend and React Email"
        ],
        systemArchitecture: {
            frontend: "Next.js, Tailwind CSS, Radix UI, Framer Motion, React Server Components",
            backend: "Node.js, Stripe SDK, Resend Node",
            database: "PostgreSQL with Drizzle ORM",
            devops: "Vercel deployments, GitHub Actions, Sentry error tracking"
        },
        techStack: {
            frontend: ["Next.js", "Tailwind CSS", "Radix UI", "Framer Motion"],
            backend: ["Node.js", "Stripe Connect", "Resend API"],
            database: ["PostgreSQL", "Drizzle ORM"],
            devops: ["Vercel", "Sentry", "GitHub Actions"]
        },
        problemSolverAngle: [
            "Lighthouse Score: 96/100 performance ranking achieved through extensive edge server-side rendering",
            "Race conditions: database-level select-for-update locks completely eliminate inventory conflicts during checkout",
            "Automated flows: background cron tasks instantly sync shipping updates every 10 minutes"
        ]
    },
    {
        id: 3,
        title: "EcoDrive Marketplace",
        description: "Multi-vendor marketplace for electric and hybrid vehicles.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200",
        tags: ["E-Commerce", "Next.js", "Prisma", "Stripe", "Clerk"],
        slug: "ecodrive-marketplace",
        github: "https://github.com/Himesh220002/ecodrive",
        featured: false,
        overview: "A highly specialized two-sided e-commerce marketplace dedicated entirely to electric and hybrid vehicles, housing buyer-seller chats, escrow deposits, and dynamic EV specifications comparison.",
        features: [
            "Stripe Escrow payment integration protecting multi-million car trades",
            "Clerk-based authentication with instant customer verification checks",
            "Interactive specifications engine comparing battery life, range, and charge speeds",
            "Real-time chat messaging channels between buyers and auto-dealers"
        ],
        systemArchitecture: {
            frontend: "Next.js 14, Tailwind CSS, Shadcn UI, Framer Motion",
            backend: "Next.js Server Actions, Stripe SDK, Clerk Node SDK",
            database: "PostgreSQL, Prisma ORM, Neon DB serverless server",
            devops: "Vercel edge, Cloudflare routing, Sentry monitoring"
        },
        techStack: {
            frontend: ["Next.js", "Tailwind CSS", "Shadcn UI", "Framer Motion"],
            backend: ["Server Actions", "Stripe SDK", "Clerk SDK"],
            database: ["PostgreSQL", "Prisma ORM", "Neon DB"],
            devops: ["Vercel", "Cloudflare", "Sentry"]
        },
        problemSolverAngle: [
            "EV Commerce funnel: optimized customer multi-step checkout workflow to increase conversions by 28%",
            "Authentication: Clerk visual widgets customized completely to preserve dark premium glass theme aesthetics"
        ]
    },
    {
        id: 4,
        title: "Folkery Marketing Site",
        description: "High-performance marketing site with blog CMS, A/B testing tracks, and advanced SEO configuration.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200",
        tags: ["Web Apps", "Next.js", "Contentful", "Vercel"],
        slug: "folkery-marketing-site",
        github: "https://github.com/Himesh220002/folkery-marketing",
        featured: false,
        overview: "A premium marketing and content delivery system featuring headless CMS integration, visual static layout generation, and dynamic A/B test variations to drive conversions.",
        features: [
            "Headless content publishing integration via Contentful CMS",
            "A/B conversion split-testing using serverless Edge middleware",
            "Advanced technical SEO (sitemaps, JSON-LD schemas, instant indexing hooks)",
            "Fluid, stunning layouts utilizing Framer Motion and modern glassmorphism assets"
        ],
        systemArchitecture: {
            frontend: "Next.js 14, Tailwind CSS, Contentful Rich Text, Framer Motion",
            backend: "Next.js Edge Middleware for A/B testing, Contentful Webhooks",
            database: "Contentful Headless CMS",
            devops: "Vercel with static site incremental regeneration (ISR)"
        },
        techStack: {
            frontend: ["Next.js", "Tailwind CSS", "Framer Motion", "Radix UI"],
            backend: ["Next.js Edge API", "Contentful SDK"],
            database: ["Contentful CMS"],
            devops: ["Vercel", "Edge Middleware"]
        },
        problemSolverAngle: [
            "Traffic surge: SEO optimization and schema modeling increased organic traffic by +140%",
            "Publishing speed: ISR setup triggers page updates within 10 seconds of CMS save events",
            "Split testing: layout alterations are chosen instantly at the Edge, ensuring zero Cumulative Layout Shift (CLS)"
        ]
    },
    {
        id: 5,
        title: "dBank Decentralized Banking",
        description: "Decentralized banking & investment platform built on Internet Computer (IC).",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=1200",
        tags: ["Dashboards", "React", "Motoko", "Internet Computer", "Web3"],
        slug: "dbank-banking",
        github: "https://github.com/Himesh220002/dbank",
        featured: false,
        overview: "A premium Web3 decentralized finance (DeFi) banking and investment terminal allowing users to supply assets, gain yields, and borrow funds directly on-chain.",
        features: [
            "Secure ledger balance updates completely on-chain",
            "Decentralized Web3 wallet connection and digital signatures check",
            "Real-time yield calculation dashboard with dynamic compounding rates",
            "Fast smart contract ledger actions utilizing Motoko canisters"
        ],
        systemArchitecture: {
            frontend: "React, CSS Modules, Dfinity Agent SDK, Web3 Wallet SDKs",
            backend: "Motoko Smart Contracts running on Internet Computer",
            database: "On-chain state variables / canisters storage",
            devops: "Dfinity IC mainnet deployment, local dfx environment"
        },
        techStack: {
            frontend: ["React.js", "CSS Modules", "Dfinity Agent"],
            backend: ["Motoko Smart Contracts"],
            database: ["IC Canister State"],
            devops: ["Internet Computer", "DFX CLI"]
        },
        problemSolverAngle: [
            "Secure DeFi: Motoko multi-signature asset lock canisters guarantee zero structural leak vulnerability",
            "Web3 Latency: customized local optimistic state caching shows transaction updates instantly while block consensus resolves in 2 seconds"
        ]
    },
    {
        id: 6,
        title: "Dr. Tooth Dental Clinic",
        description: "Full-stack dental clinic management platform bridging patients and modern care.",
        image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=1200",
        tags: ["Web Apps", "Next.js", "Node.js", "MongoDB", "Socket.io"],
        slug: "dr-tooth",
        github: "https://github.com/Himesh220002/dr-tooth",
        featured: false,
        overview: "An all-in-one dental practice management platform connecting clinics and patients. Includes automatic SMS notification schedules, patient charts, digital booking, and custom billing.",
        features: [
            "Transparent booking system with immediate dentist calendars check",
            "Real-time notifications and dental chair scheduling updates",
            "Comprehensive EHR (Electronic Health Record) dental charting panels",
            "Automated appointment WhatsApp and SMS reminders"
        ],
        systemArchitecture: {
            frontend: "Next.js, Tailwind CSS, Radix UI, Axios, TanStack Query",
            backend: "Node.js, Express, Socket.io, Twilio SMS API",
            database: "MongoDB with Mongoose, Redis for appointment locks",
            devops: "Vercel, Heroku, GitHub Actions"
        },
        techStack: {
            frontend: ["Next.js", "Tailwind CSS", "Radix UI", "TanStack Query"],
            backend: ["Node.js", "Express.js", "Socket.io", "Twilio API"],
            database: ["MongoDB", "Mongoose", "Redis"],
            devops: ["Vercel", "Heroku", "GitHub Actions"]
        },
        problemSolverAngle: [
            "Transparent booking: double-booking rate completely eliminated to 0% via custom booking window locks",
            "Notifications: Twilio background schedule handlers reduced missed client schedules by 34%"
        ]
    },
    {
        id: 7,
        title: "Stackline Analytics",
        description: "Real-time data platform processing 2M+ events/day. Custom charts, drill-down reports, and multi-tenant access.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
        tags: ["Dashboards", "Next.js", "Node.js", "PostgreSQL", "Recharts"],
        slug: "stackline-analytics",
        github: "https://github.com/Himesh220002/stackline-analytics",
        featured: true,
        overview: "A premium multi-tenant real-time data ingestion and analytics platform capable of processing 2M+ events per day with robust visualizations, customized reports, and zero-latency analytics pipelines.",
        features: [
            "Real-time event processing stream at scale",
            "Custom dynamic charts with drill-down reporting",
            "Multi-tenant data isolation and role-based access control",
            "Automatic daily summary emails and PDF report exporting"
        ],
        systemArchitecture: {
            frontend: "Next.js 14, React, Tailwind CSS, Recharts, Framer Motion, Axios",
            backend: "Node.js, Express.js, Socket.io, BullMQ queue management",
            database: "PostgreSQL with Prisma ORM, Redis for session caching",
            devops: "Vercel, AWS RDS, Docker, GitHub Actions CI/CD"
        },
        techStack: {
            frontend: ["Next.js", "React", "Tailwind CSS", "Recharts", "Framer Motion"],
            backend: ["Node.js", "Express.js", "Socket.io", "BullMQ"],
            database: ["PostgreSQL", "Prisma ORM", "Redis"],
            devops: ["AWS RDS", "Docker", "Vercel", "GitHub Actions"]
        },
        problemSolverAngle: [
            "Data Ingestion: custom queue pipeline handles up to 3,000 requests/sec cleanly",
            "Multi-tenancy: schema-based structural isolation prevents any cross-tenant leaks",
            "Interactive Charts: client-side memoized graphs support visual analysis across 100K+ data points without layout lag"
        ]
    },
    {
        id: 8,
        title: "AI Chat-Bot",
        description: "Full-stack AI chatbot with real-time chat and GPT integration.",
        image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=1200",
        tags: ["Web Apps", "React", "OpenAI", "GraphQL", "Nhost"],
        slug: "ai-chatbot",
        github: "https://github.com/Himesh220002/ai-chatbot",
        featured: false,
        overview: "A scalable, real-time AI assistant integration platform built on OpenAI APIs, supporting multi-agent switching, transactional chat history, and seamless customer CRM mapping.",
        features: [
            "Custom agent creation tools with specialized system prompt instructions",
            "Real-time message streaming responses from OpenAI GPT models",
            "GraphQL queries and subscriptions to handle live sync across sessions",
            "Custom dashboard tracking AI tokens consumption and request rates"
        ],
        systemArchitecture: {
            frontend: "React.js, Tailwind CSS, Apollo GraphQL Client, Tailwind CSS",
            backend: "Nhost serverless functions, OpenAI SDK",
            database: "Postgres database layer provided by Nhost, Hasura GraphQL engine",
            devops: "Nhost platform cloud deployments, GitHub integrations"
        },
        techStack: {
            frontend: ["React.js", "Tailwind CSS", "Apollo Client"],
            backend: ["Serverless Functions", "OpenAI API", "Nhost SDK"],
            database: ["Postgres", "Hasura GraphQL"],
            devops: ["Nhost Cloud", "GitHub"]
        },
        problemSolverAngle: [
            "Conversational AI: customized streaming parsers to instantly show text chunks without waiting for complete GPT generation",
            "GraphQL layer: Hasura subscriptions instantly synchronize chat listings across tablet, desktop, and mobile devices in real time"
        ]
    },
    {
        id: 9,
        title: "Noxbridge Admin",
        description: "Enterprise admin portal with RBAC, audit logs, user management, and bulk data operations.",
        image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200",
        tags: ["Dashboards", "React", "Node.js", "PostgreSQL", "TypeScript"],
        slug: "noxbridge-admin",
        github: "https://github.com/Himesh220002/noxbridge-admin",
        featured: false,
        overview: "An enterprise-grade administrative backbone serving internal operations with robust user access policies, detailed audit logs, and optimized bulk file import/export capabilities.",
        features: [
            "Granular Role-Based Access Control (RBAC) with secure authorization guards",
            "Comprehensive immutable operation audit logging to ensure regulatory compliance",
            "Advanced bulk importing of CSV/Excel data using workers for background processing",
            "Interactive search and filtering controls over millions of database records"
        ],
        systemArchitecture: {
            frontend: "React, Vite, TypeScript, Tailwind CSS, TanStack Table, Axios",
            backend: "Node.js, Express, TypeScript, JWT, Multer for file uploads",
            database: "PostgreSQL with custom audit schemas",
            devops: "AWS Elastic Beanstalk, Docker, GitHub Actions"
        },
        techStack: {
            frontend: ["React", "Vite", "TypeScript", "Tailwind CSS", "TanStack Table"],
            backend: ["Node.js", "Express.js", "TypeScript", "JWT"],
            database: ["PostgreSQL"],
            devops: ["Docker", "AWS Beanstalk", "GitHub Actions"]
        },
        problemSolverAngle: [
            "User Scale: handles secure routing and administration workflows for over 50,000 active staff users",
            "Bulk Import: parsed records are chunked and written concurrently, making a 50K CSV load execute under 3 seconds",
            "Security: single-session enforcement and JWT token rotation protect operations against unauthorized hijacks"
        ]
    },
    {
        id: 10,
        title: "MyWeb Portfolio",
        description: "Personal portfolio and knowledge hub showcasing projects and skills.",
        image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=1200",
        tags: ["Web Apps", "Next.js", "TypeScript", "Supabase", "GitHub Actions"],
        slug: "myweb-portfolio",
        github: "https://github.com/Himesh220002/myweb",
        featured: false,
        overview: "A high-performance personal portfolio, developer knowledge base, and live metrics tracker displaying real-time GitHub commits and system skill ratings.",
        features: [
            "Dynamic dashboard charting project metrics and commits live",
            "Interactive visual skills map highlighting structural competencies",
            "Serverless visitor contact logging and tracking dashboard",
            "Automatic CI/CD deployment verification checks"
        ],
        systemArchitecture: {
            frontend: "Next.js, TypeScript, Tailwind CSS, Framer Motion, Radix UI",
            backend: "Next.js Route Handlers, Supabase JS Client, GitHub API Integration",
            database: "Supabase PostgreSQL database layer",
            devops: "Vercel deployments, GitHub Actions workflow pipelines"
        },
        techStack: {
            frontend: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
            backend: ["Route Handlers", "GitHub API", "Supabase SDK"],
            database: ["Supabase PostgreSQL"],
            devops: ["Vercel", "GitHub Actions"]
        },
        problemSolverAngle: [
            "Transparent skill mapping: dynamic SVGs adjust weights based on project tags dynamically from Supabase database",
            "Load time: achieved absolute 100/100 Lighthouse performance metrics via static build generation (SSG) models"
        ]
    },

    {
        id: 11,
        title: "Routemaster SaaS",
        description: "Multi-tenant logistics SaaS with route optimization, driver tracking, and real-time dispatch.",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=1200",
        tags: ["Web Apps", "React", "Node.js", "AWS", "Docker"],
        slug: "routemaster-saas",
        github: "https://github.com/Himesh220002/routemaster-saas",
        featured: false,
        overview: "A production-grade fleet routing and dispatch platform designed for complex delivery tracking, automated driver assignments, and visual route mapping.",
        features: [
            "AI-powered dynamic routing utilizing OpenStreetMap APIs",
            "Live real-time driver geolocation updates via WebSocket connections",
            "Interactive dispatch control panel with drag-and-drop map markers",
            "Automated vehicle capacity optimization algorithm"
        ],
        systemArchitecture: {
            frontend: "React, Vite, Tailwind CSS, Leaflet Maps, Socket.io-client",
            backend: "Node.js, Express, Socket.io server, dynamic OSRM engine",
            database: "PostgreSQL with PostGIS extension",
            devops: "Docker containerization, AWS EC2, AWS ECS, Route53"
        },
        techStack: {
            frontend: ["React", "Vite", "Tailwind CSS", "Leaflet Maps"],
            backend: ["Node.js", "Express.js", "Socket.io", "OSRM API"],
            database: ["PostgreSQL", "PostGIS"],
            devops: ["Docker", "AWS ECS", "AWS EC2"]
        },
        problemSolverAngle: [
            "Route Planning: proprietary TSP algorithm reduces route planning time by 3x",
            "Real-time Tracking: customized WebSocket throttling keeps server network bandwidth minimal even with 1,000+ active drivers",
            "Spatial Data: PostGIS indexing makes searching nearby drivers within 5km execute in under 4ms"
        ]
    },
    {
        id: 12,
        title: "Yamaha Digital Showroom",
        description: "A premium showroom platform with real-time inventory management and immersive 3D tours.",
        image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=1200",
        tags: ["Web Apps", "Next.js", "Node.js", "MongoDB", "Tailwind"],
        slug: "yamaha-showroom",
        github: "https://github.com/Himesh220002/yamaha-showroom",
        featured: false,
        overview: "A high-end interactive digital showroom for Yamaha motorcycles, featuring immersive virtual tours, personalized configuration tools, and live inventory sync with local dealerships.",
        features: [
            "Automated dealer inventory management and sync pipelines",
            "Dynamic 3D model customization and configuration module",
            "Dealers dashboard with analytics, leads management, and dispatch tools",
            "Integrated payment gate for secure digital pre-booking deposits"
        ],
        systemArchitecture: {
            frontend: "Next.js, React, Tailwind CSS, Three.js / React Three Fiber",
            backend: "Node.js, Express, Socket.io for live dealer updates",
            database: "MongoDB with Mongoose ODM, Redis for cached inventory catalog",
            devops: "AWS ECS, Cloudflare CDN, Docker containers"
        },
        techStack: {
            frontend: ["Next.js", "React", "Tailwind CSS", "Three.js"],
            backend: ["Node.js", "Express.js", "Socket.io"],
            database: ["MongoDB", "Mongoose", "Redis"],
            devops: ["AWS ECS", "Cloudflare", "Docker"]
        },
        problemSolverAngle: [
            "Virtual Tours: optimized WebGL bundle sizes down by 45% for instant mobile loads",
            "Inventory sync: transactional cron routines sync 50+ local dealer systems under 15 seconds"
        ]
    },





];
