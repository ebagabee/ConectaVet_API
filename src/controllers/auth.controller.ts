import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { tutorService } from '../services/tutor.service';

const JWT_SECRET = process.env.JWT_SECRET ?? 'dev_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ?? '7d';

export const authController = {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios.' });
      }

      const tutor = await tutorService.login({ email, password });

      const token = jwt.sign(
        { id: tutor.id, email: tutor.email },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions
      );

      return res.json({
        token,
        user: {
          id: tutor.id,
          name: tutor.name,
          email: tutor.email,
        },
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro ao fazer login.';
      return res.status(401).json({ error: message });
    }
  },
};
