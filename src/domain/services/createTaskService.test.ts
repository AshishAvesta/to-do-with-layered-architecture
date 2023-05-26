import { CreateTaskService } from '../../../src/domain/services/CreateTaskService';
import { ITaskRepository } from '../../../src/domain/interfaces/ITaskRepository';

describe('CreateTaskService', () => {
  let taskRepositoryMock: jest.Mocked<ITaskRepository>;
  let createTaskService: CreateTaskService;

  beforeEach(() => {
    taskRepositoryMock = {
      save: jest.fn().mockImplementation((task) => Promise.resolve({ ...task, id: '1' })),
      getById: jest.fn(),
      getTasks:jest.fn()
    };
    createTaskService = new CreateTaskService(taskRepositoryMock);
  });

  it('should create a task with the given data and save it to the repository', async () => {
    const taskData = {
      description: 'Study for the exam',
      dueDate: '2023-06-30',
      priority: 'high',
    };

    const createdTask = await createTaskService.execute(taskData);

    expect(taskRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining(taskData));

    expect(createdTask).toMatchObject({
      id: expect.any(String),
      ...taskData,
    });
  });

  // Additional tests could include invalid data, saving errors, etc.
});
