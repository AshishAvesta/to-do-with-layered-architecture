// src/presentation/api/routers/TaskRouter.ts
import express from 'express';
import { TaskController } from './TaskController';
import { validateTask } from './TaskValidation';
import { Request, Response } from 'express';

export class TaskRouter {
  private taskController: TaskController;

  constructor(taskController: TaskController) {
    this.taskController = taskController;
  }

  router(): express.Router {
    const router = express.Router();

    router.get('/', (req:Request, res:Response) => this.taskController.getTasks(req, res));
    router.post('/', validateTask , (req:Request, res:Response) => this.taskController.createTask(req, res));

    
    //router.get('/tasks', this.tasksController.getTasks.bind(this.tasksController));

    return router;
  }
}
