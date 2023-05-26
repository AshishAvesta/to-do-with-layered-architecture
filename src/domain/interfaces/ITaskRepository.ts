// src/domain/interfaces/ITaskRepository.ts
import { Task } from '../entities/Task';

export interface ITaskRepository {
  save(task: Task): Promise<Task>;
  getById(id: string): Promise<Task | null>;
  getTasks(): Promise<Task[]>;
}
