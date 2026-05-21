import { Router } from 'express';
import { planController } from '../controllers/plan.controller';

const router = Router();

router.get('/', planController.list);
router.get('/:id', planController.findById);

export default router;
