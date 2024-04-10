import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export const dbUrl = process.env.DATABASE_URL || "";
const client = postgres(dbUrl);
export default drizzle(client, { logger: true, schema });
