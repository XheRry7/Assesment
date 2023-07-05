import { AsyncRouter } from "express-async-router";
import withAuth from "../../middleware/auth.js";
import {
  getCategory,
  createCategory,
  categoryUpdate,
  delCategory,
} from "../../controllers/categoriesController.js";

const router = AsyncRouter();

router.get("/", withAuth, getCategory);
router.post("/", withAuth, createCategory);
router.put("/", withAuth, categoryUpdate);
router.delete("/", withAuth, delCategory);

export default router;
