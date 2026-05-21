import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('pets', (table) => {
    table.renameColumn('tutor_id', 'user_id');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('pets', (table) => {
    table.renameColumn('user_id', 'tutor_id');
  });
}
