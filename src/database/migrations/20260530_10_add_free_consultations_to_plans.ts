import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('plans', (table) => {
    table.integer('free_consultations').notNullable().defaultTo(0);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('plans', (table) => {
    table.dropColumn('free_consultations');
  });
}
