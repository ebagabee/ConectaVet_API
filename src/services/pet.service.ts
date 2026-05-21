import { db } from '../database/knex';

export interface CreatePetDTO {
  tutor_id: string;
  name: string;
  species: string;
  breed: string;
  size: string;
  coat: string;
  birth_date: string;
  microchipped: boolean;
  neutered: boolean;
  behavior?: string;
  conditions?: string;
  avatar_url?: string;
}

export const petService = {
  async create(data: CreatePetDTO) {
    const tutor = await db('tutors').where({ id: data.tutor_id }).first();
    if (!tutor) {
      throw new Error('Tutor não encontrado.');
    }

    const [pet] = await db('pets').insert(data).returning('*');
    return pet;
  },

  async findByTutor(tutorId: string) {
    return db('pets').where({ tutor_id: tutorId });
  },

  async findById(id: string) {
    return db('pets').where({ id }).first();
  },
};
