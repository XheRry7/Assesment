import { AsyncRouter } from "express-async-router";
import { Signup, Login } from "../../controllers/signup.js";

const router = AsyncRouter();

router.post("/sign-up", Signup);
router.post("/login", Login);

export default router;
