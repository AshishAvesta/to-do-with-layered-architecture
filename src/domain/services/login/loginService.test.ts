import User from '../../entities/User';
import { IHashService } from '../../interfaces/IHashService';
import { ITokenService } from '../../interfaces/ITokenService';
import IUserRepository from '../../interfaces/IUserRepository';
import { LoginService } from './loginService';


jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'valid-jwt-token'),
}));


describe('LoginService', () => {
        
    it('returns token when valid credentials are provided', async () => {
        const userRepository = {
          getUserByMobile: jest.fn().mockResolvedValue(new User('Jane Doe', 'jane@example.com', 'password', '0987654321','1')),
        } as unknown as IUserRepository;

        const mockHashService: jest.Mocked<IHashService> = {
          compare: jest.fn().mockResolvedValue(true),  // Assuming password always matches
          hash: jest.fn()
        };
        
        const mockTokenService: jest.Mocked<ITokenService> = {
          sign: jest.fn().mockReturnValue('valid-jwt-token'),  // Always return a valid token
          verify:jest.fn()
        };
        const loginService = new LoginService(userRepository,mockHashService,mockTokenService);
    
        const token = await loginService.execute('1234567890', 'password');
    
        expect(token).toBe('valid-jwt-token');
      });

      it('throws error when user does not exist', async () => {
        const userRepository = {
          getUserByMobile: jest.fn().mockResolvedValue(null),
        } as unknown as IUserRepository;

        const mockHashService: jest.Mocked<IHashService> = {
          compare: jest.fn().mockResolvedValue(true),  // Assuming password always matches
          hash: jest.fn()
        };
        
        const mockTokenService: jest.Mocked<ITokenService> = {
          sign: jest.fn().mockReturnValue('valid-jwt-token'),  // Always return a valid token
          verify:jest.fn()
        };

        const loginService = new LoginService(userRepository,mockHashService,mockTokenService);
    
        await expect(loginService.execute('1234567890', 'password')).rejects.toThrow('User not found');
      });

      it('throws error when invalid password is provided', async () => {
        const userRepository = {
          getUserByMobile: jest.fn().mockResolvedValue(new User('Jane Doe', 'jane@example.com', 'password', '0987654321','1')),
        } as unknown as IUserRepository;

        const mockHashService: jest.Mocked<IHashService> = {
          compare: jest.fn().mockResolvedValue(false),  // Assuming password always matches
          hash: jest.fn()
        };
        
        const mockTokenService: jest.Mocked<ITokenService> = {
          sign: jest.fn().mockReturnValue('valid-jwt-token'),  // Always return a valid token
          verify:jest.fn()
        };

        const loginService = new LoginService(userRepository,mockHashService,mockTokenService);
    
        await expect(loginService.execute('1234567890', 'wrong-password')).rejects.toThrow('Invalid password');
      });
});
