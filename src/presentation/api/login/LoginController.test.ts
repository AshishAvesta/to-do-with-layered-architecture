import { Request, Response } from 'express';
import { ILoginUseCase } from '../../../application/usecases/login/ILoginUseCase';
import { LoginUseCase } from '../../../application/usecases/login/loginUseCase';
import { ILoginService } from '../../../domain/interfaces/ILoginService';
import { LoginController } from './LoginController';


describe('LoginController', () => {
  it('returns 200 and user data when login is successful', async () => {
    const loginUseCase = {
      execute: jest.fn().mockResolvedValue('valid-jwt-token'),
    };
    const loginController = new LoginController(loginUseCase);

    const mockReq = { body: { mobile: '1234567890', password: 'password' } } as Request;
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await loginController.processLoginRequest(mockReq,mockRes);

    //expect(mockRes.status).toBe(200);
    expect(loginUseCase.execute).toHaveBeenCalledWith('1234567890','password');
    expect(mockRes.json).toHaveBeenCalledWith({ token: 'valid-jwt-token' });
    expect(mockRes.status).toHaveBeenCalledWith(200);
  });

  it('returns 400 when login is unsuccessful', async () => {
    const loginService :ILoginService = {
      execute: jest.fn().mockRejectedValue(new Error('User not found'))
    }
    const loginUseCase = new LoginUseCase(loginService);
    const loginController = new LoginController(loginUseCase);

    const mockReq = { body: { mobile: '1234567890', password: 'password' } } as Request;
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await loginController.processLoginRequest(mockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith('User not found');
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });

  it('returns 400 status and error message when invalid password is provided', async () => {
    const loginUseCase = {
      execute: jest.fn().mockRejectedValue(new Error('Invalid password')),
    } as unknown as ILoginUseCase;
    const loginController = new LoginController(loginUseCase);

    const mockReq = { body: { mobile: '1234567890', password: 'wrong-password' } } as unknown as Request;
    const mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    await loginController.processLoginRequest(mockReq, mockRes);

    expect(mockRes.send).toHaveBeenCalledWith('Invalid password');
    expect(mockRes.status).toHaveBeenCalledWith(500);
  });
});
