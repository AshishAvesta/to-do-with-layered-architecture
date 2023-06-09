import express from 'express';
import { ILoginUseCase } from '../../../application/usecases/login/ILoginUseCase';
import { LoginUseCase } from '../../../application/usecases/login/loginUseCase';
import { IHashService } from '../../../domain/interfaces/IHashService';
import { ILoginService } from '../../../domain/interfaces/ILoginService';
import { ITokenService } from '../../../domain/interfaces/ITokenService';
import IUserRepository from '../../../domain/interfaces/IUserRepository';
import { LoginService } from '../../../domain/services/login/loginService';
import UserRepository from '../../../infrastructure/persistence/repositories/UserRepository';
import { BcryptService } from '../../../infrastructure/utils/BcryptService';
import { JwtService } from '../../../infrastructure/utils/JwtService';
import { IModule } from '../IModule';
import { LoginController } from './LoginController';
import { LoginRoutes } from './LoginRoutes';



export class LoginModule implements IModule {
    init(app: express.Express):void {
        const userRepository: IUserRepository = new UserRepository();
        const bcryptService:IHashService = new BcryptService();
        const jwtService:ITokenService = new JwtService();
        const loginService: ILoginService = new LoginService(userRepository,bcryptService,jwtService);
        const loginUseCase: ILoginUseCase = new LoginUseCase(loginService);
        const loginController = new LoginController(loginUseCase);
        const loginRoutes = new LoginRoutes(loginController);
        // Register the user router under '/login'
        app.use('/login', loginRoutes.router());
    }
}

