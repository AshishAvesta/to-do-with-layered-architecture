import { TaskController } from './TaskController';
import { TaskDTO } from '../../../../src/application/dtos/TaskDTO';
import { Task } from '../../../domain/entities/Task';
import { ICreateTask } from '../../../application/usecases/tasks/ICreateTask';
import { IGetTasksUseCase } from '../../../application/usecases/tasks/IGetTasksUseCase';

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
    const taskData = new TaskDTO('Study for the exam', '2023-06-30', 'high',1,'0');
    const reqMock = {
      body: taskData,
      user:{
        id:1
      }
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

    const mockTasks = [new Task('Test task', 'new Date()', 'low',1,'1')];
    const getTasksUseCase = { execute: jest.fn().mockResolvedValue(mockTasks) };
    const tasksController = new TaskController({ execute: createTaskMock } as ICreateTask,getTasksUseCase);

    const mockReq = { 
      query: { limit: '10', offset: '0' },
      user:{
        id:1
      }
  };
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
    const mockTasks = [new Task('Test task', 'new Date()', 'low',1,'1')];
    const getTasksUseCase = { execute: jest.fn().mockResolvedValue(mockTasks) };
    const tasksController = new TaskController({ execute: createTaskMock } as ICreateTask,getTasksUseCase);

    const mockReq = { query: { },user:{
      id:1
    } };
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

  it('should return 200 and a list of tasks with provided limit, offset and userId', async () => {
    const mockTasks = [new Task('Test task', 'new Date()', 'low',1,'1')];
    const getTasksUseCase = { execute: jest.fn().mockResolvedValue(mockTasks) };
    const tasksController = new TaskController({ execute: createTaskMock } as ICreateTask,getTasksUseCase);

    const mockReq = { query: { limit: 10, offset: 5 },
    user:{
      id:1
    } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    getTasksUseCase.execute.mockResolvedValue(mockTasks);
  
    await tasksController.getTasks(mockReq, mockRes);
    
    expect(getTasksUseCase.execute).toHaveBeenCalledWith(10, 5, 1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
  });
  
  it('should return 200 and a list of tasks with provided limit and offset only', async () => {
    const mockTasks = [{   
      id:'1',
      description: 'Study for the exam',
      dueDate: '2023-06-30',
      priority: 'high',
      user_id:1
    },
    {   
      id:'2',
      description: 'watch news on tv',
      dueDate: '2023-06-30',
      priority: 'low',
      user_id:1
    }];
    const getTasksUseCase = { execute: jest.fn().mockResolvedValue(mockTasks) };
    const tasksController = new TaskController({ execute: createTaskMock } as ICreateTask,getTasksUseCase);

    const mockReq = { query: { limit: 10, offset: 5 },user:{
      id:1
    } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    getTasksUseCase.execute.mockResolvedValue(mockTasks);
  
    await tasksController.getTasks(mockReq, mockRes);
    
    expect(getTasksUseCase.execute).toHaveBeenCalledWith(10, 5,1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
  });
  
  it('should return 200 and a list of tasks with provided userId only', async () => {
    const mockTasks = [{   
      id:'1',
      description: 'Study for the exam',
      dueDate: '2023-06-30',
      priority: 'high',
      user_id:1
    },
  
    {   
      id:'2',
      description: 'watch news on tv',
      dueDate: '2023-06-30',
      priority: 'low',
      user_id:1
    }];
    const getTasksUseCase = { execute: jest.fn().mockResolvedValue(mockTasks) };
    const tasksController = new TaskController({ execute: createTaskMock } as ICreateTask,getTasksUseCase);

    const mockReq = { query: {  },user:{
      id:1
    } };
    const mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };

    await tasksController.getTasks(mockReq,mockRes);
    
    expect(getTasksUseCase.execute).toHaveBeenCalledWith(null, null, 1);
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(mockTasks);
  });
});
