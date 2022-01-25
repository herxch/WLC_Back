import { Router } from 'express';
import { getMeData } from '../controllers/me-controller.js';
import { createMeData } from '../controllers/me-controller.js';
import { check } from 'express-validator';
import checkAuth from '../middleware/check-auth.js';

const router = Router();

router.get('/', getMeData);

router.use(checkAuth);

router.post(
  '/',
  check('me').isNumeric(),

  createMeData
);

export default router;
