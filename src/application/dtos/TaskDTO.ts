export class TaskDTO {
    id?: string;
    description: string;
    dueDate: string;
    priority: string;
    user_id:number;
  
    constructor(description: string, dueDate: string, priority: string,user_id:number, id?: string) {
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.user_id = user_id;
      this.id = id;
    }
  }
  