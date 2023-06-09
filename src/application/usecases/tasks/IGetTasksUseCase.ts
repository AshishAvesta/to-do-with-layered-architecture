import { Task } from "../../../domain/entities/Task";

export interface IGetTasksUseCase {
  execute(limit?: number, offset?: number, userId?: string): Promise<Task[]>;
}
