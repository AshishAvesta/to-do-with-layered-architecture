// src/presentation/api/routers/TaskRouter.ts
import express from 'express';
import { TaskController } from './TaskController';

export class TaskRouter {
  private taskController: TaskController;

  constructor(taskController: TaskController) {
    this.taskController = taskController;
  }

  router(): express.Router {
    const router = express.Router();

    router.post('/', (req, res) => this.taskController.createTask(req, res));

    return router;
  }
}
