import fs from "fs";
import path from "path";
import crypto from "crypto";
import { getDb, isMongoConfigured, ensureMongoIndexes } from "./mongodb";

export type CompanyStage =
  | "unformed_idea" // Not formed yet / Solo Founder / Stealth
  | "pre_incorporation" // Bootstrapped / Pre-incorporation
  | "registered_business" // Registered Company (Pvt Ltd, LLC, Corp)
  | "enterprise"; // Scale-up / Enterprise Brand

export type UserRoleInCompany =
  | "owner_founder" // Owner / Founder / Co-Founder
  | "employee_lead" // Employee / Manager / Tech Lead
  | "solo_creator" // Solo Creator / Freelancer / Individual
  | "other";

export interface SocialLinks {
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  telegramOrDiscord?: string;
}

export interface BusinessProfile {
  companyName?: string;
  companyStage?: CompanyStage;
  userRoleInCompany?: UserRoleInCompany;
  designation?: string;
  industry?: string;
  teamSize?: string;
  country?: string;
  city?: string;
  companyBio?: string;
  socials?: SocialLinks;
  verifiedAt?: string;
}

export interface StoredUserAccount {
  id: string;
  name: string;
  email: string;
  phone?: string;
  passwordHash: string; // salt:hash
  role: "admin" | "client";
  createdAt: string;
  company?: string;
  designation?: string;
  businessProfile?: BusinessProfile;
  socials?: SocialLinks;
}

export type PaymentType = "coffee" | "test_payment" | "milestone" | "random_custom";

export interface StoredPayment {
  id: string; // e.g. pay_... or man_...
  paymentId: string; // Razorpay payment ID or manual reference
  orderId?: string;
  amount: number;
  currency: string;
  status: "captured" | "confirmed" | "pending" | "refunded";
  paymentType: PaymentType;
  method: string; // e.g. UPI, CARD, NETBANKING, MANUAL_UPI, BANK_TRANSFER, CASH
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  userId?: string;
  clientId?: string;
  projectId?: string;
  milestoneId?: string;
  testCallConfirmed?: boolean; // For ₹1 test verification call
  isManual?: boolean;
  notes?: string;
  receiptToken?: string;
  refundClaimUrl?: string;
  createdAt: string;
}

export type ProjectAlertType =
  | "upcoming_milestone_3_4_days"
  | "milestone_reached_payment_requested"
  | "payment_delayed"
  | "alert_project_will_be_on_hold"
  | "project_on_hold"
  | "building"
  | "custom";

export interface ProjectAlert {
  id: string;
  type: ProjectAlertType;
  title: string;
  message: string;
  severity: "info" | "warning" | "danger" | "success";
  amount?: number;
  milestoneId?: string;
  dueDate?: string;
  createdAt: string;
  isActive: boolean;
}

export interface ProjectFeedItem {
  id: string;
  type: "payment_captured" | "milestone_completed" | "alert_issued" | "status_change" | "sprint_update";
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
  paymentId?: string;
}

export interface LastPaymentInfo {
  amount: number;
  payDate: string;
  paymentId: string;
  method?: string;
  planName?: string;
}

export interface TrustFactors {
  prepaidBonus: number;
  promptPayments: number;
  testVerified: number;
  delayedPenalties: number;
  holdsOrDisputes: number;
  profileVerifiedBonus?: number;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: "pending" | "in_progress" | "paid" | "completed";
  paymentId?: string; // Linked payment record
  dueDate?: string;
  completedDate?: string;
}

export interface StoredProject {
  id: string;
  clientId: string;
  clientName: string;
  clientEmail: string;
  userId?: string;
  title: string;
  description: string;
  category: string;
  status: "planning" | "in_progress" | "in_review" | "completed" | "on_hold" | "dropped" | "building";
  progress: number; // 0 to 100
  budgetTotal: number;
  budgetPaid: number;
  startDate: string;
  targetDate: string;
  milestones: ProjectMilestone[];
  currentWork?: string;
  completedWork?: string[];
  upcomingTasks?: string[];
  alerts?: ProjectAlert[];
  feed?: ProjectFeedItem[];
  lastPayment?: LastPaymentInfo;
  isPrepaid?: boolean;
  holdReason?: string;
  dropReason?: string;
  notes?: string;
  clientNotified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MeetingNote {
  id: string;
  date: string; // e.g. "15 Oct 2026" or ISO
  time?: string; // e.g. "04:30 PM"
  duration: string; // e.g. "00:35" (hh:mm)
  method: "google_meet" | "zoom" | "phone_whatsapp" | "telegram" | "in_person";
  link?: string; // Meet link, Loom URL, or call recording
  dealStage: "confirmed" | "high_intent" | "warm" | "confused" | "on_hold";
  tags: string[]; // e.g. ["#liked-the-deal", "#lets-build", "#will-start-soon"]
  overview: string; // Brief call overview & deal remarks
  interchanges?: string; // Detailed conversation interchanges / psychological remarks
  createdAt: string;
}

export interface StoredClient {
  id: string;
  userId?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  designation?: string;
  businessProfile?: BusinessProfile;
  socials?: SocialLinks;
  status: "lead" | "active" | "completed" | "inactive" | "dropped" | "on_hold";
  notes?: string;
  callConfirmed?: boolean;
  meetings?: MeetingNote[];
  lastMeeting?: MeetingNote;
  totalPaid: number;
  totalRefunded?: number;
  trustScore?: number; // 0 to 100
  trustLevel?: "VIP" | "Trusted" | "Good" | "Watchlist";
  trustFactors?: TrustFactors;
  lastPayment?: LastPaymentInfo;
  projectIds: string[];
  createdAt: string;
  updatedAt: string;
}

export interface CRMStoreData {
  users: StoredUserAccount[];
  clients: StoredClient[];
  projects: StoredProject[];
  payments: StoredPayment[];
}

const DATA_DIR = path.join(process.cwd(), "data");
const STORE_FILE = path.join(DATA_DIR, "crm_store.json");

// Password hashing utilities using Node.js native crypto (scrypt)
export function hashPassword(password: string): string {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = crypto.scryptSync(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

export function verifyPassword(password: string, storedHash: string): boolean {
  try {
    const [salt, key] = storedHash.split(":");
    if (!salt || !key) return false;
    const keyBuffer = Buffer.from(key, "hex");
    const derivedKey = crypto.scryptSync(password, salt, 64);
    return crypto.timingSafeEqual(keyBuffer, derivedKey);
  } catch {
    return false;
  }
}

// Ensure database file and initial seed exist
function initStoreFile(): CRMStoreData {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(STORE_FILE)) {
    // Default admin account for Himesh Satyam (Owner)
    const adminEmail = (process.env.EMAIL_USER || "satyamhimesh@gmail.com").toLowerCase().trim();
    const adminPasswordHash = hashPassword("Admin@CypherTech2026");

    const initialData: CRMStoreData = {
      users: [
        {
          id: "usr_admin_001",
          name: "Himesh Satyam (Owner)",
          email: adminEmail,
          phone: "+91 9876543210",
          passwordHash: adminPasswordHash,
          role: "admin",
          createdAt: new Date().toISOString(),
          company: "CypherTech",
        },
      ],
      clients: [],
      projects: [],
      payments: [],
    };

    fs.writeFileSync(STORE_FILE, JSON.stringify(initialData, null, 2), "utf8");
    return initialData;
  }

  try {
    const raw = fs.readFileSync(STORE_FILE, "utf8");
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read CRM store file, reinitializing:", err);
    return { users: [], clients: [], projects: [], payments: [] };
  }
}

let cachedStore: CRMStoreData | null = null;

export async function readStoreAsync(): Promise<CRMStoreData> {
  if (isMongoConfigured()) {
    try {
      await ensureMongoIndexes();
      const db = await getDb();
      if (db) {
        const [users, clients, projects, payments] = await Promise.all([
          db.collection<StoredUserAccount>("users").find({}, { projection: { _id: 0 } }).toArray(),
          db.collection<StoredClient>("clients").find({}, { projection: { _id: 0 } }).toArray(),
          db.collection<StoredProject>("projects").find({}, { projection: { _id: 0 } }).toArray(),
          db.collection<StoredPayment>("payments").find({}, { projection: { _id: 0 } }).toArray(),
        ]);

        const storeData: CRMStoreData = {
          users: (users as any[]) || [],
          clients: (clients as any[]) || [],
          projects: (projects as any[]) || [],
          payments: (payments as any[]) || [],
        };

        cachedStore = storeData;

        try {
          if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
          fs.writeFileSync(STORE_FILE, JSON.stringify(storeData, null, 2), "utf8");
        } catch {}

        return storeData;
      }
    } catch (err) {
      console.error("MongoDB Atlas read error, falling back to local file:", err);
    }
  }

  const local = initStoreFile();
  cachedStore = local;
  return local;
}

export function readStore(): CRMStoreData {
  if (cachedStore) return cachedStore;
  const store = initStoreFile();
  cachedStore = store;
  return store;
}

export async function syncMongoStore(data: CRMStoreData): Promise<void> {
  if (!isMongoConfigured()) return;
  try {
    const db = await getDb();
    if (!db) return;

    const usersCol = db.collection("users");
    const clientsCol = db.collection("clients");
    const projectsCol = db.collection("projects");
    const paymentsCol = db.collection("payments");

    if (data.users.length > 0) {
      await Promise.all(
        data.users.map((u) => usersCol.updateOne({ email: u.email }, { $set: u }, { upsert: true }))
      );
    }

    if (data.clients.length > 0) {
      await Promise.all(
        data.clients.map((c) => clientsCol.updateOne({ id: c.id }, { $set: c }, { upsert: true }))
      );
    }

    const existingProjects = await projectsCol.find({}, { projection: { id: 1, _id: 0 } }).toArray();
    const currentIds = new Set(data.projects.map((p) => p.id));
    const toDelete = existingProjects.filter((p: any) => !currentIds.has(p.id)).map((p: any) => p.id);
    if (toDelete.length > 0) {
      await projectsCol.deleteMany({ id: { $in: toDelete } });
    }
    if (data.projects.length > 0) {
      await Promise.all(
        data.projects.map((p) => projectsCol.updateOne({ id: p.id }, { $set: p }, { upsert: true }))
      );
    }

    if (data.payments.length > 0) {
      await Promise.all(
        data.payments.map((p) => paymentsCol.updateOne({ paymentId: p.paymentId }, { $set: p }, { upsert: true }))
      );
    }
  } catch (mongoErr) {
    console.error("MongoDB Atlas write error:", mongoErr);
  }
}

export async function writeStoreAsync(data: CRMStoreData): Promise<void> {
  cachedStore = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${STORE_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(tempFile, STORE_FILE);
  } catch {}

  await syncMongoStore(data);
}

export function writeStore(data: CRMStoreData): void {
  cachedStore = data;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    const tempFile = `${STORE_FILE}.tmp.${Date.now()}`;
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), "utf8");
    fs.renameSync(tempFile, STORE_FILE);
  } catch {}

  if (isMongoConfigured()) {
    syncMongoStore(data).catch((err) =>
      console.error("Background MongoDB sync error:", err)
    );
  }
}

// ─────────────────────────────────────────────────────────────
// USER OPERATIONS
// ─────────────────────────────────────────────────────────────

export function findUserByEmail(email: string): StoredUserAccount | null {
  const store = readStore();
  const cleanEmail = email.toLowerCase().trim();
  return store.users.find((u) => u.email.toLowerCase().trim() === cleanEmail) || null;
}

export function findUserById(id: string): StoredUserAccount | null {
  const store = readStore();
  return store.users.find((u) => u.id === id) || null;
}

export function registerUser({
  name,
  email,
  password,
  phone,
  company,
}: {
  name: string;
  email: string;
  password: string;
  phone?: string;
  company?: string;
}): StoredUserAccount {
  const store = readStore();
  const cleanEmail = email.toLowerCase().trim();

  if (store.users.some((u) => u.email.toLowerCase().trim() === cleanEmail)) {
    throw new Error("An account with this email address already exists.");
  }

  const adminEmail = (process.env.EMAIL_USER || "satyamhimesh@gmail.com").toLowerCase().trim();
  const isAdmin = cleanEmail === adminEmail;

  const userId = "usr_" + crypto.randomBytes(6).toString("hex");
  const passwordHash = hashPassword(password);

  const newUser: StoredUserAccount = {
    id: userId,
    name: name.trim(),
    email: cleanEmail,
    phone: phone?.trim(),
    company: company?.trim(),
    passwordHash,
    role: isAdmin ? "admin" : "client",
    createdAt: new Date().toISOString(),
  };

  store.users.push(newUser);

  // Auto-link any previous guest payments made with this email
  let client = store.clients.find((c) => c.email.toLowerCase().trim() === cleanEmail);
  if (!client) {
    client = {
      id: "cli_" + crypto.randomBytes(6).toString("hex"),
      userId,
      name: newUser.name,
      email: cleanEmail,
      phone: phone || "",
      company: company || "",
      status: "lead",
      notes: "Account registered online.",
      totalPaid: 0,
      projectIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.clients.push(client);
  } else {
    client.userId = userId;
    client.updatedAt = new Date().toISOString();
  }

  // Bind unattached payments for this email to this user and client
  store.payments.forEach((p) => {
    if (p.customerEmail.toLowerCase().trim() === cleanEmail) {
      p.userId = userId;
      p.clientId = client.id;
    }
  });

  // Recalculate client totalPaid
  client.totalPaid = store.payments
    .filter((p) => p.clientId === client?.id && p.status === "captured")
    .reduce((sum, p) => sum + p.amount, 0);

  writeStore(store);
  return newUser;
}

export function authenticateUser(email: string, password: string): StoredUserAccount {
  const cleanEmail = email.toLowerCase().trim();
  const user = findUserByEmail(cleanEmail);

  if (!user) {
    throw new Error("No account found with this email. Please sign up first.");
  }

  const isValid = verifyPassword(password, user.passwordHash);
  if (!isValid) {
    throw new Error("Invalid password. Please check your credentials and try again.");
  }

  // Ensure owner email is always treated as admin
  const adminEmail = (process.env.EMAIL_USER || "satyamhimesh@gmail.com").toLowerCase().trim();
  if (user.email.toLowerCase().trim() === adminEmail && user.role !== "admin") {
    user.role = "admin";
    const store = readStore();
    const idx = store.users.findIndex((u) => u.id === user.id);
    if (idx !== -1) {
      store.users[idx].role = "admin";
      writeStore(store);
    }
  }

  return user;
}

// ─────────────────────────────────────────────────────────────
// CLIENT & PAYMENT RECORDING
// ─────────────────────────────────────────────────────────────

export function getOrCreateClient({
  name,
  email,
  phone,
  userId,
}: {
  name: string;
  email: string;
  phone?: string;
  userId?: string;
}): StoredClient {
  const store = readStore();
  const cleanEmail = email.toLowerCase().trim();

  let client = store.clients.find(
    (c) =>
      c.email.toLowerCase().trim() === cleanEmail ||
      (userId && c.userId === userId) ||
      (phone && c.phone && c.phone === phone)
  );

  if (!client) {
    client = {
      id: "cli_" + crypto.randomBytes(6).toString("hex"),
      userId,
      name: name.trim() || email.split("@")[0],
      email: cleanEmail,
      phone: phone || "",
      status: "lead",
      notes: "Lead captured via online payment portal.",
      callConfirmed: false,
      totalPaid: 0,
      projectIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.clients.push(client);
    writeStore(store);
  } else {
    // Update phone/userId if newly provided
    let updated = false;
    if (userId && !client.userId) {
      client.userId = userId;
      updated = true;
    }
    if (phone && !client.phone) {
      client.phone = phone;
      updated = true;
    }
    if (name && client.name.includes("@")) {
      client.name = name;
      updated = true;
    }
    if (updated) {
      client.updatedAt = new Date().toISOString();
      writeStore(store);
    }
  }

  return client;
}

export function recordPayment(paymentData: {
  paymentId: string;
  orderId?: string;
  amount: number;
  currency?: string;
  paymentType: PaymentType;
  method?: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  userId?: string;
  projectId?: string;
  milestoneId?: string;
  receiptToken?: string;
  refundClaimUrl?: string;
  notes?: string;
  isManual?: boolean;
}): StoredPayment {
  const store = readStore();

  // Deduplicate by paymentId if already recorded
  const existingIdx = store.payments.findIndex((p) => p.paymentId === paymentData.paymentId);
  if (existingIdx !== -1) {
    return store.payments[existingIdx];
  }

  const cleanEmail = paymentData.customerEmail.toLowerCase().trim();

  // If userId not explicitly provided, search if a user already exists with this email
  let resolvedUserId = paymentData.userId;
  if (!resolvedUserId) {
    const existingUser = store.users.find((u) => u.email.toLowerCase().trim() === cleanEmail);
    if (existingUser) {
      resolvedUserId = existingUser.id;
    }
  }

  // Get or create client record
  const client = getOrCreateClient({
    name: paymentData.customerName,
    email: cleanEmail,
    phone: paymentData.customerPhone,
    userId: resolvedUserId,
  });

  const paymentRecord: StoredPayment = {
    id: "rec_" + crypto.randomBytes(6).toString("hex"),
    paymentId: paymentData.paymentId,
    orderId: paymentData.orderId,
    amount: paymentData.amount,
    currency: paymentData.currency || "INR",
    status: "captured",
    paymentType: paymentData.paymentType,
    method: paymentData.method || "ONLINE",
    customerName: paymentData.customerName,
    customerEmail: cleanEmail,
    customerPhone: paymentData.customerPhone,
    userId: resolvedUserId,
    clientId: client.id,
    projectId: paymentData.projectId,
    milestoneId: paymentData.milestoneId,
    testCallConfirmed: paymentData.paymentType === "test_payment" ? false : undefined,
    isManual: Boolean(paymentData.isManual),
    notes: paymentData.notes,
    receiptToken: paymentData.receiptToken,
    refundClaimUrl: paymentData.refundClaimUrl,
    createdAt: new Date().toISOString(),
  };

  store.payments.unshift(paymentRecord);

  const lastPayInfo: LastPaymentInfo = {
    amount: paymentData.amount,
    payDate: paymentRecord.createdAt,
    paymentId: paymentRecord.paymentId,
    method: paymentRecord.method,
    planName: paymentRecord.notes || paymentData.notes || "Online Payment",
  };

  // Find linked project or active client project to associate timeline & feed
  let targetProject: StoredProject | undefined;
  if (paymentData.projectId) {
    targetProject = store.projects.find((p) => p.id === paymentData.projectId);
  } else {
    targetProject = store.projects.find(
      (p) => p.clientId === client.id && p.status !== "completed" && p.status !== "dropped"
    );
  }

  if (targetProject) {
    // If not already set on paymentRecord
    if (!paymentRecord.projectId) {
      paymentRecord.projectId = targetProject.id;
    }

    targetProject.lastPayment = lastPayInfo;
    targetProject.budgetPaid = (targetProject.budgetPaid || 0) + paymentData.amount;
    targetProject.updatedAt = new Date().toISOString();

    // If payment is attached to a project milestone, mark milestone as paid
    if (paymentData.milestoneId) {
      const ms = targetProject.milestones.find((m) => m.id === paymentData.milestoneId);
      if (ms) {
        ms.status = "paid";
        ms.paymentId = paymentRecord.paymentId;
        ms.completedDate = new Date().toISOString().split("T")[0];
      }
    }

    // Add activity feed item
    if (!targetProject.feed) targetProject.feed = [];
    targetProject.feed.unshift({
      id: "feed_" + crypto.randomBytes(4).toString("hex"),
      type: "payment_captured",
      title: `Payment Captured: ₹${paymentData.amount.toLocaleString("en-IN")}`,
      description: `Transaction verified via ${paymentRecord.method} (Ref: ${paymentRecord.paymentId}).`,
      timestamp: new Date().toISOString(),
      amount: paymentData.amount,
      paymentId: paymentRecord.paymentId,
    });

    // If project was on hold due to payment, auto-resume
    if (targetProject.status === "on_hold") {
      targetProject.status = "in_progress";
      targetProject.feed.unshift({
        id: "feed_" + crypto.randomBytes(4).toString("hex"),
        type: "status_change",
        title: "Sprint Resumed",
        description: "Project resumed from hold automatically upon successful payment verification.",
        timestamp: new Date().toISOString(),
      });
    }

    // Auto-resolve pending payment/hold alerts
    if (targetProject.alerts) {
      targetProject.alerts.forEach((alert) => {
        if (
          alert.isActive &&
          (alert.type === "milestone_reached_payment_requested" ||
            alert.type === "payment_delayed" ||
            alert.type === "alert_project_will_be_on_hold" ||
            alert.type === "project_on_hold")
        ) {
          alert.isActive = false;
        }
      });
    }

    // Recalculate progress based on paid milestones
    if (targetProject.milestones && targetProject.milestones.length > 0) {
      const paidCount = targetProject.milestones.filter(
        (m) => m.status === "paid" || m.status === "completed"
      ).length;
      const computedProg = Math.round((paidCount / targetProject.milestones.length) * 100);
      if (computedProg > targetProject.progress) {
        targetProject.progress = computedProg;
      }
    }
  }

  // Update client metrics & last payment
  client.totalPaid = (client.totalPaid || 0) + paymentData.amount;
  client.lastPayment = lastPayInfo;
  if (client.status === "lead" && paymentData.paymentType === "milestone") {
    client.status = "active";
  }
  client.updatedAt = new Date().toISOString();

  // Recalculate client trust score
  const clientProjects = store.projects.filter((p) => p.clientId === client.id);
  const clientPayments = store.payments.filter((p) => p.clientId === client.id);
  const trust = computeClientTrust(client, clientProjects, clientPayments);
  client.trustScore = trust.score;
  client.trustLevel = trust.level;
  client.trustFactors = trust.factors;

  writeStore(store);
  return paymentRecord;
}

// ─────────────────────────────────────────────────────────────
// CLIENT TRUST METER CALCULATION
// ─────────────────────────────────────────────────────────────

export function computeClientTrust(
  client: StoredClient,
  projects: StoredProject[] = [],
  payments: StoredPayment[] = []
): { score: number; level: "VIP" | "Trusted" | "Good" | "Watchlist"; factors: TrustFactors } {
  let score = 70; // baseline neutral score
  let prepaidBonus = 0;
  let promptPayments = 0;
  let testVerified = 0;
  let delayedPenalties = 0;
  let holdsOrDisputes = 0;

  // 1. ₹1 Test Verification Call (+10 pts)
  const testPay = payments.find((p) => p.paymentType === "test_payment" && p.testCallConfirmed);
  if (testPay || client.callConfirmed) {
    testVerified = 10;
    score += testVerified;
  }

  // 2. Prepaid deposit upfront (+15 pts)
  const hasPrepaid =
    projects.some((pr) => pr.isPrepaid || pr.budgetPaid >= pr.budgetTotal * 0.3) ||
    payments.some((p) => p.notes?.toLowerCase().includes("deposit") || p.notes?.toLowerCase().includes("prepaid"));
  if (hasPrepaid) {
    prepaidBonus = 15;
    score += prepaidBonus;
  }

  // 3. Prompt milestone payments (+5 per captured payment, up to +20 pts)
  const capturedMilestones = payments.filter(
    (p) => p.status === "captured" && (p.paymentType === "milestone" || p.amount >= 5000)
  );
  promptPayments = Math.min(20, capturedMilestones.length * 5);
  score += promptPayments;

  // 4. Delayed payments or active late alert (-20 pts)
  const hasDelayedAlert = projects.some((pr) =>
    pr.alerts?.some(
      (a) => a.isActive && (a.type === "payment_delayed" || a.type === "alert_project_will_be_on_hold")
    )
  );
  if (hasDelayedAlert) {
    delayedPenalties = 20;
    score -= delayedPenalties;
  }

  // 5. Project holds, cancellations, or refunds (-15 to -30 pts)
  const hasHold = projects.some(
    (pr) => pr.status === "on_hold" || pr.alerts?.some((a) => a.isActive && a.type === "project_on_hold")
  );
  const hasDrop = projects.some((pr) => pr.status === "dropped");
  const hasRefund =
    payments.some((p) => p.status === "refunded") ||
    (client.totalRefunded !== undefined && client.totalRefunded > 0);

  if (hasHold) holdsOrDisputes += 15;
  if (hasDrop) holdsOrDisputes += 25;
  if (hasRefund) holdsOrDisputes += 20;
  score -= holdsOrDisputes;

  // 6. Business Profile & Social Connectivity Verification (+8 to +15 pts)
  let profileVerifiedBonus = 0;
  const bp = client.businessProfile;
  const soc = client.socials || bp?.socials;
  const hasRoleOrCompany = Boolean(
    client.company ||
    bp?.companyName ||
    bp?.companyStage ||
    bp?.userRoleInCompany ||
    client.designation ||
    bp?.designation
  );
  const hasSocials = Boolean(
    soc?.linkedin || soc?.github || soc?.twitter || soc?.website || soc?.telegramOrDiscord
  );

  if (hasRoleOrCompany && hasSocials) {
    profileVerifiedBonus = 15;
  } else if (hasRoleOrCompany || hasSocials) {
    profileVerifiedBonus = 8;
  }
  score += profileVerifiedBonus;

  score = Math.max(0, Math.min(100, Math.round(score)));

  let level: "VIP" | "Trusted" | "Good" | "Watchlist" = "Good";
  if (score >= 90) level = "VIP";
  else if (score >= 75) level = "Trusted";
  else if (score >= 60) level = "Good";
  else level = "Watchlist";

  return {
    score,
    level,
    factors: {
      prepaidBonus,
      promptPayments,
      testVerified,
      delayedPenalties,
      holdsOrDisputes,
      profileVerifiedBonus,
    },
  };
}

// ─────────────────────────────────────────────────────────────
// PROJECT & MILESTONES MANAGEMENT
// ─────────────────────────────────────────────────────────────

export function createProject(data: {
  clientId: string;
  title: string;
  description: string;
  category: string;
  budgetTotal: number;
  startDate?: string;
  targetDate?: string;
  milestones: Array<{
    title: string;
    description: string;
    amount: number;
    dueDate?: string;
  }>;
  notes?: string;
  isPrepaid?: boolean;
}): StoredProject {
  const store = readStore();
  const client = store.clients.find((c) => c.id === data.clientId);
  if (!client) {
    throw new Error("Selected client could not be found.");
  }

  const projectId = "proj_" + crypto.randomBytes(6).toString("hex");

  const formattedMilestones: ProjectMilestone[] = (data.milestones || []).map((m, idx) => ({
    id: `ms_${idx + 1}_${crypto.randomBytes(3).toString("hex")}`,
    title: m.title,
    description: m.description,
    amount: Number(m.amount) || 0,
    status: "pending",
    dueDate: m.dueDate || "",
  }));

  const initialFeed: ProjectFeedItem[] = [
    {
      id: "feed_" + crypto.randomBytes(4).toString("hex"),
      type: "status_change",
      title: "Project Initialized",
      description: `Project roadmap kicked off with ${formattedMilestones.length} milestone deliverables.`,
      timestamp: new Date().toISOString(),
    },
  ];

  const newProject: StoredProject = {
    id: projectId,
    clientId: client.id,
    clientName: client.name,
    clientEmail: client.email,
    userId: client.userId,
    title: data.title.trim(),
    description: data.description.trim(),
    category: data.category.trim() || "Web Application",
    status: "planning",
    progress: 10,
    budgetTotal: Number(data.budgetTotal) || 0,
    budgetPaid: 0,
    startDate: data.startDate || new Date().toISOString().split("T")[0],
    targetDate: data.targetDate || "",
    milestones: formattedMilestones,
    currentWork: (data as any).currentWork || "",
    completedWork: (data as any).completedWork || [],
    upcomingTasks: (data as any).upcomingTasks || [],
    alerts: [],
    feed: initialFeed,
    isPrepaid: Boolean(data.isPrepaid),
    notes: data.notes || "",
    clientNotified: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  store.projects.unshift(newProject);

  // Link to client
  if (!client.projectIds) client.projectIds = [];
  client.projectIds.push(projectId);
  client.status = "active";
  client.updatedAt = new Date().toISOString();

  // Recalculate trust
  const trust = computeClientTrust(
    client,
    store.projects.filter((p) => p.clientId === client.id),
    store.payments.filter((p) => p.clientId === client.id)
  );
  client.trustScore = trust.score;
  client.trustLevel = trust.level;
  client.trustFactors = trust.factors;

  writeStore(store);
  return newProject;
}

export function updateProject(
  projectId: string,
  updates: Partial<StoredProject>
): StoredProject {
  const store = readStore();
  const project = store.projects.find((p) => p.id === projectId);
  if (!project) {
    throw new Error("Project not found.");
  }

  const prevStatus = project.status;

  if (updates.title !== undefined) project.title = updates.title;
  if (updates.description !== undefined) project.description = updates.description;
  if (updates.category !== undefined) project.category = updates.category;
  if (updates.status !== undefined) project.status = updates.status;
  if (updates.progress !== undefined) project.progress = Math.min(100, Math.max(0, updates.progress));
  if (updates.budgetTotal !== undefined) project.budgetTotal = updates.budgetTotal;
  if (updates.targetDate !== undefined) project.targetDate = updates.targetDate;
  if (updates.notes !== undefined) project.notes = updates.notes;
  if (updates.clientNotified !== undefined) project.clientNotified = updates.clientNotified;
  if (updates.milestones !== undefined) project.milestones = updates.milestones;
  if (updates.alerts !== undefined) project.alerts = updates.alerts;
  if (updates.feed !== undefined) project.feed = updates.feed;
  if (updates.lastPayment !== undefined) project.lastPayment = updates.lastPayment;
  if (updates.isPrepaid !== undefined) project.isPrepaid = updates.isPrepaid;
  if (updates.currentWork !== undefined) project.currentWork = updates.currentWork;
  if (updates.completedWork !== undefined) project.completedWork = updates.completedWork;
  if (updates.upcomingTasks !== undefined) project.upcomingTasks = updates.upcomingTasks;
  if (updates.holdReason !== undefined) project.holdReason = updates.holdReason;
  if (updates.dropReason !== undefined) project.dropReason = updates.dropReason;

  // Log status change in feed
  if (updates.status !== undefined && updates.status !== prevStatus) {
    if (!project.feed) project.feed = [];
    project.feed.unshift({
      id: "feed_" + crypto.randomBytes(4).toString("hex"),
      type: "status_change",
      title: `Status Changed to ${updates.status.toUpperCase().replace("_", " ")}`,
      description: updates.holdReason || updates.dropReason || `Project pipeline status transitioned to ${updates.status}.`,
      timestamp: new Date().toISOString(),
    });
  }

  project.updatedAt = new Date().toISOString();

  // Recalculate client trust if status changed
  const client = store.clients.find((c) => c.id === project.clientId);
  if (client) {
    const trust = computeClientTrust(
      client,
      store.projects.filter((p) => p.clientId === client.id),
      store.payments.filter((p) => p.clientId === client.id)
    );
    client.trustScore = trust.score;
    client.trustLevel = trust.level;
    client.trustFactors = trust.factors;
  }

  writeStore(store);
  return project;
}

export function deleteProject(projectId: string): boolean {
  const store = readStore();
  const index = store.projects.findIndex((p) => p.id === projectId);
  if (index === -1) return false;

  const [removed] = store.projects.splice(index, 1);
  if (removed) {
    const client = store.clients.find((c) => c.id === removed.clientId);
    if (client) {
      client.projectIds = client.projectIds.filter((id) => id !== projectId);
      const trust = computeClientTrust(
        client,
        store.projects.filter((p) => p.clientId === client.id),
        store.payments.filter((p) => p.clientId === client.id)
      );
      client.trustScore = trust.score;
      client.trustLevel = trust.level;
      client.trustFactors = trust.factors;
    }
  }

  writeStore(store);
  return true;
}

// ─────────────────────────────────────────────────────────────
// PROJECT ALERTS & LIVE FEED METHODS
// ─────────────────────────────────────────────────────────────

export function addProjectAlert(
  projectId: string,
  alert: {
    type: ProjectAlertType;
    title: string;
    message: string;
    severity?: "info" | "warning" | "danger" | "success";
    amount?: number;
    milestoneId?: string;
    dueDate?: string;
  }
): { project: StoredProject; alert: ProjectAlert } {
  const store = readStore();
  const project = store.projects.find((p) => p.id === projectId);
  if (!project) {
    throw new Error("Project not found.");
  }

  if (!project.alerts) project.alerts = [];
  if (!project.feed) project.feed = [];

  // Determine severity based on alert type if not explicitly set
  let severity: "info" | "warning" | "danger" | "success" = alert.severity || "info";
  if (alert.type === "payment_delayed" || alert.type === "alert_project_will_be_on_hold") {
    severity = "warning";
  } else if (alert.type === "project_on_hold") {
    severity = "danger";
  } else if (alert.type === "building" || alert.type === "milestone_reached_payment_requested") {
    severity = alert.type === "building" ? "success" : "info";
  }

  const newAlert: ProjectAlert = {
    id: "alt_" + crypto.randomBytes(5).toString("hex"),
    type: alert.type,
    title: alert.title,
    message: alert.message,
    severity,
    amount: alert.amount,
    milestoneId: alert.milestoneId,
    dueDate: alert.dueDate,
    createdAt: new Date().toISOString(),
    isActive: true,
  };

  project.alerts.unshift(newAlert);

  // Auto-update project status if on hold or building
  if (alert.type === "project_on_hold") {
    project.status = "on_hold";
    project.holdReason = alert.message;
  } else if (alert.type === "building") {
    project.status = "building";
  }

  // Log in project activity feed
  project.feed.unshift({
    id: "feed_" + crypto.randomBytes(4).toString("hex"),
    type: "alert_issued",
    title: `Alert Issued: ${alert.title}`,
    description: alert.message,
    timestamp: new Date().toISOString(),
    amount: alert.amount,
  });

  project.updatedAt = new Date().toISOString();

  // Recalculate client trust
  const client = store.clients.find((c) => c.id === project.clientId);
  if (client) {
    const trust = computeClientTrust(
      client,
      store.projects.filter((p) => p.clientId === client.id),
      store.payments.filter((p) => p.clientId === client.id)
    );
    client.trustScore = trust.score;
    client.trustLevel = trust.level;
    client.trustFactors = trust.factors;
  }

  writeStore(store);
  return { project, alert: newAlert };
}

export function dismissProjectAlert(
  projectId: string,
  alertId: string
): StoredProject {
  const store = readStore();
  const project = store.projects.find((p) => p.id === projectId);
  if (!project) {
    throw new Error("Project not found.");
  }

  if (project.alerts) {
    const targetAlert = project.alerts.find((a) => a.id === alertId);
    if (targetAlert) {
      targetAlert.isActive = false;

      // If project was on hold due to this alert, check if any other on_hold alerts remain
      if (project.status === "on_hold" && targetAlert.type === "project_on_hold") {
        const otherHold = project.alerts.some((a) => a.isActive && a.type === "project_on_hold");
        if (!otherHold) {
          project.status = "in_progress";
        }
      }
    }
  }

  project.updatedAt = new Date().toISOString();

  // Recalculate client trust
  const client = store.clients.find((c) => c.id === project.clientId);
  if (client) {
    const trust = computeClientTrust(
      client,
      store.projects.filter((p) => p.clientId === client.id),
      store.payments.filter((p) => p.clientId === client.id)
    );
    client.trustScore = trust.score;
    client.trustLevel = trust.level;
    client.trustFactors = trust.factors;
  }

  writeStore(store);
  return project;
}

export function addProjectFeedItem(
  projectId: string,
  item: {
    type: "payment_captured" | "milestone_completed" | "alert_issued" | "status_change" | "sprint_update";
    title: string;
    description: string;
    amount?: number;
  }
): StoredProject {
  const store = readStore();
  const project = store.projects.find((p) => p.id === projectId);
  if (!project) {
    throw new Error("Project not found.");
  }

  if (!project.feed) project.feed = [];
  project.feed.unshift({
    id: "feed_" + crypto.randomBytes(4).toString("hex"),
    type: item.type,
    title: item.title,
    description: item.description,
    timestamp: new Date().toISOString(),
    amount: item.amount,
  });

  project.updatedAt = new Date().toISOString();
  writeStore(store);
  return project;
}

export function mapPaymentToProjectMilestone({
  paymentId,
  projectId,
  milestoneId,
}: {
  paymentId: string;
  projectId: string;
  milestoneId: string;
}): { success: boolean; project: StoredProject; payment: StoredPayment } {
  const store = readStore();

  const payment = store.payments.find((p) => p.paymentId === paymentId || p.id === paymentId);
  if (!payment) {
    throw new Error("Payment record not found.");
  }

  const project = store.projects.find((p) => p.id === projectId);
  if (!project) {
    throw new Error("Project not found.");
  }

  const milestone = project.milestones.find((m) => m.id === milestoneId);
  if (!milestone) {
    throw new Error("Milestone not found.");
  }

  // Update milestone
  milestone.status = "paid";
  milestone.paymentId = payment.paymentId;
  milestone.completedDate = new Date().toISOString().split("T")[0];

  // Update payment mapping
  payment.projectId = project.id;
  payment.milestoneId = milestone.id;
  payment.clientId = project.clientId;

  // Recalculate project total paid
  const totalPaid = store.payments
    .filter((p) => p.projectId === project.id && p.status === "captured")
    .reduce((sum, p) => sum + p.amount, 0);
  project.budgetPaid = totalPaid;
  project.lastPayment = {
    amount: payment.amount,
    payDate: payment.createdAt,
    paymentId: payment.paymentId,
    method: payment.method,
    planName: payment.notes || milestone.title,
  };

  // Add feed item
  if (!project.feed) project.feed = [];
  project.feed.unshift({
    id: "feed_" + crypto.randomBytes(4).toString("hex"),
    type: "milestone_completed",
    title: `Milestone Settled: ${milestone.title}`,
    description: `Payment of ₹${payment.amount.toLocaleString("en-IN")} mapped and verified for this sprint.`,
    timestamp: new Date().toISOString(),
    amount: payment.amount,
    paymentId: payment.paymentId,
  });

  // If milestone paid, auto-update progress if reasonable
  const paidCount = project.milestones.filter((m) => m.status === "paid" || m.status === "completed").length;
  const newProgress = Math.round((paidCount / Math.max(1, project.milestones.length)) * 100);
  if (newProgress > project.progress) {
    project.progress = newProgress;
  }

  project.updatedAt = new Date().toISOString();

  writeStore(store);
  return { success: true, project, payment };
}

// ─────────────────────────────────────────────────────────────
// DASHBOARD STATS AGGREGATOR & BUSINESS INTELLIGENCE
// ─────────────────────────────────────────────────────────────

export function getAdminDashboardStats(explicitStore?: CRMStoreData) {
  const store = explicitStore || readStore();
  const now = new Date();

  // 1. Financials Breakdown
  const capturedPayments = store.payments.filter((p) => p.status === "captured");
  const totalRevenue = capturedPayments.reduce((sum, p) => sum + p.amount, 0);

  const coffeeRevenue = capturedPayments
    .filter((p) => p.paymentType === "coffee")
    .reduce((sum, p) => sum + p.amount, 0);

  const milestoneRevenue = capturedPayments
    .filter((p) => p.paymentType === "milestone")
    .reduce((sum, p) => sum + p.amount, 0);

  const customRevenue = capturedPayments
    .filter((p) => p.paymentType === "random_custom")
    .reduce((sum, p) => sum + p.amount, 0);

  const prepaidRevenue = capturedPayments
    .filter(
      (p) =>
        p.notes?.toLowerCase().includes("deposit") ||
        p.notes?.toLowerCase().includes("prepaid") ||
        p.notes?.toLowerCase().includes("advance")
    )
    .reduce((sum, p) => sum + p.amount, 0);

  const refundedPayments = store.payments.filter((p) => p.status === "refunded");
  const refundedAmount = refundedPayments.reduce((sum, p) => sum + p.amount, 0);

  // 2. Project Pipeline & Health Breakdown
  const totalProjects = store.projects.length;
  const buildingProjects = store.projects.filter((p) => p.status === "building").length;
  const inProgressProjects = store.projects.filter((p) => p.status === "in_progress").length;
  const planningProjects = store.projects.filter((p) => p.status === "planning").length;
  const inReviewProjects = store.projects.filter((p) => p.status === "in_review").length;
  const onHoldProjects = store.projects.filter((p) => p.status === "on_hold").length;
  const droppedProjects = store.projects.filter((p) => p.status === "dropped").length;
  const completedProjects = store.projects.filter((p) => p.status === "completed").length;

  const activeProjectsCount = buildingProjects + inProgressProjects + planningProjects + inReviewProjects;
  const projectCompletionRate = totalProjects > 0 ? Math.round((completedProjects / totalProjects) * 100) : 0;

  // 3. Milestones Delivery & Late Payments Funnel
  let totalMilestones = 0;
  let paidMilestones = 0;
  let upcomingMilestones = 0;
  let lateMilestonesCount = 0;
  let latePaymentsAmount = 0;

  store.projects.forEach((proj) => {
    (proj.milestones || []).forEach((ms) => {
      totalMilestones++;
      if (ms.status === "paid" || ms.status === "completed") {
        paidMilestones++;
      } else {
        // Unpaid milestone
        const isAlertedLate = proj.alerts?.some(
          (a) => a.isActive && a.type === "payment_delayed" && a.milestoneId === ms.id
        );
        const isPastDue = ms.dueDate && new Date(ms.dueDate) < now;

        if (isAlertedLate || isPastDue) {
          lateMilestonesCount++;
          latePaymentsAmount += ms.amount || 0;
        } else {
          upcomingMilestones++;
        }
      }
    });
  });

  const milestoneCollectionRate =
    totalMilestones > 0 ? Math.round((paidMilestones / totalMilestones) * 100) : 0;

  // 4. Client Trust Meter Analytics
  const clientsWithTrust = store.clients.map((c) => {
    const cProjects = store.projects.filter((p) => p.clientId === c.id);
    const cPayments = store.payments.filter((p) => p.clientId === c.id);
    const trust = computeClientTrust(c, cProjects, cPayments);
    return {
      id: c.id,
      name: c.name,
      email: c.email,
      company: c.company,
      totalPaid: c.totalPaid,
      trustScore: trust.score,
      trustLevel: trust.level,
      trustFactors: trust.factors,
      activeProjectsCount: cProjects.filter((p) => p.status !== "completed" && p.status !== "dropped").length,
      lastPayment: c.lastPayment,
    };
  });

  const avgTrustScore =
    clientsWithTrust.length > 0
      ? Math.round(clientsWithTrust.reduce((acc, c) => acc + c.trustScore, 0) / clientsWithTrust.length)
      : 85;

  const vipClientsCount = clientsWithTrust.filter((c) => c.trustLevel === "VIP").length;
  const trustedClientsCount = clientsWithTrust.filter((c) => c.trustLevel === "Trusted").length;
  const goodClientsCount = clientsWithTrust.filter((c) => c.trustLevel === "Good").length;
  const watchlistClientsCount = clientsWithTrust.filter((c) => c.trustLevel === "Watchlist").length;

  // 5. Active Alerts across all projects
  const activeAlerts: Array<ProjectAlert & { projectTitle: string; projectId: string; clientName: string }> = [];
  store.projects.forEach((proj) => {
    (proj.alerts || []).forEach((alt) => {
      if (alt.isActive) {
        activeAlerts.push({
          ...alt,
          projectId: proj.id,
          projectTitle: proj.title,
          clientName: proj.clientName,
        });
      }
    });
  });

  // 6. Test Payments Verification
  const testPaymentsCount = store.payments.filter((p) => p.paymentType === "test_payment").length;
  const testCallsPending = store.payments.filter(
    (p) => p.paymentType === "test_payment" && !p.testCallConfirmed
  ).length;

  const unassignedPayments = store.payments.filter(
    (p) => !p.projectId && p.paymentType !== "coffee" && p.paymentType !== "test_payment"
  );

  return {
    totalRevenue,
    coffeeRevenue,
    milestoneRevenue,
    customRevenue,
    prepaidRevenue,
    refundedAmount,
    refundCount: refundedPayments.length,
    latePaymentsAmount,
    lateMilestonesCount,
    totalClients: store.clients.length,
    activeProjectsCount,
    completedProjectsCount: completedProjects,
    testPaymentsCount,
    testCallsPending,
    unassignedPaymentsCount: unassignedPayments.length,
    activeAlertsCount: activeAlerts.length,
    activeAlerts,
    // BI Graphs & Diagrams Data Objects
    projectsOverview: {
      total: totalProjects,
      building: buildingProjects,
      inProgress: inProgressProjects,
      planning: planningProjects,
      inReview: inReviewProjects,
      onHold: onHoldProjects,
      dropped: droppedProjects,
      completed: completedProjects,
      completionRate: projectCompletionRate,
    },
    financialsOverview: {
      totalRevenue,
      milestoneRevenue,
      prepaidRevenue,
      customRevenue,
      coffeeRevenue,
      latePaymentsAmount,
      refundedAmount,
    },
    milestonesOverview: {
      total: totalMilestones,
      paid: paidMilestones,
      upcoming: upcomingMilestones,
      delayed: lateMilestonesCount,
      collectionEfficiency: milestoneCollectionRate,
    },
    trustMeterOverview: {
      averageTrustScore: avgTrustScore,
      vipClientsCount,
      trustedClientsCount,
      goodClientsCount,
      watchlistClientsCount,
      clients: clientsWithTrust,
    },
    recentPayments: store.payments.slice(0, 50),
    clients: store.clients,
    projects: store.projects,
  };
}

export function getClientDashboardData(userEmailOrId: string, explicitStore?: CRMStoreData) {
  const store = explicitStore || readStore();
  const clean = (userEmailOrId || "").toLowerCase().trim();

  let user = clean
    ? store.users.find(
        (u) => u.id === userEmailOrId || u.email.toLowerCase().trim() === clean
      )
    : null;

  let client = clean
    ? store.clients.find(
        (c) =>
          c.email.toLowerCase().trim() === clean ||
          (user && c.userId === user.id) ||
          c.id === userEmailOrId
      )
    : null;

  // If no match, fallback to first client in CRM store
  if (!client && !user && store.clients.length > 0) {
    client = store.clients[0];
    user =
      store.users.find(
        (u) => u.id === client?.userId || u.email.toLowerCase() === client?.email.toLowerCase()
      ) || null;
  }

  const clientId = client?.id;
  const userId = user?.id || client?.userId;

  const projects = store.projects.filter(
    (p) =>
      (clientId && p.clientId === clientId) ||
      (userId && p.userId === userId) ||
      p.clientEmail.toLowerCase().trim() === clean
  );

  const payments = store.payments.filter(
    (p) =>
      (clientId && p.clientId === clientId) ||
      (userId && p.userId === userId) ||
      p.customerEmail.toLowerCase().trim() === clean
  );

  // Compute live client trust
  let trustInfo: {
    score: number;
    level: "VIP" | "Trusted" | "Good" | "Watchlist";
    factors: TrustFactors;
  } = {
    score: 85,
    level: "Trusted",
    factors: { prepaidBonus: 0, promptPayments: 0, testVerified: 0, delayedPenalties: 0, holdsOrDisputes: 0 },
  };

  if (client) {
    trustInfo = computeClientTrust(client, projects, payments);
    client.trustScore = trustInfo.score;
    client.trustLevel = trustInfo.level;
    client.trustFactors = trustInfo.factors;
  }

  // Collect all active alerts across client projects
  const activeAlerts: Array<ProjectAlert & { projectTitle: string; projectId: string }> = [];
  projects.forEach((proj) => {
    (proj.alerts || []).forEach((alt) => {
      if (alt.isActive) {
        activeAlerts.push({
          ...alt,
          projectId: proj.id,
          projectTitle: proj.title,
        });
      }
    });
  });

  return {
    user: user
      ? {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          company: user.company,
          designation: user.designation,
          businessProfile: user.businessProfile,
          socials: user.socials,
        }
      : null,
    client: client
      ? {
          ...client,
          trustScore: trustInfo.score,
          trustLevel: trustInfo.level,
          trustFactors: trustInfo.factors,
        }
      : null,
    projects,
    payments,
    activeAlerts,
    trustInfo,
  };
}

// ─────────────────────────────────────────────────────────────
// ASYNC MONGO-AWARE HELPERS FOR API ROUTES & WEBHOOKS
// ─────────────────────────────────────────────────────────────

export async function getAdminDashboardStatsAsync() {
  const store = await readStoreAsync();
  return getAdminDashboardStats(store);
}

export async function getClientDashboardDataAsync(userEmailOrId: string) {
  const store = await readStoreAsync();
  return getClientDashboardData(userEmailOrId, store);
}

export async function findUserByEmailAsync(email: string): Promise<StoredUserAccount | null> {
  const store = await readStoreAsync();
  const cleanEmail = email.toLowerCase().trim();
  return store.users.find((u) => u.email.toLowerCase().trim() === cleanEmail) || null;
}

export async function findUserByIdAsync(id: string): Promise<StoredUserAccount | null> {
  const store = await readStoreAsync();
  return store.users.find((u) => u.id === id) || null;
}

export async function registerUserAsync(data: Parameters<typeof registerUser>[0]): Promise<StoredUserAccount> {
  await readStoreAsync();
  const user = registerUser(data);
  await writeStoreAsync(readStore());
  return user;
}

export async function authenticateUserAsync(email: string, password: string): Promise<StoredUserAccount> {
  await readStoreAsync();
  return authenticateUser(email, password);
}

export async function getOrCreateClientAsync(data: Parameters<typeof getOrCreateClient>[0]): Promise<StoredClient> {
  await readStoreAsync();
  const client = getOrCreateClient(data);
  await writeStoreAsync(readStore());
  return client;
}

export async function recordPaymentAsync(paymentData: Parameters<typeof recordPayment>[0]): Promise<StoredPayment> {
  await readStoreAsync();
  const payment = recordPayment(paymentData);
  await writeStoreAsync(readStore());
  return payment;
}

export async function createProjectAsync(data: Parameters<typeof createProject>[0]): Promise<StoredProject> {
  await readStoreAsync();
  const project = createProject(data);
  await writeStoreAsync(readStore());
  return project;
}

export async function updateProjectAsync(projectId: string, updates: any): Promise<StoredProject> {
  await readStoreAsync();
  const project = updateProject(projectId, updates);
  await writeStoreAsync(readStore());
  return project;
}

export async function deleteProjectAsync(projectId: string): Promise<boolean> {
  await readStoreAsync();
  const ok = deleteProject(projectId);
  await writeStoreAsync(readStore());
  return ok;
}

export async function addProjectAlertAsync(projectId: string, alert: Parameters<typeof addProjectAlert>[1]) {
  await readStoreAsync();
  const res = addProjectAlert(projectId, alert);
  await writeStoreAsync(readStore());
  return res;
}

export async function dismissProjectAlertAsync(projectId: string, alertId: string) {
  await readStoreAsync();
  const res = dismissProjectAlert(projectId, alertId);
  await writeStoreAsync(readStore());
  return res;
}

export async function mapPaymentToProjectMilestoneAsync(data: {
  paymentId: string;
  projectId: string;
  milestoneId: string;
}) {
  await readStoreAsync();
  const res = mapPaymentToProjectMilestone(data);
  await writeStoreAsync(readStore());
  return res;
}

export async function addProjectFeedItemAsync(projectId: string, item: Parameters<typeof addProjectFeedItem>[1]) {
  await readStoreAsync();
  const res = addProjectFeedItem(projectId, item);
  await writeStoreAsync(readStore());
  return res;
}

export async function updateClientProfileAsync({
  clientId,
  userId,
  email,
  name,
  phone,
  company,
  designation,
  businessProfile,
  socials,
}: {
  clientId?: string;
  userId?: string;
  email?: string;
  name?: string;
  phone?: string;
  company?: string;
  designation?: string;
  businessProfile?: BusinessProfile;
  socials?: SocialLinks;
}): Promise<{ client: StoredClient; user: StoredUserAccount | null }> {
  const store = await readStoreAsync();
  const cleanEmail = (email || "").toLowerCase().trim();

  let client = store.clients.find(
    (c) =>
      (clientId && c.id === clientId) ||
      (cleanEmail && c.email.toLowerCase().trim() === cleanEmail) ||
      (userId && c.userId === userId)
  );

  if (!client) {
    // If client doesn't exist yet, auto-create one
    const newId = "cli_" + crypto.randomBytes(6).toString("hex");
    client = {
      id: newId,
      userId,
      name: name || cleanEmail.split("@")[0] || "Client",
      email: cleanEmail,
      phone: phone || "",
      company: company || businessProfile?.companyName || "",
      designation: designation || businessProfile?.designation || "",
      businessProfile: businessProfile || {},
      socials: socials || {},
      status: "active",
      notes: "Profile updated by client.",
      totalPaid: 0,
      projectIds: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    store.clients.push(client);
  } else {
    if (name) client.name = name.trim();
    if (phone !== undefined) client.phone = phone.trim();
    if (company !== undefined) client.company = company.trim();
    if (designation !== undefined) client.designation = designation.trim();
    if (businessProfile) {
      client.businessProfile = {
        ...(client.businessProfile || {}),
        ...businessProfile,
        verifiedAt: new Date().toISOString(),
      };
      if (businessProfile.companyName && !client.company) {
        client.company = businessProfile.companyName;
      }
      if (businessProfile.designation && !client.designation) {
        client.designation = businessProfile.designation;
      }
    }
    if (socials) {
      client.socials = {
        ...(client.socials || {}),
        ...socials,
      };
    }
    client.updatedAt = new Date().toISOString();
  }

  // Update linked user if found
  let user: StoredUserAccount | null = null;
  const targetUserId = userId || client.userId;
  if (targetUserId) {
    user = store.users.find((u) => u.id === targetUserId) || null;
  }
  if (!user && cleanEmail) {
    user = store.users.find((u) => u.email.toLowerCase().trim() === cleanEmail) || null;
  }

  if (user) {
    if (name) user.name = name.trim();
    if (phone !== undefined) user.phone = phone.trim();
    if (company !== undefined) user.company = company.trim();
    if (designation !== undefined) user.designation = designation.trim();
    if (businessProfile) {
      user.businessProfile = { ...(user.businessProfile || {}), ...businessProfile };
    }
    if (socials) {
      user.socials = { ...(user.socials || {}), ...socials };
    }
  }

  // Recalculate client trust score
  const clientProjects = store.projects.filter((p) => p.clientId === client.id);
  const clientPayments = store.payments.filter((p) => p.clientId === client.id);
  const trust = computeClientTrust(client, clientProjects, clientPayments);
  client.trustScore = trust.score;
  client.trustLevel = trust.level;
  client.trustFactors = trust.factors;

  await writeStoreAsync(store);

  return { client, user };
}



