import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.renameTable('tutors', 'users');

  await knex.schema.alterTable('users', (table) => {
    table.string('type', 20).notNullable().defaultTo('tutor');
    table.string('cpf', 14).nullable().alter();
  });

  await knex.raw(`
    ALTER TABLE users
    ADD CONSTRAINT users_type_check
    CHECK (type IN ('tutor', 'admin'))
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_type_check');

  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('type');
    table.string('cpf', 14).notNullable().alter();
  });

  await knex.schema.renameTable('users', 'tutors');
}
