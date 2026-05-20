import { Router } from 'express';
import { petController } from '../controllers/pet.controller';

const router = Router();

router.post('/', petController.create);
router.get('/tutor/:tutorId', petController.findByTutor);
router.get('/:id', petController.findById);

export default router;
