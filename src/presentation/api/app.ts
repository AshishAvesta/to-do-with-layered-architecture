// app.ts
import express from 'express';
import { TaskRouter } from './routers/TaskRouter';
import { TaskController } from './controllers/TaskController';
import { ICreateTask } from '../../application/usecases/ICreateTask';
import { ITaskRepository } from '../../domain/interfaces/ITaskRepository';
import { TaskRepository } from '../../infrastructure/persistence/repositories/TaskRepository';
import { CreateTaskService } from '../../domain/services/CreateTaskService';
import { CreateTask } from '../../application/usecases/CreateTask';
import { ICreateTaskService } from '../../domain/services/ICreateTaskService';



const taskRepository : ITaskRepository = new TaskRepository(); 
const createTaskService : ICreateTaskService = new CreateTaskService(taskRepository);
const createTaskUsecase:ICreateTask = new CreateTask(createTaskService);
const taskController = new TaskController(createTaskUsecase);


export const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  return app;
};

export const registerRoutes = (app: express.Express) => {
  const taskRouter = new TaskRouter(taskController);

  // Register the task router under '/tasks'
  app.use('/tasks', taskRouter.router());
};
