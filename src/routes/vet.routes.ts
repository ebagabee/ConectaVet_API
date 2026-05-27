import { Router } from 'express';
import { vetController } from '../controllers/vet.controller';
import { requireVet } from '../middlewares/auth.middleware';

const router = Router();

router.use(requireVet);

router.get('/profile', vetController.getProfile);
router.put('/password', vetController.changePassword);
router.get('/consultations', vetController.listConsultations);
router.patch('/consultations/:id/status', vetController.updateConsultationStatus);
router.get('/balance', vetController.getBalance);

export default router;
