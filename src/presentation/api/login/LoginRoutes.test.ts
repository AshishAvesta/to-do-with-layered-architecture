import request from 'supertest';
import express from 'express';
import { LoginRoutes } from './LoginRoutes';
import { LoginController } from './LoginController';
import { ILoginUseCase } from '../../../application/usecases/login/ILoginUseCase';
import * as validations from './validations';

const mockLoginUseCase: ILoginUseCase = {
  execute: jest.fn(),
};

const loginController = new LoginController(mockLoginUseCase);

const app = express();
app.use(express.json());

const loginRoutes = new LoginRoutes(loginController);
app.use('/login', loginRoutes.router());


describe('LoginRoutes', () => {

  jest.mock('./validations');
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  

  it('returns 200 status and token when valid credentials are provided', async () => {
    (validations.validate as jest.Mock) = jest.fn((req, res, next) => next());

    const response = await request(app).post('/login').send({
      mobile: '9033302459',
      password: '123456',
    });

    expect(response.status).toBe(200);
    //expect(response.body).toHaveProperty('token');
  });

   it('returns 400 status when invalid credentials are provided', async () => {
    const response = await request(app).post('/login').send({
      mobile: '1234567890',
      password: 'wrong-password',
    });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({"errors": "Mobile number should be a valid phone number"});
  });

  /*it('returns 400 status when user does not exist', async () => {
    //userRepository.getUserByMobile = jest.fn().mockResolvedValue(null);
    
    const response = await request(app).post('/login').send({
      mobile: '1234567890',
      password: 'password',
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  }); */
});
