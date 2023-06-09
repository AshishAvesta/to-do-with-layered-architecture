import { Task } from "../entities/Task";

export interface ICreateTaskService {
    execute(taskData: Task): Promise<Task>;
  }
  