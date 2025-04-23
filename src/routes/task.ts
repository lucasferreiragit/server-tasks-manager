import { Router } from "express";
const { Task } = require("../db");

const router = Router();

router.get("/", async (req, res) => {
  console.log("into get task");
  const tasks = await Task.findAll();

  console.log("🚀 > router.get > tasks ==> ", tasks);
  res.json(tasks);
});

router.post("/", async (req, res) => {
  console.log("into post task");
  const task = await Task.create(req.body);
  res.status(201).json(task);
});

export default router;
