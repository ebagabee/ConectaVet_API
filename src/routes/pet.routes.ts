import { Router } from 'express';
import { petController } from '../controllers/pet.controller';
import { uploadPetAvatar } from '../middlewares/upload';

const router = Router();

router.post('/', uploadPetAvatar, petController.create);
router.get('/tutor/:tutorId', petController.findByTutor);
router.get('/:id', petController.findById);

export default router;
