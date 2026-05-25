import { db } from "../src/database/knex";

async function fresh() {
  const tables = ["subscriptions", "pets", "plans", "users", "tutors"];

  for (const table of tables) {
    await db.raw(`DROP TABLE IF EXISTS "${table}" CASCADE`);
  }

  await db.raw(`DROP TABLE IF EXISTS "knex_migrations_lock" CASCADE`);
  await db.raw(`DROP TABLE IF EXISTS "knex_migrations" CASCADE`);

  console.log("✅ Tabelas removidas");
  await db.destroy();
}

fresh();
