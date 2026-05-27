import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('consultations', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('vet_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.uuid('tutor_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.uuid('pet_id').nullable().references('id').inTable('pets').onDelete('SET NULL');
    table.date('date').notNullable();
    table.time('time').notNullable();
    table.string('status', 20).notNullable().defaultTo('agendada');
    table.text('notes').nullable();
    table.timestamps(true, true);

    table.index(['vet_id', 'status']);
    table.index(['tutor_id']);
  });

  await knex.raw(`
    ALTER TABLE consultations
    ADD CONSTRAINT consultations_status_check
    CHECK (status IN ('agendada', 'confirmada', 'realizada', 'cancelada'))
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('ALTER TABLE consultations DROP CONSTRAINT IF EXISTS consultations_status_check');
  await knex.schema.dropTable('consultations');
}
