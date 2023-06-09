import { Task } from "../../entities/Task";
import { ICreateTaskService } from "../../interfaces/ICreateTaskService";
import { ITaskRepository } from "../../interfaces/ITaskRepository";

export class CreateTaskService implements ICreateTaskService {
  private taskRepository: ITaskRepository;

  constructor(taskRepository: ITaskRepository) {
    this.taskRepository = taskRepository;
  }

  async execute(taskData: Task): Promise<Task> {
    const savedTask = await this.taskRepository.save(taskData);
    return savedTask;
  }
}
