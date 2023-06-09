import supertest from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import ICreateUserUseCase from '../../../application/usecases/user/ICreateUserUseCase';
import UserController from './UserController';
import CreateUserDto from '../../../application/dtos/CreateUserDto';
import User from '../../../domain/entities/User';

describe('UserController', () => {
  let app: express.Express;
  let mockCreateUserUseCase: jest.Mocked<ICreateUserUseCase>;
  let userController: UserController;
  let createUserDto: CreateUserDto;

  beforeEach(() => {
    app = express();
    app.use(bodyParser.json());
    mockCreateUserUseCase = {
      execute: jest.fn(),
    };
    userController = new UserController(mockCreateUserUseCase);
    app.post('/users', userController.createUser);

    createUserDto = {
      name: 'test',
      email: 'test@test.com',
      password: 'password',
      mobile: '1234567890',
    };
  });

  it('should return 201 and the created user when createUserUseCase.execute resolves', async () => {
    const expectedUser: User = new User('test', 'test@test.com', 'password', '1234567890','1');
    mockCreateUserUseCase.execute.mockResolvedValueOnce(expectedUser);

    const response = await supertest(app).post('/users').send(createUserDto);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedUser);
    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
  });

  it('should return 500 and the error message when createUserUseCase.execute rejects', async () => {
    const expectedError = new Error('Test error');
    mockCreateUserUseCase.execute.mockRejectedValueOnce(expectedError);

    const response = await supertest(app).post('/users').send(createUserDto);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: 'Test error' });
    expect(mockCreateUserUseCase.execute).toHaveBeenCalledWith(createUserDto);
  });
});
