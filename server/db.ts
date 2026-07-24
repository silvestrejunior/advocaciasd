import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { documents, users, contactSubmissions, InsertDocument, Document, InsertContactSubmission, ContactSubmission } from "../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

/**
 * Document Management Functions
 */

export async function uploadDocument(data: InsertDocument): Promise<Document> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(documents).values(data);
  const id = result[0]?.insertId;
  
  if (!id) throw new Error("Failed to create document record");

  const doc = await db.select().from(documents).where(eq(documents.id, id)).limit(1);
  return doc[0]!;
}

export async function getUserDocuments(userId: number): Promise<Document[]> {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(documents)
    .where(eq(documents.userId, userId))
    .orderBy(desc(documents.createdAt));
}

export async function getDocument(id: number): Promise<Document | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(documents).where(eq(documents.id, id)).limit(1);
  return result[0];
}

export async function deleteDocument(id: number): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;

  const result = await db.delete(documents).where(eq(documents.id, id));
  return result.rowsAffected > 0;
}

export async function updateDocument(id: number, data: Partial<Document>): Promise<Document | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  await db.update(documents).set(data).where(eq(documents.id, id));
  return getDocument(id);
}

/**
 * Contact Submission Functions
 */

export async function createContactSubmission(data: InsertContactSubmission): Promise<ContactSubmission> {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(contactSubmissions).values(data);
  const id = result[0]?.insertId;
  
  if (!id) throw new Error("Failed to create contact submission");

  const submission = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id)).limit(1);
  return submission[0]!;
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(contactSubmissions).orderBy(desc(contactSubmissions.createdAt));
}

export async function updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission | undefined> {
  const db = await getDb();
  if (!db) return undefined;

  await db.update(contactSubmissions).set({ status }).where(eq(contactSubmissions.id, id));
  
  const result = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id)).limit(1);
  return result[0];
}
