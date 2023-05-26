import { TaskRepository } from './TaskRepository';
import pool from '../../../../src/infrastructure/config/database';

jest.mock('../../../../src/infrastructure/config/database');

describe('TaskRepository', () => {
  let taskRepository: TaskRepository;

  beforeEach(() => {
    (pool.query as jest.Mock).mockClear();
    taskRepository = new TaskRepository();
  });

  it('should save a task and generate an ID', async () => {
    const task = { description: 'Study for the exam', dueDate: '2023-06-30', priority: 'high' };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [{ id: '1', ...task }] });

    const savedTask = await taskRepository.save(task);

    expect(savedTask.id).toBeDefined();
    expect(savedTask.description).toEqual(task.description);
    expect(savedTask.dueDate).toEqual(task.dueDate);
    expect(savedTask.priority).toEqual(task.priority);
  });

  it('should retrieve a task by ID', async () => {
    const task = { id: '1', description: 'Study for the exam', dueDate: '2023-06-30', priority: 'high' };
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [task] });

    const retrievedTask = await taskRepository.getById(task.id);

    expect(retrievedTask).toEqual(task);
  });

  test('should return all tasks when getTasks is called', async () => {
    // Arrange
    const expectedTasks = { id: '1', description: 'Study for the exam', dueDate: '2023-06-30', priority: 'high' };
    // configure your mock TaskRepository's getTasks method to return expectedTasks when it is called.
    (pool.query as jest.Mock).mockResolvedValueOnce({ rows: [expectedTasks] });
    // Act
    const tasks = await taskRepository.getTasks();

    // Assert
    expect(tasks).toEqual([expectedTasks]);
});

});
