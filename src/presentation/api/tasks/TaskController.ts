// src/presentation/api/controllers/TaskController.ts
import { ICreateTask } from '../../../application/usecases/ICreateTask';
import { TaskDTO } from '../../../application/dtos/TaskDTO';
import { IGetTasksUseCase } from '../../../application/usecases/IGetTasksUseCase';

export class TaskController {
  private createTaskUseCase: ICreateTask;
  private getTasksUseCase : IGetTasksUseCase;

  constructor(createTaskUseCase: ICreateTask,getTasksUseCase : IGetTasksUseCase) {
    this.createTaskUseCase = createTaskUseCase;
    this.getTasksUseCase  = getTasksUseCase;
  }

  async createTask(req: any, res: any): Promise<void> {
    const taskData = req.body;
    try {
      const task: TaskDTO = await this.createTaskUseCase.execute(taskData);
      res.status(201).json({ task });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTasks(req: any, res: any): Promise<void> {
    try {
      const tasks = await this.getTasksUseCase.execute();
      res.status(200).json(tasks);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).send(error.message);
      } else {
        res.status(500).send('Unknown server error');
      }
    }
  };
}
