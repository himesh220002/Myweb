import { MongoClient } from "mongodb";
import fs from "fs";

let uri = process.env.MONGO_URI;
if (!uri && fs.existsSync(".env")) {
  const envContent = fs.readFileSync(".env", "utf8");
  const match = envContent.match(/MONGO_URI=(.+)/);
  if (match) uri = match[1].trim();
}

if (!uri) {
  console.error("No MONGO_URI in .env");
  process.exit(1);
}

const initialUsers = [
  {
    id: "usr_admin_001",
    name: "Himesh Satyam (Owner)",
    email: "satyamhimesh@gmail.com",
    phone: "+91 9876543210",
    passwordHash: "14b5ab8df9b660fbb49b6659b9b4f3a1:fc166c47faa3278d8bd8613f7ed8ffab184d1e4aeee951ca00c29698f737a05198f7b39a310c1be34c48eb5fadcfd798fe0d36797c3bc3276fa895f57bc6cdb8",
    role: "admin",
    createdAt: "2026-10-15T08:40:30.645Z",
    company: "CypherTech",
  },
  {
    id: "usr_060c44451631",
    name: "Himesh satyam",
    email: "harleyqn74@gmail.com",
    passwordHash: "d5377cdb8a648a57989f19266e833b39:1bc90f527db8242158cd2d2a4182b4a7d3bf4c57fa03c034b10e76047cbe8d14194b8aecb33cae85c489924f582fbe9ff4ad43571d26693208bfd62388372fe5",
    role: "client",
    createdAt: "2026-10-15T08:41:55.706Z",
  },
];

const initialClients = [
  {
    id: "cli_7eb046a6552f",
    userId: "usr_060c44451631",
    name: "Himesh satyam",
    email: "harleyqn74@gmail.com",
    phone: "9471283523",
    company: "",
    status: "active",
    notes: "Account registered online.",
    totalPaid: 1,
    projectIds: [],
    createdAt: "2026-10-15T08:41:55.706Z",
    updatedAt: "2026-10-15T10:29:55.442Z",
    trustScore: 85,
    trustLevel: "Trusted",
    trustFactors: {
      prepaidBonus: 0,
      promptPayments: 0,
      testVerified: 10,
      delayedPenalties: 0,
      holdsOrDisputes: 0,
    },
  },
];

const initialPayments = [
  {
    id: "rec_9377b182ec81",
    paymentId: "pay_To9PDPBYruirYX",
    orderId: "order_To9ObteDyfATMu",
    amount: 1,
    currency: "INR",
    status: "captured",
    paymentType: "test_payment",
    method: "UPI",
    customerName: "Himesh satyam",
    customerEmail: "harleyqn74@gmail.com",
    customerPhone: "9471283523",
    userId: "usr_060c44451631",
    clientId: "cli_7eb046a6552f",
    testCallConfirmed: true,
    isManual: false,
    notes: "Live Test Verification — ₹1.00",
    receiptToken: "eyJhbGciOiJIUzI1NiJ9.eyJwYXltZW50SWQiOiJwYXlfVG85UERQQllydWlyWVgiLCJvcmRlcklkIjoib3JkZXJfVG85T2J0ZUR5ZkFUTXUiLCJhbW91bnQiOiIxLjAwIiwiY3VycmVuY3kiOiJJTlIiLCJjdXN0b21lckVtYWlsIjoiaGFybGV5cW43NEBnbWFpbC5jb20iLCJjdXN0b21lck5hbWUiOiJIaW1lc2ggc2F0eWFtIiwiY3VzdG9tZXJQaG9uZSI6Ijk0NzEyODM1MjMiLCJwbGFuTmFtZSI6IkxpdmUgVGVzdCBWZXJpZmljYXRpb24g4oCUIOKCuTEuMDAiLCJzdWIiOiJndWVzdF9yZWNlaXB0X2NsYWltIiwiaWF0IjoxNzkyMDYwMDU4LCJleHAiOjE3OTQ2NTIwNTh9.wK9GleEVhJ5tdA7Aj93yxEnrAMha3zIZ_APK4R5H3eo",
    refundClaimUrl: "https://cyphertech.online/refund?token=eyJhbGciOiJIUzI1NiJ9.eyJwYXltZW50SWQiOiJwYXlfVG85UERQQllydWlyWVgiLCJvcmRlcklkIjoib3JkZXJfVG85T2J0ZUR5ZkFUTXUiLCJhbW91bnQiOiIxLjAwIiwiY3VycmVuY3kiOiJJTlIiLCJjdXN0b21lckVtYWlsIjoiaGFybGV5cW43NEBnbWFpbC5jb20iLCJjdXN0b21lck5hbWUiOiJIaW1lc2ggc2F0eWFtIiwiY3VzdG9tZXJQaG9uZSI6Ijk0NzEyODM1MjMiLCJwbGFuTmFtZSI6IkxpdmUgVGVzdCBWZXJpZmljYXRpb24g4oCUIOKCuTEuMDAiLCJzdWIiOiJndWVzdF9yZWNlaXB0X2NsYWltIiwiaWF0IjoxNzkyMDYwMDU4LCJleHAiOjE3OTQ2NTIwNTh9.wK9GleEVhJ5tdA7Aj93yxEnrAMha3zIZ_APK4R5H3eo",
    createdAt: "2026-10-15T10:27:45.813Z",
  },
];

async function seed() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas!");
    const db = client.db("cyphertech");

    // Seed users
    const usersCol = db.collection("users");
    for (const u of initialUsers) {
      await usersCol.updateOne({ email: u.email }, { $set: u }, { upsert: true });
    }
    console.log(`Seeded ${initialUsers.length} users.`);

    // Seed clients
    const clientsCol = db.collection("clients");
    for (const c of initialClients) {
      await clientsCol.updateOne({ email: c.email }, { $set: c }, { upsert: true });
    }
    console.log(`Seeded ${initialClients.length} clients.`);

    // Seed payments (real ₹1 payment)
    const paymentsCol = db.collection("payments");
    for (const p of initialPayments) {
      await paymentsCol.updateOne({ paymentId: p.paymentId }, { $set: p }, { upsert: true });
    }
    console.log(`Seeded ${initialPayments.length} payments.`);

    // Check projects
    const projectsCol = db.collection("projects");
    const countProjects = await projectsCol.countDocuments();
    console.log(`Projects in DB: ${countProjects}`);

    // Create indexes
    await usersCol.createIndex({ email: 1 }, { unique: true });
    await clientsCol.createIndex({ email: 1 });
    await paymentsCol.createIndex({ paymentId: 1 }, { unique: true });
    await projectsCol.createIndex({ id: 1 }, { unique: true });

    console.log("Indexes created successfully.");
  } finally {
    await client.close();
  }
}

seed().catch(err => {
  console.error("Seed failed:", err);
  process.exit(1);
});
