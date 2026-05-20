import type { Request, Response } from 'express';
import { tutorService } from '../services/tutor.service';

export const tutorController = {
  async create(req: Request, res: Response) {
    try {
      const tutor = await tutorService.create(req.body);
      res.status(201).json(tutor);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar tutor.';
      res.status(400).json({ error: message });
    }
  },

  async findAll(_req: Request, res: Response) {
    try {
      const tutors = await tutorService.findAll();
      res.json(tutors);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar tutores.' });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const tutor = await tutorService.findById(req.params['id'] as string);
      if (!tutor) return res.status(404).json({ error: 'Tutor não encontrado.' });
      res.json(tutor);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar tutor.' });
    }
  },
};
