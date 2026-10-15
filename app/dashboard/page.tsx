"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  CreditCard,
  Printer,
  FileCode,
  FileText,
  DollarSign,
  Layers,
  FolderKanban,
  Users,
  Plus,
  Search,
  PhoneCall,
  CheckCheck,
  TrendingUp,
  Send,
  Eye,
  EyeOff,
  LogOut,
  ChevronRight,
  Smartphone,
  Check,
  Calendar,
  Mail,
  User,
  Trash2,
  History,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Clock,
  AlertTriangle,
  Zap,
  ShieldAlert,
  PauseCircle,
  PlayCircle,
  XCircle,
  RotateCcw,
  BadgePercent,
  ArrowUpRight,
  Shield,
  Award,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ListTodo,
  Building2,
  Briefcase,
  Globe,
  ExternalLink,
  Tag,
  Video,
  Mic,
  MessageSquare,
  X,
} from "lucide-react";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
import { Rajdhani, JetBrains_Mono, Bebas_Neue, Outfit } from "next/font/google";
import {
  printReceiptIsolated,
  downloadReceiptTxt,
  downloadReceiptHtml,
  ReceiptData,
} from "@/lib/receiptUtils";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetmono = JetBrains_Mono({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export default function AdminDashboardPage() {
  // Authentication & 1-Week Token State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // CRM Dashboard Data State
  const [loading, setLoading] = useState(true);
  const [adminData, setAdminData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<"projects" | "clients" | "payments" | "analytics">("projects");
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Filters & Search
  const [clientSearch, setClientSearch] = useState("");
  const [clientFilterStatus, setClientFilterStatus] = useState<string>("all");
  const [paymentFilterKind, setPaymentFilterKind] = useState<string>("all");
  const [paymentGrouping, setPaymentGrouping] = useState<"grouped" | "ledger">("grouped");

  // Modals
  const [showNewProjectModal, setShowNewProjectModal] = useState(false);
  const [showManualPaymentModal, setShowManualPaymentModal] = useState(false);
  const [showMapPaymentModal, setShowMapPaymentModal] = useState(false);
  const [selectedPaymentForMapping, setSelectedPaymentForMapping] = useState<any>(null);
  const [showNewClientModal, setShowNewClientModal] = useState(false);

  // Alert Emission Modal States
  const [showEmitAlertModal, setShowEmitAlertModal] = useState(false);
  const [selectedProjectForAlert, setSelectedProjectForAlert] = useState<any>(null);
  const [alertType, setAlertType] = useState<string>("upcoming_milestone_3_4_days");
  const [alertTitle, setAlertTitle] = useState("Sprint Deliverable Ready in 3-4 Days");
  const [alertMessage, setAlertMessage] = useState("Engineering sprint is nearing completion. Payment for this upcoming milestone will be requested within 3-4 days to maintain continuous deployment.");
  const [alertAmount, setAlertAmount] = useState("");
  const [alertMilestoneId, setAlertMilestoneId] = useState("");
  const [alertDueDate, setAlertDueDate] = useState("");
  const [alertNotifyEmail, setAlertNotifyEmail] = useState(true);
  const [alertLoading, setAlertLoading] = useState(false);

  // Expanded feed timelines for projects
  const [expandedFeeds, setExpandedFeeds] = useState<Record<string, boolean>>({});

  // Work and Tasks Management States (Current Work, Completed Works, Upcoming Tasks)
  const [currentWorkInputs, setCurrentWorkInputs] = useState<Record<string, string>>({});
  const [newUpcomingTaskInputs, setNewUpcomingTaskInputs] = useState<Record<string, string>>({});
  const [newCompletedWorkInputs, setNewCompletedWorkInputs] = useState<Record<string, string>>({});

  // Form states for New Project Modal
  const [newProjClient, setNewProjClient] = useState("");
  const [newProjTitle, setNewProjTitle] = useState("");
  const [newProjCategory, setNewProjCategory] = useState("Full-Stack Web App");
  const [newProjBudget, setNewProjBudget] = useState("");
  const [newProjTargetDate, setNewProjTargetDate] = useState("");
  const [newProjNotes, setNewProjNotes] = useState("");
  const [newProjCurrentWork, setNewProjCurrentWork] = useState("");
  const [newProjIsPrepaid, setNewProjIsPrepaid] = useState(false);
  const [newProjMilestones, setNewProjMilestones] = useState([
    { title: "Sprint 1: Architecture & Wireframes", description: "Design tokens, database architecture & initial wireframes", amount: "25000", dueDate: "" },
    { title: "Sprint 2: Core Development & Backend Integration", description: "API routes, payment integration & dashboard logic", amount: "25000", dueDate: "" },
  ]);

  // Form state for Manual Payment
  const [manualClientId, setManualClientId] = useState("");
  const [manualAmount, setManualAmount] = useState("");
  const [manualMethod, setManualMethod] = useState("MANUAL_UPI");
  const [manualRef, setManualRef] = useState("");
  const [manualNotes, setManualNotes] = useState("");
  const [manualProjectId, setManualProjectId] = useState("");
  const [manualMilestoneId, setManualMilestoneId] = useState("");

  // Form state for Map Payment Modal
  const [mapProjectId, setMapProjectId] = useState("");
  const [mapMilestoneId, setMapMilestoneId] = useState("");

  // Form state for New Client
  const [newClientName, setNewClientName] = useState("");
  const [newClientEmail, setNewClientEmail] = useState("");
  const [newClientPhone, setNewClientPhone] = useState("");
  const [newClientCompany, setNewClientCompany] = useState("");
  const [newClientNotes, setNewClientNotes] = useState("");

  // Meeting Notes & Deal Psychology Modal States
  const [showMeetingModal, setShowMeetingModal] = useState(false);
  const [selectedClientForMeeting, setSelectedClientForMeeting] = useState<any>(null);
  const [meetingModalTab, setMeetingModalTab] = useState<"log" | "history">("log");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingDuration, setMeetingDuration] = useState("00:30");
  const [meetingMethod, setMeetingMethod] = useState("Google Meet");
  const [meetingLink, setMeetingLink] = useState("");
  const [meetingDealStage, setMeetingDealStage] = useState("Closing / Verbal Yes");
  const [meetingTags, setMeetingTags] = useState("");
  const [meetingOverview, setMeetingOverview] = useState("");
  const [meetingInterchanges, setMeetingInterchanges] = useState("");
  const [savingMeeting, setSavingMeeting] = useState(false);

  const SUGGESTED_PSYCHOLOGICAL_TAGS = [
    "#liked-the-deal",
    "#lets-build",
    "#will-start-soon",
    "#confirming-this",
    "#hold-on",
    "#have-confusions",
    "#getback-later",
    "#found-the-issue",
    "#budget-approved",
    "#deposit-ready",
    "#high-intent",
    "#needs-scope-clarity",
    "#comparison-shopping",
    "#ready-to-sign",
  ];

  // 1. Check for valid 1-week admin token on mount
  useEffect(() => {
    const verifyAdminToken = async () => {
      try {
        const res = await fetch("/api/auth/dashboard-auth");
        const json = await res.json();
        if (json.authenticated) {
          setIsAuthenticated(true);
          fetchDashboardData();
        } else {
          setIsAuthenticated(false);
          setLoading(false);
        }
      } catch {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };

    verifyAdminToken();
  }, []);

  // Fetch full CRM stats once authenticated
  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/dashboard?view=admin");
      const json = await res.json();
      if (json.success) {
        setAdminData(json.data);
      }
    } catch (e) {
      console.error("Failed to load admin stats:", e);
    } finally {
      setLoading(false);
    }
  };

  const triggerToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => {
      setSuccessToast(null);
    }, 4000);
  };

  // Password Authentication Action
  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/auth/dashboard-auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: passwordInput }),
      });
      const data = await res.json();

      if (data.success && data.authenticated) {
        setIsAuthenticated(true);
        triggerToast("Admin Authenticated! 1-week token granted.");
        fetchDashboardData();
      } else {
        setAuthError(data.error || "Invalid administrator password");
      }
    } catch (err: any) {
      setAuthError("Authentication service error: " + err.message);
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLockTerminal = async () => {
    try {
      await fetch("/api/auth/dashboard-auth", { method: "DELETE" });
    } catch {}
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  // Progress update (Supports 1% step changes)
  const handleUpdateProgress = async (projectId: string, newProgress: number) => {
    const clamped = Math.min(100, Math.max(0, Math.round(newProgress)));
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, updates: { progress: clamped } }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast(`Progress updated to ${clamped}%`);
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleStepProgress = (projectId: string, currentVal: number, delta: number) => {
    const nextVal = Math.min(100, Math.max(0, currentVal + delta));
    handleUpdateProgress(projectId, nextVal);
  };

  const handleUpdateStatus = async (projectId: string, newStatus: string) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, updates: { status: newStatus } }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast(`Status changed to ${newStatus}`);
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  // Work Updates & Task Management Handlers
  const handleSaveCurrentWork = async (projectId: string, text: string) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, updates: { currentWork: text.trim() } }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast("Current work focus saved to project!");
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleAddUpcomingTask = async (project: any, taskText: string) => {
    if (!taskText.trim()) return;
    const existing = project.upcomingTasks || [];
    const updated = [...existing, taskText.trim()];
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, updates: { upcomingTasks: updated } }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast("Upcoming task added!");
        setNewUpcomingTaskInputs((p) => ({ ...p, [project.id]: "" }));
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleRemoveUpcomingTask = async (project: any, index: number) => {
    const existing = project.upcomingTasks || [];
    const updated = existing.filter((_: any, i: number) => i !== index);
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, updates: { upcomingTasks: updated } }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast("Upcoming task removed.");
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleAddCompletedWork = async (project: any, deliverableText: string) => {
    if (!deliverableText.trim()) return;
    const existing = project.completedWork || [];
    const updated = [...existing, deliverableText.trim()];
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, updates: { completedWork: updated } }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast("Completed deliverable logged!");
        setNewCompletedWorkInputs((p) => ({ ...p, [project.id]: "" }));
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleRemoveCompletedWork = async (project: any, index: number) => {
    const existing = project.completedWork || [];
    const updated = existing.filter((_: any, i: number) => i !== index);
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId: project.id, updates: { completedWork: updated } }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast("Deliverable removed.");
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleOpenAlertModal = (project: any) => {
    setSelectedProjectForAlert(project);
    setAlertType("upcoming_milestone_3_4_days");
    setAlertTitle("Sprint Deliverable Ready in 3-4 Days");
    setAlertMessage("Engineering sprint is nearing completion. Payment for this upcoming milestone will be requested within 3-4 days to maintain continuous deployment.");
    
    // Auto-select first unpaid milestone if available
    const unpaidMs = project.milestones?.find((m: any) => m.status === "pending" || m.status === "in_progress");
    if (unpaidMs) {
      setAlertMilestoneId(unpaidMs.id);
      setAlertAmount(String(unpaidMs.amount || ""));
      setAlertDueDate(unpaidMs.dueDate || "");
    } else {
      setAlertMilestoneId("");
      setAlertAmount("");
      setAlertDueDate("");
    }

    setAlertNotifyEmail(true);
    setShowEmitAlertModal(true);
  };

  const handleAlertTypeChange = (type: string) => {
    setAlertType(type);
    if (type === "upcoming_milestone_3_4_days") {
      setAlertTitle("Sprint Deliverable Ready in 3-4 Days");
      setAlertMessage("Engineering sprint is nearing completion. Payment for this upcoming milestone will be requested within 3-4 days to maintain continuous deployment.");
    } else if (type === "milestone_reached_payment_requested") {
      setAlertTitle("Milestone Deliverable Reached — Payment Requested");
      setAlertMessage("Sprint milestone deliverables have been deployed to staging and verified. Please complete payment to approve production rollout.");
    } else if (type === "payment_delayed") {
      setAlertTitle("Payment Delayed / Invoice Overdue");
      setAlertMessage("We noticed the milestone payment is past due date. Please settle this pending balance to avoid sprint development schedule disruptions.");
    } else if (type === "alert_project_will_be_on_hold") {
      setAlertTitle("Notice: Development Sprint Will Pause in 48 Hours");
      setAlertMessage("Pending milestone invoices remain unaddressed. Sprint engineering will pause within 48 hours unless payment is verified.");
    } else if (type === "project_on_hold") {
      setAlertTitle("Project On Hold — Engineering Paused");
      setAlertMessage("Development on this project is currently suspended pending invoice settlement. Please pay the requested milestone to resume sprint immediately.");
    } else if (type === "building") {
      setAlertTitle("Engineering Sprint Active & Building");
      setAlertMessage("Core engineering deliverables are actively in development. Production code commits and QA automated tests are passing.");
    } else {
      setAlertTitle("Project Advisory Notice");
      setAlertMessage("Custom development status update from CypherTech technical lead.");
    }
  };

  const handleEmitAlertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProjectForAlert || !alertTitle.trim() || !alertMessage.trim()) {
      alert("Please provide an alert title and message.");
      return;
    }

    setAlertLoading(true);
    try {
      const res = await fetch("/api/projects/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId: selectedProjectForAlert.id,
          type: alertType,
          title: alertTitle,
          message: alertMessage,
          amount: alertAmount ? Number(alertAmount) : undefined,
          milestoneId: alertMilestoneId || undefined,
          dueDate: alertDueDate || undefined,
          notifyClient: alertNotifyEmail,
        }),
      });

      const data = await res.json();
      if (data.success) {
        triggerToast("Alert emitted to client & logged to project timeline!");
        setShowEmitAlertModal(false);
        fetchDashboardData();
      } else {
        alert(data.error || "Failed to emit alert");
      }
    } catch (err: any) {
      alert("Error emitting alert: " + err.message);
    } finally {
      setAlertLoading(false);
    }
  };

  const handleDismissAlert = async (projectId: string, alertId: string) => {
    try {
      const res = await fetch(`/api/projects/alerts?projectId=${encodeURIComponent(projectId)}&alertId=${encodeURIComponent(alertId)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        triggerToast("Alert dismissed and archived ✓");
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const toggleFeedExpansion = (projectId: string) => {
    setExpandedFeeds((prev) => ({ ...prev, [projectId]: !prev[projectId] }));
  };

  const handleNotifyClient = async (projectId: string) => {
    try {
      const res = await fetch("/api/projects", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ projectId, updates: { clientNotified: true }, notifyClient: true }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast("Update email notification sent to client!");
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleDeleteProject = async (projectId: string, title: string) => {
    if (!confirm(`Are you sure you want to delete the project "${title}"? This will remove it from dashboard and client profile.`)) return;
    try {
      const res = await fetch(`/api/projects?projectId=${projectId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        triggerToast("Project deleted successfully");
        fetchDashboardData();
      } else {
        alert(data.error || "Failed to delete project");
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleToggleCallConfirmed = async (clientId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          callConfirmed: !currentStatus,
        }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast(!currentStatus ? "Call confirmed with client ✓" : "Call confirmation reset.");
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleOpenMeetingModal = (client: any, tab: "log" | "history" = "log") => {
    setSelectedClientForMeeting(client);
    setMeetingModalTab(tab);
    const today = new Date().toISOString().split("T")[0];
    const nowTime = new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
    setMeetingDate(today);
    setMeetingTime(nowTime);
    setMeetingDuration("00:30");
    setMeetingMethod("Google Meet");
    setMeetingLink("");
    setMeetingDealStage("Closing / Verbal Yes");
    setMeetingTags("#liked-the-deal, #lets-build, #will-start-soon");
    setMeetingOverview("");
    setMeetingInterchanges("");
    setShowMeetingModal(true);
  };

  const toggleMeetingTag = (tag: string) => {
    const cleanTag = tag.startsWith("#") ? tag : `#${tag}`;
    const currentTags = meetingTags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const exists = currentTags.some((t) => t.toLowerCase() === cleanTag.toLowerCase());
    let nextTags: string[];
    if (exists) {
      nextTags = currentTags.filter((t) => t.toLowerCase() !== cleanTag.toLowerCase());
    } else {
      nextTags = [...currentTags, cleanTag];
    }
    setMeetingTags(nextTags.join(", "));
  };

  const handleSaveMeetingNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedClientForMeeting) return;
    if (!meetingOverview.trim() && !meetingTags.trim()) {
      alert("Please provide at least a brief meeting overview or psychological #tags.");
      return;
    }

    setSavingMeeting(true);
    try {
      const parsedTags = meetingTags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);

      const res = await fetch("/api/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: selectedClientForMeeting.id,
          newMeeting: {
            date: meetingDate || new Date().toISOString().split("T")[0],
            time: meetingTime || "12:00",
            duration: meetingDuration || "00:30",
            method: meetingMethod || "Google Meet",
            link: meetingLink,
            dealStage: meetingDealStage,
            tags: parsedTags,
            overview: meetingOverview,
            interchanges: meetingInterchanges,
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        triggerToast("Meeting note & psychological deal tags saved ✓");
        await fetchDashboardData();
        if (data.client) {
          setSelectedClientForMeeting(data.client);
        }
        setMeetingModalTab("history");
      } else {
        alert(data.error || "Failed to save meeting note");
      }
    } catch (err: any) {
      alert("Error saving meeting: " + err.message);
    } finally {
      setSavingMeeting(false);
    }
  };

  const handleDeleteMeetingNote = async (meetingId: string) => {
    if (!selectedClientForMeeting || !confirm("Delete this meeting record?")) return;
    try {
      const res = await fetch("/api/clients", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: selectedClientForMeeting.id,
          deleteMeetingId: meetingId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        triggerToast("Meeting record removed.");
        await fetchDashboardData();
        if (data.client) {
          setSelectedClientForMeeting(data.client);
        }
      } else {
        alert(data.error || "Failed to delete meeting note");
      }
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleCreateProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProjClient || !newProjTitle.trim()) {
      alert("Please select a client and enter a project title.");
      return;
    }

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: newProjClient,
          title: newProjTitle,
          category: newProjCategory,
          budgetTotal: Number(newProjBudget) || 0,
          targetDate: newProjTargetDate,
          notes: newProjNotes,
          currentWork: newProjCurrentWork,
          milestones: newProjMilestones.map((m) => ({
            title: m.title,
            description: m.description,
            amount: Number(m.amount) || 0,
            dueDate: m.dueDate,
          })),
        }),
      });

      const data = await res.json();
      if (data.success) {
        triggerToast("New project and milestone schedule created!");
        setShowNewProjectModal(false);
        setNewProjTitle("");
        setNewProjBudget("");
        setNewProjNotes("");
        setNewProjCurrentWork("");
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleManualPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualAmount || Number(manualAmount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    try {
      const res = await fetch("/api/payments/manual", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId: manualClientId || undefined,
          amount: Number(manualAmount),
          method: manualMethod,
          referenceId: manualRef,
          notes: manualNotes,
          projectId: manualProjectId || undefined,
          milestoneId: manualMilestoneId || undefined,
        }),
      });

      const data = await res.json();
      if (data.success) {
        triggerToast("Manual payment recorded and synced!");
        setShowManualPaymentModal(false);
        setManualAmount("");
        setManualRef("");
        setManualNotes("");
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleMapPaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPaymentForMapping || !mapProjectId || !mapMilestoneId) {
      alert("Please select a project and a milestone.");
      return;
    }

    try {
      const res = await fetch("/api/payments/map", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentId: selectedPaymentForMapping.paymentId || selectedPaymentForMapping.id,
          projectId: mapProjectId,
          milestoneId: mapMilestoneId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        triggerToast("Payment attached to milestone successfully!");
        setShowMapPaymentModal(false);
        setSelectedPaymentForMapping(null);
        setMapProjectId("");
        setMapMilestoneId("");
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleCreateClientSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientEmail || !newClientEmail.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const res = await fetch("/api/clients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newClientName,
          email: newClientEmail,
          phone: newClientPhone,
          company: newClientCompany,
          notes: newClientNotes,
          status: "lead",
        }),
      });

      const data = await res.json();
      if (data.success) {
        triggerToast("New client lead profile registered!");
        setShowNewClientModal(false);
        setNewClientName("");
        setNewClientEmail("");
        setNewClientPhone("");
        setNewClientCompany("");
        setNewClientNotes("");
        fetchDashboardData();
      }
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  };

  const handleDownloadBill = (payment: any, format: "pdf" | "html" | "txt") => {
    const receiptData: ReceiptData = {
      paymentId: payment.paymentId,
      orderId: payment.orderId || "N/A",
      amount: payment.amount,
      currency: payment.currency || "INR",
      planName: payment.notes || "CypherTech Engineering",
      customerName: payment.customerName,
      customerEmail: payment.customerEmail,
      customerPhone: payment.customerPhone || "N/A",
      date: payment.createdAt,
      paymentMethod: payment.method || "Razorpay Gateway (256-Bit SSL)",
      receiptToken: payment.receiptToken,
      refundClaimUrl: payment.refundClaimUrl,
    };

    if (format === "pdf") {
      printReceiptIsolated(receiptData);
    } else if (format === "html") {
      downloadReceiptHtml(receiptData);
    } else {
      downloadReceiptTxt(receiptData);
    }
  };

  // Filtered Clients
  const filteredClients = useMemo(() => {
    if (!adminData?.clients) return [];
    return adminData.clients.filter((c: any) => {
      const matchSearch =
        c.name.toLowerCase().includes(clientSearch.toLowerCase()) ||
        c.email.toLowerCase().includes(clientSearch.toLowerCase()) ||
        (c.company && c.company.toLowerCase().includes(clientSearch.toLowerCase())) ||
        (c.phone && c.phone.includes(clientSearch));

      const matchStatus = clientFilterStatus === "all" || c.status === clientFilterStatus;
      return matchSearch && matchStatus;
    });
  }, [adminData?.clients, clientSearch, clientFilterStatus]);

  // Filtered Payments
  const filteredPayments = useMemo(() => {
    if (!adminData?.recentPayments) return [];
    return adminData.recentPayments.filter((p: any) => {
      if (paymentFilterKind === "all") return true;
      return p.paymentType === paymentFilterKind;
    });
  }, [adminData?.recentPayments, paymentFilterKind]);

  // Grouped Payments by Client
  const clientGroupedPayments = useMemo<{
    groups: Array<{ client: any; payments: any[]; total: number }>;
    unassigned: any[];
  }>(() => {
    if (!adminData?.clients || !adminData?.recentPayments) {
      return { groups: [], unassigned: [] };
    }
    const groups: Record<string, { client: any; payments: any[]; total: number }> = {};

    adminData.clients.forEach((c: any) => {
      groups[c.id] = { client: c, payments: [], total: 0 };
    });

    const unassigned: any[] = [];

    adminData.recentPayments.forEach((p: any) => {
      if (paymentFilterKind !== "all" && p.paymentType !== paymentFilterKind) {
        return;
      }

      if (p.clientId && groups[p.clientId]) {
        groups[p.clientId].payments.push(p);
        groups[p.clientId].total += p.amount;
      } else {
        const matched = adminData.clients.find(
          (c: any) => c.email.toLowerCase().trim() === p.customerEmail.toLowerCase().trim()
        );
        if (matched && groups[matched.id]) {
          groups[matched.id].payments.push(p);
          groups[matched.id].total += p.amount;
        } else {
          unassigned.push(p);
        }
      }
    });

    const result = Object.values(groups).filter((g) => g.payments.length > 0);
    return { groups: result, unassigned };
  }, [adminData?.clients, adminData?.recentPayments, paymentFilterKind]);

  // ─── INITIAL LOADING SCREEN (Clean Light Style) ───
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4">
        <div className={`flex flex-col items-center gap-3 text-slate-500 text-xs sm:text-sm ${jetmono.className}`}>
          <Loader2 className="w-8 h-8 text-slate-900 animate-spin" />
          <span>Verifying admin token...</span>
        </div>
      </div>
    );
  }

  // ─── PASSWORD PROTECTION GATE (Clean Light Style) ───
  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen bg-[#F8FAFC] text-slate-800 pt-20 sm:pt-24 pb-14 flex items-center justify-center p-4 font-sans ${outfit.className}`}>
        <div className="bg-white border border-slate-200/90 w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-md space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center mx-auto shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
              Admin Access Gate
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-xs mx-auto">
              Protected administrator portal. Enter your password to unlock a <strong>1-week session token</strong>.
            </p>
          </div>

          {authError && (
            <div className="bg-rose-50 border border-rose-200 p-3 rounded-xl flex items-center gap-2.5 text-xs text-rose-700">
              <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handlePasswordLogin} className="space-y-4">
            <div>
              <label className={`block text-xs font-semibold text-slate-700 mb-1.5 ${jetmono.className}`}>
                Admin Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Enter administrator password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white pr-10 text-sm ${jetmono.className}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className={`bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 flex items-center gap-2 ${jetmono.className}`}>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Session Duration: <strong>7 Days (1 Week)</strong> without re-prompt.</span>
            </div>

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-2.5 sm:py-3 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-xs active:scale-95"
            >
              {authLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Session...</span>
                </>
              ) : (
                <span>Unlock Dashboard &rarr;</span>
              )}
            </button>
          </form>

          <div className="pt-2 text-center border-t border-slate-100">
            <Link
              href="/profile"
              className={`text-xs text-slate-500 hover:text-slate-800 transition flex items-center justify-center gap-1.5 py-1 ${jetmono.className}`}
            >
              <span>&larr; Return to Client Profile</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── AUTHENTICATED ADMIN DASHBOARD VIEW (Clean Classy Light Theme) ───
  return (
    <div className={`min-h-screen bg-[#F8FAFC] text-slate-800 pt-[68px] md:pt-[72px] pb-24 font-sans ${outfit.className}`}>
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed bottom-4 sm:bottom-6 right-4 sm:right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2.5 max-w-sm animate-in fade-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span className="text-xs font-medium tracking-wide">{successToast}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="border-b border-slate-200 bg-white/95 backdrop-blur-md sticky top-[64px] md:top-[68px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 bg-slate-900 text-white flex items-center justify-center shrink-0 rounded-lg shadow-2xs">
              <FolderKanban className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-bold tracking-tight text-slate-900 truncate">
                  CypherTech Admin CRM
                </h1>
                <span className={`bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase shrink-0 ${jetmono.className}`}>
                  1-Week Token Active
                </span>
              </div>
              <p className={`text-xs text-slate-500 truncate hidden xs:block ${jetmono.className}`}>
                Pipeline Projects, 1% Progress Units &amp; Multi-Format Payment Ledger
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
            <Link
              href="/profile"
              className={`text-xs text-slate-700 hover:text-slate-900 px-3.5 py-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg flex items-center gap-1.5 transition ${jetmono.className}`}
            >
              <span>Client Profile &rarr;</span>
            </Link>
            <button
              type="button"
              onClick={handleLockTerminal}
              className={`text-xs text-slate-600 hover:text-rose-700 px-3 py-1.5 bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 rounded-lg flex items-center gap-1.5 cursor-pointer transition ${jetmono.className}`}
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Terminal</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 sm:py-7 space-y-6">
        
        {/* Metric Cards Bar (Clean Minimal Light) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-xl shadow-xs">
            <div className={`text-[11px] text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between ${jetmono.className}`}>
              <span>TOTAL VOLUME</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate ${jetmono.className}`}>
              ₹{adminData?.totalRevenue?.toLocaleString("en-IN") || "0"}
            </div>
            <div className={`mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex flex-col xs:flex-row xs:items-center justify-between gap-0.5 ${jetmono.className}`}>
              <span className="truncate">Milestones: ₹{adminData?.milestoneRevenue?.toLocaleString("en-IN") || "0"}</span>
              <span className="text-amber-700 shrink-0">☕ ₹{adminData?.coffeeRevenue || 0}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-xl shadow-xs">
            <div className={`text-[11px] text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between ${jetmono.className}`}>
              <span>POTENTIAL CLIENTS</span>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate ${jetmono.className}`}>
              {adminData?.totalClients || 0}
            </div>
            <div className={`mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex flex-col xs:flex-row xs:items-center justify-between gap-0.5 ${jetmono.className}`}>
              <span>{adminData?.clients?.filter((c: any) => c.status === "lead").length || 0} Leads</span>
              <span className="text-blue-700 font-medium">Active: {adminData?.clients?.filter((c: any) => c.status === "active").length || 0}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-xl shadow-xs">
            <div className={`text-[11px] text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between ${jetmono.className}`}>
              <span>SPRINT PROJECTS</span>
              <Layers className="w-4 h-4 text-indigo-600" />
            </div>
            <div className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate ${jetmono.className}`}>
              {adminData?.activeProjectsCount || 0}
            </div>
            <div className={`mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex flex-col xs:flex-row xs:items-center justify-between gap-0.5 ${jetmono.className}`}>
              <span>{adminData?.projects?.reduce((sum: number, p: any) => sum + (p.milestones?.length || 0), 0) || 0} Milestones</span>
              <span className="text-emerald-700 font-medium">Done: {adminData?.completedProjectsCount || 0}</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 p-4 sm:p-5 rounded-xl shadow-xs">
            <div className={`text-[11px] text-slate-500 uppercase tracking-wider mb-1 flex items-center justify-between ${jetmono.className}`}>
              <span>₹1 VERIFICATIONS</span>
              <Smartphone className="w-4 h-4 text-purple-600" />
            </div>
            <div className={`text-xl sm:text-2xl font-bold text-slate-900 tracking-tight truncate ${jetmono.className}`}>
              {adminData?.testPaymentsCount || 0}
            </div>
            <div className={`mt-2 pt-2 border-t border-slate-100 text-[10px] text-slate-500 flex flex-col xs:flex-row xs:items-center justify-between gap-0.5 ${jetmono.className}`}>
              <span className={adminData?.testCallsPending > 0 ? "text-amber-700 font-semibold" : "text-slate-500"}>
                {adminData?.testCallsPending || 0} Pending Meetings
              </span>
              <span className="text-purple-700 font-medium">Live Gateway</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher & Quick Actions */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
            {/* Scrollable Tabs Bar */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
              <button
                type="button"
                onClick={() => setActiveTab("projects")}
                className={`shrink-0 px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 rounded-xl ${
                  activeTab === "projects"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
                }`}
              >
                <FolderKanban className="w-4 h-4" />
                <span>Projects ({adminData?.projects?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("clients")}
                className={`shrink-0 px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 rounded-xl ${
                  activeTab === "clients"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Clients ({adminData?.clients?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("payments")}
                className={`shrink-0 px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 rounded-xl ${
                  activeTab === "payments"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
                }`}
              >
                <CreditCard className="w-4 h-4" />
                <span>Payments ({adminData?.recentPayments?.length || 0})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("analytics")}
                className={`shrink-0 px-4 py-2 text-xs sm:text-sm font-semibold transition cursor-pointer flex items-center gap-2 rounded-xl ${
                  activeTab === "analytics"
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
                }`}
              >
                <BarChart3 className="w-4 h-4" />
                <span>Analytics &amp; Graphs</span>
                {adminData?.activeAlertsCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-rose-500" />
                )}
              </button>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setShowNewProjectModal(true)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-xs cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>+ Project</span>
              </button>

              <button
                type="button"
                onClick={() => setShowManualPaymentModal(true)}
                className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-xs cursor-pointer active:scale-95"
              >
                <DollarSign className="w-4 h-4" />
                <span>+ Manual Pay</span>
              </button>

              <button
                type="button"
                onClick={() => setShowNewClientModal(true)}
                className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition shadow-xs cursor-pointer active:scale-95"
              >
                <Users className="w-4 h-4" />
                <span>+ Client Lead</span>
              </button>
            </div>
          </div>
        </div>

        {/* ─── TAB 1: PROJECTS & MILESTONES (1% Unit Changes & Task Controls) ─── */}
        {activeTab === "projects" && (
          <div className="space-y-5">
            {(!adminData?.projects || adminData.projects.length === 0) ? (
              <div className="bg-white border border-slate-200/90 p-8 sm:p-12 text-center rounded-2xl space-y-3.5 shadow-xs">
                <div className="w-14 h-14 bg-slate-50 border border-slate-200 text-slate-500 rounded-2xl flex items-center justify-center mx-auto">
                  <FolderKanban className="w-7 h-7" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">No Projects on File</h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  Clean state ready for real customer projects. Create a project to track 1% progress increments, work updates, and milestone payments.
                </p>
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(true)}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition inline-flex items-center gap-2 cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create First Project</span>
                </button>
              </div>
            ) : (
              adminData.projects.map((proj: any) => {
                const totalMilestones = proj.milestones?.length || 0;
                const paidMilestones = proj.milestones?.filter((m: any) => m.status === "paid" || m.status === "completed").length || 0;
                const activeAlerts = proj.alerts?.filter((a: any) => a.isActive) || [];
                const isFeedExpanded = Boolean(expandedFeeds[proj.id]);

                return (
                  <div
                    key={proj.id}
                    className="bg-white border border-slate-200/90 p-5 sm:p-7 rounded-2xl space-y-5 shadow-xs transition"
                  >
                    {/* Project Header Bar */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div className="space-y-1.5 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          {/* Status Pill Badge */}
                          <span
                            className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-md uppercase flex items-center gap-1.5 border ${jetmono.className} ${
                              proj.status === "building"
                                ? "bg-blue-50 text-blue-700 border-blue-200"
                                : proj.status === "on_hold"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : proj.status === "dropped"
                                ? "bg-slate-100 text-slate-600 border-slate-200"
                                : proj.status === "completed"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-amber-50 text-amber-700 border-amber-200"
                            }`}
                          >
                            {proj.status === "building" && <Zap className="w-3 h-3 text-blue-600" />}
                            {proj.status === "on_hold" && <PauseCircle className="w-3 h-3 text-rose-600" />}
                            {proj.status === "completed" && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                            <span>{proj.status.replace("_", " ").toUpperCase()}</span>
                          </span>

                          <span className={`bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-semibold px-2 py-0.5 rounded-md ${jetmono.className}`}>
                            {proj.category || "Web App"}
                          </span>
                          <span className={`text-[11px] text-slate-400 ${jetmono.className}`}>ID: {proj.id}</span>
                          {proj.isPrepaid && (
                            <span className={`bg-purple-50 text-purple-700 border border-purple-200 text-[10px] font-semibold px-2 py-0.5 rounded-md ${jetmono.className}`}>
                              Prepaid Deposit
                            </span>
                          )}
                        </div>

                        <h3 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight break-words">{proj.title}</h3>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">{proj.description}</p>
                        
                        <div className={`flex flex-wrap items-center gap-3 text-xs text-slate-500 pt-1 ${jetmono.className}`}>
                          <span>Client: <strong className="text-slate-800">{proj.clientName}</strong> ({proj.clientEmail})</span>
                          {proj.targetDate && <span>Target: <strong className="text-slate-800">{proj.targetDate}</strong></span>}
                        </div>

                        {/* Last Payment Badge */}
                        {proj.lastPayment && (
                          <div className={`inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md text-xs text-emerald-800 font-medium ${jetmono.className}`}>
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                            <span>Last Payment:</span>
                            <strong>₹{proj.lastPayment.amount?.toLocaleString("en-IN")}</strong>
                            <span>• {new Date(proj.lastPayment.payDate).toLocaleDateString("en-IN")}</span>
                            <span className="text-slate-500 text-[10px]">({proj.lastPayment.paymentId})</span>
                          </div>
                        )}
                      </div>

                      {/* Status Dropdown & Financials */}
                      <div className="flex flex-wrap items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs text-slate-500 ${jetmono.className}`}>Status:</span>
                          <select
                            value={proj.status}
                            onChange={(e) => handleUpdateStatus(proj.id, e.target.value)}
                            className={`bg-slate-50 border border-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-800 focus:outline-none focus:border-slate-400 uppercase cursor-pointer ${jetmono.className}`}
                          >
                            <option value="planning">PLANNING</option>
                            <option value="building">BUILDING / SPRINT</option>
                            <option value="in_progress">IN PROGRESS</option>
                            <option value="in_review">IN REVIEW</option>
                            <option value="completed">COMPLETED</option>
                            <option value="on_hold">ON HOLD (PAUSED)</option>
                            <option value="dropped">DROPPED / CANCELLED</option>
                          </select>
                        </div>
                        <div className={`text-xs text-slate-500 ${jetmono.className}`}>
                          Paid: <strong className="text-emerald-700 text-sm">₹{proj.budgetPaid?.toLocaleString("en-IN") || 0}</strong> / ₹{proj.budgetTotal?.toLocaleString("en-IN") || 0}
                        </div>
                      </div>
                    </div>

                    {/* Active Alerts List */}
                    {activeAlerts.length > 0 && (
                      <div className="space-y-2 pt-1">
                        {activeAlerts.map((alt: any) => (
                          <div
                            key={alt.id}
                            className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-amber-950"
                          >
                            <div className="flex items-start gap-2.5 min-w-0">
                              <Bell className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div className="space-y-0.5 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <strong className="text-xs uppercase">{alt.title}</strong>
                                  <span className={`text-[10px] bg-amber-100 text-amber-800 px-2 py-0.2 rounded font-bold uppercase ${jetmono.className}`}>
                                    {alt.type.replace(/_/g, " ")}
                                  </span>
                                  {alt.amount && (
                                    <span className={`text-xs font-bold text-slate-900 ${jetmono.className}`}>
                                      Requested: ₹{Number(alt.amount).toLocaleString("en-IN")}
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-amber-900/80 leading-relaxed">{alt.message}</p>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDismissAlert(proj.id, alt.id)}
                              className="self-end sm:self-center shrink-0 px-2.5 py-1 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded text-xs font-medium transition cursor-pointer"
                            >
                              Dismiss Alert ✓
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* ── 1% UNIT PROGRESS CONTROLS (User Requested Feature) ── */}
                    <div className="bg-slate-50 border border-slate-200/90 p-4 rounded-xl space-y-3">
                      <div className={`flex flex-wrap items-center justify-between gap-2 text-xs ${jetmono.className}`}>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-slate-700" />
                          <span className="font-semibold text-slate-700 uppercase">Live Sprint Progress:</span>
                          <span className="text-sm font-bold text-slate-900">{proj.progress}%</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {[25, 50, 75, 100].map((preset) => (
                            <button
                              key={preset}
                              type="button"
                              onClick={() => handleUpdateProgress(proj.id, preset)}
                              className={`px-2 py-0.5 text-xs font-medium rounded-md border cursor-pointer transition ${
                                proj.progress === preset
                                  ? "bg-slate-900 border-slate-900 text-white"
                                  : "bg-white border-slate-200 text-slate-600 hover:text-slate-900"
                              }`}
                            >
                              {preset}%
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 1% Fine-Tuning Slider + Increment / Decrement Buttons */}
                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleStepProgress(proj.id, proj.progress, -1)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-bold text-xs shadow-2xs transition active:scale-95"
                          title="Decrease by 1%"
                        >
                          -1%
                        </button>

                        <input
                          type="range"
                          min="0"
                          max="100"
                          step="1"
                          value={proj.progress}
                          onChange={(e) => handleUpdateProgress(proj.id, Number(e.target.value))}
                          className="flex-1 accent-slate-900 cursor-pointer h-2 bg-slate-200 rounded-lg appearance-none"
                        />

                        <button
                          type="button"
                          onClick={() => handleStepProgress(proj.id, proj.progress, 1)}
                          className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 font-bold text-xs shadow-2xs transition active:scale-95"
                          title="Increase by 1%"
                        >
                          +1%
                        </button>

                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                            value={proj.progress}
                            onChange={(e) => handleUpdateProgress(proj.id, Number(e.target.value))}
                            className={`w-14 bg-white border border-slate-200 rounded-lg py-1 px-1.5 text-center text-xs font-bold text-slate-900 focus:outline-none focus:border-slate-400 ${jetmono.className}`}
                          />
                          <span className="text-xs text-slate-500 font-mono">%</span>
                        </div>
                      </div>

                      {/* Action buttons inside progress box */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-slate-200">
                        <span className={`text-[11px] text-slate-500 truncate max-w-md ${jetmono.className}`}>
                          {proj.notes ? `Internal Note: "${proj.notes}"` : "No internal notes recorded."}
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleOpenAlertModal(proj)}
                            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer active:scale-95"
                          >
                            <Bell className="w-3.5 h-3.5" />
                            <span>⚡ Emit Alert to Client</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleNotifyClient(proj.id)}
                            className="px-3 py-1.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-medium rounded-lg flex items-center justify-center gap-1.5 transition cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>Email Update</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDeleteProject(proj.id, proj.title)}
                            title="Delete project"
                            className="p-1.5 bg-white hover:bg-rose-50 border border-slate-200 hover:border-rose-300 text-slate-400 hover:text-rose-600 rounded-lg flex items-center justify-center transition cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* ── SPRINT TASKS & WORK CONTROLS (User Requested Feature) ── */}
                    <div className="bg-slate-50/80 border border-slate-200 rounded-xl p-4 sm:p-5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-900">
                          <Zap className="w-4 h-4 text-blue-600" />
                          <span>Sprint Work Focus &amp; Real Task Updates</span>
                        </div>
                        <span className="text-[10px] text-slate-500 font-mono">Syncs to client profile</span>
                      </div>

                      {/* A. Current Work in Progress */}
                      <div className="space-y-1.5">
                        <label className="block text-xs font-semibold text-slate-700">
                          Current Work Focus (What engineering is currently developing right now):
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder="e.g. Razorpay webhook signature verification & real-time client analytics"
                            value={currentWorkInputs[proj.id] !== undefined ? currentWorkInputs[proj.id] : (proj.currentWork || "")}
                            onChange={(e) => setCurrentWorkInputs((p) => ({ ...p, [proj.id]: e.target.value }))}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveCurrentWork(proj.id, currentWorkInputs[proj.id] ?? (proj.currentWork || ""))}
                            className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg shrink-0 transition"
                          >
                            Save Work Focus
                          </button>
                        </div>
                      </div>

                      {/* B. Upcoming Tasks Next in Queue */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-200">
                        <label className="block text-xs font-semibold text-slate-700">
                          Upcoming Tasks / Next Sprint Updates:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {(!proj.upcomingTasks || proj.upcomingTasks.length === 0) ? (
                            <span className="text-xs text-slate-400 italic">No upcoming tasks listed yet.</span>
                          ) : (
                            proj.upcomingTasks.map((t: string, tIdx: number) => (
                              <span key={tIdx} className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 text-xs px-2.5 py-1 rounded-md">
                                <span>• {t}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveUpcomingTask(proj, tIdx)}
                                  className="text-slate-400 hover:text-rose-600 font-bold ml-1"
                                >
                                  ✕
                                </button>
                              </span>
                            ))
                          )}
                        </div>
                        <div className="flex gap-2 pt-1">
                          <input
                            type="text"
                            placeholder="Add next upcoming task / deliverable..."
                            value={newUpcomingTaskInputs[proj.id] || ""}
                            onChange={(e) => setNewUpcomingTaskInputs((p) => ({ ...p, [proj.id]: e.target.value }))}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddUpcomingTask(proj, newUpcomingTaskInputs[proj.id] || "")}
                            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shrink-0 transition"
                          >
                            + Add Task
                          </button>
                        </div>
                      </div>

                      {/* C. Previously Mentioned / Completed Works */}
                      <div className="space-y-1.5 pt-2 border-t border-slate-200">
                        <label className="block text-xs font-semibold text-slate-700">
                          Previously Mentioned &amp; Completed Works:
                        </label>
                        <div className="flex flex-wrap gap-1.5">
                          {(!proj.completedWork || proj.completedWork.length === 0) ? (
                            <span className="text-xs text-slate-400 italic">No completed deliverables logged yet.</span>
                          ) : (
                            proj.completedWork.map((w: string, wIdx: number) => (
                              <span key={wIdx} className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-2.5 py-1 rounded-md">
                                <span>✓ {w}</span>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveCompletedWork(proj, wIdx)}
                                  className="text-emerald-500 hover:text-rose-600 font-bold ml-1"
                                >
                                  ✕
                                </button>
                              </span>
                            ))
                          )}
                        </div>
                        <div className="flex gap-2 pt-1">
                          <input
                            type="text"
                            placeholder="Add previously completed work / deliverable..."
                            value={newCompletedWorkInputs[proj.id] || ""}
                            onChange={(e) => setNewCompletedWorkInputs((p) => ({ ...p, [proj.id]: e.target.value }))}
                            className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-slate-400"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddCompletedWork(proj, newCompletedWorkInputs[proj.id] || "")}
                            className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg shrink-0 transition"
                          >
                            + Add Completed
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Milestones List */}
                    <div className="space-y-2.5">
                      <h4 className={`text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 ${jetmono.className}`}>
                        <Layers className="w-4 h-4 text-slate-500" />
                        <span>Milestones ({paidMilestones}/{totalMilestones} Paid)</span>
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {proj.milestones?.map((ms: any, mIdx: number) => {
                          const isPaid = ms.status === "paid" || ms.status === "completed";
                          return (
                            <div
                              key={ms.id || mIdx}
                              className={`p-4 rounded-xl border text-xs space-y-2.5 flex flex-col justify-between ${
                                isPaid ? "bg-emerald-50/50 border-emerald-200" : "bg-slate-50/70 border-slate-200"
                              }`}
                            >
                              <div className="space-y-1">
                                <div className="flex items-center justify-between gap-2 mb-1">
                                  <span className={`text-[10px] text-slate-500 uppercase ${jetmono.className}`}>Stage #{mIdx + 1}</span>
                                  <span
                                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase ${jetmono.className} ${
                                      isPaid ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-700"
                                    }`}
                                  >
                                    {isPaid ? "✓ PAID" : "PENDING"}
                                  </span>
                                </div>
                                <div className="font-bold text-slate-900 text-xs sm:text-sm break-words">{ms.title}</div>
                                <p className="text-[11px] text-slate-600 mt-1 line-clamp-3 leading-relaxed">{ms.description}</p>
                              </div>

                              <div className={`pt-2 border-t border-slate-200 flex items-center justify-between text-xs ${jetmono.className}`}>
                                <span className="font-bold text-slate-900">₹{ms.amount?.toLocaleString("en-IN") || 0}</span>
                                {!isPaid && (
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setMapProjectId(proj.id);
                                      setMapMilestoneId(ms.id);
                                      setShowMapPaymentModal(true);
                                    }}
                                    className="text-[11px] font-semibold px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-800 border border-slate-200 rounded-md transition active:scale-95 cursor-pointer"
                                  >
                                    + Attach Pay
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Expandable Activity & Progress Feed */}
                    <div className="pt-2 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => toggleFeedExpansion(proj.id)}
                        className={`text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 transition cursor-pointer py-1 ${jetmono.className}`}
                      >
                        <Activity className="w-3.5 h-3.5 text-slate-400" />
                        <span>Sprint Timeline &amp; Activity Feed ({(proj.feed || []).length} Events)</span>
                        {isFeedExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                      </button>

                      {isFeedExpanded && (
                        <div className="mt-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                          {(proj.feed || []).map((item: any, fIdx: number) => (
                            <div key={item.id || fIdx} className="text-xs flex items-start gap-2.5 pb-2 border-b border-slate-200/60 last:border-0 last:pb-0">
                              <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0 ${jetmono.className} ${
                                item.type === "payment_captured" || item.type === "payment"
                                  ? "bg-emerald-100 text-emerald-800"
                                  : item.type === "alert_issued"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-slate-200 text-slate-700"
                              }`}>
                                {item.type?.replace("_", " ") || "EVENT"}
                              </span>
                              <div className="space-y-0.5 flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                  <strong className="text-slate-900 text-xs truncate">{item.title}</strong>
                                  <span className={`text-[10px] text-slate-400 shrink-0 ${jetmono.className}`}>
                                    {new Date(item.timestamp || item.date || Date.now()).toLocaleDateString("en-IN")}
                                  </span>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed">{item.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ─── TAB 2: CLIENT LEADS & DIRECTORY (Clean Light Style) ─── */}
        {activeTab === "clients" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 sm:p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search clients by name, email, phone or company..."
                  value={clientSearch}
                  onChange={(e) => setClientSearch(e.target.value)}
                  className={`w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3.5 py-2 text-slate-800 text-xs focus:outline-none focus:border-slate-400 focus:bg-white placeholder:text-slate-400 ${jetmono.className}`}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs text-slate-500 ${jetmono.className}`}>Filter:</span>
                <select
                  value={clientFilterStatus}
                  onChange={(e) => setClientFilterStatus(e.target.value)}
                  className={`bg-slate-50 border border-slate-200 text-xs font-semibold px-2.5 py-2 rounded-lg text-slate-800 focus:outline-none focus:border-slate-400 uppercase cursor-pointer ${jetmono.className}`}
                >
                  <option value="all">ALL STATUSES</option>
                  <option value="lead">LEADS</option>
                  <option value="active">ACTIVE CLIENTS</option>
                  <option value="completed">COMPLETED</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredClients.length === 0 ? (
                <div className="col-span-full bg-white border border-slate-200 p-8 text-center rounded-2xl text-slate-500 text-xs shadow-xs">
                  No matching clients found. Use the "+ Client Lead" button to add a client record.
                </div>
              ) : (
                filteredClients.map((c: any) => (
                  <div key={c.id} className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-xs">
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="font-bold text-slate-900 text-base">{c.name}</h4>
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                            c.status === "active" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                          }`}>
                            {c.status}
                          </span>
                        </div>
                        <p className={`text-xs text-slate-500 break-all ${jetmono.className}`}>{c.email}</p>
                        {c.phone && <p className={`text-xs text-slate-600 ${jetmono.className}`}>📞 {c.phone}</p>}
                        
                        {/* Company & Designation & Stage */}
                        {(c.company || c.designation || c.businessProfile?.companyName) && (
                          <div className="pt-1 text-xs text-slate-700 flex items-center gap-1.5 flex-wrap">
                            <span className="font-semibold flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span>{c.businessProfile?.companyName || c.company}</span>
                            </span>
                            {(c.designation || c.businessProfile?.designation) && (
                              <span className="text-slate-500">
                                ({c.designation || c.businessProfile?.designation})
                              </span>
                            )}
                          </div>
                        )}

                        {/* Stage badge & Role */}
                        {c.businessProfile?.companyStage && (
                          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
                            <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${jetmono.className} ${
                              c.businessProfile.companyStage === "unformed_idea"
                                ? "bg-amber-50 text-amber-800 border-amber-200"
                                : c.businessProfile.companyStage === "pre_incorporation"
                                ? "bg-purple-50 text-purple-800 border-purple-200"
                                : c.businessProfile.companyStage === "enterprise"
                                ? "bg-blue-50 text-blue-800 border-blue-200"
                                : "bg-emerald-50 text-emerald-800 border-emerald-200"
                            }`}>
                              {c.businessProfile.companyStage.replace("_", " ").toUpperCase()}
                            </span>
                            {c.businessProfile?.userRoleInCompany && (
                              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 ${jetmono.className}`}>
                                {c.businessProfile.userRoleInCompany.replace("_", " ")}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Social Links */}
                        {(c.socials?.linkedin || c.socials?.github || c.socials?.twitter || c.socials?.website) && (
                          <div className="flex items-center gap-1.5 pt-1.5 flex-wrap">
                            {c.socials.linkedin && (
                              <a
                                href={c.socials.linkedin.startsWith("http") ? c.socials.linkedin : `https://${c.socials.linkedin}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded hover:bg-blue-100"
                                title="LinkedIn Profile"
                              >
                                <FaLinkedin className="w-2.5 h-2.5" />
                                <span>LinkedIn</span>
                                <ExternalLink className="w-2 h-2 opacity-60" />
                              </a>
                            )}
                            {c.socials.github && (
                              <a
                                href={c.socials.github.startsWith("http") ? c.socials.github : `https://${c.socials.github}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 bg-slate-100 text-slate-800 border border-slate-200 rounded hover:bg-slate-200"
                                title="GitHub Profile"
                              >
                                <FaGithub className="w-2.5 h-2.5" />
                                <span>GitHub</span>
                                <ExternalLink className="w-2 h-2 opacity-60" />
                              </a>
                            )}
                            {c.socials.twitter && (
                              <a
                                href={c.socials.twitter.startsWith("http") ? c.socials.twitter : `https://${c.socials.twitter}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 bg-sky-50 text-sky-700 border border-sky-200 rounded hover:bg-sky-100"
                                title="X / Twitter"
                              >
                                <FaTwitter className="w-2.5 h-2.5" />
                                <span>X</span>
                                <ExternalLink className="w-2 h-2 opacity-60" />
                              </a>
                            )}
                            {c.socials.website && (
                              <a
                                href={c.socials.website.startsWith("http") ? c.socials.website : `https://${c.socials.website}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 bg-slate-50 text-slate-700 border border-slate-200 rounded hover:bg-slate-100"
                                title="Website"
                              >
                                <Globe className="w-2.5 h-2.5" />
                                <span>Web</span>
                                <ExternalLink className="w-2 h-2 opacity-60" />
                              </a>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Trust Score */}
                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className={`text-xs font-semibold px-2 py-1 rounded-md border ${jetmono.className} ${
                          c.trustLevel === "VIP"
                            ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                            : "bg-slate-50 text-slate-700 border-slate-200"
                        }`}>
                          {c.trustLevel || "Good"} ({c.trustScore || 85}/100)
                        </span>
                        {(c.trustFactors?.profileVerifiedBonus || (c.company && (c.socials?.linkedin || c.socials?.github))) && (
                          <span className={`text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded ${jetmono.className}`}>
                            +15 Profile Bonus
                          </span>
                        )}
                      </div>
                    </div>

                    <div className={`pt-3 border-t border-slate-100 flex items-center justify-between text-xs ${jetmono.className}`}>
                      <span className="text-slate-500">Total Paid:</span>
                      <strong className="text-slate-900 text-sm">₹{c.totalPaid?.toLocaleString("en-IN") || 0}</strong>
                    </div>

                    {/* Outside Meeting Notes, Last Call Date, Overview & Psychological Tags */}
                    <div className="pt-2.5 border-t border-slate-100 space-y-2">
                      {c.lastMeeting ? (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between gap-1 text-[11px]">
                            <div className="flex items-center gap-1 font-medium text-slate-700">
                              <Calendar className="w-3 h-3 text-slate-500" />
                              <span>Last Call: <strong>{c.lastMeeting.date}</strong></span>
                              {c.lastMeeting.duration && (
                                <span className={`text-[10px] text-slate-500 px-1 py-0.2 bg-slate-100 rounded ${jetmono.className}`}>
                                  {c.lastMeeting.duration}
                                </span>
                              )}
                            </div>
                            <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                              {c.lastMeeting.dealStage || "Active Deal"}
                            </span>
                          </div>

                          {/* Meeting Overview / Deal Remarks Quote */}
                          {c.lastMeeting.overview && (
                            <div className="p-2 rounded-lg bg-slate-50 border border-slate-200/90 text-[11px] text-slate-700 italic flex items-start gap-1.5">
                              <MessageSquare className="w-3 h-3 text-slate-400 shrink-0 mt-0.5" />
                              <p className="line-clamp-2 not-italic text-slate-600">
                                <span className="italic font-medium text-slate-800">Overview:</span> "{c.lastMeeting.overview}"
                              </p>
                            </div>
                          )}

                          {/* Psychological Mindset Tags (Outside Badges) */}
                          {c.lastMeeting.tags && c.lastMeeting.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 items-center pt-0.5">
                              {c.lastMeeting.tags.slice(0, 5).map((tag: string, tidx: number) => {
                                const clean = tag.startsWith("#") ? tag : `#${tag}`;
                                const isPositive = ["liked", "build", "confirm", "start", "budget", "deposit", "intent", "ready"].some(k => clean.toLowerCase().includes(k));
                                const isCaution = ["hold", "confusion", "later", "back", "scope", "delay"].some(k => clean.toLowerCase().includes(k));
                                return (
                                  <span
                                    key={tidx}
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border tracking-tight ${
                                      isPositive
                                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                        : isCaution
                                        ? "bg-amber-50 text-amber-800 border-amber-200"
                                        : "bg-indigo-50 text-indigo-800 border-indigo-200"
                                    } ${jetmono.className}`}
                                  >
                                    {clean}
                                  </span>
                                );
                              })}
                              {c.lastMeeting.tags.length > 5 && (
                                <span className="text-[10px] font-semibold text-slate-500 px-1">
                                  +{c.lastMeeting.tags.length - 5}
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="p-2 rounded-lg bg-slate-50/70 border border-dashed border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
                          <span>No meeting notes logged yet</span>
                          <span className="text-[10px] text-slate-400">Track deal tags</span>
                        </div>
                      )}

                      <div className="flex items-center gap-1.5 pt-1">
                        <button
                          type="button"
                          onClick={() => handleOpenMeetingModal(c, c.meetings && c.meetings.length > 0 ? "history" : "log")}
                          className="flex-1 py-1.5 px-2.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-1.5 transition cursor-pointer bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                        >
                          <FileText className="w-3.5 h-3.5 text-slate-300" />
                          <span>
                            Meeting Notes & Records ({c.meetings?.length || (c.lastMeeting ? 1 : 0)})
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenMeetingModal(c, "log")}
                          title="Log new call or meeting"
                          className="p-1.5 rounded-lg text-xs font-semibold border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ─── TAB 3: PAYMENTS & LEDGER (Clean Light Style) ─── */}
        {activeTab === "payments" && (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
              <div className="flex items-center gap-2">
                <span className={`text-xs text-slate-500 ${jetmono.className}`}>Payment Type:</span>
                <select
                  value={paymentFilterKind}
                  onChange={(e) => setPaymentFilterKind(e.target.value)}
                  className={`bg-slate-50 border border-slate-200 text-xs font-semibold px-2.5 py-1.5 rounded-lg text-slate-800 focus:outline-none uppercase cursor-pointer ${jetmono.className}`}
                >
                  <option value="all">ALL PAYMENTS</option>
                  <option value="milestone">MILESTONES</option>
                  <option value="test_payment">₹1 VERIFICATIONS</option>
                  <option value="buy_me_coffee">COFFEE &amp; TIPS</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs text-slate-500 ${jetmono.className}`}>View:</span>
                <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setPaymentGrouping("grouped")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                      paymentGrouping === "grouped" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    By Client
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentGrouping("ledger")}
                    className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                      paymentGrouping === "ledger" ? "bg-white text-slate-900 shadow-2xs" : "text-slate-600 hover:text-slate-900"
                    }`}
                  >
                    Ledger View
                  </button>
                </div>
              </div>
            </div>

            {/* Payments List / Table */}
            {filteredPayments.length === 0 ? (
              <div className="bg-white border border-slate-200 p-8 text-center rounded-2xl text-slate-500 text-xs shadow-xs">
                No transactions recorded yet. Live payments captured via Razorpay webhooks or manual payments will appear here.
              </div>
            ) : (
              <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className={`w-full text-left text-xs sm:text-sm ${jetmono.className}`}>
                    <thead className="bg-slate-50 text-slate-600 text-[11px] uppercase border-b border-slate-200">
                      <tr>
                        <th className="px-5 py-3">Date</th>
                        <th className="px-5 py-3">Reference / ID</th>
                        <th className="px-5 py-3">Customer</th>
                        <th className="px-5 py-3">Type</th>
                        <th className="px-5 py-3 text-right">Amount</th>
                        <th className="px-5 py-3 text-center">Receipt</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredPayments.map((p: any) => (
                        <tr key={p.id || p.paymentId} className="hover:bg-slate-50/60 transition">
                          <td className="px-5 py-3.5 text-slate-500 whitespace-nowrap">
                            {new Date(p.createdAt || p.date || Date.now()).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </td>
                          <td className="px-5 py-3.5 text-slate-900 font-semibold whitespace-nowrap">{p.paymentId}</td>
                          <td className="px-5 py-3.5 text-slate-800 font-sans">
                            <div>{p.customerName || "Customer"}</div>
                            <div className="text-[11px] text-slate-500">{p.customerEmail}</div>
                          </td>
                          <td className="px-5 py-3.5 whitespace-nowrap">
                            <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                              {p.paymentType || "ONLINE"}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 text-right font-bold text-slate-900 text-sm whitespace-nowrap">
                            ₹{Number(p.amount).toLocaleString("en-IN")}
                          </td>
                          <td className="px-5 py-3.5 text-center whitespace-nowrap">
                            <div className="flex items-center justify-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => handleDownloadBill(p, "pdf")}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition cursor-pointer"
                              >
                                PDF
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDownloadBill(p, "html")}
                                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 rounded text-[11px] font-semibold transition cursor-pointer"
                              >
                                HTML
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── TAB 4: AUTOMATED ANALYTICS & DIAGRAMS (Soft Modern Light Style) ─── */}
        {activeTab === "analytics" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              
              {/* DIAGRAM 1: REVENUE STREAMS */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span>Diagram 1: Revenue Streams Breakdown</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Live capital velocity across prepaid deposits, milestones, tips, and custom SoW.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
                  <span className="text-xs text-slate-600 font-medium">Total Captured Inflow:</span>
                  <span className={`text-xl font-bold text-slate-900 ${jetmono.className}`}>
                    ₹{adminData?.totalRevenue?.toLocaleString("en-IN") || "0"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Milestones</span>
                    <div className="text-base font-bold text-slate-900">₹{adminData?.milestoneRevenue?.toLocaleString("en-IN") || "0"}</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Prepaid</span>
                    <div className="text-base font-bold text-slate-900">₹{adminData?.financialsOverview?.prepaidTotal?.toLocaleString("en-IN") || "0"}</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Coffee &amp; Tips</span>
                    <div className="text-base font-bold text-slate-900">₹{adminData?.coffeeRevenue || 0}</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Custom SoW</span>
                    <div className="text-base font-bold text-slate-900">₹{adminData?.financialsOverview?.customSowTotal?.toLocaleString("en-IN") || "0"}</div>
                  </div>
                </div>
              </div>

              {/* DIAGRAM 2: PROJECT PIPELINE */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-600" />
                    <span>Diagram 2: Project Pipeline &amp; Lifecycle</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Engineering sprint status distribution across client accounts.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs text-center">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-blue-700 font-semibold uppercase">Building</span>
                    <div className="text-lg font-bold text-blue-900">{adminData?.projectsOverview?.building || 0}</div>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-amber-700 font-semibold uppercase">Planning</span>
                    <div className="text-lg font-bold text-amber-900">{adminData?.projectsOverview?.planning || 0}</div>
                  </div>
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-rose-700 font-semibold uppercase">On Hold</span>
                    <div className="text-lg font-bold text-rose-900">{adminData?.projectsOverview?.onHold || 0}</div>
                  </div>
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-emerald-700 font-semibold uppercase">Completed</span>
                    <div className="text-lg font-bold text-emerald-900">{adminData?.projectsOverview?.completed || 0}</div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-700">
                    <span>Active Engineering Health:</span>
                    <strong className="text-slate-900">{adminData?.projectsOverview?.healthScore || 100}%</strong>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div
                      className="bg-slate-900 h-2 rounded-full"
                      style={{ width: `${adminData?.projectsOverview?.healthScore || 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* DIAGRAM 3: MILESTONE COLLECTION FUNNEL */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>Diagram 3: Milestone Collection Funnel</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Paid vs upcoming in 3–4 days vs delayed recovery tracking.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-emerald-700 uppercase font-semibold">Paid</span>
                    <div className="text-lg font-bold text-emerald-900">{adminData?.milestonesOverview?.paidCount || 0}</div>
                  </div>
                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-amber-700 uppercase font-semibold">Due 3-4 Days</span>
                    <div className="text-lg font-bold text-amber-900">{adminData?.milestonesOverview?.upcoming3to4DaysCount || 0}</div>
                  </div>
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-rose-700 uppercase font-semibold">Delayed</span>
                    <div className="text-lg font-bold text-rose-900">{adminData?.milestonesOverview?.delayedCount || 0}</div>
                  </div>
                </div>
              </div>

              {/* DIAGRAM 4: CLIENT TRUST METER */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xs">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Shield className="w-4 h-4 text-purple-600" />
                    <span>Diagram 4: Algorithmic Trust Meter</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Portfolio partner trust ratings based on prompt payments &amp; ₹1 test verifications.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-center text-xs">
                  <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-indigo-700 font-semibold uppercase">VIP (90+)</span>
                    <div className="text-lg font-bold text-indigo-900">{adminData?.trustMeterOverview?.vipCount || 0}</div>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-blue-700 font-semibold uppercase">Trusted (75+)</span>
                    <div className="text-lg font-bold text-blue-900">{adminData?.trustMeterOverview?.trustedCount || 0}</div>
                  </div>
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-slate-600 font-semibold uppercase">Good (60+)</span>
                    <div className="text-lg font-bold text-slate-900">{adminData?.trustMeterOverview?.goodCount || 0}</div>
                  </div>
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl space-y-1">
                    <span className="text-[10px] text-rose-700 font-semibold uppercase">Watchlist</span>
                    <div className="text-lg font-bold text-rose-900">{adminData?.trustMeterOverview?.watchlistCount || 0}</div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* ─── MODAL 1: NEW PROJECT ─── */}
      {showNewProjectModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto p-5 sm:p-7 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Create New Client Project</h3>
              <button
                type="button"
                onClick={() => setShowNewProjectModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProjectSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Client *</label>
                <select
                  required
                  value={newProjClient}
                  onChange={(e) => setNewProjClient(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                >
                  <option value="">-- Choose Registered Client --</option>
                  {(adminData?.clients || []).map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Agent Architecture & Webhook Engine"
                  value={newProjTitle}
                  onChange={(e) => setNewProjTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <input
                    type="text"
                    value={newProjCategory}
                    onChange={(e) => setNewProjCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Total Budget (₹)</label>
                  <input
                    type="number"
                    placeholder="45000"
                    value={newProjBudget}
                    onChange={(e) => setNewProjBudget(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Current Work In Development Focus</label>
                <input
                  type="text"
                  placeholder="e.g. Core webhook infrastructure & automated payment synchronization"
                  value={newProjCurrentWork}
                  onChange={(e) => setNewProjCurrentWork(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Project Notes / Deliverable Summary</label>
                <textarea
                  rows={2}
                  placeholder="Initial sprint scope and client agreement notes..."
                  value={newProjNotes}
                  onChange={(e) => setNewProjNotes(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewProjectModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs shadow-xs"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 2: MANUAL PAYMENT ─── */}
      {showManualPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-5 sm:p-7 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Record Manual Payment</h3>
              <button
                type="button"
                onClick={() => setShowManualPaymentModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleManualPaymentSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Client</label>
                <select
                  value={manualClientId}
                  onChange={(e) => setManualClientId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                >
                  <option value="">-- Select Client (Optional) --</option>
                  {(adminData?.clients || []).map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.email})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Amount (₹) *</label>
                <input
                  type="number"
                  required
                  placeholder="e.g. 15000"
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
                <select
                  value={manualMethod}
                  onChange={(e) => setManualMethod(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                >
                  <option value="MANUAL_UPI">UPI / GooglePay / PhonePe</option>
                  <option value="BANK_TRANSFER">Direct IMPS / NEFT</option>
                  <option value="CASH">Cash Deposit</option>
                  <option value="OTHER">Other / Alternate Account</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Transaction Ref / UTR</label>
                <input
                  type="text"
                  placeholder="UTR or Bank Reference ID"
                  value={manualRef}
                  onChange={(e) => setManualRef(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-mono"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowManualPaymentModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs shadow-xs"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 3: MAP PAYMENT TO MILESTONE ─── */}
      {showMapPaymentModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-5 sm:p-7 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Map Payment to Milestone</h3>
              <button
                type="button"
                onClick={() => setShowMapPaymentModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleMapPaymentSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Project</label>
                <select
                  required
                  value={mapProjectId}
                  onChange={(e) => setMapProjectId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                >
                  <option value="">-- Choose Project --</option>
                  {(adminData?.projects || []).map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.clientName})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Select Milestone</label>
                <select
                  required
                  value={mapMilestoneId}
                  onChange={(e) => setMapMilestoneId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                >
                  <option value="">-- Choose Milestone --</option>
                  {(adminData?.projects?.find((p: any) => p.id === mapProjectId)?.milestones || []).map((m: any) => (
                    <option key={m.id} value={m.id}>
                      {m.title} (₹{m.amount}) - {m.status.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowMapPaymentModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-xs shadow-xs"
                >
                  Attach to Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 4: NEW CLIENT LEAD ─── */}
      {showNewClientModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md p-5 sm:p-7 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Register Client Lead</h3>
              <button
                type="button"
                onClick={() => setShowNewClientModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClientSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Client Name</label>
                <input
                  type="text"
                  placeholder="e.g. Himesh Satyam"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="client@company.com"
                  value={newClientEmail}
                  onChange={(e) => setNewClientEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 ..."
                  value={newClientPhone}
                  onChange={(e) => setNewClientPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Company / Organization</label>
                <input
                  type="text"
                  placeholder="Company name"
                  value={newClientCompany}
                  onChange={(e) => setNewClientCompany(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewClientModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs shadow-xs"
                >
                  Save Client Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 5: EMIT PROJECT ALERT ─── */}
      {showEmitAlertModal && selectedProjectForAlert && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-lg p-5 sm:p-7 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">Emit Notice to Client</h3>
                <p className="text-xs text-slate-500">Project: {selectedProjectForAlert.title}</p>
              </div>
              <button
                type="button"
                onClick={() => setShowEmitAlertModal(false)}
                className="text-slate-400 hover:text-slate-700 text-lg p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleEmitAlertSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Alert Type *</label>
                <select
                  value={alertType}
                  onChange={(e) => handleAlertTypeChange(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-medium uppercase"
                >
                  <option value="upcoming_milestone_3_4_days">Upcoming Milestone (About to reach in 3-4 days)</option>
                  <option value="milestone_reached_payment_requested">Milestone Reached (Requesting Payment)</option>
                  <option value="payment_delayed">Payment Delayed (Invoice Past Due)</option>
                  <option value="alert_project_will_be_on_hold">Alert: Project Will Be On Hold (48h Warning)</option>
                  <option value="project_on_hold">Project On Hold (Development Suspended)</option>
                  <option value="building">Building (Active Sprint in Progress)</option>
                  <option value="custom">Custom Advisory Notice</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Notice / Milestone Title *</label>
                <input
                  type="text"
                  required
                  value={alertTitle}
                  onChange={(e) => setAlertTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Requested Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="15000"
                    value={alertAmount}
                    onChange={(e) => setAlertAmount(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Target Due Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 19, 2026"
                    value={alertDueDate}
                    onChange={(e) => setAlertDueDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Directive / Client Notice *</label>
                <textarea
                  rows={3}
                  required
                  value={alertMessage}
                  onChange={(e) => setAlertMessage(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400 leading-relaxed"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="notifyClientEmail"
                  checked={alertNotifyEmail}
                  onChange={(e) => setAlertNotifyEmail(e.target.checked)}
                  className="rounded text-slate-900 cursor-pointer"
                />
                <label htmlFor="notifyClientEmail" className="text-slate-600 text-xs cursor-pointer">
                  Also dispatch formal email notification to client ({selectedProjectForAlert.clientEmail})
                </label>
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowEmitAlertModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={alertLoading}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs shadow-xs disabled:opacity-50"
                >
                  {alertLoading ? "Emitting..." : "Emit Project Alert"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─── MODAL 6: MEETING NOTES, RECORDS & PSYCHOLOGICAL DEAL TAGS ─── */}
      {showMeetingModal && selectedClientForMeeting && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-2xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-slate-200/80 bg-slate-50/60 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>Meeting Notes & Call Records</span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Client Intel
                    </span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    {selectedClientForMeeting.name} • {selectedClientForMeeting.email} {selectedClientForMeeting.company ? `(${selectedClientForMeeting.company})` : ""}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowMeetingModal(false)}
                className="w-8 h-8 rounded-lg hover:bg-slate-200/70 text-slate-500 flex items-center justify-center transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Sub-Tabs: Log Meeting vs History */}
            <div className="px-5 pt-3 border-b border-slate-200/80 bg-white flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={() => setMeetingModalTab("log")}
                className={`pb-2.5 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
                  meetingModalTab === "log"
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Call & Deal Intel</span>
              </button>
              <button
                type="button"
                onClick={() => setMeetingModalTab("history")}
                className={`pb-2.5 text-xs font-semibold border-b-2 transition flex items-center gap-1.5 cursor-pointer ${
                  meetingModalTab === "history"
                    ? "border-slate-900 text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>
                  Meeting History ({selectedClientForMeeting.meetings?.length || (selectedClientForMeeting.lastMeeting ? 1 : 0)})
                </span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto flex-1 space-y-4 text-xs">
              {meetingModalTab === "log" ? (
                <form onSubmit={handleSaveMeetingNote} className="space-y-4">
                  {/* Call Date, Time, Duration & Method */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Date *</label>
                      <input
                        type="date"
                        required
                        value={meetingDate}
                        onChange={(e) => setMeetingDate(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Time</label>
                      <input
                        type="time"
                        value={meetingTime}
                        onChange={(e) => setMeetingTime(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Total Conv (hh:mm) *</label>
                      <input
                        type="text"
                        placeholder="00:30"
                        value={meetingDuration}
                        onChange={(e) => setMeetingDuration(e.target.value)}
                        className={`w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-bold ${jetmono.className}`}
                      />
                      <div className="flex gap-1 mt-1">
                        {["00:15", "00:30", "00:45", "01:00"].map((dur) => (
                          <button
                            key={dur}
                            type="button"
                            onClick={() => setMeetingDuration(dur)}
                            className={`text-[9px] px-1 py-0.5 rounded border ${
                              meetingDuration === dur
                                ? "bg-slate-900 text-white border-slate-900"
                                : "bg-slate-100 hover:bg-slate-200 text-slate-600 border-slate-200"
                            } ${jetmono.className}`}
                          >
                            {dur.replace("00:", "").replace("01:00", "60m")}m
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Connectivity *</label>
                      <select
                        value={meetingMethod}
                        onChange={(e) => setMeetingMethod(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-medium"
                      >
                        <option value="Google Meet">Google Meet</option>
                        <option value="Zoom">Zoom Meeting</option>
                        <option value="Phone / WhatsApp">Phone / WhatsApp</option>
                        <option value="Telegram Call">Telegram Call</option>
                        <option value="In-Person">In-Person Meeting</option>
                      </select>
                    </div>
                  </div>

                  {/* Meeting Links & Deal Stage */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">
                        Recording Link / Call URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://meet.google.com/xyz or Drive URL"
                        value={meetingLink}
                        onChange={(e) => setMeetingLink(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:outline-none focus:border-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Current Deal Stage</label>
                      <select
                        value={meetingDealStage}
                        onChange={(e) => setMeetingDealStage(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-medium"
                      >
                        <option value="Closing / Verbal Yes">Closing / Verbal Yes (Hot)</option>
                        <option value="Discovery & Scope">Discovery & Requirement Scope</option>
                        <option value="Proposal & Pricing">Proposal & Pricing Estimation</option>
                        <option value="Objection Handling">Objection Handling & Questions</option>
                        <option value="Follow-up Needed">Follow-up Needed</option>
                        <option value="Contract & Kickoff">Contract Signed & Kickoff</option>
                      </select>
                    </div>
                  </div>

                  {/* Psychological Mindset #tags (Core Feature) */}
                  <div className="space-y-1.5 p-3 rounded-xl bg-slate-50/80 border border-slate-200">
                    <div className="flex items-center justify-between">
                      <label className="font-bold text-slate-900 flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5 text-indigo-600" />
                        <span>Psychological Mindset #tags</span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          (Separated by commas)
                        </span>
                      </label>
                      <span className="text-[10px] text-indigo-700 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded font-medium">
                        Solidify Client Mindset
                      </span>
                    </div>
                    <input
                      type="text"
                      placeholder="#liked-the-deal, #lets-build, #will-start-soon, #have-confusions"
                      value={meetingTags}
                      onChange={(e) => setMeetingTags(e.target.value)}
                      className={`w-full bg-white border border-slate-300 rounded-lg p-2 text-slate-900 text-xs focus:outline-none focus:border-indigo-500 font-semibold ${jetmono.className}`}
                    />
                    <div className="pt-1">
                      <p className="text-[11px] text-slate-500 mb-1.5">
                        Quick click to add psychological triggers & client confirmation cues:
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {SUGGESTED_PSYCHOLOGICAL_TAGS.map((stag) => {
                          const isSelected = meetingTags.toLowerCase().includes(stag.toLowerCase().replace("#", ""));
                          const isPositive = ["liked", "build", "confirm", "start", "budget", "deposit", "intent", "ready"].some(k => stag.includes(k));
                          const isCaution = ["hold", "confusion", "later", "back", "scope", "comparison"].some(k => stag.includes(k));
                          return (
                            <button
                              key={stag}
                              type="button"
                              onClick={() => toggleMeetingTag(stag)}
                              className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border transition cursor-pointer ${jetmono.className} ${
                                isSelected
                                  ? isPositive
                                    ? "bg-emerald-600 text-white border-emerald-700 shadow-xs"
                                    : isCaution
                                    ? "bg-amber-600 text-white border-amber-700 shadow-xs"
                                    : "bg-indigo-600 text-white border-indigo-700 shadow-xs"
                                  : isPositive
                                  ? "bg-white hover:bg-emerald-50 text-emerald-800 border-emerald-200"
                                  : isCaution
                                  ? "bg-white hover:bg-amber-50 text-amber-800 border-amber-200"
                                  : "bg-white hover:bg-indigo-50 text-indigo-800 border-indigo-200"
                              }`}
                            >
                              {isSelected ? "✓ " : "+ "}{stag}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Meeting Overview & Deal Remarks */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold text-slate-700">
                        Meeting Overview & Deal Remarks *
                      </label>
                      <span className="text-[10px] text-slate-400">
                        Displayed outside as quote tag on client card
                      </span>
                    </div>
                    <textarea
                      rows={2}
                      required
                      placeholder="e.g. Client agreed with the sprint architecture and budget. Wants to initiate with 30% kickoff deposit once invoice link is sent."
                      value={meetingOverview}
                      onChange={(e) => setMeetingOverview(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400 leading-relaxed font-normal"
                    />
                  </div>

                  {/* Conversation Interchanges & Exact Quotes */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold text-slate-700">
                        Conversation Interchanges (Client ↔ Admin Dialogue)
                      </label>
                      <span className="text-[10px] text-slate-400">
                        Exact words, objections & solutions exchanged
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      placeholder={`Client: "We liked the deal and architecture. Let's build this together soon."\nAdmin: "Explained 30-40-30 sprint breakdown. Sent payment link for initial kickoff deposit."`}
                      value={meetingInterchanges}
                      onChange={(e) => setMeetingInterchanges(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-slate-800 text-xs focus:outline-none focus:border-slate-400 font-mono text-[11px] leading-relaxed"
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-3 flex justify-end gap-2 border-t border-slate-200">
                    <button
                      type="button"
                      onClick={() => setShowMeetingModal(false)}
                      className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={savingMeeting}
                      className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-xs shadow-xs disabled:opacity-50 flex items-center gap-1.5 cursor-pointer"
                    >
                      {savingMeeting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                      <span>Save Meeting & Solidify Deal</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* History Tab */
                <div className="space-y-3">
                  {(!selectedClientForMeeting.meetings || selectedClientForMeeting.meetings.length === 0) && !selectedClientForMeeting.lastMeeting ? (
                    <div className="text-center py-12 text-slate-500 space-y-2">
                      <MessageSquare className="w-8 h-8 mx-auto text-slate-300" />
                      <p className="font-medium text-sm text-slate-700">No meeting notes recorded yet</p>
                      <p className="text-xs text-slate-500 max-w-sm mx-auto">
                        Log calls, track verbatim statements, and assign psychological tags to maintain high closing rates.
                      </p>
                      <button
                        type="button"
                        onClick={() => setMeetingModalTab("log")}
                        className="mt-3 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg hover:bg-slate-800 cursor-pointer"
                      >
                        Log First Call Now
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {(selectedClientForMeeting.meetings && selectedClientForMeeting.meetings.length > 0
                        ? selectedClientForMeeting.meetings
                        : [selectedClientForMeeting.lastMeeting]
                      ).map((m: any, idx: number) => (
                        <div
                          key={m.id || idx}
                          className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 space-y-2.5 relative group"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-slate-900 text-xs">
                                {m.date}
                              </span>
                              {m.time && <span className="text-slate-500 text-[11px]">at {m.time}</span>}
                              <span className={`text-[10px] font-semibold text-slate-700 bg-white border border-slate-200 px-1.5 py-0.5 rounded ${jetmono.className}`}>
                                ⏱ {m.duration || "N/A"}
                              </span>
                              <span className="text-[10px] text-slate-600 bg-slate-200/70 px-1.5 py-0.5 rounded">
                                {m.method || "Call"}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {m.dealStage && (
                                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                                  {m.dealStage}
                                </span>
                              )}
                              {m.id && (
                                <button
                                  type="button"
                                  onClick={() => handleDeleteMeetingNote(m.id)}
                                  title="Delete meeting record"
                                  className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-white transition cursor-pointer"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              )}
                            </div>
                          </div>

                          {/* Recording / Meet Link */}
                          {m.link && (
                            <div className="flex items-center gap-1.5 text-[11px] text-indigo-700">
                              <ExternalLink className="w-3 h-3" />
                              <a
                                href={m.link}
                                target="_blank"
                                rel="noreferrer"
                                className="underline hover:text-indigo-900 truncate max-w-md"
                              >
                                {m.link}
                              </a>
                            </div>
                          )}

                          {/* Overview remarks */}
                          {m.overview && (
                            <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-700">
                              <span className="font-semibold text-slate-900">Deal Overview: </span>
                              <span>{m.overview}</span>
                            </div>
                          )}

                          {/* Psychological Tags */}
                          {m.tags && m.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 items-center">
                              {m.tags.map((t: string, tidx: number) => {
                                const clean = t.startsWith("#") ? t : `#${t}`;
                                const isPositive = ["liked", "build", "confirm", "start", "budget", "deposit", "intent", "ready"].some(k => clean.toLowerCase().includes(k));
                                const isCaution = ["hold", "confusion", "later", "back", "scope", "delay"].some(k => clean.toLowerCase().includes(k));
                                return (
                                  <span
                                    key={tidx}
                                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-md border ${jetmono.className} ${
                                      isPositive
                                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                                        : isCaution
                                        ? "bg-amber-50 text-amber-800 border-amber-200"
                                        : "bg-indigo-50 text-indigo-800 border-indigo-200"
                                    }`}
                                  >
                                    {clean}
                                  </span>
                                );
                              })}
                            </div>
                          )}

                          {/* Conversation Interchanges */}
                          {m.interchanges && (
                            <div className="bg-slate-100/80 p-2.5 rounded-lg border border-slate-200/80 text-[11px] font-mono whitespace-pre-wrap text-slate-800 leading-relaxed">
                              {m.interchanges}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
