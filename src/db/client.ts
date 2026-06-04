import { drizzle } from "drizzle-orm/mysql2";
import { readFileSync } from "node:fs";
import { createPool } from "mysql2/promise";
import type { PoolOptions } from "mysql2/promise";
import * as schema from "./schema";

const databaseUrl = process.env.DATABASE_URL;
const enableSsl = process.env.TIDB_ENABLE_SSL === "true";

if (!databaseUrl) {
  throw new Error("DATABASE_URL environment variable is required");
}

function createDatabaseConfig(url: string): PoolOptions {
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
    ssl: enableSsl
      ? {
          minVersion: "TLSv1.2",
          ca
        }
      : undefined
  };
}

const pool = createPool(createDatabaseConfig(databaseUrl));

export const db = drizzle(pool, {
  schema,
  mode: "default"
});
