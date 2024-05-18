import { Router } from "express";
import signupController from "../controllers/signup.controllers";
import { zodValidation } from "../middlewares/zodValidator";
import { signupSchema } from "../schemas/auth.schema";

const router: Router = Router();

router.post("/", zodValidation(signupSchema), signupController);

export default router;
