import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('subscriptions', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.uuid('plan_id').notNullable().references('id').inTable('plans').onDelete('RESTRICT');
    table.decimal('paid_value', 10, 2).notNullable().defaultTo(0);
    table.string('status', 20).notNullable().defaultTo('active');
    table.timestamp('started_at').notNullable().defaultTo(knex.fn.now());
    table.timestamp('canceled_at').nullable();
    table.timestamps(true, true);

    table.index(['user_id', 'status']);
  });

  await knex.raw(`
    ALTER TABLE subscriptions
    ADD CONSTRAINT subscriptions_status_check
    CHECK (status IN ('active', 'canceled'))
  `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('ALTER TABLE subscriptions DROP CONSTRAINT IF EXISTS subscriptions_status_check');
  await knex.schema.dropTable('subscriptions');
}
