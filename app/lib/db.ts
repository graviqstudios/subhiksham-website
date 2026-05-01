// app/lib/db.ts
// Neon PostgreSQL connection using the `postgres` package already in your project

import postgres from 'postgres';

const connectionString = process.env.DATABASE_URI!;

// Single connection instance (reused across requests in dev)
const sql = postgres(connectionString, {
  ssl: 'require',
  max: 10,             // max pool size
  idle_timeout: 20,    // close idle connections after 20s
  connect_timeout: 10, // fail fast if Neon is cold-starting
});

export default sql;