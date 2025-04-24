import { Router } from "express";
import taskRoute from "./task";

const router = Router();

router.use("/tasks", taskRoute);

export default router;
