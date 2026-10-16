/**
 * Client-side Storage and State Management for Authentication & Payment History.
 * Ensures guest payments are persistently accessible without forcing an immediate account,
 * while allowing smooth one-click account creation / login.
 */

import { ReceiptData } from "@/lib/receiptUtils";

export interface StoredUser {
  id: string;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  company?: string;
  designation?: string;
  businessProfile?: {
    stage?: string;
    name?: string;
    industry?: string;
    teamSize?: string;
    website?: string;
    bio?: string;
    registrationNumber?: string;
    foundedYear?: string;
  };
  socials?: {
    linkedin?: string;
    github?: string;
    twitter?: string;
    telegram?: string;
    website?: string;
    other?: string;
  };
  token?: string;
  createdAt: string;
}

const USER_KEY = "cyphertech_user";
const HISTORY_KEY = "cyphertech_payment_history";
const LAST_RECEIPT_KEY = "cyphertech_last_receipt";

export function getStoredUser(): StoredUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    console.error("Error reading stored user:", e);
    return null;
  }
}

export function saveStoredUser(user: StoredUser): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    window.dispatchEvent(new Event("cyphertech_auth_change"));
  } catch (e) {
    console.error("Error saving user:", e);
  }
}

export function removeStoredUser(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(USER_KEY);
    window.dispatchEvent(new Event("cyphertech_auth_change"));
  } catch (e) {
    console.error("Error removing user:", e);
  }
}

export function getStoredPaymentHistory(): ReceiptData[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) {
      // Check fallback last receipt
      const lastRaw = localStorage.getItem(LAST_RECEIPT_KEY);
      if (lastRaw) {
        const last = JSON.parse(lastRaw);
        return [last];
      }
      return [];
    }
    return JSON.parse(raw);
  } catch (e) {
    console.error("Error reading payment history:", e);
    return [];
  }
}

const READ_RECEIPTS_KEY = "cyphertech_read_receipt_ids";
const PROFILE_VISITED_KEY = "cyphertech_profile_last_visited";

export function getReadReceiptIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(READ_RECEIPTS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

export function getUnreadReceiptCount(): number {
  if (typeof window === "undefined") return 0;
  const history = getStoredPaymentHistory();
  if (history.length === 0) return 0;
  const readIds = new Set(getReadReceiptIds());
  return history.filter((item) => {
    const id = item.paymentId || item.orderId || (item as any).id || (item.date ? `${item.planName}_${item.date}` : null);
    return id ? !readIds.has(id) : false;
  }).length;
}

export function markProfileAsVisited(): void {
  if (typeof window === "undefined") return;
  try {
    // 1. Mark all current payment receipts as read
    const history = getStoredPaymentHistory();
    const allIds = history
      .map((item) => item.paymentId || item.orderId || (item as any).id || (item.date ? `${item.planName}_${item.date}` : null))
      .filter(Boolean) as string[];
    const existingRead = getReadReceiptIds();
    const merged = Array.from(new Set([...existingRead, ...allIds]));
    localStorage.setItem(READ_RECEIPTS_KEY, JSON.stringify(merged));

    // 2. Set last visited timestamp
    localStorage.setItem(PROFILE_VISITED_KEY, Date.now().toString());

    // 3. Dispatch notification change event so navbar and dropdown immediately clear the badge
    window.dispatchEvent(new Event("cyphertech_notifications_change"));
  } catch (e) {
    console.error("Error marking profile as visited:", e);
  }
}

export function addPaymentToHistory(receipt: ReceiptData): void {
  if (typeof window === "undefined") return;
  try {
    // 1. Update last receipt
    localStorage.setItem(LAST_RECEIPT_KEY, JSON.stringify(receipt));

    // 2. Prepend to history array (deduping by paymentId)
    const existing = getStoredPaymentHistory();
    const filtered = existing.filter((item) => item.paymentId !== receipt.paymentId);
    const updated = [receipt, ...filtered].slice(0, 30); // Keep last 30 receipts
    localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));

    // Fire history and notification events
    window.dispatchEvent(new Event("cyphertech_history_change"));
    window.dispatchEvent(new Event("cyphertech_notifications_change"));
  } catch (e) {
    console.error("Error saving payment to history:", e);
  }
}
