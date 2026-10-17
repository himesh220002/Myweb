import { getPortfolioProjectsAsync } from "@/lib/portfolioStore";
import ProjectsClient from "@/components/ProjectsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Arsenal Manifest // Projects That Ship & Scale | CypherTech",
  description:
    "Browse our tactical arsenal of high-performance web applications, ML models, and enterprise systems.",
};

export default async function ProjectsPage() {
  // Fetch real priority-ordered projects on the server so the first HTML render
  // and hydration match the exact dashboard arrangement with ZERO layout shift.
  const projects = await getPortfolioProjectsAsync(false);
  return <ProjectsClient initialProjects={projects} />;
}
