# Bun Sandbox

Backend API starter using Bun, ElysiaJS, Drizzle ORM, and TiDB/MySQL.

## Stack

- Bun
- ElysiaJS
- Drizzle ORM
- TiDB Cloud or MySQL-compatible database
- TypeScript

## Requirements

- Bun
- TiDB Cloud cluster or MySQL-compatible database
- App database, for example `bun_box`

## Setup

Install dependencies:

```bash
bun install
```

Create a database in TiDB:

```sql
CREATE DATABASE bun_box;
```

Create `.env` in the project root:

```env
PORT=3000
DATABASE_URL=mysql://USERNAME:PASSWORD@HOST:4000/bun_box
TIDB_ENABLE_SSL=true
```

Apply database migrations:

```bash
bun run db:migrate
```

Start the development server:

```bash
bun run dev
```

The server runs at:

```text
http://localhost:3000
```

## Scripts

```bash
bun run dev
```

Start the development server with watch mode.

```bash
bun run start
```

Start the server without watch mode.

```bash
bun run db:generate
```

Generate Drizzle migration files from `src/db/schema.ts`.

```bash
bun run db:migrate
```

Apply migrations to the configured database.

```bash
bun run db:studio
```

Open Drizzle Studio.

## API

### `GET /`

Returns a hello message.

### `GET /health`

Returns service health status.

### `GET /users`

Returns users from the database.

## Database

The current schema defines a `users` table:

- `id`
- `name`
- `email`
- `created_at`
- `updated_at`

## Project Structure

```text
src/
  index.ts
  db/
    client.ts
    schema.ts
drizzle/
drizzle.config.ts
```
