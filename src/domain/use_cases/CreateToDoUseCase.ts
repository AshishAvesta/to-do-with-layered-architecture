// src/domain/use_cases/CreateToDoUseCase.ts

import { ICreateToDoUseCase } from '../interfaces/ICreateToDoUseCase';
import ToDoService from '../services/ToDoService';
import { IToDo } from '../interfaces/IToDo';

class CreateToDoUseCase implements ICreateToDoUseCase {
  private toDoService: ToDoService;

  constructor(toDoService: ToDoService) {
    this.toDoService = toDoService;
  }

  async execute(toDoData: IToDo) {
    try {
      const newToDo = await this.toDoService.create(toDoData);
      return newToDo;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to execute CreateToDoUseCase: ${error.message}`);
      } else {
        throw new Error('An unknown error occurred while executing CreateToDoUseCase');
      }
    }
  }
}

export default CreateToDoUseCase;
