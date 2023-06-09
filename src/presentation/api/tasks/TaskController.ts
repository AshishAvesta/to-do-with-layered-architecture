import { TaskDTO } from '../../../application/dtos/TaskDTO';
import { ICreateTask } from '../../../application/usecases/tasks/ICreateTask';
import { IGetTasksUseCase } from '../../../application/usecases/tasks/IGetTasksUseCase';
import { Task } from '../../../domain/entities/Task';

export class TaskController {
  private createTaskUseCase: ICreateTask;
  private getTasksUseCase : IGetTasksUseCase;

  constructor(createTaskUseCase: ICreateTask,getTasksUseCase : IGetTasksUseCase) {
    this.createTaskUseCase = createTaskUseCase;
    this.getTasksUseCase  = getTasksUseCase;
  }

  async createTask(req: any, res: any): Promise<void> {
  
    const { description, dueDate, priority } = req.body;
    const user_id = req.user.id;
    const taskData = new Task(description, dueDate, priority, user_id);
    try {
      const task: TaskDTO = await this.createTaskUseCase.execute(taskData);
      res.status(201).json({ task });
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getTasks(req: any, res: any): Promise<void> {
    const limit = req.query.limit || null;
    const offset = req.query.offset || null;
    const userId = req.user.id || null;

    try {
      const tasks = await this.getTasksUseCase.execute(limit, offset, userId);
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
