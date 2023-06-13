import { Task } from '../../../../src/domain/entities/Task';
import pool from '../../../../src/infrastructure/config/database';
import { ITaskRepository } from '../../../domain/interfaces/ITaskRepository';

export class TaskRepository implements ITaskRepository {
  async save(task: Task): Promise<Task> {
    const { description, dueDate, priority, user_id } = task;
    const result = await pool.query(
      'INSERT INTO tasks(description, due_date, priority,user_id) VALUES($1, $2, $3,$4) RETURNING *',
      [description, dueDate, priority, user_id]
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

  async getTasks(limit?: number, offset?: number, userId?: string): Promise<Task[]> {

    let query = 'SELECT * FROM tasks ';
    if (userId) {
      query = query + ' where user_id = $3 ';
    }
    query = query + ' ORDER BY id ';
    if (limit) {
      query = query + ' LIMIT $1 ';
    }
    if (offset) {
      query = query + ' OFFSET $2 ';
    }
    const res = await pool.query(query, [limit, offset, userId]);
    return res.rows.map(row => new Task(row.description, row.dueDate, row.priority, row.user_id, row.id));
  }
}
