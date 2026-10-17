import fs from "fs";
import path from "path";
import { Project, projects as defaultProjects } from "./data/projects";
import { getDb, isMongoConfigured } from "./mongodb";

const DATA_DIR = path.join(process.cwd(), "data");
const PORTFOLIO_FILE = path.join(DATA_DIR, "portfolio_projects.json");

// Prepare initial seed with default metadata
function getInitialProjects(): Project[] {
  return defaultProjects.map((p, idx) => ({
    ...p,
    priority: p.priority ?? idx + 1,
    hidden: p.hidden ?? false,
    deploymentStatus:
      p.deploymentStatus ||
      (p.demoUrl ? "deployed" : p.github ? "github_only" : "in_development"),
    videoUrl: p.videoUrl || "",
  }));
}

// Ensure the local JSON backup file exists
function readLocalProjects(): Project[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(PORTFOLIO_FILE)) {
      const initial = getInitialProjects();
      fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(initial, null, 2), "utf8");
      return initial;
    }

    const raw = fs.readFileSync(PORTFOLIO_FILE, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }

    const initial = getInitialProjects();
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(initial, null, 2), "utf8");
    return initial;
  } catch (err) {
    console.error("Error reading local portfolio file:", err);
    return getInitialProjects();
  }
}

function writeLocalProjects(projectsList: Project[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(PORTFOLIO_FILE, JSON.stringify(projectsList, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing local portfolio file:", err);
  }
}

/**
 * Fetch all portfolio projects.
 * Attempts MongoDB first, synchronizes to local JSON, falls back to local JSON.
 */
export async function getPortfolioProjectsAsync(includeHidden = true): Promise<Project[]> {
  let allProjects: Project[] = [];

  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const collection = db.collection<Project>("portfolio_projects");
        const fromMongo = await collection.find({}, { projection: { _id: 0 } }).sort({ priority: 1 }).toArray();

        if (fromMongo && fromMongo.length > 0) {
          allProjects = fromMongo;
          // Sync local file silently in background
          writeLocalProjects(allProjects);
        } else {
          // Seed MongoDB from local seed
          const seed = readLocalProjects();
          if (seed.length > 0) {
            await collection.insertMany(seed as any);
          }
          allProjects = seed;
        }
      } else {
        allProjects = readLocalProjects();
      }
    } catch (err) {
      console.error("MongoDB portfolio fetch error, using local file:", err);
      allProjects = readLocalProjects();
    }
  } else {
    allProjects = readLocalProjects();
  }

  // Ensure sorting by priority ascending
  allProjects.sort((a, b) => (a.priority ?? 999) - (b.priority ?? 999));

  if (!includeHidden) {
    return allProjects.filter((p) => !p.hidden);
  }

  return allProjects;
}

/**
 * Save full list of portfolio projects (used for reordering).
 */
export async function savePortfolioProjectsAsync(projectsList: Project[]): Promise<Project[]> {
  // Ensure priority indices are normalized
  const normalized = projectsList.map((p, idx) => ({
    ...p,
    priority: idx + 1,
  }));

  writeLocalProjects(normalized);

  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const collection = db.collection("portfolio_projects");
        await collection.deleteMany({});
        if (normalized.length > 0) {
          await collection.insertMany(normalized as any);
        }
      }
    } catch (err) {
      console.error("Failed to sync reordered projects to MongoDB:", err);
    }
  }

  return normalized;
}

/**
 * Create a new portfolio project.
 */
export async function createPortfolioProjectAsync(data: Partial<Project>): Promise<Project> {
  const current = await getPortfolioProjectsAsync(true);

  // Generate unique numeric or string ID
  const maxId = current.reduce((max, p) => {
    const num = typeof p.id === "number" ? p.id : parseInt(String(p.id).replace(/\D/g, "") || "0", 10);
    return num > max ? num : max;
  }, 0);

  const newId = maxId + 1;
  const rawSlug = data.slug || data.title?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || `project-${newId}`;
  let uniqueSlug = rawSlug;
  let counter = 1;
  while (current.some((p) => p.slug === uniqueSlug)) {
    uniqueSlug = `${rawSlug}-${counter++}`;
  }

  // If newly created project is set as head position / featured, un-feature others if specified
  if (data.featured) {
    current.forEach((p) => {
      p.featured = false;
    });
  }

  const newProject: Project = {
    id: newId,
    title: data.title || `New Project ${newId}`,
    slug: uniqueSlug,
    description: data.description || "",
    overview: data.overview || data.description || "",
    category: data.category || "Web Development",
    image: data.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    images: data.images && data.images.length > 0 ? data.images : [data.image || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200"],
    tags: data.tags || ["Next.js", "TypeScript"],
    features: data.features || ["High Performance Architecture", "Modern Responsive UI"],
    elaborations: data.elaborations || [],
    github: data.github || "",
    demoUrl: data.demoUrl || "",
    videoUrl: data.videoUrl || "",
    featured: Boolean(data.featured),
    hidden: Boolean(data.hidden),
    deploymentStatus: data.deploymentStatus || (data.demoUrl ? "deployed" : data.github ? "github_only" : "in_development"),
    lastUpdated: data.lastUpdated || "Recently",
    priority: 1, // Place at the very top by default so it's easily visible
  };

  // Re-index priorities: insert newProject at start, shift others
  const updated = [newProject, ...current].map((p, idx) => ({
    ...p,
    priority: idx + 1,
  }));

  await savePortfolioProjectsAsync(updated);
  return newProject;
}

/**
 * Update an existing portfolio project.
 */
export async function updatePortfolioProjectAsync(
  id: number | string,
  updates: Partial<Project>
): Promise<Project | null> {
  const current = await getPortfolioProjectsAsync(true);
  const targetIndex = current.findIndex((p) => String(p.id) === String(id) || p.slug === String(id));

  if (targetIndex === -1) {
    return null;
  }

  // If setting this project as head / featured, unmark any existing featured projects
  if (updates.featured === true) {
    current.forEach((p, idx) => {
      if (idx !== targetIndex) {
        p.featured = false;
      }
    });
  }

  const updatedProject: Project = {
    ...current[targetIndex],
    ...updates,
    id: current[targetIndex].id, // protect id integrity
  };

  current[targetIndex] = updatedProject;
  await savePortfolioProjectsAsync(current);
  return updatedProject;
}

/**
 * Set a specific project as the HEAD position (Featured hero spotlight).
 */
export async function setHeadProjectAsync(id: number | string): Promise<Project | null> {
  const current = await getPortfolioProjectsAsync(true);
  const target = current.find((p) => String(p.id) === String(id));
  if (!target) return null;

  current.forEach((p) => {
    p.featured = String(p.id) === String(id);
  });

  await savePortfolioProjectsAsync(current);
  return target;
}

/**
 * Reorder projects based on ordered IDs array.
 */
export async function reorderPortfolioProjectsAsync(orderedIds: (number | string)[]): Promise<Project[]> {
  const current = await getPortfolioProjectsAsync(true);
  const idMap = new Map(current.map((p) => [String(p.id), p]));

  const reordered: Project[] = [];

  for (const id of orderedIds) {
    const item = idMap.get(String(id));
    if (item) {
      reordered.push(item);
      idMap.delete(String(id));
    }
  }

  // Append any projects that weren't in the orderedIds list
  for (const remaining of idMap.values()) {
    reordered.push(remaining);
  }

  return await savePortfolioProjectsAsync(reordered);
}

/**
 * Delete a portfolio project.
 */
export async function deletePortfolioProjectAsync(id: number | string): Promise<boolean> {
  const current = await getPortfolioProjectsAsync(true);
  const filtered = current.filter((p) => String(p.id) !== String(id));
  if (filtered.length === current.length) return false;

  await savePortfolioProjectsAsync(filtered);
  return true;
}
