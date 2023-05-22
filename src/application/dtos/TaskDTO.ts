// src/application/dtos/TaskDTO.ts
export class TaskDTO {
    id?: string;
    description: string;
    dueDate: string;
    priority: string;
  
    constructor(description: string, dueDate: string, priority: string, id?: string) {
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.id = id;
    }
  }
  