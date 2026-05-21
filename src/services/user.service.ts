import bcrypt from 'bcryptjs';
import { db } from '../database/knex';
import type { UserType } from '../middlewares/auth.middleware';

export interface CreateUserDTO {
  name: string;
  cpf?: string | null;
  email: string;
  address?: string | null;
  password: string;
  type?: UserType;
}

export interface UpdateUserDTO {
  name?: string;
  email?: string;
  address?: string | null;
  type?: UserType;
}

export interface LoginDTO {
  email: string;
  password: string;
}

const PUBLIC_COLUMNS = ['id', 'name', 'cpf', 'email', 'address', 'type', 'created_at'];

export const userService = {
  async create(data: CreateUserDTO) {
    const conflict = await db('users')
      .where({ email: data.email })
      .modify((qb) => {
        if (data.cpf) qb.orWhere({ cpf: data.cpf });
      })
      .first();

    if (conflict) {
      throw new Error('E-mail ou CPF já cadastrado.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const [user] = await db('users')
      .insert({
        name: data.name,
        cpf: data.cpf ?? null,
        email: data.email,
        address: data.address ?? null,
        password: hashedPassword,
        type: data.type ?? 'tutor',
      })
      .returning(PUBLIC_COLUMNS);

    return user;
  },

  async findAll() {
    return db('users').select(PUBLIC_COLUMNS).orderBy('created_at', 'desc');
  },

  async findById(id: string) {
    return db('users').where({ id }).select(PUBLIC_COLUMNS).first();
  },

  async update(id: string, data: UpdateUserDTO) {
    const current = await db('users').where({ id }).first();
    if (!current) throw new Error('Usuário não encontrado.');

    if (data.email && data.email !== current.email) {
      const conflict = await db('users').where({ email: data.email }).first();
      if (conflict) throw new Error('E-mail já está em uso por outro usuário.');
    }

    const patch: Record<string, unknown> = {};
    if (data.name !== undefined) patch.name = data.name;
    if (data.email !== undefined) patch.email = data.email;
    if (data.address !== undefined) patch.address = data.address;
    if (data.type !== undefined) patch.type = data.type;

    if (Object.keys(patch).length > 0) {
      patch.updated_at = db.fn.now();
      await db('users').where({ id }).update(patch);
    }

    return this.findById(id);
  },

  async remove(id: string) {
    const deleted = await db('users').where({ id }).delete();
    if (deleted === 0) throw new Error('Usuário não encontrado.');
  },

  async login(data: LoginDTO) {
    const user = await db('users').where({ email: data.email }).first();
    if (!user) throw new Error('E-mail ou senha inválidos.');

    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) throw new Error('E-mail ou senha inválidos.');

    const { password: _pwd, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },
};
