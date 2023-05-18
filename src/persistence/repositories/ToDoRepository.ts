// src/persistence/repositories/ToDoRepository.ts

import pool from '../../infrastructure/config/database';
import { IToDoRepository } from '../../domain/interfaces/IToDoRepository';
import { IToDo } from '../../domain/interfaces/IToDo';

class ToDoRepository implements IToDoRepository {
  async create(toDoData: IToDo) {
    try {
      const { title, description, completed } = toDoData;
      const newToDo = await pool.query(
        'INSERT INTO todos (title, description, completed) VALUES ($1, $2, $3) RETURNING *',
        [title, description, completed]
      );
      return newToDo.rows[0];
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

export default ToDoRepository;
