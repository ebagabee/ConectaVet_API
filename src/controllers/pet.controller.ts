import type { Request, Response } from 'express';
import { petService } from '../services/pet.service';

export const petController = {
  async create(req: Request, res: Response) {
    try {
      // Campos chegam via multipart/form-data (req.body = texto, req.file = imagem)
      const {
        tutor_id,
        name,
        species,
        breed,
        size,
        coat,
        birth_date,
        microchipped,
        neutered,
        behavior,
        conditions,
      } = req.body as Record<string, string>;

      // Monta URL pública do avatar, se enviado
      const avatar_url = req.file
        ? `/uploads/pets/${req.file.filename}`
        : undefined;

      const pet = await petService.create({
        tutor_id,
        name,
        species,
        breed,
        size,
        coat,
        birth_date,
        microchipped: microchipped === 'true',
        neutered: neutered === 'true',
        behavior: behavior || undefined,
        conditions: conditions || undefined,
        avatar_url,
      });

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
