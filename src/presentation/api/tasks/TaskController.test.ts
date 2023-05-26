// test/presentation/api/controllers/TaskController.test.ts
import { TaskController } from './TaskController';
import { ICreateTask } from '../../../../src/application/usecases/ICreateTask';
import { TaskDTO } from '../../../../src/application/dtos/TaskDTO';
import { IGetTasksUseCase } from '../../../application/usecases/IGetTasksUseCase';
import { Task } from '../../../domain/entities/Task';
import { Response, Request } from 'express';

describe('TaskController', () => {
  let createTaskMock: jest.MockedFunction<ICreateTask['execute']>;
  let getTaskMock: jest.MockedFunction<IGetTasksUseCase['execute']>;
  let taskController: TaskController;

  beforeEach(() => {
    createTaskMock = jest.fn();
    getTaskMock = jest.fn();
    taskController = new TaskController({ execute: createTaskMock } as any,{ execute: getTaskMock } as any);
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

    taskController = new TaskController({ execute: createTaskMock } as ICreateTask,{ execute: getTaskMock } as IGetTasksUseCase);

    await taskController.createTask(reqMock, resMock);

    expect(createTaskMock).toHaveBeenCalledWith(taskData);
    expect(resMock.status).toHaveBeenCalledWith(201);
    expect(resMock.json).toHaveBeenCalledWith({ task: taskData });
  });

  it('GET /tasks', async () => {

    const mockTasks = [new Task('Test task', 'new Date()', 'low','1')];
    const getTasksUseCase = { execute: jest.fn().mockResolvedValue(mockTasks) };
    const tasksController = new TaskController({ execute: createTaskMock } as ICreateTask,getTasksUseCase);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };


    await tasksController.getTasks(mockReq , mockRes);

    expect(getTasksUseCase.execute).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
  });

  it('returns 500 on server error', async () => {
    const mockTasks = [new Task('Test task', 'new Date()', 'low','1')];
    const getTasksUseCase = { execute: jest.fn().mockResolvedValue(mockTasks) };
    const tasksController = new TaskController({ execute: createTaskMock } as ICreateTask,getTasksUseCase);

    const mockReq = {};
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    getTasksUseCase.execute = jest.fn().mockRejectedValue(new Error('Server error'));
    await tasksController.getTasks(mockReq , mockRes );

    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.send).toHaveBeenCalledWith('Server error');
  });

  

  // Additional tests could include invalid request body, handling errors, etc.
});
