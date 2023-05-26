import { Task } from '../entities/Task';
import { IGetTasks } from '../interfaces/IGetTasks';
import { ITaskRepository } from '../interfaces/ITaskRepository';

export class GetTasksService implements IGetTasks {
    constructor(private taskRepository: ITaskRepository) {}

    async execute(): Promise<Task[]> {
        return this.taskRepository.getTasks();
    }
}
