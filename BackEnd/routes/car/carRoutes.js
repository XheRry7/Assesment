import { AsyncRouter } from "express-async-router";
import withAuth from "../../middleware/auth.js";
import {
  getCar,
  createCar,
  carUpdate,
  delCar,
} from "../../controllers/carsController.js";

const router = AsyncRouter();

router.get("/", withAuth, getCar);
router.post("/", withAuth, createCar);
router.put("/", withAuth, carUpdate);
router.delete("/", withAuth, delCar);

export default router;
