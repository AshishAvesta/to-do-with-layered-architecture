import { IGetTasks } from '../../domain/interfaces/IGetTasks';
import { Task } from '../../domain/entities/Task';
import { IGetTasksUseCase } from './IGetTasksUseCase';

export class GetTasksUseCase implements IGetTasksUseCase {
  private getTasks: IGetTasks
  constructor(getTasks: IGetTasks) {
    this.getTasks = getTasks;
  }

  async execute(): Promise<Task[]> {
    return this.getTasks.execute();
  }
}
