// src/application/usecases/CreateTask.ts
import { Task } from '../../domain/entities/Task';
import { ICreateTaskService } from '../../domain/services/ICreateTaskService';

export class CreateTask {
  private createTaskService: ICreateTaskService;

  constructor(createTaskService: ICreateTaskService) {
    this.createTaskService = createTaskService;
  }

  execute(taskData: Task): Promise<Task> {
    return this.createTaskService.execute(taskData);
  }
}
