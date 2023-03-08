import { Router } from 'express';
import {
  getData,
  getHData,
  getLData,
} from '../controllers/weight-controller.js';
import { createData } from '../controllers/weight-controller.js';
import { check, param } from 'express-validator';
import checkAuth from '../middleware/check-auth.js';

const router = Router();

// /api/:name/h
router.get('/:name/h', getHData);

// /api/:name/l
router.get('/:name/l', getLData);

// /api/:name
router.get('/:name', getData);

router.use(checkAuth);

router.post(
  '/:name',
  [
    check('value').isNumeric(),
    param('name').custom((value, { req }) => {
      if (!['c', 'm', 'j'].includes(value)) {
        throw new Error('User does not exist.');
      }
      return true;
    }),
  ],
  createData
);

export default router;
