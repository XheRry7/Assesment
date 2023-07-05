import { AsyncRouter } from "express-async-router";
import userRoutes from "./user/userRoutes.js";
import carRoutes from "./car/carRoutes.js";
import categoryRoutes from "./category/categoryRoutes.js";

const router = AsyncRouter();

router.use("/user", userRoutes);
router.use("/car", carRoutes);
router.use("/category", categoryRoutes);

export default router;
