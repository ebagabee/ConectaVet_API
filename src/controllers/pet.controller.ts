import type { Request, Response } from 'express';
import { petService } from '../services/pet.service';

export const petController = {
  async create(req: Request, res: Response) {
    try {
      const pet = await petService.create(req.body);
      res.status(201).json(pet);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar pet.';
      res.status(400).json({ error: message });
    }
  },

  async findByTutor(req: Request, res: Response) {
    try {
      const pets = await petService.findByTutor(req.params['tutorId'] as string);
      res.json(pets);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar pets.' });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const pet = await petService.findById(req.params['id'] as string);
      if (!pet) return res.status(404).json({ error: 'Pet não encontrado.' });
      res.json(pet);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar pet.' });
    }
  },
};
