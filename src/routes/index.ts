import { Router } from "express";
import taskRoute from "./task";

const router = Router();

router.use("/task", taskRoute);

export default router;
