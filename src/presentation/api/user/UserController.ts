import { Request, Response } from 'express';
import CreateUserDto from '../../../application/dtos/CreateUserDto';
import ICreateUserUseCase from '../../../application/usecases/user/ICreateUserUseCase';

export class UserController {
  private createUserUseCase: ICreateUserUseCase;

  constructor(createUserUseCase: ICreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  createUser = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, password, mobile } = req.body;
    const createUserDto: CreateUserDto = { name, email, password, mobile };
    
    try {
      const newUser = await this.createUserUseCase.execute(createUserDto);
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }
}

export default UserController;