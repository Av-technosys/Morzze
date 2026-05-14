import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL!;

type PostgresSql = ReturnType<typeof postgres>;

const globalForDb = globalThis as typeof globalThis & {
  __morzzePostgres?: PostgresSql;
};

function createClient(): PostgresSql {
  return postgres(connectionString, {
    prepare: false,
    max: 10,
  });
}

/** One shared client; survives Next.js dev HMR so connections are not leaked. */
const client = globalForDb.__morzzePostgres ?? createClient();
if (process.env.NODE_ENV !== "production") {
  globalForDb.__morzzePostgres = client;
}

export const db = drizzle(client, { schema });

