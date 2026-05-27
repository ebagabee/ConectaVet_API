import type { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_type_check');

  await knex.raw(`
    ALTER TABLE users
    ADD CONSTRAINT users_type_check
    CHECK (type IN ('tutor', 'admin', 'veterinario'))
  `);

  await knex.schema.alterTable('users', (table) => {
    table.string('cnpj', 18).nullable().unique();
    table.string('recipient_id').nullable();
    table.string('pix_type', 20).nullable();
    table.string('pix_key', 100).nullable();
    table.string('bank_code', 10).nullable();
    table.string('bank_name', 100).nullable();
    table.string('bank_agency', 10).nullable();
    table.string('bank_account_number', 20).nullable();
    table.string('bank_account_digit', 5).nullable();
    table.string('bank_account_type', 20).nullable();
    table.string('bank_holder_type', 20).nullable();
    table.string('billing_cep', 10).nullable();
    table.string('billing_street').nullable();
    table.string('billing_number', 20).nullable();
    table.string('billing_complement').nullable();
    table.string('billing_neighborhood').nullable();
    table.string('billing_city').nullable();
    table.string('billing_state', 2).nullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('users', (table) => {
    table.dropColumn('cnpj');
    table.dropColumn('recipient_id');
    table.dropColumn('pix_type');
    table.dropColumn('pix_key');
    table.dropColumn('bank_code');
    table.dropColumn('bank_name');
    table.dropColumn('bank_agency');
    table.dropColumn('bank_account_number');
    table.dropColumn('bank_account_digit');
    table.dropColumn('bank_account_type');
    table.dropColumn('bank_holder_type');
    table.dropColumn('billing_cep');
    table.dropColumn('billing_street');
    table.dropColumn('billing_number');
    table.dropColumn('billing_complement');
    table.dropColumn('billing_neighborhood');
    table.dropColumn('billing_city');
    table.dropColumn('billing_state');
  });

  await knex.raw('ALTER TABLE users DROP CONSTRAINT IF EXISTS users_type_check');

  await knex.raw(`
    ALTER TABLE users
    ADD CONSTRAINT users_type_check
    CHECK (type IN ('tutor', 'admin'))
  `);
}
