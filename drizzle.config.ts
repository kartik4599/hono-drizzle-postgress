import { defineConfig } from "drizzle-kit";
import { dbUrl } from "./src/database/database";

console.log(dbUrl);

export default defineConfig({
  driver: "pg",
  schema: "./src/database/schema.ts",
  out: "./src/database/migration",
  dbCredentials: { connectionString: dbUrl },
  verbose: true,
  strict: true,
});
