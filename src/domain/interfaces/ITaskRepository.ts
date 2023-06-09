import { Task } from '../entities/Task';

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  getById(id: string): Promise<Task | null>;
  getTasks(limit?: number, offset?: number, userId?: string): Promise<Task[]>;
}
