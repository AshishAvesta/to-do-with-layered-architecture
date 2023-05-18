// src/domain/services/ToDoService.ts

import { IToDo } from '../interfaces/IToDo';
import { IToDoRepository } from '../interfaces/IToDoRepository';

class ToDoService {
  private toDoRepository: IToDoRepository;

  constructor(toDoRepository: IToDoRepository) {
    this.toDoRepository = toDoRepository;
  }

  async create(toDoData: IToDo) {
    try {
      const newToDo = await this.toDoRepository.create(toDoData);
      return newToDo;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to create ToDo: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while trying to create ToDo');
      }
    }
  }

  // Define other necessary methods here (update, delete, get, etc.)
}

export default ToDoService;
