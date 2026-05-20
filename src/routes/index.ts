import { Router } from 'express';
import tutorRoutes from './tutor.routes';
import petRoutes from './pet.routes';
import authRoutes from './auth.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tutors', tutorRoutes);
router.use('/pets', petRoutes);

export default router;
