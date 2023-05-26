import { Task } from '../../domain/entities/Task';

export interface IGetTasksUseCase {
  execute(): Promise<Task[]>;
}
