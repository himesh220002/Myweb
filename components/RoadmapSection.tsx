import React from 'react';
import {
  Lightbulb,
  Layout,
  Server,
  Database,
  Link as LinkIcon,
  Cloud,
  ShieldCheck,
  TrendingUp,
  Cpu,
  RefreshCw
} from 'lucide-react';

const roadmapPhases = [
  {
    id: 1,
    title: "Discovery & Strategy",
    description: "Deep dive into business logic, user flows, and product architecture. We blueprint the entire digital experience before writing a single line of code.",
    icon: <Lightbulb className="w-8 h-8" />,
    tech: ["Figma", "Miro", "Notion"],
    color: "from-blue-500 to-cyan-400",
    shadow: "shadow-blue-500/20"
  },
  {
    id: 2,
    title: "UI/UX Design",
    description: "Crafting striking, accessible, and high-conversion interfaces. We use micro-interactions and glassmorphism to build premium aesthetics.",
    icon: <Layout className="w-8 h-8" />,
    tech: ["Framer", "TailwindCSS", "Adobe CC"],
    color: "from-purple-500 to-pink-400",
    shadow: "shadow-purple-500/20"
  },
  {
    id: 3,
    title: "Frontend Architecture",
    description: "Engineering blazing-fast, server-rendered applications that deliver instant load times and unparalleled interactivity.",
    icon: <Cpu className="w-8 h-8" />,
    tech: ["Next.js", "React", "TypeScript"],
    color: "from-emerald-500 to-teal-400",
    shadow: "shadow-emerald-500/20"
  },
  {
    id: 4,
    title: "Backend Systems",
    description: "Developing robust, scalable backend services capable of handling millions of requests with complex business logic and real-time processing.",
    icon: <Server className="w-8 h-8" />,
    tech: ["Node.js", "Python", "Go"],
    color: "from-amber-500 to-orange-400",
    shadow: "shadow-amber-500/20"
  },
  {
    id: 5,
    title: "Database & Caching",
    description: "Architecting high-performance data layers with optimal indexing, relational modeling, and in-memory caching for lightning-fast queries.",
    icon: <Database className="w-8 h-8" />,
    tech: ["PostgreSQL", "MongoDB", "Redis"],
    color: "from-rose-500 to-red-400",
    shadow: "shadow-rose-500/20"
  },
  {
    id: 6,
    title: "API & Integrations",
    description: "Connecting third-party services, payment gateways, and AI models via secure, type-safe APIs.",
    icon: <LinkIcon className="w-8 h-8" />,
    tech: ["GraphQL", "REST", "OpenAI"],
    color: "from-indigo-500 to-blue-400",
    shadow: "shadow-indigo-500/20"
  },
  {
    id: 7,
    title: "DevOps & Cloud",
    description: "Containerizing applications and setting up automated CI/CD pipelines for zero-downtime deployments to enterprise cloud environments.",
    icon: <Cloud className="w-8 h-8" />,
    tech: ["Docker", "AWS", "GitHub Actions"],
    color: "from-fuchsia-500 to-purple-400",
    shadow: "shadow-fuchsia-500/20"
  },
  {
    id: 8,
    title: "Security & Testing",
    description: "Implementing bank-grade encryption, OAuth authentication, and rigorous automated testing to ensure platform stability.",
    icon: <ShieldCheck className="w-8 h-8" />,
    tech: ["Cypress", "Jest", "JWT"],
    color: "from-teal-500 to-emerald-400",
    shadow: "shadow-teal-500/20"
  },
  {
    id: 9,
    title: "SEO & Analytics",
    description: "Optimizing Core Web Vitals and injecting dynamic metadata to dominate search engines and track granular user behavior.",
    icon: <TrendingUp className="w-8 h-8" />,
    tech: ["Next SEO", "Lighthouse", "Mixpanel"],
    color: "from-orange-500 to-amber-400",
    shadow: "shadow-orange-500/20"
  },
  {
    id: 10,
    title: "Scale & Maintenance",
    description: "Continuous monitoring, automated database backups, and proactive infrastructure scaling to handle exponential user growth.",
    icon: <RefreshCw className="w-8 h-8" />,
    tech: ["Datadog", "Sentry", "Kubernetes"],
    color: "from-cyan-500 to-blue-400",
    shadow: "shadow-cyan-500/20"
  }
];

export default function RoadmapSection() {
  return (
    <section className="relative min-h-[200vh] w-full bg-[#0a0a0f] overflow-hidden selection:bg-blue-500/30">

      {/* Top Curvy Layered Transition (White to Dark) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg className="relative block w-full h-[60px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#ffffff" fillOpacity="0.05" d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
          <path fill="#ffffff" fillOpacity="1" d="M0,96L120,90.7C240,85,480,75,720,90.7C960,107,1200,149,1320,170.7L1440,192L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z"></path>
        </svg>
      </div>

      <div className="relative max-w-[1600px] mx-auto px-6 lg:px-8 py-40">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-32 mt-8">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Process</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed">
            From the initial spark of strategy to a globally scaled deployment, explore the rigorous engineering and premium design pipeline that powers our digital products.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">

          {/* Vertical Dotted Snake Timeline (Background) */}
          <div
            className="absolute left-8 md:left-1/2 top-0 bottom-0 w-32 -translate-x-1/2 pointer-events-none opacity-30 z-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='128' height='400' viewBox='0 0 128 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M64,0 C128,100 0,300 64,400' stroke='white' stroke-width='3' stroke-dasharray='10,12' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat-y',
              backgroundSize: '100% 400px'
            }}
          />

          {/* Roadmap Nodes */}
          <div className="space-y-12 md:space-y-24 relative z-10">
            {roadmapPhases.map((phase, index) => {
              // Empty space is rendered first, Content Card is rendered second.
              // So if md:flex-row, Card is on the RIGHT.
              const isCardOnRight = index % 2 === 0;

              return (
                <div
                  key={phase.id}
                  className={`relative flex flex-col md:flex-row items-center justify-between md:justify-normal group ${isCardOnRight ? "md:flex-row" : "md:flex-row-reverse"
                    }`}
                >

                  {/* Central Node (Sphere) */}
                  <div className="absolute left-8 md:left-1/2 w-6 h-6 md:w-8 md:h-8 rounded-full bg-slate-100 shadow-[inset_-3px_-3px_6px_rgba(0,0,0,0.2),_0_0_15px_rgba(255,255,255,0.3)] transform -translate-x-1/2 z-20 transition-transform duration-500 group-hover:scale-125 group-hover:bg-white" />

                  {/* Horizontal Connector Line (Only visible on desktop) */}
                  <div className={`hidden md:block absolute top-1/2 h-0 border-t-[3px] border-dotted border-white/30 transition-colors duration-500 group-hover:border-white/70 z-10 w-12 lg:w-20 ${
                    isCardOnRight ? "left-1/2" : "right-1/2"
                  }`} />

                  {/* Empty space for alternating layout on desktop */}
                  <div className="hidden md:flex w-1/2 relative items-center justify-center"></div>

                  {/* Content Card Area */}
                  <div className={`w-full md:w-1/2 pl-20 md:pl-0 flex ${isCardOnRight ? "md:pl-12 lg:pl-20 justify-start" : "md:pr-12 lg:pr-20 justify-end"
                    }`}>

                    <div className="relative w-full max-w-xl group-hover:-translate-y-2 transition-transform duration-500">

                      {/* Floating Step Badge (Top overlapping) */}
                      <div className={`absolute -top-5 ${!isCardOnRight ? 'md:right-8 left-8 md:left-auto' : 'left-8'} z-30 px-5 py-2 rounded-xl bg-gradient-to-r ${phase.color} text-white font-black text-sm tracking-wider shadow-lg ${phase.shadow}`}>
                        STEP {(phase.id < 10 ? '0' : '')}{phase.id}
                      </div>

                      {/* Pointed Card Shape */}
                      <div
                        className="relative bg-slate-900 shadow-2xl overflow-hidden p-[2px]"
                        style={{
                          clipPath: !isCardOnRight
                            ? 'polygon(0 0, 93% 0, 100% 50%, 93% 100%, 0 100%)' // Card on Left, points Right
                            : 'polygon(7% 0, 100% 0, 100% 100%, 7% 100%, 0 50%)'  // Card on Right, points Left
                        }}
                      >
                        {/* Gradient Border effect layer */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${phase.color} opacity-40 group-hover:opacity-100 transition-opacity duration-500`} />

                        {/* Inner dark card */}
                        <div
                          className="relative h-full w-full bg-[#11111a] p-8 md:p-10 flex flex-col md:flex-row gap-6 items-start"
                          style={{
                            clipPath: !isCardOnRight
                              ? 'polygon(0 0, 92.5% 0, 99.5% 50%, 92.5% 100%, 0 100%)'
                              : 'polygon(7.5% 0, 100% 0, 100% 100%, 7.5% 100%, 0.5% 50%)'
                          }}
                        >
                          {/* Inner soft glow */}
                          <div className={`absolute -inset-24 bg-gradient-to-br ${phase.color} rounded-full blur-[80px] opacity-10 group-hover:opacity-20 transition-opacity duration-700`} />

                          {/* Icon container */}
                          <div className="shrink-0 mt-2">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 shadow-inner group-hover:text-white transition-colors duration-500">
                              {phase.icon}
                            </div>
                          </div>

                          {/* Text content */}
                          <div className="relative z-10 flex-1">
                            <h3 className="text-2xl font-bold text-white mb-3 mt-1">
                              {phase.title}
                            </h3>
                            <p className="text-slate-400 leading-relaxed mb-6 text-sm md:text-base">
                              {phase.description}
                            </p>

                            {/* Tech Stack Pills */}
                            <div className="flex flex-wrap gap-2">
                              {phase.tech.map(tech => (
                                <span
                                  key={tech}
                                  className="px-3 py-1.5 rounded-lg bg-black/40 border border-white/5 text-slate-300 text-xs font-semibold uppercase tracking-wider"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Curvy Layered Transition (Dark to White) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none">
        <svg className="relative block w-full h-[60px] md:h-[120px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path fill="#ffffff" fillOpacity="0.05" d="M0,256L120,245.3C240,235,480,213,720,213.3C960,213,1200,235,1320,245.3L1440,256L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
          <path fill="#ffffff" fillOpacity="1" d="M0,192L120,197.3C240,203,480,213,720,197.3C960,181,1200,139,1320,117.3L1440,96L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path>
        </svg>
      </div>

    </section>
  );
}
