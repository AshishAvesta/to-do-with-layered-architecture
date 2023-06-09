import express from 'express';
import IUserRepository from '../../../domain/interfaces/IUserRepository';
import UserRepository from '../../../infrastructure/persistence/repositories/UserRepository';
import ICreateUserService from '../../../domain/interfaces/ICreateUserService';
import ICreateUserUseCase from '../../../application/usecases/user/ICreateUserUseCase';
import CreateUserUseCase from '../../../application/usecases/user/CreateUserUseCase';
import UserController from './UserController';
import { UserRouter } from './UserRoutes';
import { IModule } from '../IModule';
import { AuthenticationMiddleware } from '../middleware/AuthenticationMiddleware';
import { JwtService } from '../../../infrastructure/utils/JwtService';
import { ITokenService } from '../../../domain/interfaces/ITokenService';
import { BcryptService } from '../../../infrastructure/utils/BcryptService';
import { IHashService } from '../../../domain/interfaces/IHashService';
import CreateUserService from '../../../domain/services/user/CreateUserService';

export class UserModule implements IModule {
    init(app: express.Express):void {
        const userRepository: IUserRepository = new UserRepository();
        const bcryptService:IHashService = new BcryptService();
        const createUserService: ICreateUserService = new CreateUserService(userRepository,bcryptService);
        const createUserUseCase: ICreateUserUseCase = new CreateUserUseCase(createUserService);
        const userController = new UserController(createUserUseCase);
        const jwtService:ITokenService = new JwtService();
        const authMiddleware = new AuthenticationMiddleware(jwtService);
        const userRoutes = new UserRouter(userController,authMiddleware);
        // Register the user router under '/users'
        app.use('/users', userRoutes.router());
    }
}

