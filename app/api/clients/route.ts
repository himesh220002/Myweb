import { NextRequest, NextResponse } from "next/server";
import { readStore, writeStore, getOrCreateClient } from "@/lib/serverStore";

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

    const client = getOrCreateClient({
      name: name || email.split("@")[0],
      email,
      phone,
    });

    if (company || notes || status) {
      const store = readStore();
      const target = store.clients.find((c) => c.id === client.id);
      if (target) {
        if (company) target.company = company;
        if (notes) target.notes = notes;
        if (status) target.status = status;
        target.updatedAt = new Date().toISOString();
        writeStore(store);
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

// PATCH /api/clients: Update client notes, status, or confirm test call
export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { clientId, notes, status, callConfirmed, company, name, phone } = body;

    if (!clientId) {
      return NextResponse.json({ error: "Client ID is required" }, { status: 400 });
    }

    const store = readStore();
    const client = store.clients.find((c) => c.id === clientId);
    if (!client) {
      return NextResponse.json({ error: "Client not found" }, { status: 404 });
    }

    if (notes !== undefined) client.notes = notes;
    if (status !== undefined) client.status = status;
    if (callConfirmed !== undefined) {
      client.callConfirmed = Boolean(callConfirmed);
      // Also update test payments for this client
      store.payments.forEach((p) => {
        if (p.clientId === client.id && p.paymentType === "test_payment") {
          p.testCallConfirmed = Boolean(callConfirmed);
        }
      });
    }
    if (company !== undefined) client.company = company;
    if (name !== undefined) client.name = name;
    if (phone !== undefined) client.phone = phone;

    client.updatedAt = new Date().toISOString();
    writeStore(store);

    return NextResponse.json({
      success: true,
      message: "Client profile updated successfully.",
      client,
    });
  } catch (err: any) {
    console.error("Update client error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to update client" },
      { status: 400 }
    );
  }
}
