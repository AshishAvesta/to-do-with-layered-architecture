import { Task } from '../entities/Task';

export interface IGetTasks {
  execute(): Promise<Task[]>;
}
