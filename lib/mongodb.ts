import { MongoClient, Db, Collection } from "mongodb";
import {
  StoredUserAccount,
  StoredClient,
  StoredProject,
  StoredPayment,
} from "./serverStore";

const uri = process.env.MONGO_URI || "";
const dbName = "cyphertech";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGO_URI && process.env.MONGO_URI.startsWith("mongodb"));
}

export function getMongoClientPromise(): Promise<MongoClient> | null {
  if (!isMongoConfigured()) {
    return null;
  }

  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    return global._mongoClientPromise;
  } else {
    if (!clientPromise) {
      client = new MongoClient(uri);
      clientPromise = client.connect();
    }
    return clientPromise;
  }
}

export async function getDb(): Promise<Db | null> {
  const promise = getMongoClientPromise();
  if (!promise) return null;
  try {
    const connectedClient = await promise;
    return connectedClient.db(dbName);
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
    return null;
  }
}

export async function getUsersCollection(): Promise<Collection<StoredUserAccount> | null> {
  const db = await getDb();
  return db ? db.collection<StoredUserAccount>("users") : null;
}

export async function getClientsCollection(): Promise<Collection<StoredClient> | null> {
  const db = await getDb();
  return db ? db.collection<StoredClient>("clients") : null;
}

export async function getProjectsCollection(): Promise<Collection<StoredProject> | null> {
  const db = await getDb();
  return db ? db.collection<StoredProject>("projects") : null;
}

export async function getPaymentsCollection(): Promise<Collection<StoredPayment> | null> {
  const db = await getDb();
  return db ? db.collection<StoredPayment>("payments") : null;
}

// Ensure proper indexes are created for performance & integrity
let indexesInitialized = false;
export async function ensureMongoIndexes(): Promise<void> {
  if (indexesInitialized) return;
  const db = await getDb();
  if (!db) return;

  try {
    const usersCol = db.collection("users");
    await usersCol.createIndex({ email: 1 }, { unique: true, sparse: true });
    await usersCol.createIndex({ id: 1 }, { unique: true, sparse: true });

    const clientsCol = db.collection("clients");
    await clientsCol.createIndex({ id: 1 }, { unique: true, sparse: true });
    await clientsCol.createIndex({ email: 1 });
    await clientsCol.createIndex({ userId: 1 });

    const projectsCol = db.collection("projects");
    await projectsCol.createIndex({ id: 1 }, { unique: true, sparse: true });
    await projectsCol.createIndex({ clientId: 1 });
    await projectsCol.createIndex({ clientEmail: 1 });

    const paymentsCol = db.collection("payments");
    await paymentsCol.createIndex({ paymentId: 1 }, { unique: true, sparse: true });
    await paymentsCol.createIndex({ id: 1 }, { unique: true, sparse: true });
    await paymentsCol.createIndex({ customerEmail: 1 });
    await paymentsCol.createIndex({ clientId: 1 });
    await paymentsCol.createIndex({ projectId: 1 });

    indexesInitialized = true;
    console.log("✅ MongoDB indexes verified for cyphertech collections.");
  } catch (err) {
    console.warn("Index creation notice:", err);
  }
}
