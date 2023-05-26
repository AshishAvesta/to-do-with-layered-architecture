import express from 'express';
import { TaskRouter } from './TaskRouter';
import { TaskController } from './TaskController';
import { ICreateTask } from '../../../application/usecases/ICreateTask';
import { ITaskRepository } from '../../../domain/interfaces/ITaskRepository';
import { TaskRepository } from '../../../infrastructure/persistence/repositories/TaskRepository';
import { CreateTaskService } from '../../../domain/services/CreateTaskService';
import { CreateTask } from '../../../application/usecases/CreateTask';
import { ICreateTaskService } from '../../../domain/services/ICreateTaskService';
import { IModule } from '../IModule';
import { IGetTasks } from '../../../domain/interfaces/IGetTasks';
import { GetTasksService } from '../../../domain/services/GetTasksService';
import { IGetTasksUseCase } from '../../../application/usecases/IGetTasksUseCase';
import { GetTasksUseCase } from '../../../application/usecases/GetTasksUseCase';



export class TaskModule implements IModule {
    init(app: express.Express):void {
        const taskRepository : ITaskRepository = new TaskRepository(); 
        const createTaskService : ICreateTaskService = new CreateTaskService(taskRepository);
        const createTaskUsecase:ICreateTask = new CreateTask(createTaskService);

        const getTaskService : IGetTasks = new GetTasksService(taskRepository);
        const getTaskUsecase:IGetTasksUseCase = new GetTasksUseCase(getTaskService);

        const taskController = new TaskController(createTaskUsecase,getTaskUsecase);
        const taskRouter = new TaskRouter(taskController);
        // Register the task router under '/tasks'
        app.use('/tasks', taskRouter.router());
    }
}
