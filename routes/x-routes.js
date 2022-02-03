import { Router } from 'express';
import { getXData, getXHData, getXLData } from '../controllers/x-controller.js';
import { createXData } from '../controllers/x-controller.js';
import { check } from 'express-validator';
import checkAuth from '../middleware/check-auth.js';

const router = Router();

router.get('/h', getXHData);

router.get('/l', getXLData);

router.get('/', getXData);

router.use(checkAuth);

router.post('/', check('x').isNumeric(), createXData);

export default router;
3333;
