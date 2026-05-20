import bcrypt from 'bcryptjs';
import { db } from '../database/knex';

export interface CreateTutorDTO {
  name: string;
  cpf: string;
  email: string;
  address?: string;
  password: string;
}

export const tutorService = {
  async create(data: CreateTutorDTO) {
    const existing = await db('tutors').where({ email: data.email }).orWhere({ cpf: data.cpf }).first();
    if (existing) {
      throw new Error('E-mail ou CPF já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [tutor] = await db('tutors')
      .insert({ ...data, password: hashedPassword })
      .returning(['id', 'name', 'cpf', 'email', 'address', 'created_at']);

    return tutor;
  },

  async findAll() {
    return db('tutors').select('id', 'name', 'cpf', 'email', 'address', 'created_at');
  },

  async findById(id: string) {
    return db('tutors')
      .where({ id })
      .select('id', 'name', 'cpf', 'email', 'address', 'created_at')
      .first();
  },
};
