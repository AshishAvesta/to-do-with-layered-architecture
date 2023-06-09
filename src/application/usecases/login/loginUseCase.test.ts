// loginUseCase.test.ts
import { ILoginService } from '../../../domain/interfaces/ILoginService';
import { LoginUseCase } from './loginUseCase';


describe('LoginUseCase', () => {
    
    it('returns token when valid credentials are provided', async () => {
        const loginService = {
          execute: jest.fn().mockResolvedValue('valid-jwt-token'),
        } as unknown as ILoginService;
        const loginUseCase = new LoginUseCase(loginService);
    
        const token = await loginUseCase.execute('1234567890', 'password');
    
        expect(token).toBe('valid-jwt-token');
      });
    
      it('throws error when user does not exist', async () => {
        const loginService = {
          execute: jest.fn().mockRejectedValue(new Error('User not found')),
        } as unknown as ILoginService;
        const loginUseCase = new LoginUseCase(loginService);
    
        await expect(loginUseCase.execute('1234567890', 'password')).rejects.toThrow('User not found');
      });
    
      it('throws error when invalid password is provided', async () => {
        const loginService = {
          execute: jest.fn().mockRejectedValue(new Error('Invalid password')),
        } as unknown as ILoginService;
        const loginUseCase = new LoginUseCase(loginService);
    
        await expect(loginUseCase.execute('1234567890', 'wrong-password')).rejects.toThrow('Invalid password');
      });

});
