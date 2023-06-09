import { CreateTask } from './CreateTask';
import { ICreateTaskService } from '../../../domain/interfaces/ICreateTaskService';

describe('CreateTask', () => {
  let createTaskServiceMock: jest.Mocked<ICreateTaskService>;
  let createTask: CreateTask;

  beforeEach(() => {
    createTaskServiceMock = {
      execute: jest.fn(),
    };
    createTask = new CreateTask(createTaskServiceMock);
  });

  it('should call the createTaskService with the correct values', async () => {
    const taskData = {
      description: 'Study for the exam',
      dueDate: '2023-06-30',
      priority: 'high',
      user_id:1
    };

    await createTask.execute(taskData);

    expect(createTaskServiceMock.execute).toHaveBeenCalledWith(taskData);
  });

});
