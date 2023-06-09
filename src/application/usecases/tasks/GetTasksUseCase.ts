import { IGetTasks } from '../../../domain/interfaces/IGetTasks';
import { Task } from '../../../domain/entities/Task';
import { IGetTasksUseCase } from './IGetTasksUseCase';

export class GetTasksUseCase implements IGetTasksUseCase {
  constructor(private getTasks: IGetTasks) { }

  async execute(limit?: number, offset?: number, userId?: string): Promise<Task[]> {
    return this.getTasks.execute(limit, offset, userId );
  }
}
