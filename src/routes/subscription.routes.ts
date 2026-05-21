import { Router } from 'express';
import { subscriptionController } from '../controllers/subscription.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.get('/me', requireAuth, subscriptionController.me);
router.post('/', requireAuth, subscriptionController.subscribe);
router.delete('/me', requireAuth, subscriptionController.cancelMine);

export default router;
