import { Router } from 'express';
import tutorRoutes from './tutor.routes';
import petRoutes from './pet.routes';

const router = Router();

router.use('/tutors', tutorRoutes);
router.use('/pets', petRoutes);

export default router;
