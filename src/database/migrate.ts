import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { dbUrl } from "./database";

console.log({ dbUrl });
const migrationClient = postgres(dbUrl, { max: 1 });

(async () => {
  await migrate(drizzle(migrationClient), {
    migrationsFolder: "./src/database/migration",
  });

  await migrationClient.end();
})();
