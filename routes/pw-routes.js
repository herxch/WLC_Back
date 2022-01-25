import { Router } from 'express';
import { getPwData } from '../controllers/pw-controller.js';
import { createPwData } from '../controllers/pw-controller.js';

const router = Router();

router.post('/login', getPwData);

router.post('/signup', createPwData);

export default router;
