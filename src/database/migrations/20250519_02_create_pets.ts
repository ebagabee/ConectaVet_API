import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('pets', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('tutor_id').notNullable().references('id').inTable('tutors').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('species').notNullable();
    table.string('breed').notNullable();
    table.string('size').notNullable();
    table.string('coat').notNullable();
    table.date('birth_date').notNullable();
    table.boolean('microchipped').notNullable().defaultTo(false);
    table.boolean('neutered').notNullable().defaultTo(false);
    table.text('behavior').nullable();
    table.text('conditions').nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('pets');
}
