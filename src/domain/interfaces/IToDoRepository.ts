// src/domain/interfaces/IToDoRepository.ts

import { IToDo } from './IToDo';

export interface IToDoRepository {
  create(toDoData: IToDo): Promise<IToDo>;
  // Define other necessary methods here (update, delete, get, etc.)
}
