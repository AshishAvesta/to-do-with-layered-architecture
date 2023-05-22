// src/presentation/api/controllers/TaskController.ts
import { ICreateTask } from '../../../application/usecases/ICreateTask';
import { TaskDTO } from '../../../application/dtos/TaskDTO';

export class TaskController {
  private createTaskUseCase: ICreateTask;

  constructor(createTaskUseCase: ICreateTask) {
    this.createTaskUseCase = createTaskUseCase;
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
}
