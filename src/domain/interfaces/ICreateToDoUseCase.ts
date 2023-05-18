// src/domain/interfaces/ICreateToDoUseCase.ts

import { IToDo } from './IToDo';

export interface ICreateToDoUseCase {
  execute(toDoData: IToDo): Promise<IToDo>;
}
