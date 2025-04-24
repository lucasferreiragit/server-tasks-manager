import { Router } from "express";
import { Task } from "../db";
import { TaskCreationAttributes } from "../models/Task";

// TODO: maybe improve this by using a service layer

const router = Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title, description, priority } = req.body;
    const task = await Task.create({
      title,
      description,
      priority,
    } as TaskCreationAttributes);
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({
      message: "Error creating task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, priority } = req.body;

    const [updated] = await Task.update(
      { title, description, priority },
      { where: { id } }
    );

    if (updated === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    const updatedTask = await Task.findByPk(id);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({
      message: "Error updating task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" });
    }

    const deleted = await Task.destroy({ where: { id } });

    if (deleted === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted", id });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting task",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
});

export default router;
