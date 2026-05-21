import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('pets', (table) => {
    table.string('avatar_url').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('pets', (table) => {
    table.dropColumn('avatar_url');
  });
}
