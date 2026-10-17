"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/data/projects";
import {
  Layers,
  Plus,
  Search,
  GripVertical,
  Star,
  Eye,
  EyeOff,
  Edit3,
  Trash2,
  ExternalLink,
  ChevronUp,
  ChevronDown,
  Video,
  Code2,
  Globe,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  X,
  Sparkles,
  ArrowUpRight,
  Filter,
} from "lucide-react";
import { JetBrains_Mono, Outfit } from "next/font/google";

const jetmono = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

interface PortfolioManagerProps {
  onToast?: (message: string) => void;
}

const DEFAULT_CATEGORIES = [
  "Web Development",
  "Web Development / Enterprise",
  "Web Development / Fitness",
  "Web Portal / Gaming & Streaming",
  "Chrome Extension / AI",
  "Data Tools",
  "Backend",
  "Blockchain",
  "Personal Website",
  "Learning",
];

export default function PortfolioManager({ onToast }: PortfolioManagerProps) {
  const [projectsList, setProjectsList] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Drag and drop state
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [reordering, setReordering] = useState(false);

  // Edit Modal State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editForm, setEditForm] = useState<any>(null);
  const [savingEdit, setSavingEdit] = useState(false);

  // Add Project Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [addForm, setAddForm] = useState<any>({
    title: "",
    slug: "",
    category: "Web Development",
    description: "",
    overview: "",
    tags: "React, Next.js, TypeScript, Tailwind CSS",
    deploymentStatus: "deployed",
    github: "",
    demoUrl: "",
    videoUrl: "",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
    images: "",
    features: "High Performance Architecture\nModern Responsive UI\nEnterprise Security",
    elaborations: "",
    featured: false,
    hidden: false,
    lastUpdated: "Recently",
  });
  const [savingAdd, setSavingAdd] = useState(false);

  // Delete Modal State
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Fetch all projects (including hidden ones for admin)
  const loadProjects = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/portfolio-projects?admin=true");
      const json = await res.json();
      if (json.success && Array.isArray(json.projects)) {
        setProjectsList(json.projects);
      }
    } catch (err) {
      console.error("Failed to load portfolio projects:", err);
      if (onToast) onToast("Failed to load portfolio projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // Filtered view
  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        p.description.toLowerCase().includes(q);

      const matchesCategory =
        categoryFilter === "all" || p.category.toLowerCase().includes(categoryFilter.toLowerCase());

      return matchesSearch && matchesCategory;
    });
  }, [projectsList, searchQuery, categoryFilter]);

  // Current Head / Featured project
  const headProject = useMemo(() => {
    return projectsList.find((p) => p.featured) || projectsList[0];
  }, [projectsList]);

  // ── Drag & Drop Handlers ──
  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;
    setDragOverIndex(index);
  };

  const handleDrop = async (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    setDragOverIndex(null);
    if (draggedIndex === null || draggedIndex === dropIndex) {
      setDraggedIndex(null);
      return;
    }

    // Reorder array
    const updated = [...projectsList];
    const [movedItem] = updated.splice(draggedIndex, 1);
    updated.splice(dropIndex, 0, movedItem);

    // Apply 1-based priority numbers
    const normalized = updated.map((p, idx) => ({ ...p, priority: idx + 1 }));
    setProjectsList(normalized);
    setDraggedIndex(null);

    // Persist to server
    await saveReorder(normalized.map((p) => p.id));
  };

  const moveUp = async (index: number) => {
    if (index <= 0) return;
    const updated = [...projectsList];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;

    const normalized = updated.map((p, idx) => ({ ...p, priority: idx + 1 }));
    setProjectsList(normalized);
    await saveReorder(normalized.map((p) => p.id));
  };

  const moveDown = async (index: number) => {
    if (index >= projectsList.length - 1) return;
    const updated = [...projectsList];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;

    const normalized = updated.map((p, idx) => ({ ...p, priority: idx + 1 }));
    setProjectsList(normalized);
    await saveReorder(normalized.map((p) => p.id));
  };

  const saveReorder = async (orderedIds: (number | string)[]) => {
    try {
      setReordering(true);
      const res = await fetch("/api/portfolio-projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "reorder", orderedIds }),
      });
      const json = await res.json();
      if (json.success) {
        if (onToast) onToast("Project priority order saved!");
      }
    } catch (err) {
      console.error("Failed to save reorder:", err);
      if (onToast) onToast("Error updating project order");
    } finally {
      setReordering(false);
    }
  };

  // ── Set Head Position ──
  const handleSetHead = async (id: number | string) => {
    try {
      const res = await fetch("/api/portfolio-projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "set_head", id }),
      });
      const json = await res.json();
      if (json.success) {
        setProjectsList((prev) =>
          prev.map((p) => ({
            ...p,
            featured: String(p.id) === String(id),
          }))
        );
        const match = projectsList.find((p) => String(p.id) === String(id));
        if (onToast) onToast(`"${match?.title}" is now set as the Head Position on /projects!`);
      }
    } catch (err) {
      console.error("Set head error:", err);
      if (onToast) onToast("Failed to set head position");
    }
  };

  // ── Toggle Hidden ──
  const handleToggleHidden = async (project: Project) => {
    const nextHidden = !project.hidden;
    try {
      const res = await fetch("/api/portfolio-projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id: project.id,
          updates: { hidden: nextHidden },
        }),
      });
      const json = await res.json();
      if (json.success) {
        setProjectsList((prev) =>
          prev.map((p) => (String(p.id) === String(project.id) ? { ...p, hidden: nextHidden } : p))
        );
        if (onToast) {
          onToast(
            nextHidden
              ? `"${project.title}" is now hidden from public page.`
              : `"${project.title}" is now visible on /projects!`
          );
        }
      }
    } catch (err) {
      console.error("Toggle hidden error:", err);
      if (onToast) onToast("Failed to toggle visibility");
    }
  };

  // ── Open Edit Modal ──
  const openEditModal = (project: Project) => {
    setEditingProject(project);
    setEditForm({
      ...project,
      tags: project.tags ? project.tags.join(", ") : "",
      images: project.images ? project.images.join("\n") : "",
      features: project.features ? project.features.join("\n") : "",
      elaborations: project.elaborations ? project.elaborations.join("\n") : "",
      videoUrl: project.videoUrl || "",
      demoUrl: project.demoUrl || "",
      github: project.github || "",
      deploymentStatus:
        project.deploymentStatus ||
        (project.demoUrl ? "deployed" : project.github ? "github_only" : "in_development"),
    });
  };

  // ── Save Edited Project ──
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    try {
      setSavingEdit(true);
      const parsedTags = editForm.tags
        ? editForm.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : [];
      const parsedImages = editForm.images
        ? editForm.images.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [];
      const parsedFeatures = editForm.features
        ? editForm.features.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [];
      const parsedElaborations = editForm.elaborations
        ? editForm.elaborations.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [];

      const payload = {
        title: editForm.title,
        slug: editForm.slug,
        category: editForm.category,
        description: editForm.description,
        overview: editForm.overview || editForm.description,
        tags: parsedTags,
        image: editForm.image,
        images: parsedImages.length > 0 ? parsedImages : [editForm.image],
        features: parsedFeatures,
        elaborations: parsedElaborations,
        github: editForm.github,
        demoUrl: editForm.demoUrl,
        videoUrl: editForm.videoUrl,
        deploymentStatus: editForm.deploymentStatus,
        featured: Boolean(editForm.featured),
        hidden: Boolean(editForm.hidden),
        lastUpdated: editForm.lastUpdated || "Recently",
      };

      const res = await fetch("/api/portfolio-projects", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update",
          id: editingProject.id,
          updates: payload,
        }),
      });

      const json = await res.json();
      if (json.success && json.project) {
        setProjectsList((prev) =>
          prev.map((p) => (String(p.id) === String(editingProject.id) ? json.project : p))
        );
        if (payload.featured) {
          // If marked featured, unset others
          setProjectsList((prev) =>
            prev.map((p) => ({
              ...p,
              featured: String(p.id) === String(editingProject.id),
            }))
          );
        }
        setEditingProject(null);
        if (onToast) onToast(`"${payload.title}" updated successfully!`);
      } else {
        if (onToast) onToast(json.error || "Failed to update project");
      }
    } catch (err: any) {
      console.error("Save edit error:", err);
      if (onToast) onToast("Error saving project changes");
    } finally {
      setSavingEdit(false);
    }
  };

  // ── Create New Project ──
  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!addForm.title) {
      if (onToast) onToast("Project title is required");
      return;
    }

    try {
      setSavingAdd(true);
      const parsedTags = addForm.tags
        ? addForm.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
        : [];
      const parsedImages = addForm.images
        ? addForm.images.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [];
      const parsedFeatures = addForm.features
        ? addForm.features.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [];
      const parsedElaborations = addForm.elaborations
        ? addForm.elaborations.split("\n").map((t: string) => t.trim()).filter(Boolean)
        : [];

      const payload = {
        title: addForm.title,
        slug: addForm.slug,
        category: addForm.category,
        description: addForm.description,
        overview: addForm.overview || addForm.description,
        tags: parsedTags,
        image: addForm.image,
        images: parsedImages.length > 0 ? parsedImages : [addForm.image],
        features: parsedFeatures,
        elaborations: parsedElaborations,
        github: addForm.github,
        demoUrl: addForm.demoUrl,
        videoUrl: addForm.videoUrl,
        deploymentStatus: addForm.deploymentStatus,
        featured: Boolean(addForm.featured),
        hidden: Boolean(addForm.hidden),
        lastUpdated: addForm.lastUpdated || "Recently",
      };

      const res = await fetch("/api/portfolio-projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (json.success && json.project) {
        // Prepend new project
        setProjectsList((prev) => [json.project, ...prev].map((p, i) => ({ ...p, priority: i + 1 })));
        setShowAddModal(false);
        // Reset form
        setAddForm({
          title: "",
          slug: "",
          category: "Web Development",
          description: "",
          overview: "",
          tags: "React, Next.js, TypeScript, Tailwind CSS",
          deploymentStatus: "deployed",
          github: "",
          demoUrl: "",
          videoUrl: "",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200",
          images: "",
          features: "High Performance Architecture\nModern Responsive UI\nEnterprise Security",
          elaborations: "",
          featured: false,
          hidden: false,
          lastUpdated: "Recently",
        });
        if (onToast) onToast(`"${json.project.title}" created and prioritized at Head!`);
      } else {
        if (onToast) onToast(json.error || "Failed to create project");
      }
    } catch (err) {
      console.error("Create project error:", err);
      if (onToast) onToast("Error creating project");
    } finally {
      setSavingAdd(false);
    }
  };

  // ── Delete Project ──
  const handleConfirmDelete = async () => {
    if (!projectToDelete) return;
    try {
      setDeleting(true);
      const res = await fetch(`/api/portfolio-projects?id=${projectToDelete.id}`, {
        method: "DELETE",
      });
      const json = await res.json();
      if (json.success) {
        setProjectsList((prev) => prev.filter((p) => String(p.id) !== String(projectToDelete.id)));
        setProjectToDelete(null);
        if (onToast) onToast(`"${projectToDelete.title}" deleted.`);
      } else {
        if (onToast) onToast(json.error || "Failed to delete project");
      }
    } catch (err) {
      console.error("Delete project error:", err);
      if (onToast) onToast("Error deleting project");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className={`space-y-6 ${outfit.className}`}>
      {/* ── 1. Top Summary Banner & Controls ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              <span className="p-2 bg-rose-50 text-rose-600 rounded-xl">
                <Layers className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Projects Page &amp; Arsenal Manifest
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Drag to reorder project priority, choose which project takes the <strong>Head Position</strong> spotlight banner, toggle project visibility, and manage video walkthroughs.
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href="/projects"
              target="_blank"
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition flex items-center gap-1.5"
            >
              <span>View Public /projects</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Project</span>
            </button>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t border-slate-100">
          <div className="bg-slate-50 border border-slate-200/60 rounded-xl p-3">
            <div className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Total Projects</div>
            <div className={`text-xl font-bold text-slate-900 mt-0.5 ${jetmono.className}`}>{projectsList.length}</div>
          </div>
          <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-xl p-3">
            <div className="text-[10px] text-emerald-700 uppercase tracking-wider font-semibold">Visible on Page</div>
            <div className={`text-xl font-bold text-emerald-700 mt-0.5 ${jetmono.className}`}>
              {projectsList.filter((p) => !p.hidden).length}
            </div>
          </div>
          <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3">
            <div className="text-[10px] text-amber-700 uppercase tracking-wider font-semibold">Hidden / Drafts</div>
            <div className={`text-xl font-bold text-amber-700 mt-0.5 ${jetmono.className}`}>
              {projectsList.filter((p) => p.hidden).length}
            </div>
          </div>
          <div className="bg-purple-50/50 border border-purple-200/60 rounded-xl p-3">
            <div className="text-[10px] text-purple-700 uppercase tracking-wider font-semibold">Current Head</div>
            <div className="text-xs font-bold text-purple-900 truncate mt-1">
              {headProject?.title || "None"}
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Head Position Hero Spotlight Highlight ── */}
      {headProject && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <div className="relative w-16 h-12 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-amber-300">
              {headProject.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={headProject.image} alt={headProject.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-500">
                  <Layers className="w-4 h-4" />
                </div>
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider text-amber-800 bg-amber-200/70 px-2 py-0.5 rounded-full uppercase">
                  <Star className="w-3 h-3 fill-amber-600 text-amber-600" /> Current Head Position Spotlight
                </span>
                <span className={`text-[11px] text-slate-500 ${jetmono.className}`}>Priority #{headProject.priority || 1}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 truncate mt-0.5">
                {headProject.title}
              </h3>
              <p className="text-xs text-slate-500 truncate max-w-xl">
                {headProject.overview || headProject.description}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Link
              href={`/projects/${headProject.slug}`}
              target="_blank"
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg flex items-center gap-1 shadow-xs"
            >
              <span>Preview Dossier</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
            <button
              type="button"
              onClick={() => openEditModal(headProject)}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg flex items-center gap-1 shadow-xs"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Head</span>
            </button>
          </div>
        </div>
      )}

      {/* ── 3. Search, Filter & Reorder Guidance ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-2 max-w-md">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, tech stack, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-800"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-slate-900 text-slate-700 font-medium cursor-pointer"
          >
            <option value="all">All Categories</option>
            {DEFAULT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 font-medium">
          <GripVertical className="w-3.5 h-3.5 text-slate-400" />
          <span>Drag rows or use ▲ / ▼ to set public order. Changes live instantly.</span>
        </div>
      </div>

      {/* ── 4. Interactive Drag-to-Rearrange Project List ── */}
      <div className="bg-white border border-slate-200/90 rounded-2xl shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-slate-500 gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-slate-900" />
            <span className="text-xs font-mono">Loading portfolio projects...</span>
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="py-16 text-center text-slate-500 space-y-2">
            <Layers className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-sm font-semibold text-slate-700">No projects found</p>
            <p className="text-xs text-slate-400">Try clearing your search query or category filter.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredProjects.map((project, idx) => {
              const isHead = Boolean(project.featured);
              const isHidden = Boolean(project.hidden);
              const isDraggingThis = draggedIndex === idx;
              const isDragOverThis = dragOverIndex === idx;

              return (
                <div
                  key={project.id}
                  draggable={true}
                  onDragStart={(e) => handleDragStart(e, idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`p-3.5 sm:p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                    isDraggingThis
                      ? "opacity-40 bg-slate-100 border-2 border-dashed border-slate-400"
                      : isDragOverThis
                      ? "bg-rose-50/50 border-t-2 border-rose-500"
                      : isHead
                      ? "bg-amber-50/20 hover:bg-amber-50/40"
                      : isHidden
                      ? "bg-slate-50/50 hover:bg-slate-50"
                      : "hover:bg-slate-50/70"
                  }`}
                >
                  {/* Left: Drag Handle, Priority Number, Thumbnail, Details */}
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Tactile Drag Handle & Up/Down Arrows */}
                    <div className="flex items-center gap-1 shrink-0">
                      <div
                        className="cursor-grab active:cursor-grabbing p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        title="Drag to rearrange priority"
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <div className="flex flex-col -space-y-1">
                        <button
                          type="button"
                          onClick={() => moveUp(idx)}
                          disabled={idx === 0}
                          className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                          title="Move Up"
                        >
                          <ChevronUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveDown(idx)}
                          disabled={idx === projectsList.length - 1}
                          className="p-0.5 text-slate-400 hover:text-slate-800 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                          title="Move Down"
                        >
                          <ChevronDown className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Priority Tag */}
                    <span
                      className={`text-[11px] font-mono px-2 py-1 rounded-md shrink-0 font-bold ${
                        isHead
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "bg-slate-100 text-slate-700"
                      }`}
                      title="Priority Position"
                    >
                      #{idx + 1}
                    </span>

                    {/* Image Thumbnail */}
                    <div className="relative w-14 h-11 rounded-lg overflow-hidden bg-slate-900 shrink-0 border border-slate-200">
                      {project.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-500">
                          <Layers className="w-3 h-3" />
                        </div>
                      )}
                      {project.videoUrl && (
                        <div className="absolute bottom-0.5 right-0.5 p-0.5 bg-black/80 rounded text-cyan-400">
                          <Video className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>

                    {/* Title, Category, Tags */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm font-bold text-slate-900 truncate">
                          {project.title}
                        </h4>

                        {/* Head Position Indicator Badge */}
                        {isHead && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-800 bg-amber-100 border border-amber-300 px-1.5 py-0.2 rounded-full uppercase">
                            <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" /> HEAD POSITION
                          </span>
                        )}

                        {/* Hidden Badge */}
                        {isHidden && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-1.5 py-0.2 rounded-full uppercase">
                            <EyeOff className="w-2.5 h-2.5" /> HIDDEN FROM PUBLIC
                          </span>
                        )}

                        {/* Deployment Status Badge */}
                        {project.deploymentStatus === "github_only" ? (
                          <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-1.5 py-0.2 rounded-full">
                            GitHub Repo Only
                          </span>
                        ) : project.deploymentStatus === "in_development" ? (
                          <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 border border-blue-200 px-1.5 py-0.2 rounded-full">
                            In Sprint
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.2 rounded-full">
                            Live Deployed
                          </span>
                        )}

                        {/* Video Badge */}
                        {project.videoUrl && (
                          <span className="text-[10px] font-semibold text-cyan-700 bg-cyan-50 border border-cyan-200 px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                            <Video className="w-2.5 h-2.5" /> Video Linked
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-xs text-slate-500 mt-1 flex-wrap">
                        <span className="font-medium text-slate-600">{project.category}</span>
                        <span>•</span>
                        <span className={`text-[11px] ${jetmono.className} text-slate-400`}>
                          /{project.slug}
                        </span>
                        {project.tags && project.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <span className="text-[11px] text-slate-400 truncate max-w-xs">
                              {project.tags.slice(0, 3).join(", ")}
                              {project.tags.length > 3 ? ` +${project.tags.length - 3}` : ""}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions (Set Head, Hide/Show, Edit, Live View, Delete) */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    {/* Head Position Toggle */}
                    <button
                      type="button"
                      onClick={() => handleSetHead(project.id)}
                      className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1 cursor-pointer ${
                        isHead
                          ? "bg-amber-100 text-amber-900 border border-amber-300"
                          : "text-slate-600 hover:text-amber-700 hover:bg-amber-50 border border-slate-200"
                      }`}
                      title={isHead ? "Current Head Position" : "Make this project the top Head Position banner"}
                    >
                      <Star className={`w-3.5 h-3.5 ${isHead ? "fill-amber-500 text-amber-500" : ""}`} />
                      <span className="hidden sm:inline">{isHead ? "Head Project" : "Set as Head"}</span>
                    </button>

                    {/* Visibility Toggle */}
                    <button
                      type="button"
                      onClick={() => handleToggleHidden(project)}
                      className={`px-2.5 py-1.5 text-xs font-semibold rounded-lg transition flex items-center gap-1 cursor-pointer ${
                        isHidden
                          ? "bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100"
                          : "text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200"
                      }`}
                      title={isHidden ? "Click to make visible on /projects" : "Click to hide from /projects"}
                    >
                      {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span className="hidden sm:inline">{isHidden ? "Hidden" : "Visible"}</span>
                    </button>

                    {/* Edit Project Button */}
                    <button
                      type="button"
                      onClick={() => openEditModal(project)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition flex items-center gap-1 cursor-pointer"
                      title="Edit project contents"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Edit</span>
                    </button>

                    {/* Live Dossier Link */}
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 border border-slate-200 rounded-lg transition"
                      title="Open public dossier page"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>

                    {/* Delete Project Button */}
                    <button
                      type="button"
                      onClick={() => setProjectToDelete(project)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 rounded-lg transition cursor-pointer"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ── 5. Project Editor Modal ("project editor of its contents") ── */}
      {editingProject && editForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-slate-900 text-white rounded-xl">
                  <Edit3 className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Edit Project Contents</h3>
                  <p className="text-xs text-slate-500">Update details, video showcase link, images, and features.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingProject(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSaveEdit} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={editForm.title}
                    onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    value={editForm.slug}
                    onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                    className={`w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800 ${jetmono.className}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deployment Status</label>
                  <select
                    value={editForm.deploymentStatus}
                    onChange={(e) => setEditForm({ ...editForm, deploymentStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  >
                    <option value="deployed">Live Deployed (Has live public demo)</option>
                    <option value="github_only">GitHub Only (Not deployed yet, code on GitHub)</option>
                    <option value="in_development">In Development / Sprint</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description (Card Summary)</label>
                <textarea
                  rows={2}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Overview (Dossier Header)</label>
                <textarea
                  rows={3}
                  value={editForm.overview}
                  onChange={(e) => setEditForm({ ...editForm, overview: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                />
              </div>

              {/* Links Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>GitHub URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={editForm.github}
                    onChange={(e) => setEditForm({ ...editForm, github: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span>Live Demo URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourdemo.com"
                    value={editForm.demoUrl}
                    onChange={(e) => setEditForm({ ...editForm, demoUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Video Showcase URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="YouTube, Loom, Vimeo, or MP4"
                    value={editForm.videoUrl}
                    onChange={(e) => setEditForm({ ...editForm, videoUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Hidden on page if empty.</p>
                </div>
              </div>

              {/* Media & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Main Cover Image URL</label>
                  <input
                    type="text"
                    value={editForm.image}
                    onChange={(e) => setEditForm({ ...editForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tech Stack Tags (Comma separated)</label>
                  <input
                    type="text"
                    value={editForm.tags}
                    onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>
              </div>

              {/* Carousel Additional Images */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Carousel Screenshot URLs (One per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="/projects/yourproject/images/sc1.png&#10;/projects/yourproject/images/sc2.png"
                  value={editForm.images}
                  onChange={(e) => setEditForm({ ...editForm, images: e.target.value })}
                  className={`w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800 ${jetmono.className}`}
                />
              </div>

              {/* Features and Elaborations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Core Features (One per line)</label>
                  <textarea
                    rows={4}
                    value={editForm.features}
                    onChange={(e) => setEditForm({ ...editForm, features: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deep Dive &amp; Impact (One per line)</label>
                  <textarea
                    rows={4}
                    value={editForm.elaborations}
                    onChange={(e) => setEditForm({ ...editForm, elaborations: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editForm.featured}
                    onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Set as Head Position Spotlight (Hero Banner)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={editForm.hidden}
                    onChange={(e) => setEditForm({ ...editForm, hidden: e.target.checked })}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-rose-700">Hide project from public /projects page</span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-xs transition flex items-center gap-2 disabled:opacity-50"
                >
                  {savingEdit && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Save Project Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 6. Project Addition Modal ("project addition by filling the forms") ── */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-slate-900 text-white rounded-xl">
                  <Plus className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Add New Portfolio Project</h3>
                  <p className="text-xs text-slate-500">Fill in the project details to add to your manifest.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreateProject} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. TaskFlow PM (Work Management)"
                    value={addForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
                      setAddForm({ ...addForm, title, slug: addForm.slug ? addForm.slug : slug });
                    }}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">URL Slug</label>
                  <input
                    type="text"
                    placeholder="e.g. taskflow-pm"
                    value={addForm.slug}
                    onChange={(e) => setAddForm({ ...addForm, slug: e.target.value })}
                    className={`w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800 ${jetmono.className}`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    placeholder="e.g. Web Development / Enterprise"
                    value={addForm.category}
                    onChange={(e) => setAddForm({ ...addForm, category: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deployment Status</label>
                  <select
                    value={addForm.deploymentStatus}
                    onChange={(e) => setAddForm({ ...addForm, deploymentStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  >
                    <option value="deployed">Live Deployed (Has live public demo)</option>
                    <option value="github_only">GitHub Only (Code on GitHub, not deployed yet)</option>
                    <option value="in_development">In Development / Sprint</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Short Description (Card Summary) *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="A concise summary displayed on project cards..."
                  value={addForm.description}
                  onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Detailed Overview (Dossier Header)</label>
                <textarea
                  rows={3}
                  placeholder="A full architectural overview displayed at the top of the dossier page..."
                  value={addForm.overview}
                  onChange={(e) => setAddForm({ ...addForm, overview: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                />
              </div>

              {/* Links Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Code2 className="w-3.5 h-3.5 text-slate-500" />
                    <span>GitHub URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/himesh220002/..."
                    value={addForm.github}
                    onChange={(e) => setAddForm({ ...addForm, github: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-slate-500" />
                    <span>Live Demo URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://yourdemo.com"
                    value={addForm.demoUrl}
                    onChange={(e) => setAddForm({ ...addForm, demoUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Video className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Video Showcase URL</span>
                  </label>
                  <input
                    type="url"
                    placeholder="YouTube, Loom, Vimeo, or MP4"
                    value={addForm.videoUrl}
                    onChange={(e) => setAddForm({ ...addForm, videoUrl: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                  <p className="text-[10px] text-slate-400 mt-0.5">Hidden on page if empty.</p>
                </div>
              </div>

              {/* Media & Tags */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Cover Image URL *</label>
                  <input
                    type="text"
                    required
                    placeholder="https://images.unsplash.com/... or /projects/..."
                    value={addForm.image}
                    onChange={(e) => setAddForm({ ...addForm, image: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tech Stack Tags (Comma separated)</label>
                  <input
                    type="text"
                    placeholder="Next.js, TypeScript, Tailwind CSS"
                    value={addForm.tags}
                    onChange={(e) => setAddForm({ ...addForm, tags: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>
              </div>

              {/* Carousel Additional Images */}
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Carousel Screenshot URLs (One per line)
                </label>
                <textarea
                  rows={2}
                  placeholder="/projects/yourproject/images/sc1.png&#10;/projects/yourproject/images/sc2.png"
                  value={addForm.images}
                  onChange={(e) => setAddForm({ ...addForm, images: e.target.value })}
                  className={`w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800 ${jetmono.className}`}
                />
              </div>

              {/* Features and Elaborations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Core Features (One per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                    value={addForm.features}
                    onChange={(e) => setAddForm({ ...addForm, features: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Deep Dive &amp; Impact (One per line)</label>
                  <textarea
                    rows={3}
                    placeholder="Architectural achievement 1&#10;System optimization 2"
                    value={addForm.elaborations}
                    onChange={(e) => setAddForm({ ...addForm, elaborations: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-slate-900 focus:outline-hidden text-slate-800"
                  />
                </div>
              </div>

              {/* Toggles */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={addForm.featured}
                    onChange={(e) => setAddForm({ ...addForm, featured: e.target.checked })}
                    className="w-4 h-4 rounded text-amber-600 focus:ring-amber-500"
                  />
                  <span>Set as Head Position Spotlight (Hero Banner)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-semibold text-slate-700">
                  <input
                    type="checkbox"
                    checked={addForm.hidden}
                    onChange={(e) => setAddForm({ ...addForm, hidden: e.target.checked })}
                    className="w-4 h-4 rounded text-rose-600 focus:ring-rose-500"
                  />
                  <span className="text-rose-700">Hide project from public /projects page (Draft)</span>
                </label>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 hover:bg-slate-100 text-slate-700 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingAdd}
                  className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold shadow-xs transition flex items-center gap-2 disabled:opacity-50"
                >
                  {savingAdd && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Create &amp; Add to Manifest</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── 7. Delete Confirmation Dialog ── */}
      {projectToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-6 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">Delete Project?</h3>
            <p className="text-xs text-slate-500">
              Are you sure you want to delete <strong>{projectToDelete.title}</strong>? This will remove the project from both the admin dashboard and public manifest.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setProjectToDelete(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={handleConfirmDelete}
                className="px-4 py-2 text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition flex items-center gap-1.5"
              >
                {deleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                <span>Delete Project</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
