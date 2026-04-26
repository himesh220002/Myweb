import React from "react";
import Link from "next/link";
import { projects } from "@/lib/data/projects";
import { 
  Sparkles, 
  Rocket, 
  ExternalLink, 
  Layout, 
  ArrowRight,
  Monitor,
  Smartphone,
  CheckCircle2
} from "lucide-react";

export const metadata = {
  title: "Project Demos | CypherTech",
  description: "Explore interactive demos and pitch flows of our elite project deliveries.",
};

// Demos that are currently active
const activeDemos = [
  {
    slug: "dr-tooth",
    path: "/demo/dental",
    label: "Pitch Flow Demo"
  }
];

export default function DemoIndexPage() {
  return (
    <div className="min-h-screen bg-background pb-32">
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-primary/20 blur-[150px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[150px] rounded-full" />
        </div>

        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary animate-fade-in">
              <Rocket className="w-4 h-4" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase">Interactive Laboratory</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-foreground leading-none">
              Elite Project <span className="text-gradient">Demos</span>
            </h1>
            
            <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto font-medium">
              A curated collection of live demonstrations, pitch flows, and technical deep-dives for our high-impact solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Demos Grid */}
      <section>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => {
              const demo = activeDemos.find(d => d.slug === project.slug);
              
              return (
                <div 
                  key={project.id}
                  className="group relative h-full"
                >
                  <div className="h-full glass-card rounded-[2.5rem] overflow-hidden flex flex-col transition-all duration-500 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/10">
                    {/* Thumbnail Area */}
                    <div className="relative h-56 overflow-hidden">
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                      
                      {demo ? (
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-primary/90 text-white text-[10px] font-black uppercase tracking-widest flex items-center gap-2 backdrop-blur-md shadow-lg">
                          <div className="live-dot" />
                          Live Demo Available
                        </div>
                      ) : (
                        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-muted/90 text-muted-foreground text-[10px] font-bold uppercase tracking-widest backdrop-blur-md border border-border/50">
                          Case Study Only
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-grow flex-col">
                      <div className="flex items-center gap-2 mb-4">
                        {project.tags.slice(0, 2).map(tag => (
                          <span key={tag} className="text-[9px] font-black uppercase tracking-tighter px-2 py-0.5 rounded-md bg-primary/5 text-primary border border-primary/10">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-8 flex-grow">
                        {project.description}
                      </p>

                      <div className="space-y-4">
                        {demo ? (
                          <Link 
                            href={demo.path}
                            className="w-full btn-gradient flex items-center justify-center gap-2 py-4 rounded-2xl text-white font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                          >
                            Launch {demo.label}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : (
                          <div className="w-full py-4 rounded-2xl bg-muted/50 border border-border text-center">
                             <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Demo Coming Soon</span>
                          </div>
                        )}
                        
                        <Link 
                          href={`/projects/${project.slug}`}
                          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-background border border-border hover:border-primary/30 transition-all font-bold text-xs uppercase tracking-widest"
                        >
                          View Details
                          <Layout className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats / Callout */}
      <section className="mt-32">
        <div className="container mx-auto px-6">
          <div className="glass-card p-12 md:p-20 rounded-[4rem] text-center relative overflow-hidden">
             <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
             <div className="absolute bottom-0 left-0 w-96 h-96 bg-violet/5 blur-[120px] rounded-full pointer-events-none" />
             
             <div className="max-w-3xl mx-auto relative z-10 space-y-8">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight">Need a custom <span className="text-gradient">demonstration</span>?</h2>
                <p className="text-lg text-muted-foreground font-medium">
                  We build specialized interactive flows for all our high-tier clients to ensure full alignment on technical architecture and business ROI.
                </p>
                <div className="flex flex-wrap justify-center gap-10 pt-4">
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black text-primary">100%</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2">Custom Built</span>
                  </div>
                  <div className="w-px h-12 bg-border hidden md:block" />
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black text-primary">Real-time</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2">Data Sync</span>
                  </div>
                  <div className="w-px h-12 bg-border hidden md:block" />
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black text-primary">Secure</span>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-2">Architecture</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
