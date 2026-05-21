import { Router } from 'express';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import tutorRoutes from './tutor.routes';
import petRoutes from './pet.routes';
import planRoutes from './plan.routes';
import subscriptionRoutes from './subscription.routes';
import adminRoutes from './admin.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/tutors', tutorRoutes);
router.use('/pets', petRoutes);
router.use('/plans', planRoutes);
router.use('/subscriptions', subscriptionRoutes);
router.use('/admin', adminRoutes);

export default router;
