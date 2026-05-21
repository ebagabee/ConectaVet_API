import { Router } from 'express';
import { petController } from '../controllers/pet.controller';
import { uploadPetAvatar } from '../middlewares/upload';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/', uploadPetAvatar, petController.create);

// Rota autenticada: retorna os pets do tutor logado via JWT
router.get('/my', requireAuth, petController.findMine);

router.get('/tutor/:tutorId', petController.findByTutor);
router.get('/:id', petController.findById);

export default router;
