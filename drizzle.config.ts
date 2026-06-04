import { defineConfig } from "drizzle-kit";
import { readFileSync } from "node:fs";

const databaseUrl = process.env.DATABASE_URL;
const enableSsl = process.env.TIDB_ENABLE_SSL === "true";

if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run Drizzle commands");
}

function getDbCredentials(url: string) {
  if (!enableSsl) {
    return { url };
  }

  const parsedUrl = new URL(url);
  const ca = process.env.TIDB_CA_PATH
    ? readFileSync(process.env.TIDB_CA_PATH, "utf8")
    : undefined;

  return {
    host: parsedUrl.hostname,
    port: parsedUrl.port ? Number(parsedUrl.port) : 4000,
    user: decodeURIComponent(parsedUrl.username),
    password: decodeURIComponent(parsedUrl.password),
    database: decodeURIComponent(parsedUrl.pathname.slice(1)),
    ssl: {
      minVersion: "TLSv1.2",
      ca
    }
  };
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "mysql",
  dbCredentials: getDbCredentials(databaseUrl)
});
