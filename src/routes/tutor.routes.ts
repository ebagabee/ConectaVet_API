import { Router } from 'express';
import { tutorController } from '../controllers/tutor.controller';

const router = Router();

router.post('/', tutorController.create);
router.get('/', tutorController.findAll);
router.get('/:id', tutorController.findById);

export default router;
