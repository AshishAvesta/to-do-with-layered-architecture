import { Task } from '../entities/Task';
export interface IGetTasks {
  execute(limit?: number, offset?: number, userId?: string): Promise<Task[]>;
}
