import { getPortfolioProjectsAsync } from "@/lib/portfolioStore";
import ProjectDetailClient from "@/components/ProjectDetailClient";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allProjects = await getPortfolioProjectsAsync(true);
  const project = allProjects.find((p) => p.slug === slug || String(p.id) === slug);

  if (!project) {
    return { title: "Dossier Not Found | CypherTech" };
  }

  return {
    title: `${project.title} // Tactical Dossier | CypherTech`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const allProjects = await getPortfolioProjectsAsync(true);
  const project = allProjects.find((p) => p.slug === slug || String(p.id) === slug);

  if (!project) {
    return notFound();
  }

  return <ProjectDetailClient initialProject={project} />;
}
