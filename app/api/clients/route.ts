import { NextRequest, NextResponse } from "next/server";
import {
  readStoreAsync,
  writeStoreAsync,
  getOrCreateClientAsync,
  updateClientProfileAsync,
} from "@/lib/serverStore";

// POST /api/clients: Create a new client lead manually
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, phone, company, notes, status } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "A valid client email address is required." },
        { status: 400 }
      );
    }

    const client = await getOrCreateClientAsync({
      name: name || email.split("@")[0],
      email,
      phone,
    });

    if (company || notes || status) {
      const store = await readStoreAsync();
      const target = store.clients.find((c) => c.id === client.id);
      if (target) {
        if (company) target.company = company;
        if (notes) target.notes = notes;
        if (status) target.status = status;
        target.updatedAt = new Date().toISOString();
        await writeStoreAsync(store);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Client profile successfully created.",
      client,
    });
  } catch (err: any) {
    console.error("Create client error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create client profile" },
      { status: 400 }
    );
  }
}

import crypto from "crypto";
import { getClientsCollection } from "@/lib/mongodb";

// PATCH /api/clients: Update client profile, business details, socials, notes, or meeting records
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      clientId,
      userId,
      email,
      name,
      phone,
      company,
      designation,
      businessProfile,
      socials,
      notes,
      status,
      callConfirmed,
      newMeeting,
      meetings,
      deleteMeetingId,
    } = body;

    if (!clientId && !email && !userId) {
      return NextResponse.json(
        { error: "Client ID, email, or user ID is required to update profile" },
        { status: 400 }
      );
    }

    const { client, user } = await updateClientProfileAsync({
      clientId,
      userId,
      email,
      name,
      phone,
      company,
      designation,
      businessProfile,
      socials,
    });

    const store = await readStoreAsync();
    const target = store.clients.find((c) => c.id === client.id);
    if (target) {
      if (notes !== undefined) target.notes = notes;
      if (status !== undefined) target.status = status;
      if (callConfirmed !== undefined) {
        target.callConfirmed = Boolean(callConfirmed);
      }

      // Handle adding new meeting note
      if (newMeeting) {
        if (!target.meetings) target.meetings = [];
        
        // Clean and ensure tags have '#' prefix
        const rawTags = Array.isArray(newMeeting.tags)
          ? newMeeting.tags
          : typeof newMeeting.tags === "string"
          ? newMeeting.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
          : [];
        const formattedTags = rawTags.map((t: string) => (t.startsWith("#") ? t : `#${t}`));

        const meetingEntry = {
          id: newMeeting.id || "mtg_" + crypto.randomBytes(6).toString("hex"),
          date: newMeeting.date || new Date().toISOString().split("T")[0],
          time: newMeeting.time || new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
          duration: newMeeting.duration || "00:30",
          method: newMeeting.method || "google_meet",
          link: newMeeting.link?.trim() || "",
          dealStage: newMeeting.dealStage || "warm",
          tags: formattedTags,
          overview: newMeeting.overview?.trim() || "",
          interchanges: newMeeting.interchanges?.trim() || "",
          createdAt: new Date().toISOString(),
        };

        target.meetings.unshift(meetingEntry);
        target.lastMeeting = meetingEntry;
        target.callConfirmed = true;
      }

      // Handle deleting a meeting note
      if (deleteMeetingId) {
        if (target.meetings) {
          target.meetings = target.meetings.filter((m) => m.id !== deleteMeetingId);
          target.lastMeeting = target.meetings.length > 0 ? target.meetings[0] : undefined;
        }
      }

      // Handle bulk meetings overwrite
      if (meetings && Array.isArray(meetings)) {
        target.meetings = meetings;
        target.lastMeeting = meetings.length > 0 ? meetings[0] : undefined;
        if (target.lastMeeting) target.callConfirmed = true;
      }

      if (target.callConfirmed) {
        store.payments.forEach((p) => {
          if (p.clientId === target.id && p.paymentType === "test_payment") {
            p.testCallConfirmed = true;
          }
        });
      }

      target.updatedAt = new Date().toISOString();
      await writeStoreAsync(store);

      // Sync with MongoDB if available
      try {
        const clientsCol = await getClientsCollection();
        if (clientsCol) {
          await clientsCol.updateOne(
            { id: target.id },
            { $set: target },
            { upsert: true }
          );
        }
      } catch (mongoErr) {
        console.warn("MongoDB client sync error:", mongoErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: newMeeting
        ? "Meeting note and psychological tags recorded successfully."
        : "Profile and business details updated successfully.",
      client: target || client,
      user,
    });
  } catch (err: any) {
    console.error("Update client error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update client profile" },
      { status: 400 }
    );
  }
}
