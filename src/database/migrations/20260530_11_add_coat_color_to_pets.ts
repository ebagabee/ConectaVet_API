import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('pets', (table) => {
    table.string('coat_color').nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('pets', (table) => {
    table.dropColumn('coat_color');
  });
}
