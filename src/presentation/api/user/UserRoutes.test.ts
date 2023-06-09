import express from 'express';
import request from 'supertest';
import ICreateUserUseCase from '../../../application/usecases/user/ICreateUserUseCase';
import { IAuthenticationMiddleware } from '../middleware/IAuthenticationMiddleware';
import UserController from './UserController';
import { UserRouter } from './UserRoutes';


jest.mock('./validations', () => ({
  validate : (req:any, res:any, next:any) =>{
    next();
  },
}));

describe('UserRouter', () => {
  let app: express.Application;
  let mockUserController: jest.Mocked<UserController>;
  let mockAuthMiddleware: jest.Mocked<IAuthenticationMiddleware>;
  let userRouter: UserRouter;




  beforeEach(() => {
    app = express();

    mockUserController = {
      createUser: jest.fn(),
    } as any;
    mockAuthMiddleware = {
      authenticate: jest.fn((req, res, next) => next()),
    } as any;
    userRouter = new UserRouter(mockUserController, mockAuthMiddleware);
    app.use('/users', userRouter.router());

  });

  it('POST / - success', async () => {

    const user = {
      name: 'test',
      email: 'test@test.com',
      password: 'test1234',
      mobile: '1234567890',
    };
    mockUserController.createUser.mockImplementationOnce(async(req, res) =>
      res.status(201).json(user)
    );

    const res = await request(app).post('/users').send(user);
        
    expect(res.status).toBe(201);
    expect(res.body).toEqual(user);
    expect(mockUserController.createUser).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object)
    );
  });

  it('returns 500 when user creation is unsuccessful', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com', password: 'JohnPassword123', mobile: '1234567890' };
    //mockCreateUserUseCase.execute.mockImplementationOnce(() => { throw new Error(); });
    //const mockCreateUserUseCase = require('../../../application/usecases/user/CreateUserUseCase').CreateUserUseCase;
    //const mockCreateUserUseCase = new (require('../../../application/usecases/user/CreateUserUseCase').CreateUserUseCase)();

    // Simulate a server error by making execute throw an error
    /* mockCreateUserUseCase.execute.mockImplementationOnce(() => {
      throw new Error();
    }); */
    mockUserController.createUser.mockImplementationOnce(async(req, res) =>
    res.status(500).json({ message: new Error()})
  );
    const response = await request(app)
      .post('/users')
      .send(mockUser)
      .set('Authorization', `Bearer mockValidToken`)
      .expect(500);
  });

  it('returns the newly created user when user creation is successful', async () => {
    const mockUser = { name: 'John Doe', email: 'john@example.com', password: 'JohnPassword123', mobile: '1234567890' };
    const createdUser = { ...mockUser, id: 1 };
    
    /* const mockCreateUserUseCase = new (require('../../../application/usecases/user/CreateUserUseCase').CreateUserUseCase)(); */

    // Simulate a server error by making execute throw an error
    /* mockCreateUserUseCase.execute.mockImplementationOnce(createdUser); */
    mockUserController.createUser.mockImplementationOnce(async(req, res) =>
    res.status(201).json(createdUser)
  );

    const response = await request(app)
      .post('/users')
      .send(mockUser)
      .set('Authorization', `Bearer mockValidToken`)
      .expect(201);
  
    expect(response.body).toEqual(createdUser);
  });
});
