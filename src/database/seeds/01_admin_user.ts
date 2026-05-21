import type { Knex } from 'knex';
import bcrypt from 'bcryptjs';

const ADMIN_EMAIL = 'dracarolinabss@gmail.com';
const ADMIN_PLAIN_PASSWORD = 'Conectavet33?';

export async function seed(knex: Knex): Promise<void> {
  const existing = await knex('users').where({ email: ADMIN_EMAIL }).first();
  if (existing) {
    return;
  }

  const hashedPassword = await bcrypt.hash(ADMIN_PLAIN_PASSWORD, 10);

  await knex('users').insert({
    name: 'Dra. Carolina',
    email: ADMIN_EMAIL,
    cpf: null,
    address: null,
    password: hashedPassword,
    type: 'admin',
  });
}
