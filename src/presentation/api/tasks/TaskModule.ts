import express from 'express';
import { TaskRouter } from './TaskRouter';
import { TaskController } from './TaskController';
import { ITaskRepository } from '../../../domain/interfaces/ITaskRepository';
import { TaskRepository } from '../../../infrastructure/persistence/repositories/TaskRepository';
import { CreateTask } from '../../../application/usecases/tasks/CreateTask';
import { ICreateTaskService } from '../../../domain/interfaces/ICreateTaskService';
import { IModule } from '../IModule';
import { IGetTasks } from '../../../domain/interfaces/IGetTasks';
import { GetTasksUseCase } from '../../../application/usecases/tasks/GetTasksUseCase';
import { AuthenticationMiddleware } from '../middleware/AuthenticationMiddleware';
import { ITokenService } from '../../../domain/interfaces/ITokenService';
import { JwtService } from '../../../infrastructure/utils/JwtService';
import { ICreateTask } from '../../../application/usecases/tasks/ICreateTask';
import { IGetTasksUseCase } from '../../../application/usecases/tasks/IGetTasksUseCase';
import { CreateTaskService } from '../../../domain/services/tasks/CreateTaskService';
import { GetTasksService } from '../../../domain/services/tasks/GetTasksService';



export class TaskModule implements IModule {
    init(app: express.Express):void {
        const taskRepository : ITaskRepository = new TaskRepository(); 
        const createTaskService : ICreateTaskService = new CreateTaskService(taskRepository);
        const createTaskUsecase:ICreateTask = new CreateTask(createTaskService);

        const getTaskService : IGetTasks = new GetTasksService(taskRepository);
        const getTaskUsecase:IGetTasksUseCase = new GetTasksUseCase(getTaskService);

        const taskController = new TaskController(createTaskUsecase,getTaskUsecase);
        const jwtService:ITokenService = new JwtService();
        const authMiddleware = new AuthenticationMiddleware(jwtService);
        const taskRouter = new TaskRouter(taskController,authMiddleware);
       
        // Register the task router under '/tasks'
        app.use('/tasks', taskRouter.router());
    }
}
