import type { Knex } from 'knex';
import 'dotenv/config';

const config: Knex.Config = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 5432),
    user: process.env.DB_USER ?? 'postgres',
    password: process.env.DB_PASSWORD ?? 'postgres',
    database: process.env.DB_NAME ?? 'connecta_vet',
  },
  migrations: {
    directory: './src/database/migrations',
    extension: 'ts',
  },
};

export default config;
