import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not defined. Please set it in your environment variables.");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql);

export type Database = typeof db;