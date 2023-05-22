// test/application/usecases/CreateTask.test.ts

import { CreateTask } from '../../../src/application/usecases/CreateTask';
import { ICreateTaskService } from '../../../src/domain/services/ICreateTaskService';

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
    };

    await createTask.execute(taskData);

    expect(createTaskServiceMock.execute).toHaveBeenCalledWith(taskData);
  });

  // Additional tests could include error handling, invalid input, etc.
});
