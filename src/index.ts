import { Elysia } from "elysia";
import { db } from "./db/client";
import { users } from "./db/schema";

const port = Number(process.env.PORT ?? 3000);

const app = new Elysia()
  .get("/", () => ({
    message: "Hello from Bun, ElysiaJS, and Drizzle ORM"
  }))
  .get("/health", () => ({
    status: "ok"
  }))
  .get("/users", async () => {
    return db.select().from(users);
  })
  .listen(port);

console.log(`Server is running at http://${app.server?.hostname}:${app.server?.port}`);
