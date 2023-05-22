// src/domain/services/CreateTaskService.ts
import { Task } from '../entities/Task';
import { ITaskRepository } from '../interfaces/ITaskRepository';

export class CreateTaskService {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskData: any): Promise<Task> {
    const task = new Task(taskData.description, taskData.dueDate, taskData.priority);
    const savedTask = await this.taskRepository.save(task);
    return savedTask;
  }
}
