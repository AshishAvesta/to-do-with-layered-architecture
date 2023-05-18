// src/presentation/controllers/ToDoController.ts

import CreateToDoUseCase from '../../domain/use_cases/CreateToDoUseCase';
import ToDoRepository from '../../persistence/repositories/ToDoRepository';
import ToDoService from '../../domain/services/ToDoService';
import { Request, Response } from 'express';

class ToDoController {
  private createToDoUseCase: CreateToDoUseCase;

  constructor() {
    const toDoService = new ToDoService(new ToDoRepository());
    this.createToDoUseCase = new CreateToDoUseCase(toDoService);
  }

  async create(req: Request, res: Response) {
    try {
      const toDo = await this.createToDoUseCase.execute(req.body);
      res.json(toDo);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: `Failed to create ToDo: ${error.message}` });
      } else {
        res.status(500).json({ error: 'An unknown error occurred.' });
      }
    }
  }

  // Define other necessary methods here (update, delete, get, etc.)
}

export default ToDoController;
