import { ITaskRepository } from "../../interfaces/ITaskRepository";
import { CreateTaskService } from "./CreateTaskService";


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
      user_id:1
    };

    const createdTask = await createTaskService.execute(taskData);

    expect(taskRepositoryMock.save).toHaveBeenCalledWith(expect.objectContaining(taskData));

    expect(createdTask).toMatchObject({
      id: expect.any(String),
      ...taskData,
    });
  });
});
