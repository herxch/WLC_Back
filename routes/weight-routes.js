import { Router } from "express";
import {
  getData,
  getHData,
  getLData,
} from "../controllers/weight-controller.js";
import { createData } from "../controllers/weight-controller.js";
import { check } from "express-validator";
import checkAuth from "../middleware/check-auth.js";

const router = Router();

// /api/:name/h
router.get("/h", getHData);

// /api/:name/l
router.get("/l", getLData);

// /api/:name
router.get("/", getData);

router.use(checkAuth);

router.post("/", check("value").isNumeric(), createData);

export default router;
