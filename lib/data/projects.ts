export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    tags: string[];
    slug: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        id: "1",
        title: "Yamaha Digital Showroom",
        description: "A premium showroom experience with real-time inventory management and virtual tour capabilities.",
        image: "/images/projects/yamaha streak ride april 2026.jpg",
        tags: ["React", "Node.js", "MongoDB", "Tailwind"],
        slug: "yamaha-showroom",
        featured: true
    },
    {
        id: "2",
        title: "EcoDrive Marketplace",
        description: "Multi-vendor car marketplace focusing on electric and hybrid vehicles with smart filtering.",
        image: "/images/projects/yamaha streak ride april 2026 2.jpg",
        tags: ["Next.js", "Clerk", "Stripe", "Prisma"],
        slug: "car-marketplace",
        featured: true
    },
    {
        id: "3",
        title: "SmileSync Portal",
        description: "Modern dental patient management system with automated scheduling and record tracking.",
        image: "/images/projects/yamaha streak ride april 2026 3.jpg",
        tags: ["React", "Express", "PostgreSQL", "Framer"],
        slug: "dental-project",
        featured: true
    },
    {
        id: "4",
        title: "Tech Nitro CRM",
        description: "Enterprise-level CRM solution for sales teams with integrated analytics and WhatsApp follow-ups.",
        image: "/images/projects/yamaha streak ride april 2026 4.jpg",
        tags: ["Next.js", "Socket.io", "Redis", "Tailwind"],
        slug: "tech-nitro",
        featured: false
    }
];
