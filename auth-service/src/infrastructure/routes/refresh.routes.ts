import { Router } from "express";
import refreshController from "../controllers/refresh.controllers";

const router: Router = Router();

router.get("/", refreshController);

export default router;
