import { Task } from "../../../domain/entities/Task";

export interface ICreateTask {
    execute(taskData:Task): Promise<Task>;
  }
  