import type { Request, Response } from 'express';
import { userService } from '../services/user.service';
import type { AuthRequest } from '../middlewares/auth.middleware';

export const userController = {
  async create(req: Request, res: Response) {
    try {
      const user = await userService.create({ ...req.body, type: 'tutor' });
      res.status(201).json(user);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao criar usuário.';
      res.status(400).json({ error: message });
    }
  },

  async findAll(_req: Request, res: Response) {
    try {
      const users = await userService.findAll();
      res.json(users);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar usuários.' });
    }
  },

  async findById(req: Request, res: Response) {
    try {
      const user = await userService.findById(req.params['id'] as string);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
      res.json(user);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  },

  async me(req: AuthRequest, res: Response) {
    try {
      if (!req.userId) return res.status(401).json({ error: 'Não autenticado.' });
      const user = await userService.findById(req.userId);
      if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
      res.json(user);
    } catch {
      res.status(500).json({ error: 'Erro ao buscar usuário.' });
    }
  },
};
