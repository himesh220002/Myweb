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

    window.dispatchEvent(new Event("cyphertech_history_change"));
  } catch (e) {
    console.error("Error saving payment to history:", e);
  }
}
