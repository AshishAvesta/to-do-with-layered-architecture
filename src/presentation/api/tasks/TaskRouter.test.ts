// test/presentation/api/routers/TaskRouter.test.ts
import request from 'supertest';
import express from 'express';
import { TaskRouter } from './TaskRouter';
import { TaskController } from './TaskController';
import { ICreateTask } from '../../../application/usecases/ICreateTask';

describe('TaskRouter', () => {
  
  let taskController: TaskController;
  let taskRouter: TaskRouter;
  let app: express.Express;
  let createTaskMock: jest.Mocked<ICreateTask>;

  beforeEach(() => {
    createTaskMock = {
      execute: jest.fn()
    };
    taskController = new TaskController({ execute: createTaskMock.execute } as any);
    taskRouter = new TaskRouter(taskController);
    app = express();
    app.use(express.json());
    app.use('/tasks', taskRouter.router());
  });

  it('should create a task when POST /tasks', async () => {
    const taskData = {
      description: 'Study for the exam',
      dueDate: '2023-06-30',
      priority: 'high'
    };

    //createTaskMock.mockResolvedValueOnce(taskData);

    // Mock the 'execute' method of 'createTaskMock'
createTaskMock.execute.mockResolvedValueOnce(taskData);

    const response = await request(app)
      .post('/tasks')
      .send(taskData);

    //expect(createTaskMock.execute).toHaveBeenCalledWith(taskData);
   // expect(response.status).toBe(201);
    expect(response.body).toEqual({ task: taskData });
  });

  // Additional tests could include invalid request body, handling errors, etc.
});
