// test/presentation/api/controllers/TaskController.test.ts
import { TaskController } from './TaskController';
import { ICreateTask } from '../../../../src/application/usecases/ICreateTask';
import { TaskDTO } from '../../../../src/application/dtos/TaskDTO';

describe('TaskController', () => {
  let createTaskMock: jest.MockedFunction<ICreateTask['execute']>;
  let taskController: TaskController;

  beforeEach(() => {
    createTaskMock = jest.fn();
    taskController = new TaskController({ execute: createTaskMock } as any);
  });

  it('should create a task and send a 201 response', async () => {
    const taskData = new TaskDTO('Study for the exam', '2023-06-30', 'high');
    const reqMock = {
      body: taskData,
    };
    const resMock = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    createTaskMock = jest.fn().mockResolvedValue(taskData);

    taskController = new TaskController({ execute: createTaskMock } as ICreateTask);

    await taskController.createTask(reqMock, resMock);

    expect(createTaskMock).toHaveBeenCalledWith(taskData);
    expect(resMock.status).toHaveBeenCalledWith(201);
    expect(resMock.json).toHaveBeenCalledWith({ task: taskData });
  });

  // Additional tests could include invalid request body, handling errors, etc.
});
