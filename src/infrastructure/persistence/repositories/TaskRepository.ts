import { Task } from '../../../../src/domain/entities/Task';
import pool from '../../../../src/infrastructure/config/database';

export class TaskRepository {
   async save(task: Task): Promise<Task> {
     console.log('++++++++++++++++++')
     console.log('task =======>>>>',task)
     console.log('++++++++++++++++++')
    const { description, dueDate, priority } = task;
    const result = await pool.query(
      'INSERT INTO tasks(description, due_date, priority) VALUES($1, $2, $3) RETURNING *',
      [description, dueDate, priority]
    );
    return result.rows[0];
  } 

  async getById(id: string): Promise<Task | null> {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return null;
    }
    return result.rows[0];
  }
}
