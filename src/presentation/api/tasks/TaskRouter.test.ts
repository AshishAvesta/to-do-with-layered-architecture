import request from 'supertest';
import express from 'express';
import { TaskRouter } from './TaskRouter';
import { TaskController } from './TaskController';
import { IAuthenticationMiddleware } from '../middleware/IAuthenticationMiddleware';
import { ICreateTask } from '../../../application/usecases/tasks/ICreateTask';
import { IGetTasksUseCase } from '../../../application/usecases/tasks/IGetTasksUseCase';

jest.mock('./TaskValidation', () => ({
  validateTask : (req:any, res:any, next:any) =>{
    next();
  },
}));

let taskController: TaskController;
  let taskRouter: TaskRouter;
  let app: express.Express;
  let createTaskMock: jest.Mocked<ICreateTask>;
  let getTaskMock: jest.Mocked<IGetTasksUseCase>;
  let mockAuthMiddleware: jest.Mocked<IAuthenticationMiddleware>;
  

 /*  jest.mock('../middleware/authenticate', () => ({
    __esModule: true, // this property makes it work
    default: require('../middleware/mockAuthMiddleware').default,
  })); */

  createTaskMock = {
    execute: jest.fn()
  };
  getTaskMock = {
    execute: jest.fn()
  }
  mockAuthMiddleware = {
    authenticate: jest.fn((req, res, next) => {
      req.user ={
        id:1
      }
      next()
    }),
  } as any;

  taskController = new TaskController({ execute: createTaskMock.execute } as any,{ execute: getTaskMock.execute } as any);
  taskRouter = new TaskRouter(taskController,mockAuthMiddleware);
  app = express();
  app.use(express.json());
  app.use('/tasks', taskRouter.router());

describe('TaskRouter', () => {
  
  it('should create a task when POST /tasks', async () => {
    const taskData = {
      description: 'Study for the exam',
      dueDate: '2023-06-30',
      priority: 'high',
      user_id:1,
      id:"0"
    };

    // Mock the 'execute' method of 'createTaskMock'
    createTaskMock.execute.mockResolvedValueOnce(taskData);

    const response = await request(app)
      .post('/tasks')
      .set('Authorization', `Bearer mockValidToken`)
      .send(taskData);

    expect(createTaskMock.execute).toHaveBeenCalledWith(taskData);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ task: taskData });
  });

  it('responds with a 200 status and json', async () => {
    const taskData = [{
      id:'1',
      description: 'Study for the exam',
      dueDate: '2023-06-30',
      priority: 'high',
      user_id:1
    },{
      id:'2',
      description: 'play football',
      dueDate: '2023-06-31',
      priority: 'high',
      user_id:1
    }];

    // Mock the 'execute' method of 'getTaskMock'
    getTaskMock.execute.mockResolvedValueOnce(taskData);

    const response = await request(app)
    .get('/tasks')
    .set('Authorization', `Bearer mockValidToken`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(taskData);
  });
});
