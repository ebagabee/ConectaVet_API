import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('plans', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('title').notNullable();
    table.string('color').notNullable();
    table.string('focus').notNullable();
    table.text('focus_desc').notNullable();
    table.decimal('price', 10, 2).notNullable();
    table.jsonb('perks').notNullable().defaultTo('[]');
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('plans');
}
