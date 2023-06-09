import express from 'express';
import { TaskController } from './TaskController';
import { validateTask } from './TaskValidation';
import { Request, Response } from 'express';
import { IAuthenticationMiddleware } from '../middleware/IAuthenticationMiddleware';
export class TaskRouter {
  private taskController: TaskController;
  private authMiddleware : IAuthenticationMiddleware;

  constructor(taskController: TaskController,authMiddleware:IAuthenticationMiddleware) {
    this.taskController = taskController;
    this.authMiddleware = authMiddleware;
  }

  router(): express.Router {
    const router = express.Router();

    router.get('/',this.authMiddleware.authenticate, (req:Request, res:Response) => this.taskController.getTasks(req, res));
    router.post('/',this.authMiddleware.authenticate, validateTask , (req:Request, res:Response) => this.taskController.createTask(req, res));
    return router;
  }
}
